import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PROFILE, SECTIONS, SOCIALS, TICKER, TICKER_MS, ICONS } from "./data";
import Stage from "./components/Stage";
import Content from "./components/Content";
import Gallery from "./components/LazyGallery";
import Reveal from "./components/Reveal";
import { DOCK_ICONS, DOCK_SCALE } from "./components/DockIcons";
import { AUTO_MS, useStageScroll } from "./useStageScroll";

const stroke = { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
// Dock glyphs share one 24px grid + stroke so every icon in the three blocks reads at the same size and colour.
const dk = { viewBox: "0 0 24 24", width: 22, height: 22, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const HomeIcon = () => (<svg {...dk}><path d="M3 11.2 12 3.5l9 7.7" /><path d="M5.5 9.6V20a.5.5 0 0 0 .5.5h4V14.5h4v6h4a.5.5 0 0 0 .5-.5V9.6" /></svg>);
const PauseIcon = () => (<svg {...dk}><rect x="6" y="4.5" width="4" height="15" rx="1.2" /><rect x="14" y="4.5" width="4" height="15" rx="1.2" /></svg>);
const PlayIcon = () => (<svg {...dk}><path d="M7 4.6v14.8a.6.6 0 0 0 .9.5l11.8-7.4a.6.6 0 0 0 0-1L7.9 4.1a.6.6 0 0 0-.9.5z" /></svg>);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

/** Plain text that selects normally and copies to the clipboard on a plain click (not when the user is selecting). */
function CopyText({ text, className, href, icon }: { text: string; className?: string; href?: string; icon?: { src: string; size: number; gap: number; w?: number; h?: number; top?: number } }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    if (window.getSelection()?.toString()) return; // the user is selecting: leave it alone
    if (href) window.open(href, "_blank", "noopener,noreferrer"); // e.g. WhatsApp chat (opened first, so popup blockers allow it)
    const ok = () => { setDone(true); window.setTimeout(() => setDone(false), 1400); };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(ok, () => {});
    else { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch { /* ignore */ } t.remove(); }
  };
  return (
    <span className={"cp " + (className ?? "")} role="button" tabIndex={0} title="Click to copy" onClick={copy}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); copy(); } }}>
      {icon && <img className="cp-ic" src={icon.src} alt="" width={icon.w ?? icon.size} height={icon.h ?? icon.size} style={{ width: icon.w ?? icon.size, height: icon.h ?? icon.size, marginRight: icon.gap, marginTop: icon.top }} />}{text}<span className={"copied" + (done ? " on" : "")} role="status">{done ? "Copied" : ""}</span>
    </span>
  );
}

/** "6 | Years" -> number slides up and out, text slides down and out, then the next pair arrives. Every TICKER_MS. */
function Ticker() {
  const [i, setI] = useState(0);
  const [ph, setPh] = useState<"in" | "out">("in");
  useEffect(() => {
    let t2 = 0;
    const t1 = window.setInterval(() => {
      setPh("out");
      t2 = window.setTimeout(() => { setI((v) => (v + 1) % TICKER.length); setPh("in"); }, 320);
    }, TICKER_MS);
    return () => { clearInterval(t1); clearTimeout(t2); };
  }, []);
  const [num, word] = TICKER[i];
  return (
    <span className={"ticker " + ph} aria-live="off">
      <span className="tk-n">{num}</span>
      <span className="tk-w">{word}</span>
    </span>
  );
}

