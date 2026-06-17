# Vanilla GUI

A personal portfolio that looks and feels like the Minecraft main menu screen — rotating panorama, pixel-art buttons, click sounds, the whole vibe. Runs entirely in the browser, no backend needed.

## About

This is my school project portfolio ([Aaron Mathew F. Sinay](https://github.com/aaronmathew)) — a backend developer and automation enthusiast who wanted a portfolio that doesn't look like every other Bootstrap site out there.

The UI is a direct nod to Minecraft 1.14+'s main menu. The rotating 3D panorama, the border-image buttons, the pixel font, the subtle dirt background — it's all there.

## Requirement Check

The project needs to be **HTML, CSS, and JS** — and it is. React/TypeScript/Vite/Tailwind are just the tools I used to build it. Run `npm run build` and you get a plain `dist/` folder with regular HTML, CSS, and JS files ready for GitHub Pages.

## Features

- **Rotating 3D panorama** — 6-face cube map rendered with Three.js, slowly rotating like the real Minecraft menu; rotation pauses when reduce motion is enabled
- **Minecraft-styled UI** — pixel-art border-image buttons, custom pixel font, dirty background, text shadows
- **Splash text** — random yellow tip text near the title with a pulsing animation, just like the real Minecraft menu
- **Project portfolio CRUD** — create, read, update, delete, and duplicate projects (data resets on reload)
- **Contacts page** — list of contact methods with icons
- **About Me** — Markdown bio with scrolling skill marquees
- **Accessibility** — reduce motion, large font, and high contrast toggles; reduce motion freezes the panorama and stops all animations
- **Keyboard navigation** — arrow keys through lists, escape to clear search
- **Sound effects** — click.ogg plays on every button press

## Tech Stack

| What | Why |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Dev server + bundler |
| Tailwind CSS | Utility-first styling |
| Three.js | 3D panorama rendering |
| Zustand | Lightweight state management |
| react-markdown | Bio rendering |
| react-icons | Contact icons |

## Getting Started

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # static output in dist/
npm run preview   # preview the built site
```

To deploy on GitHub Pages, just push the `dist/` folder (or set up a GitHub Action to build and deploy automatically).

## Honest Note

A decent chunk of this code was generated with AI assistance. Think of it as a pair programmer who doesn't need sleep. It helped move things fast so I could focus on making it actually look and feel right — perfect for a school project where you want solid results without the burnout.

## Author

**Aaron Mathew F. Sinay** — Backend Developer & Automation Enthusiast
