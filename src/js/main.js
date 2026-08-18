import './i18n.js';
import { initI18n } from './i18n.js';
import { initDarkMode } from './darkmode.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initContact } from './contact.js';
import { initTerminal } from './terminal.js';
import { initProjects } from './projects.js';
import { initSecurity } from './security.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    initDarkMode();
    initAnimations();
    initNavigation();
    initContact();
    initTerminal();
    initProjects();
    initSecurity();
});