export default function App() {
  const total = SECTIONS.length + 1; // intro + 7 disciplines
  const [hover, setHover] = useState<number | null>(null); // dock button (1..7) being hovered -> gallery preview of that domain
  const [full, setFull] = useState(false); // cursor reveal fully open
  const [userPaused, setUserPaused] = useState(false); // play / pause button in the dock
  const { index, go, paused, epoch } = useStageScroll(total, hover !== null || full || userPaused);
  const run = index > 0; // the intro never autoplays; any section reached by click or scroll does
  const peek = hover !== null;
  const last = useRef(0); // last section shown, so the gallery element always exists (fades instead of popping in)
  if (index > 0) last.current = index - 1;
  const gal = SECTIONS[(hover !== null ? hover : last.current + 1) - 1] ?? SECTIONS[0];

  // hover intent: a short delay on enter (cursor just passing) and on leave (moving between neighbouring icons)
  const timer = useRef(0);
  const locked = useRef<number | null>(null); // after a click, that button stays quiet until the pointer leaves it
  const enter = (i: number) => {
    if (locked.current === i) return;
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHover(i), hover === null ? 50 : 0);
  };
  const leave = (i: number) => {
    if (locked.current === i) locked.current = null;
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHover(null), 80);
  };
  const pick = (i: number) => { clearTimeout(timer.current); locked.current = i; setHover(null); go(i, true); };
  const home = () => { clearTimeout(timer.current); setHover(null); go(0, true); };

  // "S key" tooltip over the play / pause button: once, 3s after the first design section becomes active (the dock needs a moment to slide in)
  const [tipAuto, setTipAuto] = useState(false);
  const [tipHover, setTipHover] = useState(false);
  const tipShown = useRef(false);
  useEffect(() => {
    if (index === 0 || tipShown.current) return;
    tipShown.current = true;
    window.setTimeout(() => setTipAuto(true), 700); // (no cleanup on purpose: it must finish even if the section changes meanwhile)
    window.setTimeout(() => setTipAuto(false), 3700);
  }, [index]);

  // S pauses / resumes every animation (same as the play / pause button)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "s" || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.repeat) return;
      if ((e.target as Element | null)?.closest?.("input,textarea,select,[contenteditable]")) return;
      setUserPaused((v) => !v);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  // arrows switch sections (right/down = next, left/up = previous). Order: intro, 1..7, intro, ...
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || full || menu) return;
      if ((e.target as Element | null)?.closest?.("input,textarea,select,[contenteditable]")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(index >= total - 1 ? 0 : index + 1, true); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(index === 0 ? total - 1 : index - 1, true); }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });
  // scrolling / swiping past the last section wraps to the intro (and past the intro wraps back to the last section)
  useEffect(() => {
    let lock = 0, y0 = 0;
    const edge = (dir: number) => {
      if (performance.now() < lock || full || menu) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (dir > 0 && index === total - 1 && scrollY >= max - 3) { lock = performance.now() + 1200; go(0, true); }
      else if (dir < 0 && index === 0 && scrollY <= 3) { lock = performance.now() + 1200; go(total - 1, true); }
    };
    const onWheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) > 4) edge(Math.sign(e.deltaY)); };
    const onStart = (e: TouchEvent) => { y0 = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => { const d = y0 - e.changedTouches[0].clientY; if (Math.abs(d) > 40) edge(Math.sign(d)); };
    addEventListener("wheel", onWheel, { passive: true });
    addEventListener("touchstart", onStart, { passive: true });
    addEventListener("touchend", onEnd, { passive: true });
    return () => { removeEventListener("wheel", onWheel); removeEventListener("touchstart", onStart); removeEventListener("touchend", onEnd); };
  });
  // first-load hint: the four arrow keys press one after another, then disappear
  const [hint, setHint] = useState(true);
  useEffect(() => { const t = setTimeout(() => setHint(false), 6400); return () => clearTimeout(t); }, []);
  const [menu, setMenu] = useState(false); // mobile hamburger menu
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const close = (e: Event) => { if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) setMenu(false); };
    addEventListener("keydown", close); addEventListener("pointerdown", close);
    return () => { removeEventListener("keydown", close); removeEventListener("pointerdown", close); };
  }, [menu]);

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      {/* .fg = everything the cursor reveal splits into two halves (see Reveal.tsx) */}
      <div className="fg">
      <nav aria-label="Primary" className={peek ? "away" : undefined}>
        <div className="brand">
          <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go(0); }} aria-label={`${PROFILE.name}, back to start`}>
            <img src={PROFILE.logo} alt={PROFILE.name} height={32} />
          </a>
          <i className="sep" aria-hidden="true" />
          <Ticker />
        </div>
        <div className="contact">
          <CopyText className="txt" text={PROFILE.email} icon={ICONS.email} />
          <i className="sep" aria-hidden="true" />
          <CopyText className="txt" text={PROFILE.phone} href={PROFILE.whatsapp} icon={ICONS.whatsapp} />
          {SOCIALS.map((s) => (
            <span className="soc-wrap" key={s.label}>
              <i className="sep" aria-hidden="true" />
              <a className="soc" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} title={s.label}>
                <img src={s.icon.src} alt="" width={s.icon.size} height={s.icon.size} style={{ width: s.icon.size, height: s.icon.size }} />
              </a>
            </span>
          ))}
        </div>
        <div className={"menu-wrap" + (menu ? " open" : "")} ref={menuRef}>
          <button className="menu-btn" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="contact-menu" onClick={() => setMenu((v) => !v)}>
            <span className="bars" aria-hidden="true"><i /><i /><i /></span>
          </button>
          <div className="menu" id="contact-menu">
            <CopyText className="mi" text={PROFILE.email} icon={ICONS.email} />
            <CopyText className="mi" text={PROFILE.phone} href={PROFILE.whatsapp} icon={ICONS.whatsapp} />
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" onClick={() => setMenu(false)}><img src={s.icon.src} alt="" width={s.icon.size} height={s.icon.size} style={{ width: s.icon.size, height: s.icon.size }} />{s.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <main id="content">
        {/* Scroll runway: each 100vh block is one stage; snap points make one scroll step = one discipline. */}
        <div className="track" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => <div className="snap" key={i} />)}
        </div>

        <section className={"stage" + (userPaused ? " paused" : "") + (peek ? " peek" : "")} aria-label="Portfolio">
          <Gallery section={gal.number} show={peek} prefetch={index > 0} />
          <Stage index={index} paused={userPaused} />
          <div className="right">
            <Content index={index} />
          </div>
        </section>
      </main>

      {/* Figma-style dock: three separate blocks: home | 7 disciplines (icon + label, progress inside the active one) | play / pause */}
      {hint && index === 0 && (
        <div className="kh" aria-hidden="true">
          <kbd className="u" style={{ "--n": 0 } as React.CSSProperties}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></kbd>
          <kbd className="d" style={{ "--n": 1 } as React.CSSProperties}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg></kbd>
          <kbd className="l" style={{ "--n": 3 } as React.CSSProperties}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></kbd>
          <kbd className="rr" style={{ "--n": 2 } as React.CSSProperties}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></kbd>
        </div>
      )}
      <div className={"dock" + (index === 0 ? " intro" : "") + (userPaused ? " held" : "")} role="toolbar" aria-label="Sections and playback">
        <div className="dk-home" aria-hidden={index === 0} {...(index === 0 ? ({ inert: "" } as object) : {})}>
          <div className="dk-block">
            <button className="dk-btn sq" aria-label="Home" onClick={home}><HomeIcon /></button>
          </div>
        </div>
        <div className="dk-block dk-mid" role="group" aria-label="Design domains">
          {SECTIONS.map((sec, i) => {
            const on = index === i + 1;
            return (
              <button key={sec.number} className={"dk-btn" + (on ? " on" : "")} aria-label={sec.title} aria-current={on}
                onClick={() => pick(i + 1)} onMouseEnter={() => enter(i + 1)} onMouseLeave={() => leave(i + 1)}>
                {on && run && (
                  <span className="dk-prog" aria-hidden="true">
                    <i key={`${index}-${epoch}`} className="fill" style={{ animationDuration: `${AUTO_MS}ms`, animationPlayState: paused ? "paused" : "running" }} />
                  </span>
                )}
                <span className="dk-ic" style={{ "--s": DOCK_SCALE[sec.number] ?? 1 } as CSSProperties}><svg viewBox="0 0 24 24" aria-hidden="true">{DOCK_ICONS[sec.number]}</svg></span>
                <span className="lblw"><span className="lbl">{sec.title}</span></span>
              </button>
            );
          })}
        </div>
        <div className="dk-slot" onMouseEnter={() => setTipHover(true)} onMouseLeave={() => setTipHover(false)}>
          <div className="dk-play" aria-hidden={index === 0} {...(index === 0 ? ({ inert: "" } as object) : {})}>
            <div className="dk-block">
              <button className="dk-btn sq" aria-label={userPaused ? "Resume all motion" : "Pause all motion"} aria-pressed={userPaused} onClick={() => setUserPaused((v) => !v)}>
                {userPaused ? <PlayIcon /> : <PauseIcon />}
              </button>
            </div>
          </div>
          {/* tooltip: shown for 3s the first time a design section is active, and whenever the button is hovered */}
          <div className={"keytip" + ((tipAuto || tipHover) && index > 0 ? " on" : "")} aria-hidden="true"><kbd>S</kbd><span>Key to Pause/Play Animations</span></div>
        </div>
      </div>
      </div>

      <Reveal peek={peek} onFull={setFull} />

    </>
  );
}
