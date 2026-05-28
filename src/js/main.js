/**
 * Alternar entre modo oscuro y claro con animaciones y personalización avanzada.
 */

const toggleDarkModeButton = document.getElementById("dark-mode-toggle");
const darkModeIcon = document.getElementById("dark-mode-icon");
const body = document.body;
const root = document.documentElement;

// Verificar preferencias del sistema operativo
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Obtener preferencia del usuario desde localStorage
const userPreference = localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");

// Aplicar el tema almacenado o el predeterminado
if (userPreference === "dark") {
    enableDarkMode();
} else {
    disableDarkMode();
}

/**
 * Función para activar el modo oscuro
 */
function enableDarkMode() {
    body.classList.add("dark");
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
    toggleDarkModeButton.setAttribute("aria-label", "Activar modo claro");
    localStorage.setItem("theme", "dark");
    applyDarkModeStyles();
}

/**
 * Función para desactivar el modo oscuro
 */
function disableDarkMode() {
    body.classList.remove("dark");
    darkModeIcon.classList.remove("fa-sun");
    darkModeIcon.classList.add("fa-moon");
    toggleDarkModeButton.setAttribute("aria-label", "Activar modo oscuro");
    localStorage.setItem("theme", "light");
    applyLightModeStyles();
}

// Evento para cambiar el tema
toggleDarkModeButton.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

/**
 * Aplica estilos avanzados para modo oscuro
 */
function applyDarkModeStyles() {
    root.style.setProperty("--background-color", "#121212");
    root.style.setProperty("--text-color", "#ffffff");
    root.style.setProperty("--accent-color", "#bb86fc");
    animateTransition();
}

/**
 * Aplica estilos avanzados para modo claro
 */
function applyLightModeStyles() {
    root.style.setProperty("--background-color", "#ffffff");
    root.style.setProperty("--text-color", "#000000");
    root.style.setProperty("--accent-color", "#6200ea");
    animateTransition();
}

/**
 * Añade una animación de transición al cambiar de modo
 */
function animateTransition() {
    body.classList.add("theme-transition");
    setTimeout(() => {
        body.classList.remove("theme-transition");
    }, 500);
}

// CSS para animaciones de transición
const style = document.createElement("style");
style.textContent = `
    .theme-transition {
        transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
    }

    .dark {
        background-color: var(--background-color);
        color: var(--text-color);
    }

    button {
        background-color: var(--accent-color);
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    button:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
