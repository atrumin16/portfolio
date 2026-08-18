/**
 * Projects Filtering & Interactive Clipboard Actions
 */

export function initProjects() {
  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategories = (card.getAttribute('data-category') || '').split(' ');
          if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px) scale(0.98)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // Copy Email to Clipboard
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'alberto@trujillomingorance.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast(
          document.documentElement.lang === 'ca' ? '📋 Correu copiat al porta-retalls!' :
          document.documentElement.lang === 'en' ? '📋 Email copied to clipboard!' :
          '📋 ¡Email copiado al portapapeles!'
        );
      } catch (err) {
        console.error('Copy error:', err);
      }
    });
  });

  // Stack Category Tabs (if present)
  const stackTabs = document.querySelectorAll('.stack-tab');
  const stackGroups = document.querySelectorAll('.stack-group');

  if (stackTabs.length > 0 && stackGroups.length > 0) {
    stackTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        stackTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetGroup = tab.getAttribute('data-stack');

        stackGroups.forEach(group => {
          if (targetGroup === 'all' || group.getAttribute('data-stack-group') === targetGroup) {
            group.style.display = 'block';
          } else {
            group.style.display = 'none';
          }
        });
      });
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'portfolio-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
