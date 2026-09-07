# 🚀 Alberto Trujillo Mingorance — Engineering Portfolio

[![Status](https://img.shields.io/badge/Status-Production%20Live-emerald?style=flat-square)](https://alberto.trujillomingorance.com)
[![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Pages-f38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions)](https://github.com/atrumin16/portfolio/actions)
[![Bundler](https://img.shields.io/badge/Bundler-Vite%206-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Theme](https://img.shields.io/badge/Theme-Corporate%20Dark%20Slate-0ea5e9?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-Proprietary-blue?style=flat-square)](#)

> **Official personal portfolio & systems security engineering showcase.**  
> High-performance responsive web application built with modern web standards, featuring interactive terminal emulation, bilingual technical documentation, corporate glassmorphic design system, and edge-native performance on Cloudflare Pages.

---

## 🌐 Production URL & Infrastructure

- **Live Production Domain:** [alberto.trujillomingorance.com](https://alberto.trujillomingorance.com)
- **Edge CDN Host:** Cloudflare Pages Anycast Network
- **CI / Quality Checks:** GitHub Actions (Automated Vite build validation on `main` & `develop`)

---

## 📁 Repository Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated build & verification pipeline
├── functions/                   # Cloudflare Pages Functions (Edge API)
├── public/                      # Static assets, favicons, manifests & robots.txt
├── scripts/                     # Build-time helpers & icon generation
├── src/                         # Application logic, styles & interactive terminal
├── index.html                   # Semantic HTML5 entry point
├── package.json                 # Project manifest & npm scripts
├── vite.config.js               # Bundler configuration
└── wrangler.toml                # Cloudflare Pages deployment configuration
```

---

## 🌿 Enterprise Branching Model

This repository adheres to standard GitFlow principles:

| Branch | Purpose | Deployment Trigger |
| :--- | :--- | :--- |
| `main` | **Production Release** | Automatic production deploy to `alberto.trujillomingorance.com` |
| `develop` | **Staging & Integration** | Automated CI verification & staging preview builds |
| `feature/*` | Feature development | Targeted PRs merged into `develop` |

---

## ✨ Core Capabilities

- **🎨 Unified Corporate Design System:** Deep slate-navy tokens (`#080c14`), frosted glass mica layering, smooth border gradients, and high-contrast typography.
- **⚡ Zero-Lag Vite Performance:** Bundled and optimized via Vite 6 with asset minification, critical CSS inlining, and WebP/AVIF responsive images.
- **💻 Interactive Edge Terminal:** Embedded interactive CLI console showcasing skills, experience, certifications, and project links.
- **🌍 Internationalization (i18n):** Native bilingual switching (English & Spanish) with persistent user preference storage.
- **🛡️ Security Standards:** Strictly enforced Content Security Policy (CSP), automated cache headers, and DNSSEC validation.

---

## 💻 Local Development

### Prerequisites
- Node.js 20+
- npm

### Setup
```bash
# Clone the repository
git clone https://github.com/atrumin16/portfolio.git
cd portfolio

# Switch to development branch
git checkout develop

# Install dependencies
npm install

# Run development server
npm run dev
```

### Production Build & Deploy
```bash
# Compile and bundle static distribution
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

---

## 📄 License & Ownership

© 2026 Alberto Trujillo Mingorance. All rights reserved. Private and confidential.
