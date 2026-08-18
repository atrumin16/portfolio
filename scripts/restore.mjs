import fs from 'fs';

const originalCss = fs.readFileSync('restored_styles.css', 'utf8');
let originalHtml = fs.readFileSync('restored_index.html', 'utf8');

// Replace old favicon lines with new high-res favicon declarations
const oldFaviconBlock = `    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate icon" type="image/png" href="/assets/images/favicon.ico">`;

const newFaviconBlock = `    <!-- Favicon & PWA Icons (Optimized for Google Search & High-DPI Displays) -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#0c1322">`;

if (originalHtml.includes(oldFaviconBlock)) {
  originalHtml = originalHtml.replace(oldFaviconBlock, newFaviconBlock);
} else {
  // If exact whitespace differed, replace by regex
  originalHtml = originalHtml.replace(
    /<!-- Favicon -->[\s\S]*?<link rel="alternate icon"[^>]*>/,
    newFaviconBlock
  );
}

fs.writeFileSync('src/css/styles.css', originalCss, 'utf8');
fs.writeFileSync('index.html', originalHtml, 'utf8');

if (fs.existsSync('restored_styles.css')) fs.unlinkSync('restored_styles.css');
if (fs.existsSync('restored_index.html')) fs.unlinkSync('restored_index.html');

console.log('✓ Successfully restored original visual design while preserving new Google favicon suite!');
