import { PROFILE, SECTIONS } from "../data";

const ExternalIcon = () => (
  <svg className="ext" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Group = ({ title, items }: { title: string; items: string[] }) => (
  <div className="group">
    <h3>{title}</h3>
    <ul>{items.slice(0, 4).map((k) => <li key={k}>{k}</li>)}</ul>
  </div>
);

export default function Content({ index, onPeek }: { index: number; onPeek: (v: boolean) => void }) {
  const cls = (k: number) => "slide" + (k === index ? " on" : "");
  const hidden = (k: number) => (k === index ? {} : ({ inert: "" } as object));
  return (
    <div className="slides" aria-live="polite">
      <article className={cls(0)} aria-label="Introduction" {...hidden(0)}>
        <h2 className="hero"><span className="hi">{PROFILE.intro.greeting}</span>{PROFILE.intro.name}<small>{PROFILE.intro.role}</small></h2>
        <p className="desc">{PROFILE.intro.text}</p>
        <a className="btn" href={PROFILE.portfolioUrl} target="_blank" rel="noopener noreferrer">
          <span>View Portfolio</span><ExternalIcon /><span className="sr">(opens in a new tab)</span>
        </a>
      </article>
      {SECTIONS.map((s, i) => (
        <article key={s.number} className={cls(i + 1)} aria-label={s.title} {...hidden(i + 1)}>
          <h2 className={s.title.length <= 15 ? "nw" : undefined}>{s.title}</h2>
          <p className="desc">{s.description}</p>
          <Group title="Skills" items={s.keywords} />
          <Group title="Tools" items={s.tools} />
          <a className="btn" href={s.url} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => onPeek(true)} onMouseLeave={() => onPeek(false)} onFocus={() => onPeek(true)} onBlur={() => onPeek(false)}>
            <span>View Works</span><ExternalIcon /><span className="sr">(opens in a new tab)</span>
            <span className="hint" aria-hidden="true">Click to view</span>
          </a>
        </article>
      ))}
    </div>
  );
}
