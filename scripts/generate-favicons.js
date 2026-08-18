import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the clean, modern, minimalist SVG favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c1322"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  
  <!-- Sleek rounded squircle background for high-contrast on light/dark surfaces & Google search -->
  <rect x="0" y="0" width="512" height="512" rx="116" fill="url(#bgGrad)"/>
  <rect x="10" y="10" width="492" height="492" rx="106" fill="none" stroke="url(#borderGrad)" stroke-width="8"/>
  
  <!-- Subtle Minimalist Geometric AT Glyph (SysAdmin & Security identity) -->
  <g>
    <!-- Letter A -->
    <path d="M 124 366 L 214 146 C 218 136 228 130 239 130 C 250 130 260 136 264 146 L 314 268" 
          fill="none" 
          stroke="url(#cyanGrad)" 
          stroke-width="38" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
    <path d="M 166 286 L 286 286" 
          fill="none" 
          stroke="url(#cyanGrad)" 
          stroke-width="34" 
          stroke-linecap="round"/>
          
    <!-- Letter T (integrated with high legibility) -->
    <path d="M 284 148 L 416 148" 
          fill="none" 
          stroke="url(#whiteGrad)" 
          stroke-width="38" 
          stroke-linecap="round"/>
    <path d="M 350 148 L 350 366" 
          fill="none" 
          stroke="url(#whiteGrad)" 
          stroke-width="38" 
          stroke-linecap="round"/>
  </g>
</svg>`;

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // 1. Write favicon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
  console.log('✓ Created public/favicon.svg');

  const svgBuffer = Buffer.from(svgContent);

  // 2. Write 48x48 PNG (Google Favicon specific requirement)
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('✓ Created public/favicon-48x48.png (for Google Search)');

  // 3. Write 32x32 PNG
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Created public/favicon-32x32.png');

  // 4. Write 192x192 PNG (PWA / Android)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'favicon-192x192.png'));
  console.log('✓ Created public/favicon-192x192.png');

  // 5. Write 512x512 PNG (PWA High-DPI)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'favicon-512x512.png'));
  console.log('✓ Created public/favicon-512x512.png');

  // 6. Write apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // 7. Write standard ICO file
  const ico48Buffer = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico48Buffer);
  console.log('✓ Created public/favicon.ico');
  
  // Also copy to assets/images/favicon.ico for backward-compatibility
  const assetsImgDir = path.join(publicDir, 'assets', 'images');
  if (fs.existsSync(assetsImgDir)) {
    fs.writeFileSync(path.join(assetsImgDir, 'favicon.ico'), ico48Buffer);
    console.log('✓ Updated public/assets/images/favicon.ico');
  }

  // 8. Write site.webmanifest
  const manifest = {
    name: "Alberto Trujillo - Portfolio",
    short_name: "Alberto Trujillo",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#0c1322",
    background_color: "#0c1322",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('✓ Created public/site.webmanifest');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
