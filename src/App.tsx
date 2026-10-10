import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PROFILE, SECTIONS } from "./data";
import Stage from "./components/Stage";
import Content from "./components/Content";
import Gallery from "./components/LazyGallery";
import { AUTO_MS, useStageScroll } from "./useStageScroll";

const stroke = { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const MailIcon = () => (<svg {...stroke}><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="m22 6-10 7L2 6" /></svg>);
const CallIcon = () => (<svg {...stroke}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
const PauseIcon = () => (<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>);
const PlayIcon = () => (<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export default function App() {
  const total = SECTIONS.length + 1; // intro + 7 disciplines
  const [peek, setPeek] = useState(false); // "View Works" hovered
  const [userPaused, setUserPaused] = useState(false); // "Pause Animations" button
  const { index, go, paused, epoch } = useStageScroll(total, peek || userPaused);
  useEffect(() => setPeek(false), [index]);
  const [menu, setMenu] = useState(false); // mobile hamburger menu
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const close = (e: Event) => { if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) setMenu(false); };
    addEventListener("keydown", close); addEventListener("pointerdown", close);
    return () => { removeEventListener("keydown", close); removeEventListener("pointerdown", close); };
  }, [menu]);
  const tel = `tel:${PROFILE.phone.replace(/\s/g, "")}`;
  const labels = ["Intro", ...SECTIONS.map((s) => s.title)];

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <nav aria-label="Primary" className={peek ? "dim" : undefined}>
        <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go(0); }} aria-label={`${PROFILE.name}, back to start`}>
          <img src={PROFILE.logo} alt={PROFILE.name} height={32} />
        </a>
        <div className="contact">
          <a className="txt" href={`mailto:${PROFILE.email}`}><MailIcon /><span>{PROFILE.email}</span></a>
          <a className="txt" href={tel}><CallIcon /><span>{PROFILE.phone}</span></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" title="LinkedIn"><LinkedIn /></a>
        </div>
        <div className={"menu-wrap" + (menu ? " open" : "")} ref={menuRef}>
          <button className="menu-btn" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="contact-menu" onClick={() => setMenu((v) => !v)}>
            <span className="bars" aria-hidden="true"><i /><i /><i /></span>
          </button>
          <div className="menu" id="contact-menu">
            <a href={`mailto:${PROFILE.email}`} onClick={() => setMenu(false)}><MailIcon />{PROFILE.email}</a>
            <a href={tel} onClick={() => setMenu(false)}><CallIcon />{PROFILE.phone}</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setMenu(false)}><LinkedIn />LinkedIn</a>
          </div>
        </div>
      </nav>

      <main id="content">
        {/* Scroll runway: each 100vh block is one stage; snap points make one scroll step = one discipline. */}
        <div className="track" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => <div className="snap" key={i} />)}
        </div>

        <section className={"stage" + (userPaused ? " paused" : "")} aria-label="Portfolio">
          <Stage index={index} peek={peek} />
          <div className="right">
            {index > 0 && <Gallery key={index} side="right" section={SECTIONS[index - 1].number} show={peek} />}
            <Content index={index} onPeek={setPeek} />
          </div>

          {/* 8 segmented progress lines on the seam between the two halves */}
          <div className="prog" role="group" aria-label="Sections">
            {labels.map((l, i) => (
              <button key={l} aria-label={l} aria-current={i === index} onClick={() => go(i)}>
                <span className="t">
                  {i === index && <i key={`${index}-${epoch}`} className="fill" style={{ animationDuration: `${AUTO_MS}ms`, animationPlayState: paused ? "paused" : "running" }} />}
                </span>
                <span className="tip" style={{ "--i": i } as CSSProperties}>{l}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <button className="pausebtn" aria-pressed={userPaused} onClick={() => setUserPaused((v) => !v)}>
        {userPaused ? <PlayIcon /> : <PauseIcon />}
        <span>{userPaused ? "Resume Animations" : "Pause Animations"}</span>
      </button>
    </>
  );
}
