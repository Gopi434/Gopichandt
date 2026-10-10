import { useCallback, useEffect, useRef, useState } from "react";

export const AUTO_MS = 4800; // how long each stage's bar takes to fill, then we move on

/**
 * Scroll position drives the stage. Auto-play is a single countdown per stage:
 * - it starts when the stage changes (by scroll, click or auto) and is never restarted by anything else,
 * - hover / hidden tab only freeze it (the bar freezes too), they never replay it,
 * - when it ends we scroll to the next stage (last stage loops to the first),
 * - only an explicit click on the *current* bar restarts it.
 */
export function useStageScroll(count: number, hold = false) {
  const last = count - 1;
  const [index, setIndex] = useState(0);
  const [epoch, setEpoch] = useState(0); // bumped only by an explicit click on the active bar
  const [hidden, setHidden] = useState(document.hidden);
  const reduce = useRef(matchMedia("(prefers-reduced-motion: reduce)").matches).current;
  const idx = useRef(0);

  const scrollToStage = useCallback((i: number, instant: boolean) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollTo({ top: (i / last) * max, behavior: reduce || instant ? "auto" : "smooth" });
  }, [last, reduce]);

  const go = useCallback((i: number, instant = false) => {
    if (i === idx.current && !instant) setEpoch((e) => e + 1); // explicit click on the active bar = replay
    scrollToStage(i, instant);
  }, [scrollToStage]);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight || 1;
      const i = Math.round(Math.min(1, Math.max(0, scrollY / max)) * last);
      idx.current = i;
      setIndex(i);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [last]);

  useEffect(() => {
    const f = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", f);
    return () => document.removeEventListener("visibilitychange", f);
  }, []);

  const paused = reduce || hold || hidden;
  const clock = useRef({ left: AUTO_MS, since: 0, timer: 0, guard: 0, key: "" });
  useEffect(() => {
    const c = clock.current;
    const key = `${index}-${epoch}`;
    if (c.key !== key) { c.key = key; c.left = AUTO_MS; clearTimeout(c.guard); } // new stage = fresh countdown
    if (paused) return;
    c.since = performance.now();
    c.timer = window.setTimeout(() => {
      const from = idx.current;
      const next = from >= last ? 0 : from + 1;
      scrollToStage(next, from >= last);
      // safety net: if scroll-snapping pulled us back, push through so a stage never repeats
      c.guard = window.setTimeout(() => { if (idx.current === from) scrollToStage(next, true); }, 1600);
    }, c.left);
    return () => { clearTimeout(c.timer); c.left = Math.max(0, c.left - (performance.now() - c.since)); };
  }, [index, epoch, paused, last, scrollToStage]);

  return { index, go, paused, epoch };
}
