import { PROFILE, SECTIONS, type Tool } from "../data";

const ExternalIcon = () => (
  <svg className="ext" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
const StarIcon = () => (
  <svg className="star" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l2.4 5.2 5.6.7-4.1 3.9 1.1 5.6L12 15.6 7 18.4l1.1-5.6L4 8.9l5.6-.7z" />
  </svg>
);

/** Chips: one array entry = one chip. Skills are plain strings (star + label); tools are {name, icon} (icon + name). */
const Skills = ({ items }: { items: string[] }) => (
  <ul className="chips" aria-label="Skills">
    {items.map((k) => <li key={k}><StarIcon /><span>{k}</span></li>)}
  </ul>
);
const Tools = ({ items }: { items: Tool[] }) => (
  <ul className="chips" aria-label="Tools">
    {items.map((t) => <li key={t.name}><img src={t.icon} alt="" width={20} height={20} draggable={false} /><span>{t.name}</span></li>)}
  </ul>
);

export default function Content({ index }: { index: number }) {
  const cls = (k: number) => "slide" + (k === index ? " on" : "");
  const hidden = (k: number) => (k === index ? {} : ({ inert: "" } as object));
  return (
    <div className="slides" aria-live="polite">
      <article className={cls(0)} aria-label="Introduction" {...hidden(0)}>
        <h2 className="hero">{PROFILE.intro.role}</h2>
        <p className="desc intro">{PROFILE.intro.text}</p>
        <a className="btn" href={PROFILE.portfolioUrl} target="_blank" rel="noopener noreferrer">
          <span>Portfolio</span><ExternalIcon /><span className="sr">(opens in a new tab)</span>
        </a>
      </article>
      {SECTIONS.map((s, i) => (
        <article key={s.number} className={cls(i + 1)} aria-label={s.title} {...hidden(i + 1)}>
          <h2 className="tag"><span aria-hidden="true">#{i + 1} </span>{s.title}</h2>
          <p className="desc">{s.description}</p>
          <div className="lists">
            <Skills items={s.keywords} />
            <Tools items={s.tools} />
          </div>
          <a className="btn" href={s.url} target="_blank" rel="noopener noreferrer">
            <span>View Works</span><ExternalIcon /><span className="sr">(opens in a new tab)</span>
          </a>
        </article>
      ))}
    </div>
  );
}
