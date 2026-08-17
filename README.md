# ⚔️ Radiant Historia - The White Chronicle Master Walkthrough Compendium

An interactive, responsive web walkthrough and tactical compendium for **Radiant Historia** (Nintendo DS / Perfect Chronology).

🌐 **Live Web Version**: [https://ronwindy.github.io/radiant-historia-guide/](https://ronwindy.github.io/radiant-historia-guide/)

---

## 🌟 Features

- **Interactive Timeline Navigator**: Full node completion matrix tracking across the Standard and Alternate Histories.
- **3x3 Tactical Grid & Combo Visualizer**: Interactive grid push/pull tactics, turn manipulation, and boss mechanics.
- **Master Walkthrough**: Step-by-step chapter guides covering items, enemies, strategy notes, sidequests, and node triggers.
- **Dark Cosmic Historia Aesthetics**: High readability UI with responsive layouts, glowing timeline signifiers, and quick jump navigation chips.
- **Zero-Dependency Static Architecture**: Pure HTML5, modern CSS3 variables, and vanilla JavaScript for blazing performance on desktop and mobile.

---

## 📂 Project Structure

`
radiant-historia-guide/
├── .github/workflows/deploy.yml   # Automated GitHub Pages Deployment
├── .gitignore
├── .nojekyll
├── assets/
│   ├── background.jpg             # Background artwork
│   └── logo.png                   # Header and icon branding
├── index.html                     # Compendium Hub & Tactical Center
├── introduction.html              # Walkthrough Directory & Master TOC
├── walkthrough-01-10.html         # Volume I: Chapters 01 - 10
├── walkthrough-11-20.html         # Volume II: Chapters 11 - 20
├── walkthrough-21-30.html         # Volume III: Chapters 21 - 30
├── text-walkthrough/              # Original source walkthrough transcripts
│   ├── 01-10.txt ... 61-66.txt
│   ├── ability.txt, credit.txt, etc.
│   └── script.py
├── DESIGN.md                      # UI/UX design specifications
└── README.md
`

---

## 🚀 Local Preview

Open index.html directly in any modern web browser or serve locally with any static HTTP server:

`ash
# Python
python -m http.server 8000

# Node / npx
npx serve
`

---

## 📜 Credits & Attributions

- Walkthrough strategy content adapted from the master guide by **HCBailly**.
- Radiant Historia © ATLUS / SEGA.
