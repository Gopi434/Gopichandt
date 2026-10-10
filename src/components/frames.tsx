import type { ReactNode } from "react";

export interface Slot {
  x: number; y: number; w: number; h: number; // in 600x600 units
  r: number | "50%";
  transform?: string;
}
/** draw = outline that "forms" once; loop = overlay that keeps animating while the stage is active */
export interface FrameDef { slot: Slot; draw: ReactNode; loop: ReactNode; label: string }

const p = { pathLength: 1 } as const;
const BARS = [30, 52, 38, 64, 46];
const GRAPH: [number, number][] = [[316, 340], [343, 320], [370, 332], [397, 300], [424, 310], [451, 282], [478, 292]];
const GPATH = "M" + GRAPH.map(([x, y]) => `${x} ${y}`).join("L");
const CLIPS: [number, number][] = [[110, 122], [238, 122], [366, 124]]; // [x, width] on the video track
const TICKS = Array.from({ length: 21 }, (_, i) => `M${110 + i * 19} 365v7`).join("");
const WAVE = Array.from({ length: 21 }, (_, i) => 8 + ((i * 7) % 5) * 6);
const HEART = "M0 8c-9-6-13-10-13-15a6.5 6.5 0 0 1 13-2 6.5 6.5 0 0 1 13 2c0 5-4 9-13 15z";
const ORBIT = "M60 340a240 70 0 1 0 480 0a240 70 0 1 0-480 0";
const HANDLES: [number, number][] = [[160, 250], [300, 169], [440, 250], [440, 400], [300, 481], [160, 400], [300, 331]];
const LINES: [number, number, number][] = [[0, 30, 70], [1, 40, 90], [1, 24, 100], [2, 34, 60], [2, 28, 84], [1, 50, 40], [2, 30, 96], [1, 36, 70], [0, 22, 0], [0, 44, 50]];
const PATHS = ["M130 300H215", "M385 300H470", "M300 215V130", "M300 385V470"];

