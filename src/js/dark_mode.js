document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body; // Usamos `document.body` para manipular el body directamente
    const heroSection = document.getElementById("hero-background");

    // Función para activar el modo oscuro
    const activateDarkMode = () => {
        // Añadir las clases para modo oscuro globalmente
        body.classList.add("dark", "text-white", "bg-gray-900");

        // Asegurarse de que el título siempre sea blanco
        const titles = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        titles.forEach(title => {
            title.classList.add("text-white");  // Aseguramos que todos los títulos sean blancos
            title.classList.remove("text-black");
        });

        // Asegurarse de que "SysAdmin" siempre sea blanco
        const sysAdminText = document.querySelector("p"); // Suponiendo que el texto "SysAdmin" está en un <p>
        if (sysAdminText) {
            sysAdminText.classList.add("text-white");
            sysAdminText.classList.remove("text-black");
        }

        // Cambiar el fondo de la sección hero cuando se activa el modo oscuro
        if (heroSection) {
            heroSection.style.backgroundImage = "url('assets/images/fons-dark.jpg')"; // Aquí puedes poner la imagen para el fondo oscuro
        }

        // Aplicar fondo y texto blanco a todas las secciones, excepto proyectos y habilidades
        document.querySelectorAll("section").forEach((section, index) => {
            section.classList.add(index % 2 === 0 ? "bg-gray-900" : "bg-gray-800");
            section.classList.remove("bg-white", "bg-gray-50");

            // Asegurarse de que todo el texto dentro de la sección sea blanco, excepto proyectos y habilidades
            section.querySelectorAll("*").forEach(element => {
                if (section.id !== "proyectos" && section.id !== "habilidades") {
                    element.classList.add("text-white");
                    element.classList.remove("text-black", "text-gray-700", "text-gray-600");
                }
                element.classList.add("text-lg");
            });

            if (section.id === "habilidades") {
                const habilidadTitle = section.querySelector("h2");
                if (habilidadTitle) {
                    habilidadTitle.classList.add("text-white");
                    habilidadTitle.classList.remove("text-black");
                }
            }
        });

        // Cambiar el icono del modo oscuro a sol
        const darkModeIcon = document.getElementById("dark-mode-icon");
        darkModeIcon.classList.replace("fa-moon", "fa-sun");

        // Corregir el tamaño de los iconos en "Sobre mí"
        const sobreMiIcons = document.querySelectorAll(".sobre-mi-icon");
        sobreMiIcons.forEach(icon => {
            icon.classList.remove("text-sm");  // Eliminar el tamaño pequeño
            icon.classList.add("text-xl"); // Volver a un tamaño más grande
        });

        // Guardar la preferencia en localStorage
        localStorage.setItem("dark-mode", "enabled");
    };

    // Función para desactivar el modo oscuro
    const deactivateDarkMode = () => {
        // Eliminar las clases de modo oscuro globalmente
        body.classList.remove("dark", "text-white", "bg-gray-900");

        // Asegurarse de que el título siempre sea blanco
        const titles = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        titles.forEach(title => {
            title.classList.remove("text-white");  // Eliminar clase blanca
            title.classList.add("text-black");  // Asegurar que los títulos sean negros en modo claro
        });

        // Asegurarse de que "SysAdmin" sea negro en modo claro
        const sysAdminText = document.querySelector("p"); // Suponiendo que el texto "SysAdmin" está en un <p>
        if (sysAdminText) {
            sysAdminText.classList.remove("text-white");
            sysAdminText.classList.add("text-black");
        }

        // Cambiar el fondo de la sección hero cuando se desactiva el modo oscuro
        if (heroSection) {
            heroSection.style.backgroundImage = "url('assets/images/fons.jpg')"; // Aquí puedes poner la imagen para el fondo claro
        }

        // Restablecer el fondo blanco en las secciones
        document.querySelectorAll("section").forEach((section, index) => {
            section.classList.add(index % 2 === 0 ? "bg-white" : "bg-gray-50");
            section.classList.remove("bg-gray-900", "bg-gray-800");

            section.querySelectorAll("*").forEach(element => {
                if (section.id !== "proyectos" && section.id !== "habilidades") {
                    element.classList.add("text-black");
                    element.classList.remove("text-white");
                }
                element.classList.add("text-lg");
            });

            if (section.id === "habilidades") {
                const habilidadTitle = section.querySelector("h2");
                if (habilidadTitle) {
                    habilidadTitle.classList.add("text-black");
                    habilidadTitle.classList.remove("text-white");
                }
            }
        });

        // Cambiar el icono del modo oscuro a luna
        const darkModeIcon = document.getElementById("dark-mode-icon");
        darkModeIcon.classList.replace("fa-sun", "fa-moon");

        // Corregir el tamaño de los iconos en "Sobre mí"
        const sobreMiIcons = document.querySelectorAll(".sobre-mi-icon");
        sobreMiIcons.forEach(icon => {
            icon.classList.remove("text-sm");  // Eliminar el tamaño pequeño
            icon.classList.add("text-xl"); // Volver a un tamaño más grande
        });

        // Guardar la preferencia en localStorage
        localStorage.setItem("dark-mode", "disabled");
    };

    // Comprobar si ya hay preferencia guardada en localStorage
    const currentMode = localStorage.getItem("dark-mode");
    if (currentMode === "enabled") {
        activateDarkMode(); // Si está habilitado, activar el modo oscuro
    } else {
        deactivateDarkMode(); // Si no está habilitado, mantener el modo claro
    }

    // Escuchar el evento de clic en el botón de cambio de modo
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            if (body.classList.contains("dark")) {
                deactivateDarkMode(); // Desactivar el modo oscuro
            } else {
                activateDarkMode(); // Activar el modo oscuro
            }
        });
    }
});
