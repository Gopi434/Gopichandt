export interface Tool { name: string; icon: string }
export interface Section {
  number: string; // also the key of this section's gallery in gallery.ts
  title: string;
  description: string;
  keywords: string[]; // Skills: one string = one star chip
  tools: Tool[]; // Tools: one entry = one icon + name chip
  url: string; // Behance link
}

/**
 * Tool registry. To add a tool: drop its (white) SVG into /public/tools, add ONE line here,
 * then reference it from any section's `tools` list below. Sections only hold references.
 */
const tool = (name: string, file: string): Tool => ({ name, icon: `tools/${file}.svg` });
export const TOOLS = {
  figma: tool("Figma", "figma"),
  xd: tool("Adobe XD", "adobe-xd"),
  photoshop: tool("Adobe Photoshop", "photoshop"),
  illustrator: tool("Adobe Illustrator", "illustrator"),
  indesign: tool("Adobe InDesign", "indesign"),
  corel: tool("CorelDraw", "coreldraw"),
  afterEffects: tool("Adobe After Effects", "after-effects"),
  premiere: tool("Adobe Premiere Pro", "premiere-pro"),
  maya: tool("Autodesk Maya", "maya"),
  react: tool("React", "react"),
  html: tool("HTML", "html"),
  css: tool("CSS", "css"),
  javascript: tool("JavaScript", "javascript"),
  jquery: tool("jQuery", "jquery"),
  framer: tool("Framer", "framer"),
  n8n: tool("n8n", "n8n"),
  supabase: tool("Supabase", "supabase"),
};

export const PROFILE = {
  name: "Gopichand",
  email: "gopichandtlr@gmail.com",
  phone: "+917013691121",
  linkedin: "https://www.linkedin.com/in/gopichandtlr/",
  behance: "https://www.behance.net/gopichandtlr",
  github: "https://github.com/Gopi434",
  whatsapp: "https://wa.me/917013691121",
  /** Photo URL (or a file in /public). If it fails to load, a placeholder is shown. */
  portrait: "Gallery/Branding/MainImg.jpg",
  logo: "Gallery/Branding/Logo.svg",
  portfolioUrl: "https://www.behance.net/gopichandtlr",
  /** Placeholder for the cursor-reveal layer (full width, 40% of screen height). Replace the file or this path. */
  revealImage: "placeholders/reveal.svg",
  intro: {
    role: "Sr. UI/UX & Multidisciplinary Designer",
    text: "Every pixel with a purpose to enrich digital experiences",
  },
};

/**
 * Sections, in the order they appear (page + dock). Reorder by moving a line; add one by copying a line.
 * `number` only links a section to its gallery images in gallery.ts, it is not displayed.
 */
export const SECTIONS: Section[] = [
  { number: "01", title: "UI/UX Design", description: "I don’t wait till a problem itself pops up and says, ‘Hey Gopi, had your lunch?’.", keywords: ["User Research", "Information Architecture", "Interaction Design", "Design Systems"], tools: [TOOLS.figma, TOOLS.xd], url: "https://www.behance.net/gopichandtlr" },
  { number: "02", title: "Graphic Design", description: "Communication always needs words? Meet my friend, Mr. Visual Kumar.", keywords: ["Branding", "Visual Communication", "Typography", "Layout & Composition", "Conceptualisation"], tools: [TOOLS.photoshop, TOOLS.illustrator, TOOLS.indesign, TOOLS.corel], url: "https://www.behance.net/gallery/134131883/Graphic-Design-Works-Social-media-Illustrations" },
  { number: "05", title: "Web Development", description: "I love the languages browsers and servers gossip in.", keywords: ["Responsive Design", "Frontend Development", "Web Interactions", "Accessibility"], tools: [TOOLS.react, TOOLS.html, TOOLS.css, TOOLS.javascript, TOOLS.jquery, TOOLS.framer], url: "https://www.behance.net/gallery/236176331/Web-Development-projects" },
  { number: "03", title: "Motion Design", description: "I can make a bird fly without wings.", keywords: ["Motion Graphics", "UI Motion", "2D Animation", "Visual Storytelling"], tools: [TOOLS.afterEffects], url: "https://www.behance.net/gallery/134130099/Motion-Design-works-Motion-Videos-Icon-Animation" },
  { number: "04", title: "Video Editing", description: "Sometimes, in my stories, the sun rises at midnight.", keywords: ["Storytelling", "Visual Pacing", "Color Grading", "Sound Design"], tools: [TOOLS.premiere], url: "https://www.behance.net/gallery/237406723/Showcase-of-Video-Editing-Works" },
  { number: "06", title: "3D Design", description: "You see a square? I see a cube.", keywords: ["3D Modelling", "Texturing", "Lighting", "Rendering"], tools: [TOOLS.maya], url: "https://www.behance.net/gallery/219630569/3D-Design-works-3d-Modelling-Animation" },
  { number: "07", title: "Workflow Automation", description: "Why isn’t there a National Automation Day yet?", keywords: ["AI Workflows", "Process Design", "Data flow"], tools: [TOOLS.n8n, TOOLS.supabase], url: "https://www.behance.net/gallery/239668343/AI-Automation-agents-(n8n)" },
];

/** Placeholder portrait (square, so object-fit: cover works in every frame). */
export const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' fill='#3a3a3a'/>` +
      `<path d='M30 400c6-80 50-130 118-146l52-14 52 14c68 16 112 66 118 146z' fill='#1a1a1a'/>` +
      `<rect x='176' y='236' width='48' height='40' fill='#bdbdbd'/><ellipse cx='200' cy='170' rx='70' ry='84' fill='#d6d6d6'/>` +
      `<path d='M130 168c-6-80 44-110 86-104 50 6 66 44 58 104-8-38-30-60-70-60s-62 22-74 60z' fill='#111111'/></svg>`
  );

/**
 * Every icon of the top bar in ONE place. `src` can be a web URL or a local file (drop the svg in /public/icons and
 * write "icons/name.svg"). `size` = icon size in px, `gap` = space to the text in px (optional w / h / top override the square size and nudge the icon down; small optical corrections so icons look equally big).
 */
export const ICONS = {
  email: { src: "icons/email.svg", size: 18, w: 21, h: 19, gap: 4, top: 4 },
  whatsapp: { src: "https://www.svgrepo.com/show/506628/whatsapp.svg", size: 25, gap: 1 },
  linkedin: { src: "https://www.svgrepo.com/show/512419/linkedin-161.svg", size: 17, gap: 8 },
  behance: { src: "https://www.svgrepo.com/show/511519/behance-163.svg", size: 19, gap: 8 },
  github: { src: "https://www.svgrepo.com/show/512317/github-142.svg", size: 18, gap: 8 },
};

/** Social links in the top bar (and the mobile menu). Add / remove a line to add / remove a link. */
export const SOCIALS = [
  { label: "LinkedIn", url: PROFILE.linkedin, icon: ICONS.linkedin },
  { label: "Behance", url: PROFILE.behance, icon: ICONS.behance },
  { label: "GitHub", url: PROFILE.github, icon: ICONS.github },
];

/** Phrases that rotate beside the logo, one every 2 seconds: [number part, text part]. */
export const TICKER: [string, string][] = [["6", "Years"], ["7", "Disciplines"], ["∞", "Curiosity"]];
export const TICKER_MS = 2000;
