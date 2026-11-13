import { useEffect, useRef, useState } from "react";

/* ---- tuning ---- */
const LINES = ["SOLVING", "INVISIBLE"]; // big centre text, one line each (both run edge to edge)
const WORD = "SOLVING INVISIBLE"; // the faint moving rows
const TILE = 24; // target tile size in px (the grid is fitted so tiles are exact squares)
const MIN_ROWS = 3; // this many hovered tiles (= rows) -> the screen splits open
const POP_MS = 260; // one tile fading away
const ROW_STEP = 11; // ms between neighbouring tiles of a row (the right -> left wipe)
const WINDOW_MS = 3500; // after a hover, this long to hover the next one, else the revealed rows go back
const OPEN_MS = 520; // halves part: straight and quick
const CLOSE_MS = 480; // halves come straight back and merge
const SPLIT_EASE = "cubic-bezier(.55,0,.25,1)"; // one smooth, quick, one-direction move
const AUTO_CLOSE_MS = 3500; // the close ring fills in this long, then the visual leaves
const COOLDOWN_MS = 1500; // no new reveal right after leaving
const MIN_WIDTH = 1025; // the right-edge trigger column only exists above this viewport width

const ease = (x: number) => x * x * (3 - 2 * x); // smoothstep

type Mode = "idle" | "arming" | "open" | "exit";
interface Props { peek: boolean; onFull: (v: boolean) => void }

/**
 * Cursor reveal.
 *  1. Only the middle tiles of the LAST (right-edge) column are live (they carry a hint outline). Hovering one reveals
 *     its whole row, wiping right -> left, showing the white visual behind (bold "SOLVING INVISIBLE" + outlined rows).
 *  2. Hover MIN_ROWS of them within WINDOW_MS of each other, otherwise the revealed rows go back.
 *  3. Then the real page is copied into two halves (cut along the middle hovered row): the top half dips, then flies
 *     up; the bottom half lifts, then flies down. The visual is left fully showing. Closing plays it in reverse.
 * The visual is drawn in a canvas that sits under the halves; the per-tile alpha mask only matters during step 1.
 */
