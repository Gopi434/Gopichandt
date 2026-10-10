/**
 * Gallery images shown when "View Works" is hovered.
 *
 * Each section has 6 columns, and each column is a list of image URLs (top to bottom).
 *   - Columns 1-3 appear on the LEFT half (full visibility).
 *   - Columns 4-6 appear on the RIGHT half (very faint, behind the text).
 *   - Column directions alternate: 1 down, 2 up, 3 down, 4 up, 5 down, 6 up.
 *
 * Every URL below is a unique dummy placeholder (picsum.photos). Replace any single URL with your own
 * image; keep images square (or they will be cropped to a square). Keys are the section numbers from data.ts.
 * You can add or remove images in a column; a column needs at least 1 image.
 */
export const GALLERY: Record<string, string[][]> = {
  // 01  UI/UX Design
  "01": [
    [
      // column 1 (moves DOWN, left half)
      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
      "/public/Gallery/1/3.jpg",
      "/public/Gallery/1/4.jpg",
      "/public/Gallery/1/5.jpg",
      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
    ],
    [
      // column 2 (moves UP, left half)

      "/public/Gallery/1/3.jpg",
      "/public/Gallery/1/4.jpg",
      "/public/Gallery/1/5.jpg",
      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
      "/public/Gallery/1/3.jpg",
      "/public/Gallery/1/4.jpg",
    ],
    [
      // column 3 (moves DOWN, left half)

      "/public/Gallery/1/5.jpg",
      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
      "/public/Gallery/1/3.jpg",
      "/public/Gallery/1/4.jpg",
      "/public/Gallery/1/5.jpg",
      "/public/Gallery/1/1.jpg",
    ],
    [
      // column 4 (moves UP, right half)

      "/public/Gallery/1/2.jpg",
      "/public/Gallery/1/3.jpg",
      "/public/Gallery/1/4.jpg",
      "/public/Gallery/1/5.jpg",
      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
      "/public/Gallery/1/3.jpg",
    ],
    [
      // column 5 (moves DOWN, right half)

      "/public/Gallery/1/4.jpg",
      "/public/Gallery/1/5.jpg",
      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
      "/public/Gallery/1/3.jpg",
      "/public/Gallery/1/4.jpg",
      "/public/Gallery/1/5.jpg",
    ],
    [
      // column 6 (moves UP, right half)

      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
      "/public/Gallery/1/3.jpg",
      "/public/Gallery/1/4.jpg",
      "/public/Gallery/1/5.jpg",
      "/public/Gallery/1/1.jpg",
      "/public/Gallery/1/2.jpg",
    ],
  ],
  // 02  Graphic Design
 
"02": [
    [
      // column 1 (moves DOWN, left half)
      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
      "/public/Gallery/2/3.jpg",
      "/public/Gallery/2/4.jpg",
      "/public/Gallery/2/5.jpg",
      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
    ],
    [
      // column 2 (moves UP, left half)

      "/public/Gallery/2/3.jpg",
      "/public/Gallery/2/4.jpg",
      "/public/Gallery/2/5.jpg",
      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
      "/public/Gallery/2/3.jpg",
      "/public/Gallery/2/4.jpg",
    ],
    [
      // column 3 (moves DOWN, left half)

      "/public/Gallery/2/5.jpg",
      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
      "/public/Gallery/2/3.jpg",
      "/public/Gallery/2/4.jpg",
      "/public/Gallery/2/5.jpg",
      "/public/Gallery/2/1.jpg",
    ],
    [
      // column 4 (moves UP, right half)

      "/public/Gallery/2/2.jpg",
      "/public/Gallery/2/3.jpg",
      "/public/Gallery/2/4.jpg",
      "/public/Gallery/2/5.jpg",
      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
      "/public/Gallery/2/3.jpg",
    ],
    [
      // column 5 (moves DOWN, right half)

      "/public/Gallery/2/4.jpg",
      "/public/Gallery/2/5.jpg",
      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
      "/public/Gallery/2/3.jpg",
      "/public/Gallery/2/4.jpg",
      "/public/Gallery/2/5.jpg",
    ],
    [
      // column 6 (moves UP, right half)

      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
      "/public/Gallery/2/3.jpg",
      "/public/Gallery/2/4.jpg",
      "/public/Gallery/2/5.jpg",
      "/public/Gallery/2/1.jpg",
      "/public/Gallery/2/2.jpg",
    ],
  ],

  // 03  Motion Design
 
"03": [
    [
      // column 1 (moves DOWN, left half)
      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
      "/public/Gallery/3/3.jpg",
      "/public/Gallery/3/4.jpg",
      "/public/Gallery/3/5.jpg",
      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
    ],
    [
      // column 2 (moves UP, left half)

      "/public/Gallery/3/3.jpg",
      "/public/Gallery/3/4.jpg",
      "/public/Gallery/3/5.jpg",
      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
      "/public/Gallery/3/3.jpg",
      "/public/Gallery/3/4.jpg",
    ],
    [
      // column 3 (moves DOWN, left half)

      "/public/Gallery/3/5.jpg",
      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
      "/public/Gallery/3/3.jpg",
      "/public/Gallery/3/4.jpg",
      "/public/Gallery/3/5.jpg",
      "/public/Gallery/3/1.jpg",
    ],
    [
      // column 4 (moves UP, right half)

      "/public/Gallery/3/2.jpg",
      "/public/Gallery/3/3.jpg",
      "/public/Gallery/3/4.jpg",
      "/public/Gallery/3/5.jpg",
      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
      "/public/Gallery/3/3.jpg",
    ],
    [
      // column 5 (moves DOWN, right half)

      "/public/Gallery/3/4.jpg",
      "/public/Gallery/3/5.jpg",
      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
      "/public/Gallery/3/3.jpg",
      "/public/Gallery/3/4.jpg",
      "/public/Gallery/3/5.jpg",
    ],
    [
      // column 6 (moves UP, right half)

      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
      "/public/Gallery/3/3.jpg",
      "/public/Gallery/3/4.jpg",
      "/public/Gallery/3/5.jpg",
      "/public/Gallery/3/1.jpg",
      "/public/Gallery/3/2.jpg",
    ],
  ],

  // 04  Video Editing
 
"04": [
    [
      // column 1 (moves DOWN, left half)
      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
      "/public/Gallery/4/3.jpg",
      "/public/Gallery/4/4.jpg",
      "/public/Gallery/4/5.jpg",
      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
    ],
    [
      // column 2 (moves UP, left half)

      "/public/Gallery/4/3.jpg",
      "/public/Gallery/4/4.jpg",
      "/public/Gallery/4/5.jpg",
      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
      "/public/Gallery/4/3.jpg",
      "/public/Gallery/4/4.jpg",
    ],
    [
      // column 3 (moves DOWN, left half)

      "/public/Gallery/4/5.jpg",
      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
      "/public/Gallery/4/3.jpg",
      "/public/Gallery/4/4.jpg",
      "/public/Gallery/4/5.jpg",
      "/public/Gallery/4/1.jpg",
    ],
    [
      // column 4 (moves UP, right half)

      "/public/Gallery/4/2.jpg",
      "/public/Gallery/4/3.jpg",
      "/public/Gallery/4/4.jpg",
      "/public/Gallery/4/5.jpg",
      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
      "/public/Gallery/4/3.jpg",
    ],
    [
      // column 5 (moves DOWN, right half)

      "/public/Gallery/4/4.jpg",
      "/public/Gallery/4/5.jpg",
      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
      "/public/Gallery/4/3.jpg",
      "/public/Gallery/4/4.jpg",
      "/public/Gallery/4/5.jpg",
    ],
    [
      // column 6 (moves UP, right half)

      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
      "/public/Gallery/4/3.jpg",
      "/public/Gallery/4/4.jpg",
      "/public/Gallery/4/5.jpg",
      "/public/Gallery/4/1.jpg",
      "/public/Gallery/4/2.jpg",
    ],
  ],

  // 05  Web Development
 
"05": [
    [
      // column 1 (moves DOWN, left half)
      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
      "/public/Gallery/5/3.jpg",
      "/public/Gallery/5/4.jpg",
      "/public/Gallery/5/5.jpg",
      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
    ],
    [
      // column 2 (moves UP, left half)

      "/public/Gallery/5/3.jpg",
      "/public/Gallery/5/4.jpg",
      "/public/Gallery/5/5.jpg",
      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
      "/public/Gallery/5/3.jpg",
      "/public/Gallery/5/4.jpg",
    ],
    [
      // column 3 (moves DOWN, left half)

      "/public/Gallery/5/5.jpg",
      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
      "/public/Gallery/5/3.jpg",
      "/public/Gallery/5/4.jpg",
      "/public/Gallery/5/5.jpg",
      "/public/Gallery/5/1.jpg",
    ],
    [
      // column 4 (moves UP, right half)

      "/public/Gallery/5/2.jpg",
      "/public/Gallery/5/3.jpg",
      "/public/Gallery/5/4.jpg",
      "/public/Gallery/5/5.jpg",
      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
      "/public/Gallery/5/3.jpg",
    ],
    [
      // column 5 (moves DOWN, right half)

      "/public/Gallery/5/4.jpg",
      "/public/Gallery/5/5.jpg",
      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
      "/public/Gallery/5/3.jpg",
      "/public/Gallery/5/4.jpg",
      "/public/Gallery/5/5.jpg",
    ],
    [
      // column 6 (moves UP, right half)

      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
      "/public/Gallery/5/3.jpg",
      "/public/Gallery/5/4.jpg",
      "/public/Gallery/5/5.jpg",
      "/public/Gallery/5/1.jpg",
      "/public/Gallery/5/2.jpg",
    ],
  ],

  // 06  3D Design
 
"06": [
    [
      // column 1 (moves DOWN, left half)
      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
      "/public/Gallery/6/3.jpg",
      "/public/Gallery/6/4.jpg",
      "/public/Gallery/6/5.jpg",
      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
    ],
    [
      // column 2 (moves UP, left half)

      "/public/Gallery/6/3.jpg",
      "/public/Gallery/6/4.jpg",
      "/public/Gallery/6/5.jpg",
      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
      "/public/Gallery/6/3.jpg",
      "/public/Gallery/6/4.jpg",
    ],
    [
      // column 3 (moves DOWN, left half)

      "/public/Gallery/6/5.jpg",
      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
      "/public/Gallery/6/3.jpg",
      "/public/Gallery/6/4.jpg",
      "/public/Gallery/6/5.jpg",
      "/public/Gallery/6/1.jpg",
    ],
    [
      // column 4 (moves UP, right half)

      "/public/Gallery/6/2.jpg",
      "/public/Gallery/6/3.jpg",
      "/public/Gallery/6/4.jpg",
      "/public/Gallery/6/5.jpg",
      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
      "/public/Gallery/6/3.jpg",
    ],
    [
      // column 5 (moves DOWN, right half)

      "/public/Gallery/6/4.jpg",
      "/public/Gallery/6/5.jpg",
      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
      "/public/Gallery/6/3.jpg",
      "/public/Gallery/6/4.jpg",
      "/public/Gallery/6/5.jpg",
    ],
    [
      // column 6 (moves UP, right half)

      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
      "/public/Gallery/6/3.jpg",
      "/public/Gallery/6/4.jpg",
      "/public/Gallery/6/5.jpg",
      "/public/Gallery/6/1.jpg",
      "/public/Gallery/6/2.jpg",
    ],
  ],

  // 07  Workflow Automation
 
"07": [
    [
      // column 1 (moves DOWN, left half)
      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
      "/public/Gallery/7/3.jpg",
      "/public/Gallery/7/4.jpg",
      "/public/Gallery/7/5.jpg",
      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
    ],
    [
      // column 2 (moves UP, left half)

      "/public/Gallery/7/3.jpg",
      "/public/Gallery/7/4.jpg",
      "/public/Gallery/7/5.jpg",
      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
      "/public/Gallery/7/3.jpg",
      "/public/Gallery/7/4.jpg",
    ],
    [
      // column 3 (moves DOWN, left half)

      "/public/Gallery/7/5.jpg",
      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
      "/public/Gallery/7/3.jpg",
      "/public/Gallery/7/4.jpg",
      "/public/Gallery/7/5.jpg",
      "/public/Gallery/7/1.jpg",
    ],
    [
      // column 4 (moves UP, right half)

      "/public/Gallery/7/2.jpg",
      "/public/Gallery/7/3.jpg",
      "/public/Gallery/7/4.jpg",
      "/public/Gallery/7/5.jpg",
      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
      "/public/Gallery/7/3.jpg",
    ],
    [
      // column 5 (moves DOWN, right half)

      "/public/Gallery/7/4.jpg",
      "/public/Gallery/7/5.jpg",
      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
      "/public/Gallery/7/3.jpg",
      "/public/Gallery/7/4.jpg",
      "/public/Gallery/7/5.jpg",
    ],
    [
      // column 6 (moves UP, right half)

      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
      "/public/Gallery/7/3.jpg",
      "/public/Gallery/7/4.jpg",
      "/public/Gallery/7/5.jpg",
      "/public/Gallery/7/1.jpg",
      "/public/Gallery/7/2.jpg",
    ],
  ],

};
