# Radiant Historia - Walkthrough Design System

## 1. Art Direction & Theme
*Radiant Historia* centers around **The White Chronicle (Historia)**, time manipulation across parallel timelines (**Standard History** and **Alternate History**), tactical 3x3 grid battles, and the tragic geopolitical conflict across Vainqueur (Alistel, Granorg, Celestia, Cygnus, Forgia).

The visual identity of this guide website translates these motifs into an elegant, high-contrast, modern dark RPG interface:
- **Static Vainqueur Backdrop:** The iconic Vainqueur desertification artwork (`assets/background.jpg`) set as a static, fixed full-screen canvas with a subtle dark atmospheric vignette overlay (`rgba(6, 9, 15, 0.84)` to `rgba(6, 9, 15, 0.88)`) ensuring crystal-clear readability and deep immersion.
- **Official Chronicle Branding:** Official *Radiant Historia* logo (`assets/logo.png`) seamlessly integrated into the sticky top navigation header, hero compendium banners, and footer attributions with warm radial amber glows and crisp drop-shadows.
- **Historia Temporal Flux:** Deep indigo/cosmic backgrounds with subtle glowing cyan/teal temporal energy lines and glyphs.
- **Dual Timelines Aesthetic:** Visual demarcation between **Standard History (SH)** (Azure Blue `#3b82f6` - Espionage & Specint Path) and **Alternate History (AH)** (Crimson `#f43f5e` - Rosch Brigade Military Path).
- **The White Chronicle & Magitech:** Radiant amber/gold accents (`#f59e0b`, `#fbbf24`), ornate brass borders, and parchment node markers.
- **Tactical Clarity:** Distinct 3x3 battle grid schemas, boss elemental weakness badges, node completion checkmarks, and clear step-by-step navigation.

---

## 2. Core Color Palette & Tokens

```css
:root {
  /* Cosmic / Historia Canvas */
  --bg-deep: #06090f;
  --bg-surface: rgba(12, 18, 29, 0.88);
  --bg-surface-elevated: rgba(19, 28, 45, 0.90);
  --bg-surface-card: rgba(24, 35, 55, 0.90);
  --bg-surface-hover: rgba(30, 44, 69, 0.94);

  /* Chronicle & Mana Accents */
  --gold-primary: #fbbf24;
  --gold-glow: #f59e0b;
  --gold-muted: #b48c36;
  --gold-border: rgba(251, 191, 36, 0.35);

  /* Temporal Flux (Historia Glow) */
  --mana-cyan: #06b6d4;
  --mana-cyan-glow: rgba(6, 182, 212, 0.4);
  --mana-teal: #14b8a6;
  --mana-green: #10b981;

  /* Timeline Signatures */
  --timeline-standard: #3b82f6;       /* Standard History (Specint) */
  --timeline-standard-bg: rgba(59, 130, 246, 0.12);
  --timeline-alternate: #f43f5e;      /* Alternate History (Rosch Brigade) */
  --timeline-alternate-bg: rgba(244, 63, 94, 0.12);
  --timeline-prologue: #a855f7;       /* Shared Beginning */
  --timeline-final: #eab308;          /* Convergent Climax */

  /* Text & Readability */
  --text-bright: #ffffff;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Borders & Dividers */
  --border-subtle: rgba(148, 163, 184, 0.15);
  --border-active: rgba(251, 191, 36, 0.6);
  --border-standard: rgba(59, 130, 246, 0.4);
  --border-alternate: rgba(244, 63, 94, 0.4);

  /* Tactical Grid & Elements */
  --elem-fire: #ef4444;
  --elem-ice: #38bdf8;
  --elem-thunder: #eab308;
  --elem-physical: #94a3b8;
  --elem-poison: #a855f7;
  --elem-holy: #fef08a;

  /* Box Shadows & Glows */
  --shadow-card: 0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 2px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-glow-gold: 0 0 20px rgba(251, 191, 36, 0.25);
  --shadow-glow-cyan: 0 0 20px rgba(6, 182, 212, 0.25);
}
```

---

## 3. Typography Hierarchy

