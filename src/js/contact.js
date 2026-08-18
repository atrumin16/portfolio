export function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const icon = document.createElement('i');
    icon.className = `fas ${iconClass}`;
    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    toast.appendChild(icon);
    toast.appendChild(textSpan);
    
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3500);
}

export function initContact() {
    // Copy Email button logic
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = 'alberto@trujillomingorance.com';
            navigator.clipboard.writeText(email).then(() => {
                const lang = document.documentElement.lang || 'es';
                const msg = lang === 'ca' ? 'Email copiat al portapapers!' :
                            lang === 'en' ? 'Email copied to clipboard!' :
                            '¡Email copiado al portapapeles!';
                showToast(msg, 'success');
            }).catch(() => {
                showToast('alberto@trujillomingorance.com', 'success');
            });
        });
    });

    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalBtnText = btn ? btn.innerHTML : '';
        const formStatus = document.getElementById('form-feedback');

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
        }

        if (formStatus) {
            formStatus.classList.add('hidden');
            formStatus.className = 'form-feedback hidden';
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const successMsg = document.documentElement.lang === 'ca' ? 'Missatge enviat correctament!' : 
                                   document.documentElement.lang === 'en' ? 'Message sent successfully!' :
                                   '¡Mensaje enviado correctamente!';
                if (formStatus) {
                    formStatus.textContent = successMsg;
                    formStatus.className = 'form-feedback success';
                }
                showToast(successMsg, 'success');
                form.reset();
            } else {
                throw new Error(result.error || 'Server error');
            }
        } catch (error) {
            const errorMsg = error.message && error.message !== 'Server error' ? error.message :
                             (document.documentElement.lang === 'ca' ? 'Error en enviar. Torna-ho a provar.' :
                             document.documentElement.lang === 'en' ? 'Error sending message. Please try again.' :
                             'Error al enviar. Inténtalo de nuevo.');
            if (formStatus) {
                formStatus.textContent = errorMsg;
                formStatus.className = 'form-feedback error';
            }
            showToast(errorMsg, 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalBtnText;
            }
        }
    });
}
