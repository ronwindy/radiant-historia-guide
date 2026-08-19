# Workflow: Ingest Raw Text Walkthroughs into Astro Pages

This workflow outlines the automated ingestion protocol for parsing raw walkthrough text chunks from `raw-sources/` into structured, interactive `.astro` components for *Radiant Historia*.

---

## 1. Input Sources
- `raw-sources/01-10.txt` -> `src/pages/walkthrough/volume-1.astro`
- `raw-sources/11-20.txt` -> `src/pages/walkthrough/volume-2.astro`
- `raw-sources/21-30.txt` -> `src/pages/walkthrough/volume-3.astro`
- `raw-sources/31-40.txt` -> `src/pages/walkthrough/volume-4.astro`
- `raw-sources/41-50.txt` -> `src/pages/walkthrough/volume-5.astro`
- `raw-sources/51-60.txt` -> `src/pages/walkthrough/volume-6.astro`
- `raw-sources/61-66.txt` -> `src/pages/walkthrough/volume-7.astro`
- `raw-sources/node-completion-list.txt` -> `src/pages/nodes.astro`
- `raw-sources/ability.txt` -> `src/pages/abilities.astro`
- `raw-sources/introduction.txt` -> `src/pages/introduction.astro`
- `raw-sources/credit.txt` -> `src/pages/credits.astro`

---

## 2. Transformation Rules

### 2.1. Chapter Cards & Anchors
- Wrap each chapter section in `<ChapterCard>` with:
  - `id`: e.g. `ch01`, `ch15`
  - `number`: 1 to 66
  - `title`: Chapter title (e.g. `Alistel (Prologue)`)
  - `code`: Jump code in brackets (e.g. `ALST1`, `SAND2`)
  - `timeline`: `Standard`, `Alternate`, `Prologue`, or `Final`
  - `location`: In-game region / map name

### 2.2. Tactical Briefing
- Extract:
  - Recommended Level
  - Recommended Party
  - Enemies and elemental weaknesses (tagged with elemental badges: `Fire`, `Ice`, `Lightning`/`Thunder`, `Poison`, `Holy`, `Physical`)
  - Inn lodging cost

### 2.3. Shop Matrix
- Parse dual-column tables into `<ShopMatrix>` components separating Item Shop and Equipment Shop with gold prices and strategic buy recommendations.

### 2.4. ASCII Area Maps
- Render ASCII dungeon and town layouts inside `<AsciiMap>` components with styled monospace container and formatted legend keys.

### 2.5. Semantic Callouts
- **Temporal Choices / Decisions:** `<Callout type="warning" title="Temporal Choice Point">`
- **Dead Ends / Possible History:** `<Callout type="danger" title="Possible History (Dead End)">`
- **White Chronicle Milestones:** `<Callout type="node" title="Historia Checkpoint">`
- **Sidequest Triggers:** `<Callout type="quest" title="Sidequest Objective">`
- **Boss Tactics:** `<BossCard>` detailing weakness, grid coords, turn manipulation, and combo recommendations.

### 2.6. Progress Tracking
- Every chapter card includes a checkbox bound to `rh-guide-completed-chapters` in `localStorage`.
- Every Historia node includes a checkbox bound to `rh-guide-completed-nodes` in `localStorage`.
