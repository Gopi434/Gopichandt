import { useEffect, useState } from "react";
import { GALLERY } from "../gallery";

/**
 * Columns of square images drifting vertically, alternating direction.
 * Images come from src/gallery.ts (6 columns per section): side="left" shows columns 1-3, side="right" 4-6.
 */
export default function Gallery({ section, show, side }: { section: string; show: boolean; side: "left" | "right" }) {
  const columns = GALLERY[section] ?? [];
  const [armed, setArmed] = useState(false); // images are only fetched when needed
  useEffect(() => {
    if (show) { setArmed(true); return; }
    if (side === "right") return; // the faint half loads on first hover only
    const t = window.setTimeout(() => setArmed(true), 1600); // left half prefetches shortly after arrival
    return () => clearTimeout(t);
  }, [show, side]);

  const first = side === "left" ? 0 : 3;
  const cols = columns.slice(first, first + 3).map((urls, n) => {
    const j = first + n; // global column 0-5: even moves down, odd moves up
    let list = urls.length ? urls : [""];
    while (list.length < 5) list = [...list, ...list]; // repeat short columns so the loop fills the height
    return { j, items: [...list, ...list] }; // doubled so the -50% loop is seamless
  });

  return (
    <div className={"gal" + (side === "right" ? " ghost" : "") + (show ? " on" : "")} aria-hidden="true">
      <div className="cols">
        {cols.map(({ j, items }) => (
          <div key={j} className={"col " + (j % 2 ? "up" : "down")} style={{ animationDuration: `${30 + j * 5}s`, animationDelay: `-${j * 7}s` }}>
            {armed && items.map((src, k) => (
              src ? <img key={k} src={src} alt="" width={320} height={320} draggable={false} decoding="async" {...({ fetchpriority: "low" } as object)} /> : <span key={k} className="blank" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
