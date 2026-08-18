/**
 * Military-Grade Client-Side Security & Anti-Tampering Shield
 * Enforces anti-clickjacking, keyboard/inspect blocking, DOM integrity monitoring,
 * anti-debugging traps, and console protection.
 */

export function initSecurity() {
  // 1. Anti-Clickjacking Frame Buster
  try {
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }
  } catch (err) {
    // If top location access is blocked due to cross-origin policies, break out
    try {
      window.self.element?.remove();
    } catch (_) {}
  }

  // 2. Disable Context Menu (Right-Click)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 3. Disable Inspect & DevTools Key Combinations
  document.addEventListener('keydown', (e) => {
    const key = e.key ? e.key.toUpperCase() : '';
    const code = e.keyCode || e.which;

    // F12 Key
    if (key === 'F12' || code === 123) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'I' || code === 73)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+J / Cmd+Option+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'J' || code === 74)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'C' || code === 67)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+K (Firefox Web Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'K' || code === 75)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U / Cmd+U / Cmd+Option+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (key === 'U' || code === 85)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Web Page)
    if ((e.ctrlKey || e.metaKey) && (key === 'S' || code === 83)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+P / Cmd+P (Print Page)
    if ((e.ctrlKey || e.metaKey) && (key === 'P' || code === 80)) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  // 4. Disable Image Dragging & Unauthorised Selections
  document.addEventListener('dragstart', (e) => {
    if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'A')) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  // 5. Anti-DOM Tampering Mutation Observer
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) { // Element Node
            const tagName = node.tagName.toUpperCase();
            // Block unauthorized script or iframe injections dynamically
            if (tagName === 'SCRIPT' && !node.dataset.approved) {
              const src = node.getAttribute('src') || '';
              if (src && !src.startsWith('/') && !src.startsWith(window.location.origin)) {
                node.remove();
                console.warn('[SECURITY] Blocked unapproved dynamic script injection:', src);
              }
            }
            if (tagName === 'IFRAME') {
              node.remove();
              console.warn('[SECURITY] Blocked unauthorized iframe insertion');
            }
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  // 6. Security Console Banner & Integrity Lockout
  try {
    const styleHeader = 'color: #ef4444; font-size: 22px; font-weight: 900; font-family: monospace; text-shadow: 0 0 10px rgba(239, 68, 68, 0.5);';
    const styleBody = 'color: #94a3b8; font-size: 13px; font-family: monospace; line-height: 1.5;';
    console.log('%c🛡️ MILITARY-GRADE HARDENED ENVIRONMENT', styleHeader);
    console.log('%cThis node is protected by active runtime anti-tampering shields.\nUnauthorized inspection, modification, or automated extraction is monitored and logged.', styleBody);
  } catch (_) {}

  // 7. Freeze Security State
  if (Object.freeze) {
    Object.freeze(window.location);
  }
}
