# Gopichand Portfolio (React + TypeScript + Vite)

    npm install
    npm run dev

Edit `src/data.ts` for name, contact, logo, photo URL, copy, keywords, tools and Behance links.

Stage frames (circle, laptop, Instagram post, timeline, video, browser, 3D cube, automation flow) live in `src/components/frames.tsx`;
each has a `slot` where the photo lands. Add or retune a frame by editing its slot and SVG.

## Editing content (src/data.ts)
- **Skills:** each section's `keywords` array. One string = one star chip. Add a chip by adding a string.
- **Tools:** each section's `tools` array holds references to the `TOOLS` registry. To add a tool: drop its white SVG in `public/tools/`, add one line to `TOOLS`, then add `TOOLS.yourTool` to any section.
- **Sections:** the `SECTIONS` array order = page order = dock order. (Matching animation frames live in the same order in `src/components/frames.tsx`.)

## Placeholders / assets
- Dock icons (7 disciplines): inline SVG in `src/components/DockIcons.tsx`, keyed by section `number`. Keep the `tp` class + `pathLength={1}` on each shape to keep the hover "trim path" draw-on animation.
- Tool logos: `public/tools/*.svg`
- Cursor reveal ("SOLVING INVISIBLE"): `src/components/Reveal.tsx` (`WORD`, `TILE`, `MIN_ROWS`, `WINDOW_MS`, `AUTO_CLOSE_MS` at the top). Only the middle tiles of the right-edge column are live.

## Round 4 notes
- `S` key pauses/plays all animations (also shown as a hint on first load, `.keyhint`).
- `DOCK_SCALE` in `src/components/DockIcons.tsx` fine-tunes optical icon sizes.
- Cursor reveal (`Reveal.tsx`) splits the live page into top/bottom halves; it only runs at widths above 1024px.

## Round 5 notes
- Top bar links and the rotating "6 Years / 7 Disciplines / ∞ Curiosity" phrases are configured in `src/data.ts` (`PROFILE`, `SOCIALS`, `TICKER`, `TICKER_MS`).
- Email and phone are plain selectable text; a click copies them.
- Gallery: edit `src/gallery.ts` — add/remove one URL line per column to change the images per column.

## Round 7 notes
- Font is Outfit (Google Fonts link in `index.html`, family set on `body` in `styles.css`).
- Phone number: icon + click copies and opens `PROFILE.whatsapp`.
- Section one-liners live in `SECTIONS[].description`; the intro line in `PROFILE.intro.text` (`\n` = line break).
- 3D section loop: `FRAMES[6].loop` in `frames.tsx` + `.xtop/.xe/.mini` keyframes in `styles.css` (one 7s loop).
- The hidden visual (Reveal) ignores the play/pause state on purpose.

## Round 8 notes
- All top-bar icons are configured in `ICONS` in `src/data.ts`: `src` = web URL or local file (put the svg in `/public/icons`, write `"icons/name.svg"`), `size` = px.
- 3D section: the flat square -> cube loop is `FRAMES[6].loop` in `frames.tsx`, keyframes `k-sq`, `k-face`, `k-cam`, `k-bulb`, `k-ray`, `k-hat`, `p3d` (photo) in `styles.css`.

## Round 12 notes
- Gallery (`Gallery.tsx`): every section is a layer that is mounted once and kept; hovering only swaps the visible layer. Other sections load one by one while the browser is idle.
- Play / pause lives in `.dk-slot` (collapses in the intro, like home); the "S key" tooltip is `.keytip` in `App.tsx`.