- **Title & Section Headers:** `Cinzel Decorative` (Heavy, ornate heraldic serif) and `Cinzel` (Clean, classical serif).
  - Used for: Site Title, Chapter Headers, Nation Names, and Node Codes (`[ALST1]`, `[004]`).
  - Styling: Uppercase with generous letter-spacing (`0.05em` to `0.15em`) and subtle warm drop-shadows.
- **UI Labels & Navigation:** `Plus Jakarta Sans` or `Inter` (Geometric sans-serif).
  - Used for: Badges, search bars, filter buttons, stat pills, node checklists, and metadata.
  - Styling: High legibility, weights `500` through `800`.
- **Prose & Walkthrough Text:** `Crimson Pro` or `Inter` (High-contrast, elegant reading text).
  - Line-height: `1.75`, font size: `1.05rem` - `1.15rem` for fatigue-free extended reading.
- **Node & Code Monospace:** `JetBrains Mono` / `Fira Code` / `monospace` for bracketed jump codes like `[ALST1]`, `[LZVL1]`, and coordinate references.

---

## 4. Key UI Components & Motifs

### 4.1. Timeline Matrix & Branch Badges
Visual indicators attached to chapters, nodes, and headers:
- `[Standard History]` (Azure badge with clock forward icon)
- `[Alternate History]` (Crimson badge with branch split icon)
- `[Prologue / Shared]` (Purple nexus badge)
- `[Final Chapter]` (Gold convergent crown badge)

### 4.2. Chapter Walkthrough Cards
- Dark card background with subtle gradient: `linear-gradient(145deg, #131c2d 0%, #0c121d 100%)`.
- Left border highlight indicating the timeline (Azure for SH, Crimson for AH).
- Chapter number pill, jump code badge (`[ALST1]`), location tags, boss encounters, and quick action buttons.
- Checkbox interaction for local progress tracking (`rh-guide-completed-chapters`).

### 4.3. Interactive 3x3 Battle Grid Visualizer
- 3 rows × 3 columns grid representing the tactical combat arena in *Radiant Historia*.
- Visualizes position advantages (Front row: high attack / low defense, Back row: low attack / high defense).
- Demonstrates skill movements: *Push Assault*, *Left Assault*, *Right Assault*, *Air Assault*, *Grapple*, and *Trans-turn*.

### 4.4. Node Completion & Sidequest Matrix Hub
- Quick navigation and tracking for all 236 Historia nodes.
- Bad ending warnings ("Possible History") with alert callout boxes.
- Sidequest initiation vs resolution cross-reference badges.

### 4.5. Callout & Alert Boxes
- **Temporal Choice Point (Warning):** Amber border, hourglass icon, highlights permanent branching decisions.
- **Boss Tactics (Danger):** Crimson border, skull icon, highlights lethal attacks and elemental weaknesses.
- **Secret / Sidequest (Discovery):** Cyan border, key/star icon, highlights missable chests and hidden Mana nodes.

---

## 5. Mobile-First & Accessibility Standards
- **Fluid Layout:** Max container width of `1240px`, centered with fluid padding `clamp(1rem, 3vw, 2rem)`.
- **Touch Targets:** All interactive cards, buttons, filter chips, and checkboxes maintain minimum `44px` touch targets.
- **Contrast Ratios:** All text combinations exceed WCAG AA standards (4.5:1 ratio).
- **Reduced Motion:** Gracefully eliminates heavy glow animations and matrix transitions under `@media (prefers-reduced-motion: reduce)`.

---

## 6. Volume Walkthrough Guide Architecture & Modular Chunking

The 66 walkthrough chapters are organized into seven high-fidelity volume compendiums (`01-10`, `11-20`, `21-30`, `31-40`, `41-50`, `51-60`, `61-66`), with the initial volume implemented as `walkthrough-01-10.html`.

