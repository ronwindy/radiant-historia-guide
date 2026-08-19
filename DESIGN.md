# Visual Design Guide & Architecture: Radiant Historia Walkthrough

## 1. Aesthetic Direction & Art Style
*Radiant Historia* centers around **The White Chronicle (Historia)**, temporal manipulation across divergent parallel timelines (**Standard History** and **Alternate History**), tactical 3×3 grid combat, and the desertification of Vainqueur.

The visual identity of this Astro static web compendium translates these motifs into an immersive, high-contrast, modern dark RPG interface:
- **Atmospheric Vainqueur Backdrop:** The iconic desertification artwork (`public/background.jpg` or `assets/background.jpg`) layered under a fixed dark readability gradient (`rgba(6, 9, 15, 0.86)` to `rgba(6, 9, 15, 0.90)`).
- **Official Chronicle Branding:** Official *Radiant Historia* logo seamlessly integrated into sticky header, compendium banners, and footer attributions.
- **Dual Timelines Color Coding:**
  - **Standard History (SH):** Azure Blue (`#3b82f6`) — Espionage & Specint Path.
  - **Alternate History (AH):** Crimson (`#f43f5e`) — Rosch Brigade Military Path.
  - **Prologue (Shared):** Cosmic Purple (`#a855f7`) — Temporal Origin Nexus.
  - **Final Climax:** Radiant Gold (`#eab308`) — Convergent Climax.
- **White Chronicle / Magitech:** Amber/gold glowing accents (`#fbbf24`, `#f59e0b`), brass borders, and cyan temporal flux markers.
- **Tactical Clarity:** Interactive 3×3 battle grid arena, boss elemental weakness badges, and node completion progress sync.

---

## 2. Design Tokens & Color Palette (`src/styles/global.css`)

- **Canvas & Deep Dark:** `--bg-deep: #06090f;`
- **Elevated Surfaces:** `--bg-surface: rgba(12, 18, 29, 0.92);`, `--bg-surface-elevated: rgba(19, 28, 45, 0.92);`
- **Chronicle Gold:** `--gold-primary: #fbbf24;`, `--gold-glow: #f59e0b;`, `--gold-muted: #b48c36;`
- **Temporal Flux Cyan:** `--mana-cyan: #06b6d4;`, `--mana-cyan-glow: rgba(6, 182, 212, 0.4);`
- **Primary Text:** `--text-bright: #ffffff;`, `--text-primary: #f1f5f9;` (Contrast ratio $\ge 7:1$)
- **Muted Text:** `--text-secondary: #94a3b8;`, `--text-muted: #64748b;`
- **Elemental Tokens:**
  - Fire: `#ef4444`
  - Ice / Frost: `#38bdf8`
  - Thunder / Lightning: `#eab308`
  - Poison: `#a855f7`
  - Holy: `#fde047`
  - Physical: `#94a3b8`

---

## 3. Typography Hierarchy

- **Title & Display Headers:** `Cinzel Decorative` (Heavy, ornate heraldic serif).
- **Section & Component Headers:** `Cinzel` (Clean classical serif).
- **Prose & Walkthrough Text:** `Crimson Pro` (High-contrast, elegant reading serif).
- **UI Labels & Navigation:** `Plus Jakarta Sans` / `Inter` (Crisp geometric sans-serif).
- **Node Codes & Terminal Maps:** `JetBrains Mono` / `Fira Code` (Monospace).

---

## 4. Layouts & Component System

| Component / Layout | Location | Purpose |
| :--- | :--- | :--- |
| `BaseLayout.astro` | `src/layouts/` | Master HTML shell, SEO OpenGraph meta, navbar, mobile drawer, scroll-to-top |
| `WalkthroughLayout.astro` | `src/layouts/` | Volume hero banner, stats, quick-jump anchor matrix, volume pagination |
| `Header.astro` | `src/components/` | Sticky top navigation, logo, live completion badge counter, mobile menu drawer |
| `Footer.astro` | `src/components/` | Section links, author attribution (Henri "HC" Bailly), localStorage reset |
| `ChapterCard.astro` | `src/components/` | Chapter header, jump code, timeline border, completion checkbox (`data-chapter-num`) |
| `TacticalBriefing.astro` | `src/components/` | Recommended level, party composition, enemy list with elemental badges |
| `ShopMatrix.astro` | `src/components/` | Dual-column item & equipment shop tables with purchase callouts |
| `AsciiMap.astro` | `src/components/` | Monospace dungeon terminal maps with touch horizontal scrolling |
| `Callout.astro` | `src/components/` | Themed callouts: Warning (amber), Danger (crimson), Node (cyan), Quest (green) |
| `BossCard.astro` | `src/components/` | Boss stats, HP, weaknesses, steal targets, drops, combo strategies |
| `SidequestCard.astro` | `src/components/` | Sidequest initiation, requisites, and reward logs |
| `BattleGrid.astro` | `src/components/` | Interactive 3×3 grid combat simulator with push/pull/assault maneuvers |
| `ProgressTracker.astro` | `src/components/` | Chapter and node progress dashboard connected to `localStorage` |

---

## 5. Site Routes & Compendiums

- **`/` (`index.astro`):** Master Compendium Hub, timeline explainer, battle visualizer, volume directory, node tracker summary.
- **`/introduction/` (`introduction.astro`):** Game systems, turn swapping, Trans-turn, Mana Bursts, White Chronicle time mechanics.
- **`/walkthrough/volume-1/` through `/volume-7/`:** All 66 walkthrough chapters with zero omitted content.
- **`/nodes/` (`nodes.astro`):** Interactive 236 Historia Node Completion List with live search and filtering.
- **`/abilities/` (`abilities.astro`):** Character ability learning lists for all 7 party members with MP costs and quest scrolls.
- **`/credits/` (`credits.astro`):** Author credits, community contributors, and copyright information.
