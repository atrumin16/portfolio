export function initDarkMode() {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');

    const savedMode = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDark = false;
    if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
        isDark = true;
    }

    const applyTheme = (dark) => {
        if (dark) {
            document.body.classList.add('dark');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light-mode');
        }
        toggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (dark) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    };

    applyTheme(isDark);

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            isDark = !isDark;
            applyTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    });
}
