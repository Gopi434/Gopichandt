/**
 * Hover-gallery images (shown while a dock button is hovered).
 *
 * Each section has 3 columns, each with 5 UNIQUE image URLs (top to bottom).
 *   - Columns move vertically in alternate directions: column 1 down, column 2 up, column 3 down.
 *   - Images are always shown as 1:1 squares (cropped to fit if yours are not square).
 *
 * HOW TO CHANGE THE NUMBER OF IMAGES PER COLUMN
 *   Add or delete whole lines (one URL per line) inside a column. Nothing else needs to change.
 *   Keep the URLs in a column different from each other. A column needs at least 1 image.
 *
 * Keys are the section numbers from data.ts. Images live in public/Gallery/<section>/.
 */
export const GALLERY: Record<string, string[][]> = {
  // 01  UI/UX Design
  "01": [
    [ // column 1 (down)
      "Gallery/1/1.jpg",
      "Gallery/1/2.jpg",
      "Gallery/1/3.jpg",
      "Gallery/1/4.jpg",
      "Gallery/1/5.jpg",
    ],
    [ // column 2 (up)
      "Gallery/1/3.jpg",
      "Gallery/1/4.jpg",
      "Gallery/1/5.jpg",
      "Gallery/1/1.jpg",
      "Gallery/1/2.jpg",
    ],
    [ // column 3 (down)
      "Gallery/1/5.jpg",
      "Gallery/1/1.jpg",
      "Gallery/1/2.jpg",
      "Gallery/1/3.jpg",
      "Gallery/1/4.jpg",
    ],
  ],
  // 02  Graphic Design
  "02": [
    [ // column 1 (down)
      "Gallery/2/1.jpg",
      "Gallery/2/2.jpg",
      "Gallery/2/3.jpg",
      "Gallery/2/4.jpg",
      "Gallery/2/5.jpg",
    ],
    [ // column 2 (up)
      "Gallery/2/3.jpg",
      "Gallery/2/4.jpg",
      "Gallery/2/5.jpg",
      "Gallery/2/1.jpg",
      "Gallery/2/2.jpg",
    ],
    [ // column 3 (down)
      "Gallery/2/5.jpg",
      "Gallery/2/1.jpg",
      "Gallery/2/2.jpg",
      "Gallery/2/3.jpg",
      "Gallery/2/4.jpg",
    ],
  ],
  // 03  Motion Design
  "03": [
    [ // column 1 (down)
      "Gallery/3/1.jpg",
      "Gallery/3/2.jpg",
      "Gallery/3/3.jpg",
      "Gallery/3/4.jpg",
      "Gallery/3/5.jpg",
    ],
    [ // column 2 (up)
      "Gallery/3/3.jpg",
      "Gallery/3/4.jpg",
      "Gallery/3/5.jpg",
      "Gallery/3/1.jpg",
      "Gallery/3/2.jpg",
    ],
    [ // column 3 (down)
      "Gallery/3/5.jpg",
      "Gallery/3/1.jpg",
      "Gallery/3/2.jpg",
      "Gallery/3/3.jpg",
      "Gallery/3/4.jpg",
    ],
  ],
  // 04  Video Editing
  "04": [
    [ // column 1 (down)
      "Gallery/4/1.jpg",
      "Gallery/4/2.jpg",
      "Gallery/4/3.jpg",
      "Gallery/4/4.jpg",
      "Gallery/4/5.jpg",
    ],
    [ // column 2 (up)
      "Gallery/4/3.jpg",
      "Gallery/4/4.jpg",
      "Gallery/4/5.jpg",
      "Gallery/4/1.jpg",
      "Gallery/4/2.jpg",
    ],
    [ // column 3 (down)
      "Gallery/4/5.jpg",
      "Gallery/4/1.jpg",
      "Gallery/4/2.jpg",
      "Gallery/4/3.jpg",
      "Gallery/4/4.jpg",
    ],
  ],
  // 05  Web Development
  "05": [
    [ // column 1 (down)
      "Gallery/5/1.jpg",
      "Gallery/5/2.jpg",
      "Gallery/5/3.jpg",
      "Gallery/5/4.jpg",
      "Gallery/5/5.jpg",
    ],
    [ // column 2 (up)
      "Gallery/5/3.jpg",
      "Gallery/5/4.jpg",
      "Gallery/5/5.jpg",
      "Gallery/5/1.jpg",
      "Gallery/5/2.jpg",
    ],
    [ // column 3 (down)
      "Gallery/5/5.jpg",
      "Gallery/5/1.jpg",
      "Gallery/5/2.jpg",
      "Gallery/5/3.jpg",
      "Gallery/5/4.jpg",
    ],
  ],
  // 06  3D Design
  "06": [
    [ // column 1 (down)
      "Gallery/6/1.jpg",
      "Gallery/6/2.jpg",
      "Gallery/6/3.jpg",
      "Gallery/6/4.jpg",
      "Gallery/6/5.jpg",
    ],
    [ // column 2 (up)
      "Gallery/6/3.jpg",
      "Gallery/6/4.jpg",
      "Gallery/6/5.jpg",
      "Gallery/6/1.jpg",
      "Gallery/6/2.jpg",
    ],
    [ // column 3 (down)
      "Gallery/6/5.jpg",
      "Gallery/6/1.jpg",
      "Gallery/6/2.jpg",
      "Gallery/6/3.jpg",
      "Gallery/6/4.jpg",
    ],
  ],
  // 07  Workflow Automation
  "07": [
    [ // column 1 (down)
      "Gallery/7/1.jpg",
      "Gallery/7/2.jpg",
      "Gallery/7/3.jpg",
      "Gallery/7/4.jpg",
      "Gallery/7/5.jpg",
    ],
    [ // column 2 (up)
      "Gallery/7/3.jpg",
      "Gallery/7/4.jpg",
      "Gallery/7/5.jpg",
      "Gallery/7/1.jpg",
      "Gallery/7/2.jpg",
    ],
    [ // column 3 (down)
      "Gallery/7/5.jpg",
      "Gallery/7/1.jpg",
      "Gallery/7/2.jpg",
      "Gallery/7/3.jpg",
      "Gallery/7/4.jpg",
    ],
  ],
};
