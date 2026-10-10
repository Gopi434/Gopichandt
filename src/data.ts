export interface Section {
  number: string;
  title: string;
  description: string;
  keywords: string[];
  tools: string[];
  url: string; // Behance link
}

export const PROFILE = {
  name: "Gopichand",
  email: "gopichandtlr@gmail.com",
  phone: "7013691121",
  linkedin: "https://www.linkedin.com/in/gopichandtlr/",
  /** Photo URL (or a file in /public). If it fails to load, a placeholder is shown. */
  portrait: "/public/Gallery/Branding/MainImg.jpg",
  logo: "/public/Gallery/Branding/Logo.svg",
  portfolioUrl: "https://www.behance.net/",
  intro: {
    greeting: "Hi👋 I'm",
    name: "Gopichand",
    role: "Sr. UI/UX and Multimedia Designer",
    text: "Whether it’s a digital product or a marketing creative, I focus on solving problems and communicating ideas through design.",
  },
};

export const SECTIONS: Section[] = [
  { number: "01", title: "UI/UX Design", description: "Not just user focused. I also care about the business behind every product I design.", keywords: ["User Research", "Information Architecture", "Interaction Design", "Design Systems"], tools: ["Figma", "Adobe XD"], url: "https://www.behance.net/" },
  { number: "02", title: "Graphic Design", description: "I focus on the idea first, then build the visual language around it.", keywords: ["Visual Identity", "Art Direction", "Typography", "Layout & Composition"], tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "CorelDraw"], url: "https://www.behance.net/" },
  { number: "03", title: "Motion Design", description: "If everything moves, nothing feels intentional. I use motion where it adds meaning, not just movement.", keywords: ["Motion Graphics", "UI Motion", "2D Animation", "Visual Storytelling"], tools: ["Adobe After Effects"], url: "https://www.behance.net/" },
  { number: "04", title: "Video Editing", description: "I don’t just edit what’s there. I look for the story inside the footage and build the edit around it.", keywords: ["Storytelling", "Visual Pacing", "Color Grading", "Sound Design"], tools: ["Adobe Premiere Pro"], url: "https://www.behance.net/" },
  { number: "05", title: "Web Development", description: "Designing a website is one thing. Understanding how it actually gets built changes how you design it.", keywords: ["Responsive Design", "Frontend Development", "Web Interactions", "Accessibility"], tools: ["React (HTML, CSS, JavaScript, jQuery)", "Framer"], url: "https://www.behance.net/" },
  { number: "06", title: "3D Design", description: "Some ideas need more than a flat canvas. I use 3D to explore depth, form, light and perspective.", keywords: ["3D Modelling", "Texturing", "Lighting", "Rendering"], tools: ["Autodesk Maya"], url: "https://www.behance.net/" },
  { number: "07", title: "Workflow Automation", description: "Good workflows should make work easier, not create more work. I use automation to connect tools, simplify processes and save time.", keywords: ["Workflow Automation", "AI Workflows", "Process Design", "Data flow"], tools: ["n8n", "Supabase"], url: "https://www.behance.net/" },
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