export const FRAMES: FrameDef[] = [
  { // 0 Intro: circle mask with fading rings
    label: "Circle portrait",
    slot: { x: 120, y: 120, w: 360, h: 360, r: "50%" },
    draw: <><circle {...p} cx="300" cy="300" r="196" /><circle {...p} cx="300" cy="300" r="214" opacity=".35" /></>,
    loop: <>
      <circle className="ring" cx="300" cy="300" r="196" />
      <circle className="ring d2" cx="300" cy="300" r="196" />
      <circle className="ring d3" cx="300" cy="300" r="196" />
    </>,
  },
  { // 1 UI/UX: SaaS dashboard on a laptop, drawn in outline mode; the photo is the profile card
    label: "Dashboard on a laptop",
    slot: { x: 162, y: 190, w: 72, h: 72, r: 10 },
    draw: <>
      <rect {...p} x="100" y="138" width="400" height="250" rx="12" />
      <path {...p} d="M60 388h480l-24 28H84z" /><path {...p} d="M262 388h76" opacity=".5" />
      <path {...p} d="M148 150V376M148 176H488" opacity=".6" />
      <circle {...p} cx="130" cy="164" r="7" />
      <path {...p} d="M125 190h10v10h-10zM125 214h10v10h-10zM125 238h10v10h-10z" />
      <rect {...p} x="162" y="158" width="96" height="12" rx="6" /><circle {...p} cx="470" cy="164" r="7" />
      <rect {...p} x="162" y="190" width="72" height="72" rx="10" />
      <path {...p} d="M246 204h64M246 220h44M246 236h56" />
      <path {...p} d="M426 241A30 30 0 1 1 400 196" />
      <path {...p} d="M446 208h30M446 224h22M446 240h28" opacity=".7" />
      <path {...p} d="M162 360H300M316 360H480" opacity=".6" /></>,
    loop: <>
      <g className="wedge"><path d="M400 226V196A30 30 0 0 1 426 241z" /></g>
      {BARS.map((h, i) => <rect key={i} className="bar" vectorEffect="non-scaling-stroke" x={166 + i * 26} y={360 - h} width="16" height={h} rx="3" style={{ animationDelay: `${i * 0.1}s` }} />)}
      <path className="gline" pathLength={1} d={GPATH} />
      {GRAPH.map(([x, y], i) => <circle key={i} className="blip" cx={x} cy={y} r="3.5" fill="#fff" stroke="none" style={{ animationDelay: `${i * 0.2}s` }} />)}
      <g className="cursor"><path d="M0 0v22l6-5 4 9 4-2-4-9h8z" fill="#fff" stroke="#111" strokeWidth="1.5" /></g>
    </>,
  },
  { // 2 Graphic: Instagram post (shorter phone)
    label: "Instagram post",
    slot: { x: 206, y: 166, w: 188, h: 188, r: 0 },
    draw: <>
      <rect {...p} x="186" y="90" width="228" height="380" rx="32" /><path {...p} d="M262 106h76" opacity=".5" />
      <circle {...p} cx="214" cy="136" r="14" /><path {...p} d="M238 130h70M238 142h44" />
      <g transform="translate(216 376)"><path {...p} d={HEART} /></g>
      <circle {...p} cx="252" cy="376" r="8" /><path {...p} d="M278 384l16-8-16-8v6l10 2-10 2z" />
      <path {...p} d="M206 404h150M206 422h110M206 440h130" opacity=".5" /></>,
    loop: <>
      <g transform="translate(216 376)"><path className="pop" d={HEART} fill="#fff" stroke="none" /></g>
      <g transform="translate(216 360)"><path className="rise" d={HEART} fill="#fff" stroke="none" /></g>
      <g transform="translate(216 360)"><path className="rise r2" d={HEART} fill="#fff" stroke="none" /></g>
    </>,
  },
  { // 3 Motion: preview window + timeline
    label: "Motion timeline",
    slot: { x: 150, y: 120, w: 300, h: 190, r: 8 },
    draw: <>
      <rect {...p} x="150" y="120" width="300" height="190" rx="8" />
      <path {...p} d="M80 380h440" opacity=".5" />
      <rect {...p} x="150" y="418" width="130" height="24" rx="6" /><rect {...p} x="230" y="464" width="200" height="24" rx="6" /></>,
    loop: <>
      {[128, 308, 428].map((x, i) => (
        <path key={x} className="dia" d={`M${x - 8} 380l8-8 8 8-8 8z`} fill="#fff" style={{ animationDelay: `${((x - 80) / 440) * 3 + 0.03 * i}s` }} />
      ))}
      <g className="head"><path d="M80 336V510" /><path d="M70 336h20l-10 12z" fill="#fff" /></g>
    </>,
  },
  { // 4 Video editing: preview monitor + timeline where clips join together
    label: "Video editing timeline",
    slot: { x: 110, y: 100, w: 380, h: 214, r: 8 },
    draw: <>
      <rect {...p} x="110" y="100" width="380" height="214" rx="8" />
      <path {...p} d="M110 372H490" opacity=".5" /><path {...p} d={TICKS} opacity=".5" /></>,
    loop: <>
      <path className="vplay" d="M293 324l14 10-14 10z" fill="#fff" />
      <g className="vpause"><rect x="294" y="324" width="4.5" height="20" rx="1" fill="#fff" stroke="none" /><rect x="303" y="324" width="4.5" height="20" rx="1" fill="#fff" stroke="none" /></g>
      {CLIPS.map(([x, w], i) => (
        <g key={x} className="clip" style={{ ["--dx" as string]: `${80 + i * 60}px`, animationDelay: `${0.35 + i * 0.22}s` }}>
          <rect x={x} y="384" width={w} height="40" rx="6" /><path d={`M${x + 12} 404h${w - 24}`} opacity=".45" />
        </g>
      ))}
      {WAVE.map((h, i) => <path key={i} className="wave" d={`M${116 + i * 18} ${450 - h / 2}v${h}`} style={{ animationDelay: `${i * 0.05}s` }} />)}
      <g className="phead"><path d="M110 372V476" /><path d="M102 360h16l-8 11z" fill="#fff" /></g>
    </>,
  },
  { // 5 Web dev: browser + syntax-coloured code
    label: "Browser window",
    slot: { x: 84, y: 176, w: 220, h: 290, r: 8 },
    draw: <>
      <rect {...p} x="70" y="104" width="460" height="380" rx="14" /><path {...p} d="M70 152h460" />
      <circle {...p} cx="96" cy="128" r="6" /><circle {...p} cx="118" cy="128" r="6" /><circle {...p} cx="140" cy="128" r="6" />
      <rect {...p} x="180" y="116" width="300" height="24" rx="12" opacity=".5" /></>,
    loop: <>
      <path className="load" d="M192 128H468" strokeWidth="3" />
      {LINES.map(([ind, w1, w2], i) => {
        const x = 326 + ind * 14, y = 192 + i * 26;
        return (
          <g key={i} className="type" style={{ animationDelay: `${i * 0.3}s` }}>
            <path d={`M${x} ${y}h${w1}`} stroke="#fff" opacity=".45" strokeWidth="3" />
            {w2 > 0 && <path d={`M${x + w1 + 8} ${y}h${w2}`} strokeWidth="3" />}
          </g>
        );
      })}
      <g className="done"><circle cx="500" cy="456" r="16" /><path d="M492 456l6 6 12-12" /></g>
    </>,
  },
  { // 6 3D: isometric cube, photo on left face
    label: "3D cube",
    slot: { x: 160, y: 250, w: 140, h: 150, r: 0, transform: "skewY(30deg)" },
    draw: <g className="cube">
      <path {...p} d="M160 250L300 169L440 250L300 331Z" /><path {...p} d="M160 250V400L300 481V331" /><path {...p} d="M440 250V400L300 481" /></g>,
    loop: <>
      <ellipse className="shadow" cx="300" cy="530" rx="150" ry="14" opacity=".35" />
      <path d={ORBIT} opacity=".22" />
      <circle className="sat" r="7" fill="#fff" stroke="none" style={{ offsetPath: `path('${ORBIT}')` }} />
      <g className="cube">
        {HANDLES.map(([x, y], i) => <rect key={i} className="hdl" x={x - 4} y={y - 4} width="8" height="8" fill="#fff" stroke="none" style={{ animationDelay: `${i * 0.16}s` }} />)}
      </g>
    </>,
  },
  { // 7 Automation: 3 nodes in a row + one above and below the centre
    label: "Automation flow",
    slot: { x: 216, y: 216, w: 168, h: 168, r: 33 },
    draw: <>
      <rect {...p} x="30" y="250" width="100" height="100" rx="20" /><rect {...p} x="470" y="250" width="100" height="100" rx="20" />
      <rect {...p} x="215" y="215" width="170" height="170" rx="34" />
      <path {...p} d="M130 300h85M385 300h85M300 215V130M300 385v85" opacity=".5" />
      <circle {...p} cx="300" cy="106" r="24" /><circle {...p} cx="300" cy="494" r="24" /></>,
    loop: <>
      {[[80, 300], [520, 300], [300, 106], [300, 494]].map(([x, y], i) => <circle key={i} className="blip" cx={x} cy={y} r="6" fill="#fff" stroke="none" style={{ animationDelay: `${i * 0.3}s` }} />)}
      {PATHS.map((d, i) => (
        <circle key={d} className="pkt" r="5" fill="#fff" stroke="none" style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.35}s` }} />
      ))}
    </>,
  },
];