export default function Reveal({ peek, onFull }: Props) {
  const cv = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [ring, setRing] = useState(0); // bumped to restart the close ring
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const peekRef = useRef(peek);
  const api = useRef<{ exit: () => void; drop: () => void }>({ exit: () => {}, drop: () => {} });
  const onFullRef = useRef(onFull);
  peekRef.current = peek;
  useEffect(() => { if (peek) api.current.drop(); }, [peek]);
  onFullRef.current = onFull;

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = cv.current!;
    const hint = hintRef.current!;
    const ctx = canvas.getContext("2d")!;
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;
    const strip = document.createElement("canvas");

    // layout (device px unless noted)
    let W = 0, H = 0, dpr = 1, cols = 1, rows = 1, size = 1, tileCss = TILE, cssW = 0;
    let xs: number[] = [], ys: number[] = [];
    // tiles
    let a0 = new Float32Array(0), a1 = new Float32Array(0), t0 = new Float64Array(0), dur = new Float32Array(0);
    // visual
    let capH = 0, pad = 0, unit = 0, family = "";
    let big: { fs: number; w: number; base: number }[] = [];
    let rowBase: number[] = []; // baselines of the 4 faint rows (2 above, 2 below)
    // state
    let m: Mode = "idle", cool = 0, tl = 0, last = 0, raf = 0, lastHit = 0, fullV = false, splitY = 0, armT = 0, kept: { top: HTMLElement; bot: HTMLElement } | null = null;
    const root = rootRef.current!, closeBtn = closeRef.current!;
    const rowsHit = new Set<number>();

    const family0 = () => (getComputedStyle(document.body).fontFamily || "system-ui, sans-serif");

    const alpha = (i: number, now: number) => {
      if (a0[i] === a1[i]) return a1[i];
      const k = (now - t0[i]) / dur[i];
      return k <= 0 ? a0[i] : k >= 1 ? a1[i] : a0[i] + (a1[i] - a0[i]) * ease(k);
    };
    const setTile = (i: number, to: number, now: number, delay: number, d: number) => {
      a0[i] = alpha(i, now); a1[i] = to; t0[i] = now + delay; dur[i] = d;
    };

    const buildVisual = () => {
      family = family0();
      const font = (px: number, w = 800) => `${w} ${px}px ${family}`; // 800 = ExtraBold
      const measure = (txt: string, px: number) => { ctx.font = font(px); const t = ctx.measureText(txt); return { w: t.width || 1, cap: t.actualBoundingBoxAscent || px * 0.72 }; };
      // 1) the two big lines: each as wide as the screen
      let fsL = LINES.map((t) => (W * 0.985 / measure(t, 100).w) * 100);
      let caps = LINES.map((t, i) => measure(t, fsL[i]).cap);
      let gapL = Math.min(...caps) * 0.14;
      let block = caps[0] + caps[1] + gapL;
      const maxBlock = H * 0.62; // leave room above / below for the faint rows
      if (block > maxBlock) { const f = maxBlock / block; fsL = fsL.map((v) => v * f); caps = caps.map((v) => v * f); gapL *= f; block = maxBlock; }
      const top = (H - block) / 2;
      let base = top;
      big = LINES.map((t, i) => { base += caps[i] + (i ? gapL : 0); return { fs: fsL[i], w: measure(t, fsL[i]).w, base }; });
      // 2) faint outlined rows fill the space above and below the block
      const avail = top; // free height on each side
      const rowH = avail / 2;
      const capRatio = measure(WORD, 100).cap / 100;
      const fsF = Math.max(8, (rowH * 0.6) / capRatio);
      const m = measure(WORD, fsF);
      capH = m.cap;
      rowBase = [top - rowH * 1.5, top - rowH * 0.5, H - top + rowH * 0.5, H - top + rowH * 1.5].map((c) => c + capH / 2);
      pad = Math.ceil(fsF * 0.1);
      const gap = fsF * 0.4;
      unit = Math.ceil(m.w + gap);
      strip.width = unit;
      strip.height = Math.ceil(capH + pad * 2);
      const s = strip.getContext("2d")!;
      s.clearRect(0, 0, strip.width, strip.height);
      s.font = font(fsF);
      s.fillStyle = "rgba(0,0,0,.06)"; // filled grey copies, barely there
      s.fillText(WORD, gap / 2, pad + capH);
    };

    const layout = () => {
      const de = document.documentElement;
      const cw = de.clientWidth || innerWidth, ch = de.clientHeight || innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = cw;
      W = Math.round(cw * dpr); H = Math.round(ch * dpr);
      canvas.width = mask.width = W; canvas.height = mask.height = H;
      cols = Math.max(4, Math.round(cw / TILE));
      tileCss = cw / cols;
      rows = Math.max(4, Math.ceil(ch / tileCss));
      size = tileCss * dpr;
      xs = Array.from({ length: cols + 1 }, (_, c) => Math.round(c * size));
      ys = Array.from({ length: rows + 1 }, (_, r) => Math.round(r * size));
      xs[cols] = W; ys[rows] = H; // last tiles reach the edge exactly (no sliver)
      const n = cols * rows;
      a0 = new Float32Array(n); a1 = new Float32Array(n); t0 = new Float64Array(n); dur = new Float32Array(n);
      rowsHit.clear();
      // hint outlines: the middle tiles of the last column (first and last row excluded)
      hint.replaceChildren();
      for (let r = 1; r <= rows - 2; r++) {
        const el = document.createElement("i");
        el.style.cssText = `left:${xs[cols - 1] / dpr}px;top:${ys[r] / dpr}px;width:${(W - xs[cols - 1]) / dpr}px;height:${(ys[r + 1] - ys[r]) / dpr}px;--i:${r}`;
        hint.appendChild(el);
      }
      buildVisual();
      if (m !== "idle") { a0.fill(1); a1.fill(1); } // window resized mid-reveal: keep everything open
      draw(performance.now());
    };

    const drawVisual = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, W, H);
      rowBase.forEach((baseY, i) => {
        const dir = i % 2 ? 1 : -1;
        const speed = (80 + (i % 2 ? 0 : 30) + i * 10) * dpr; // px per second
        const off = (((tl * speed * dir) % unit) + unit) % unit;
        const y = Math.round(baseY - pad - capH);
        for (let x = -off - unit; x < W; x += unit) ctx.drawImage(strip, Math.round(x), y);
      });
      ctx.fillStyle = "#0a0a0a";
      ctx.textBaseline = "alphabetic";
      LINES.forEach((t, i) => {
        ctx.font = `800 ${big[i].fs}px ${family}`;
        ctx.fillText(t, (W - big[i].w) / 2, big[i].base);
      });
    };

    const draw = (now: number) => {
      if (fullV) { ctx.setTransform(1, 0, 0, 1, 0, 0); drawVisual(); return 1; } // halves are open / opening: the whole visual shows
      let visible = 0, full = 0;
      mctx.setTransform(1, 0, 0, 1, 0, 0);
      mctx.clearRect(0, 0, W, H);
      mctx.fillStyle = "#000";
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const a = alpha(r * cols + c, now);
        if (a <= 0.003) continue;
        visible++; if (a >= 0.997) full++;
        mctx.globalAlpha = a;
        mctx.fillRect(xs[c], ys[r], xs[c + 1] - xs[c], ys[r + 1] - ys[r]);
      }
      mctx.globalAlpha = 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (!visible) { ctx.clearRect(0, 0, W, H); return 0; }
      drawVisual();
      if (full < cols * rows) { // some tiles still hide the visual: cut it with the mask
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      }
      return visible;
    };

    const hideRows = (now: number) => { // revealed rows go back to normal (wipe retreats towards the right edge)
      rowsHit.forEach((r) => { for (let c = 0; c < cols; c++) setTile(r * cols + c, 0, now, c * 9, 380); });
      rowsHit.clear();
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(64, now - (last || now)); last = now;
      tl += dt / 1000; // the hidden visual always moves: the play / pause button never affects it
      if (m === "idle" && rowsHit.size && now - lastHit > WINDOW_MS) hideRows(now);
      const visible = draw(now);
      if (visible || m !== "idle" || rowsHit.size) raf = requestAnimationFrame(tick); else last = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    /* ---- the two halves: real copies of the page, clipped above / below the split line ---- */
    const fgEl = () => document.querySelector<HTMLElement>(".fg");

    // Copies restart their CSS animations, so line every copy's animations up with the originals' (same element index + name).
    const syncAnimations = (orig: HTMLElement, copy: HTMLElement) => {
      const index = (r: HTMLElement) => {
        const els = Array.from(r.querySelectorAll("*")), map = new Map<string, Animation>();
        const ids = new Map(els.map((e, i) => [e, i] as const));
        for (const a of r.getAnimations({ subtree: true })) {
          const t = (a.effect as KeyframeEffect | null)?.target as Element | null;
          const id = t ? ids.get(t) : undefined;
          if (id === undefined) continue;
          map.set(`${id}|${(a as CSSAnimation).animationName ?? (a as CSSTransition).transitionProperty ?? a.id}`, a);
        }
        return map;
      };
      const o = index(orig);
      index(copy).forEach((ca, key) => {
        const oa = o.get(key);
        try {
          if (oa && oa.currentTime !== null) ca.currentTime = oa.currentTime;
          else ca.finish(); // an entrance animation that already finished in the original
        } catch { /* infinite animation without a counterpart: leave it */ }
      });
    };

    const rectPath = (y0: number, y1: number, holes: [number, number][]) => {
      const w = cssW + 2;
      let d = `M-1 ${y0}H${w}V${y1}H-1Z`;
      for (const [a, b] of holes) d += `M-1 ${a}H${w}V${b}H-1Z`;
      return `path(evenodd,"${d}")`;
    };

    const makeHalves = (y: number, holes: [number, number][]) => {
      const fg = fgEl()!;
      const ch = H / dpr;
      const mk = (cls: string, y0: number, y1: number, hs: [number, number][]) => {
        const holder = document.createElement("div");
        holder.className = "rv-half " + cls;
        const copy = fg.cloneNode(true) as HTMLElement;
        copy.classList.remove("fg");
        holder.appendChild(copy);
        root.insertBefore(holder, closeBtn);
        syncAnimations(fg, copy);
        copy.querySelector(".track")?.remove();
        copy.querySelector(".gal")?.remove();
        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;
        holder.style.clipPath = rectPath(y0, y1 + (cls === "top" ? 1 : 0), hs); // top overlaps the bottom by 1px: never a gap
        return holder;
      };
      return {
        top: mk("top", 0, y, holes.filter(([, b]) => b <= y)),
        bot: mk("bot", y, ch + 1, holes.filter(([a]) => a >= y)),
      };
    };

    const move = (el: HTMLElement, frames: Keyframe[], ms: number) =>
      el.animate(frames, { duration: ms, fill: "forwards" });

    const openSplit = () => {
      const fg = fgEl();
      if (!fg || m !== "arming") return;
      const sorted = [...rowsHit].sort((a, b) => a - b);
      const med = sorted[Math.floor(sorted.length / 2)];
      splitY = Math.round(ys[med] / dpr); // whole pixels: no hairline seam when the halves meet again
      const holes = sorted.map((r) => [ys[r] / dpr, ys[r + 1] / dpr] as [number, number]);
      const { top, bot } = makeHalves(splitY, holes);
      fullV = true; // canvas now paints the whole visual underneath the halves
      document.documentElement.classList.add("rv-open");
      fg.inert = true;
      const chh = H / dpr;
      const ta = move(top, [
        { transform: "translateY(0)", easing: SPLIT_EASE },
        { transform: `translateY(${-(splitY + 80)}px)` },
      ], OPEN_MS);
      const ba = move(bot, [
        { transform: "translateY(0)", easing: SPLIT_EASE },
        { transform: `translateY(${chh - splitY + 80}px)` },
      ], OPEN_MS);
      Promise.all([ta.finished, ba.finished]).then(() => {
        if (m !== "arming") { top.remove(); bot.remove(); return; }
        kept = { top, bot }; // parked off-screen (images already decoded): the closing reuses them, so nothing pops in
        m = "open"; setMode("open"); setRing((v) => v + 1);
      }).catch(() => {});
      kick();
    };

    const goArm = () => {
      m = "arming"; setMode("arming");
      onFullRef.current(true); // autoplay holds while the screen is split open
      const wipe = (cols - 1) * ROW_STEP + POP_MS + 80; // let the 3rd row finish revealing first
      armT = window.setTimeout(openSplit, wipe);
    };

    const exit = () => {
      if (m !== "open") return;
      const fg = fgEl();
      if (!fg) return;
      m = "exit"; setMode("exit");
      const chh = H / dpr;
      let top: HTMLElement, bot: HTMLElement;
      if (kept) {
        ({ top, bot } = kept); kept = null;
        top.getAnimations().forEach((a) => a.cancel()); bot.getAnimations().forEach((a) => a.cancel());
        top.style.clipPath = rectPath(0, splitY + 1, []); bot.style.clipPath = rectPath(splitY, H / dpr + 1, []);
        syncAnimations(fg, top.firstElementChild as HTMLElement); syncAnimations(fg, bot.firstElementChild as HTMLElement);
      } else ({ top, bot } = makeHalves(splitY, [])); // fallback: fresh copies carry the page's current state
      const t0y = -(splitY + 80), b0y = chh - splitY + 80;
      top.style.transform = `translateY(${t0y}px)`; bot.style.transform = `translateY(${b0y}px)`;
      const ta = move(top, [
        { transform: `translateY(${t0y}px)`, easing: SPLIT_EASE },
        { transform: "translateY(0)" },
      ], CLOSE_MS);
      const ba = move(bot, [
        { transform: `translateY(${b0y}px)`, easing: SPLIT_EASE },
        { transform: "translateY(0)" },
      ], CLOSE_MS);
      Promise.all([ta.finished, ba.finished]).then(() => {
        // halves now sit exactly on the real page. First wipe the canvas (it still holds the full visual) while they cover it...
        fullV = false; rowsHit.clear(); a0.fill(0); a1.fill(0);
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
        fg.inert = false;
        document.documentElement.classList.remove("rv-open");
        // ...then, two frames later (real page painted underneath), drop the copies
        requestAnimationFrame(() => requestAnimationFrame(() => {
          top.remove(); bot.remove();
          m = "idle"; setMode("idle");
          cool = performance.now() + COOLDOWN_MS;
          onFullRef.current(false);
        }));
      }).catch(() => {});
    };
    api.current.exit = exit;
    // a dock button is hovered (gallery shows): fewer than 3 rows revealed -> they vanish at once (nothing fades or wipes)
    api.current.drop = () => {
      if (m !== "idle") return;
      rowsHit.clear(); a0.fill(0); a1.fill(0);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
    };

    const onMove = (e: PointerEvent) => {
      if (m !== "idle" || e.pointerType === "touch" || peekRef.current || cssW < MIN_WIDTH) return;
      const now = performance.now();
      if (now < cool) return;
      if (e.clientX < cssW - tileCss) return; // only the last tile column is live
      if ((e.target as Element | null)?.closest?.("a,button,nav,.dock")) return; // never steal clicks
      const r = Math.floor((e.clientY * dpr) / size);
      if (r < 1 || r > rows - 2) return; // top and bottom tiles of the column are excluded
      if (rowsHit.has(r)) return;
      rowsHit.add(r); lastHit = now;
      for (let c = 0; c < cols; c++) setTile(r * cols + c, 1, now, (cols - 1 - c) * ROW_STEP, POP_MS); // right -> left
      kick();
      if (rowsHit.size >= MIN_ROWS) goArm();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") exit(); };
    const onWheel = (e: WheelEvent) => { if (m !== "idle") e.preventDefault(); }; // the page stays put while the screen is split open

    layout();
    document.fonts?.load(`800 100px ${family0()}`).then(() => { buildVisual(); if (raf === 0 && m === "idle") draw(performance.now()); }).catch(() => {});
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("keydown", onKey);
    addEventListener("resize", layout);
    addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf); clearTimeout(armT);
      removeEventListener("wheel", onWheel);
      removeEventListener("pointermove", onMove);
      removeEventListener("keydown", onKey);
      removeEventListener("resize", layout);
    };
  }, []);

  const open = mode === "open";
  return (
    <div ref={rootRef} className={"rv" + (mode !== "idle" ? " on" : "") + (peek ? " peek" : "")} aria-hidden={!open}>
      <canvas ref={cv} />
      <div className="rv-hint" ref={hintRef} />
      <button ref={closeRef} className={"rv-close" + (open ? " show" : "")} aria-label="Close" tabIndex={open ? 0 : -1} onClick={() => api.current.exit()}>
        <svg viewBox="0 0 48 48" aria-hidden="true">
          {open && <circle key={ring} className="arc" cx="24" cy="24" r="18.5" style={{ animationDuration: `${AUTO_CLOSE_MS}ms` }} onAnimationEnd={() => api.current.exit()} />}
          <path className="x" d="M19.5 19.5l9 9M28.5 19.5l-9 9" />
        </svg>
      </button>
    </div>
  );
}
