# Alberto Trujillo Mingorance - Engineering Portfolio

[![Status](https://img.shields.io/badge/Status-Production%20Live-emerald?style=flat-square)](https://alberto.trujillomingorance.com)
[![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Pages-f38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions)](https://github.com/atrumin16/portfolio/actions)
[![Bundler](https://img.shields.io/badge/Bundler-Vite%206-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Theme](https://img.shields.io/badge/Theme-Corporate%20Dark%20Slate-0ea5e9?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

Personal portfolio and technical showcase for Alberto Trujillo Mingorance, focusing on systems administration, cloud infrastructure, network architecture, and software engineering.

The application is built with modern HTML5, vanilla ES modules, and a dark slate design system. It runs on Cloudflare Pages and includes an interactive client-side terminal, multi-language support (English and Spanish), and performance optimizations aimed at achieving high Lighthouse scores.

---

## Production Deployment

- Production Domain: [alberto.trujillomingorance.com](https://alberto.trujillomingorance.com)
- Hosting: Cloudflare Pages Anycast Network
- CI/CD Pipeline: GitHub Actions running automated Vite build validations on `main` and `develop` branches.

---

## Technical Highlights

- Dark Slate Design System: Built using CSS custom properties with an obsidian navy background (#080c14), semi-transparent glass cards, and high-contrast typography following WCAG standards.
- Interactive Terminal: A lightweight in-browser CLI emulator providing quick access to experience records, technical certifications, skill breakdowns, and contact options.
- Internationalization: Native client-side bilingual translation (ES/EN) persisted across sessions using localStorage.
- Performance and Assets: Bundled with Vite 6. Images are pre-processed and optimized into WebP formats, critical styles are inlined, and caching headers are managed via Cloudflare Pages `_headers`.

---

## Repository Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated build validation on PRs and pushes
├── functions/                   # Cloudflare Pages Functions (Edge API handlers)
├── public/                      # Static assets, Web App Manifest, robots.txt, icons
├── scripts/                     # Build tools (favicon generation, asset verification)
├── src/                         # Core styles, terminal emulator logic, and interactive modules
├── index.html                   # Main single-page application entry point
├── package.json                 # Project dependencies and build scripts
├── vite.config.js               # Bundler configuration
└── wrangler.toml                # Cloudflare Pages configuration
```

---

## Branching Model

This repository follows a clean GitFlow branching strategy:

- `main`: The production branch. Pushes to this branch reflect what is deployed live on the primary domain.
- `develop`: The active integration branch. New features, UI refinements, and content updates are merged here first for testing.
- `feature/*`: Short-lived branches created for specific improvements before opening a pull request to `develop`.

---

## Local Development

### Requirements
- Node.js 20 or higher
- npm

### Installation and Setup

```bash
# Clone the repository
git clone https://github.com/atrumin16/portfolio.git
cd portfolio

# Switch to the development branch
git checkout develop

# Install dependencies
npm install

# Start the Vite local development server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Production Build and Verification

```bash
# Verify TypeScript / modules and build production artifacts
npm run build

# Preview the production build locally
npm run preview

# Deploy manually to Cloudflare Pages (requires wrangler login)
npm run deploy
```

---

## License

Copyright (c) 2026 Alberto Trujillo Mingorance. Released under the MIT License.
