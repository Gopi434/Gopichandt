import { useEffect, useRef, useState, type PointerEvent } from "react";
import { FRAMES } from "./frames";
import Gallery from "./LazyGallery";
import { PROFILE, PLACEHOLDER, SECTIONS } from "../data";

export default function Stage({ index, peek }: { index: number; peek: boolean }) {
  const slot = FRAMES[index].slot;
  const pct = (n: number) => `${(n / 6).toFixed(3)}%`;
  const radius = slot.r === "50%" ? "50%" : `${((slot.r / slot.w) * 100).toFixed(2)}% / ${((slot.r / slot.h) * 100).toFixed(2)}%`;
  const [ready, setReady] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !grid.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    grid.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    grid.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    grid.current.classList.add("hot");
  };
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth) setReady(true); }, []);
  return (
    <div className="left" onPointerMove={move} onPointerLeave={() => grid.current?.classList.remove("hot")} role="img" aria-label={`Portrait of ${PROFILE.name} shown inside: ${FRAMES[index].label}`}>
      <div className="grid" ref={grid} aria-hidden="true" />
      <div className="box">
        {FRAMES.map((f, i) => (
          <svg key={i} className={"frame" + (i === index ? " on" : "")} viewBox="0 0 600 600" aria-hidden="true">{f.draw}</svg>
        ))}
        {/* The plate shows instantly; the photo fades in when it has loaded, so nothing waits on the image. */}
        <div
          className={"photo" + (index === 6 ? " bob" : "")}
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
          <svg key={i} className={"ov" + (i === index ? " on" : "")} viewBox="0 0 600 600" aria-hidden="true">{i === index && f.loop}</svg>
        ))}
      </div>
      {index > 0 && <Gallery key={index} side="left" section={SECTIONS[index - 1].number} show={peek} />}
    </div>
  );
}
