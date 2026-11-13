import type { CSSProperties, ReactNode } from "react";

/**
 * Dock glyphs, keyed by section `number` (see data.ts). They are inline SVG on purpose: every shape carries
 * pathLength=1 and the `tp` class, which lets the CSS animate stroke-dashoffset (an After Effects "trim path" look).
 * To swap an icon, replace the shapes of that entry (keep `tp` + pathLength={1} on each shape to keep the animation).
 */
const t = (i: number): CSSProperties => ({ ["--d" as string]: i }); // per-shape animation stagger
const P = ({ d, i = 0 }: { d: string; i?: number }) => <path className="tp" pathLength={1} d={d} style={t(i)} />;

export const DOCK_ICONS: Record<string, ReactNode> = {
  "01": (<>{/* UI/UX */}<rect className="tp" pathLength={1} x="3" y="4" width="18" height="16" rx="2.5" /><P d="M3 9h18M9 9v11" i={1} /></>),
  "02": (<>{/* Graphic: pen tool */}<P d="M12 21.5l-6.2-9.3L8.6 3h6.8l2.8 9.2z" /><P d="M12 21.5v-9" i={1} /><circle className="tp" pathLength={1} cx="12" cy="11" r="1.5" style={t(2)} /></>),
  "05": (<>{/* Web development */}<P d="M8.5 7L3.5 12l5 5" /><P d="M15.5 7l5 5-5 5" i={1} /><P d="M13.5 5l-3 14" i={2} /></>),
  "03": (<>{/* Motion: ball + two trailing arcs */}<circle className="tp" pathLength={1} cx="16" cy="12" r="5" /><P d="M9.6 8a5 5 0 0 0 0 8" i={1} /><P d="M5.2 9.6a3 3 0 0 0 0 4.8" i={2} /></>),
  "04": (<>{/* Video: clapperboard */}<rect className="tp" pathLength={1} x="3" y="5" width="18" height="14" rx="2.5" /><P d="M3 9h18" i={1} /><P d="M8 5l-2 4M13 5l-2 4M18 5l-2 4" i={2} /></>),
  "06": (<>{/* 3D: cube */}<P d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><P d="M12 12l8-4.5M12 12L4 7.5M12 12v9" i={1} /></>),
  "07": (<>{/* Automation: flow */}<rect className="tp" pathLength={1} x="3" y="4" width="6" height="6" rx="1.5" /><rect className="tp" pathLength={1} x="15" y="14" width="6" height="6" rx="1.5" style={t(2)} /><P d="M9 7h3a3 3 0 0 1 3 3v4" i={1} /></>),
};

/** Optical size correction: Web Development and Motion Design glyphs are drawn smaller than the rest, so nudge them up a touch. */
export const DOCK_SCALE: Record<string, number> = { "05": 1.1, "03": 1.16 };
