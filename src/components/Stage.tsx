import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FRAMES } from "./frames";
import { PROFILE, PLACEHOLDER } from "../data";

export default function Stage({ index, paused = false }: { index: number; paused?: boolean }) {
  const slot = FRAMES[index].slot;
  const pct = (n: number) => `${(n / 6).toFixed(3)}%`;
  const radius = slot.r === "50%" ? "50%" : `${((slot.r / slot.w) * 100).toFixed(2)}% / ${((slot.r / slot.h) * 100).toFixed(2)}%`;
  // the section we just left keeps its loop on screen while it fades out (so nothing is cut off mid-motion)
  const [st, setSt] = useState<{ cur: number; prev: number | null }>({ cur: index, prev: null });
  if (st.cur !== index) setSt({ cur: index, prev: st.cur });
  useEffect(() => {
    if (st.prev === null) return;
    const t = window.setTimeout(() => setSt((v) => (v.prev === st.prev ? { ...v, prev: null } : v)), 700);
    return () => clearTimeout(t);
  }, [st.prev, st.cur]);
  const [ready, setReady] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // 3D section: the photo skews into the cube face and back (looping). It is driven from here (not by a CSS class) so that when
  // the section changes, the photo continues from its CURRENT skewed state and eases into the next frame's shape: no sudden flattening.
  const photo = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);
  useLayoutEffect(() => {
    const el = photo.current;
    if (!el) return;
    if (index === 6 && !anim.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Same timeline as the cube outline (k-sq in styles.css): 0.5s delay, 7s loop, same easing per segment
      const k = (t: number, o: number, easing?: string) => ({ transform: `skewY(${t}deg)`, offset: o, ...(easing ? { easing } : {}) });
      const a = el.animate(
        [k(0, 0), k(0, 0.13, "cubic-bezier(.5,0,.2,1)"), k(30, 0.23), k(30, 0.86, "cubic-bezier(.6,0,.3,1)"), k(0, 0.95), k(0, 1)],
        { duration: 7000, delay: 500, fill: "backwards", iterations: Infinity },
      );
      anim.current = a;
      if (pausedRef.current) a.pause();
      else { // start on exactly the same frame as the outline's animation, so photo and outline can never drift apart
        const sq = el.parentElement?.querySelector(".sq3")?.getAnimations()[0];
        sq?.ready.then(() => { if (anim.current === a && sq.startTime != null) a.startTime = sq.startTime; }).catch(() => {});
      }
    } else if (index !== 6 && anim.current) {
      const a = anim.current; anim.current = null;
      const now = getComputedStyle(el).transform; // still the animated value here
      a.cancel();
      // pin only the skew exactly where it is (position / size keep transitioning, so the photo travels to the new frame without a jump)...
      el.style.transitionProperty = "left, top, width, height, border-radius"; el.style.transform = now; void el.offsetWidth;
      el.style.transitionProperty = ""; el.style.transform = slot.transform ?? "none"; // ...then the normal transition carries the skew away
    }
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => { const a = anim.current; if (a) { if (paused) a.pause(); else a.play(); } }, [paused]);
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth) setReady(true); }, []);
  return (
    <div className="left" role="img" aria-label={`Portrait of ${PROFILE.name} shown inside: ${FRAMES[index].label}`}>
      <div className="box">
        {FRAMES.map((f, i) => (
          <svg key={i} className={"frame" + (i === index ? " on" : "")} viewBox="0 0 600 600" aria-hidden="true">{f.draw}</svg>
        ))}
        {/* The plate shows instantly; the photo fades in when it has loaded, so nothing waits on the image. */}
        <div
          ref={photo}
          className="photo"
          style={{ left: pct(slot.x), top: pct(slot.y), width: pct(slot.w), height: pct(slot.h), borderRadius: radius, transform: slot.transform ?? "none", transformOrigin: "0 0" }}
        >
          <img
            ref={img}
            className={ready ? "ready" : undefined}
            src={PROFILE.portrait || PLACEHOLDER}
            alt=""
            decoding="async"
            {...({ fetchpriority: "high" } as object)}
            onLoad={() => setReady(true)}
            onError={(e) => { if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER; setReady(true); }}
          />
        </div>
        {FRAMES.map((f, i) => (
          <svg key={i} className={"ov" + (i === index ? " on" : "")} viewBox="0 0 600 600" aria-hidden="true">{(i === index || i === st.prev) && f.loop}</svg>
        ))}
      </div>
    </div>
  );
}