### 6.1. Volume Guide Anatomy (`walkthrough-01-10.html`)
1. **Sticky Global Navigation Header:** Real-time completion counter (`#navProgressBadge`), links to Compendium Hub (`index.html`), Table of Contents (`introduction.html`), and active Volume Guide.
2. **Breadcrumb Hierarchy:** `Compendium Hub > Walkthrough Directory > Volume I: Chapters 01–10`.
3. **Hero Volume Banner:** Chapter volume metadata, logo branding, and quick stats (10 Chapters, 14 Nodes, 2 Bad Endings, 5 Sidequests, 3 Boss Encounters).
4. **Quick-Jump Anchor Matrix:** Direct timeline-coded pill buttons allowing instantaneous navigation to specific chapter sections (`#ch01` through `#ch10`).
5. **Standardized Chapter Card Structure:**
   - **Header Group:** Chapter numeral pill (`#01`), ornate title (`Cinzel`), timeline branch badge (`Standard`, `Alternate`, or `Prologue`), bracketed jump code (`[ALST1]`), location tag, and interactive completion checkbox.
   - **Tactical Briefing Grid:** Recommended level, party composition, enemy list with elemental weaknesses, and inn lodging costs.
   - **Shop Matrix Cards:** Clean dual-column tables with item/equipment names, gold prices, and strategic purchase callouts (e.g. *Buy 3 Horn Charms for Raynie*, *Buy 6 Fang Charms*).
   - **ASCII Area Maps:** Stylized terminal-aesthetic map containers (`#05080f` background with `#93c5fd` monospace rendering) displaying floors, routes, chest coordinates (`1`, `2`, `3`), save points (`S`), blockades (`X`), and cave-ins (`Z`).
   - **Historia Node Checkpoint Callouts:** Cyan-bordered banners marking every official White Chronicle milestone (`[Daydream]`, `[Awakening]`, `[The Beginning]`, `[Breakthrough]`, etc.).
   - **Boss Encounter Danger Cards:** Crimson-themed tactical battle breakdowns (`--timeline-alternate`) detailing elemental weaknesses, turn ordering, and combo stacking strategies.
   - **Sidequest Tracker Callouts:** Emerald green badges (`--mana-green`) logging quest triggers, objectives, NPC locations, and item requisites (`[Soldier Recruit]`, `[Night Watch]`, `[The King's Daughter]`, `[What Was Inherited]`, `[Accident in the Cave]`).
   - **Dead End (Possible History) Warnings:** High-visibility amber/crimson alert boxes highlighting fatal decision points (`[The Fallen Capital]`, `[The Queen Ascendant]`).
   - **Recommended Equipment Cards:** End-of-chapter gear checklists for Stocke, Raynie, Marco, and Rosch.
6. **Unified Progress Synchronization:** All chapter completion checkboxes across `index.html`, `introduction.html`, and `walkthrough-01-10.html` share the exact same `localStorage` key (`rh-guide-completed-chapters`), providing seamless, real-time progress persistence across all pages.

### 6.2. Mobile-First Viewport & Breakpoint Containment
To guarantee flawless rendering on all mobile viewports (320px to 768px):
1. **Root Containment:** `html, body { width: 100%; max-width: 100vw; overflow-x: hidden; }` prevents horizontal canvas stretching.
2. **Flex/Grid `min-width: 0`:** All containers, chapter cards, callout boxes, and briefing grids declare `min-width: 0; max-width: 100%;` to prevent child items (like ASCII maps or long titles) from expanding parent flex containers beyond the mobile viewport.
3. **Scrollable ASCII Terminal Maps:** `.map-content { overflow-x: auto; -webkit-overflow-scrolling: touch; }` with `pre { white-space: pre; min-width: max-content; }` provides smooth horizontal panning without breaking card boundaries.
4. **Responsive Navigation Bar:** Navigation header uses `white-space: nowrap` and `flex-shrink: 0` to prevent word wrapping. Scales padding/font-size smoothly at `@media (max-width: 1120px)`, and transitions at `@media (max-width: 900px)` into a two-tiered layout with brand/progress top row and a touch-scrollable, pill-style navigation list below (`overflow-x: auto; scrollbar-width: none`).
5. **Mobile Chapter Headers & Actions:** At `@media (max-width: 640px)`, chapter headers stack vertically, and the completion toggle button spans 100% width for easy thumb interaction.


