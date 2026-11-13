import { useEffect, useState } from "react";
import { GALLERY } from "../gallery";

/**
 * Hover gallery. Three columns of big square images drifting vertically (alternating direction).
 * Images come from src/gallery.ts: its 3 lists are the 3 columns.
 *
 * SPEED: every section has its own layer. A layer is mounted once (its images are fetched then) and stays mounted, so hovering
 * between buttons only swaps which layer is visible: no image is re-requested, re-assigned or re-created.
 * The hovered / current section is mounted first; the other sections are mounted one by one while the browser is idle.
 * Adding more sections or images needs no change here.
 */
const KEYS = Object.keys(GALLERY);
const PER_HALF = 8; // enough tiles per half to cover a tall, narrow phone screen

const idle = (fn: () => void) => {
  const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(fn, { timeout: 1500 }); else window.setTimeout(fn, 250);
};

export default function Gallery({ section, show, prefetch }: { section: string; show: boolean; prefetch: boolean }) {
  const [ready, setReady] = useState<string[]>([]); // sections whose layer is mounted
  const add = (k: string) => setReady((r) => (r.includes(k) || !GALLERY[k] ? r : [...r, k]));

  // the section being shown (hover) or about to be shown is mounted right away
  useEffect(() => {
    if (show) { add(section); return; }
    if (!prefetch) return; // intro: nothing is fetched until a dock button is hovered
    const t = window.setTimeout(() => add(section), 600);
    return () => clearTimeout(t);
  }, [show, prefetch, section]);

  // then the remaining sections, one per idle slot, so later hovers are instant
  useEffect(() => {
    if (!prefetch && !show) return;
    if (ready.length === 0 || ready.length >= KEYS.length) return;
    let off = false;
    const next = KEYS.find((k) => !ready.includes(k));
    if (next) idle(() => { if (!off) add(next); });
    return () => { off = true; };
  }, [ready, prefetch, show]);

  return (
    <div className={"gal" + (show ? " on" : "")} aria-hidden="true">
      {ready.map((key) => (
        <div key={key} className={"gl" + (key === section ? " cur" : "")}>
          <div className="cols">
            {[0, 1, 2].map((j) => {
              let list = (GALLERY[key][j] ?? []).filter(Boolean);
              if (!list.length) list = [""];
              while (list.length < PER_HALF) list = [...list, ...list]; // only if a column is too short to cover a tall phone screen
              const items = [...list, ...list]; // doubled so the -50% loop is seamless
              return (
                <div key={j} className={"col " + (j % 2 ? "up" : "down")} style={{ animationDuration: `${50 + j * 6}s`, animationDelay: `-${j * 9}s` }}>
                  {items.map((src, k) => src
                    ? <img key={k} src={src} alt="" width={640} height={640} draggable={false} decoding="async" />
                    : <span key={k} className="blank" />)}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
