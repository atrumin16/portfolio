export function initNavigation() {
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.site-header');
    const menuIcon = hamburger ? hamburger.querySelector('i') : null;

    const closeMobileMenu = () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isOpen);
            document.body.classList.toggle('nav-open', isOpen);
            
            if (menuIcon) {
                if (isOpen) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Reset on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Active link highlighting & Navbar background
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Legal Modal Logic
    const legalTriggers = document.querySelectorAll('.legal-trigger');
    const legalModal = document.getElementById('legal-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalContent = document.getElementById('modal-content');

    const modalData = {
        privacy: {
            es: `
                <h3>🔒 Política de Privacidad & Protección de Datos</h3>
                <p><strong>Responsable:</strong> Alberto Trujillo Mingorance (alberto@trujillomingorance.com)</p>
                <p>De conformidad con el Reglamento General de Protección de Datos (RGPD UE 2016/679) y la LOPDGDD 3/2018, los datos personales facilitados a través del formulario de contacto son tratados con la única finalidad de responder a consultas profesionales y propuestas laborales.</p>
                <p>Los datos no serán cedidos a terceros ni utilizados para fines comerciales. Puedes ejercer tus derechos de acceso, rectificación, supresión y oposición enviando un correo a alberto@trujillomingorance.com.</p>
            `,
            ca: `
                <h3>🔒 Política de Privacitat i Protecció de Dades</h3>
                <p><strong>Responsable:</strong> Alberto Trujillo Mingorance (alberto@trujillomingorance.com)</p>
                <p>De conformitat amb el Reglament General de Protecció de Dades (RGPD UE 2016/679) i la LOPDGDD 3/2018, les dades personals facilitades a través del formulari de contacte són tractades amb la única finalitat de respondre a consultes professionals i propostes laborals.</p>
                <p>Les dades no seran cedides a tercers ni utilitzades per a fins comercials. Pots exercir els teus drets d'accés, rectificació, supressió i oposició enviant un correu a alberto@trujillomingorance.com.</p>
            `,
            en: `
                <h3>🔒 Privacy Policy & Data Protection</h3>
                <p><strong>Controller:</strong> Alberto Trujillo Mingorance (alberto@trujillomingorance.com)</p>
                <p>In accordance with the General Data Protection Regulation (GDPR EU 2016/679), personal data provided via the contact form is processed solely for responding to professional inquiries and job opportunities.</p>
                <p>Data will not be shared with third parties or used for commercial purposes. You may exercise your rights of access, rectification, erasure, and objection by emailing alberto@trujillomingorance.com.</p>
            `
        },
        terms: {
            es: `
                <h3>📜 Términos y Condiciones de Uso</h3>
                <p>El presente sitio web constituye el portfolio profesional oficial de Alberto Trujillo Mingorance. Todos los contenidos, código fuente, logotipos y diseños exhibidos son propiedad intelectual protegida.</p>
                <p>Queda prohibida la reproducción no autorizada, modificación o raspado automatizado con fines maliciosos. Toda la infraestructura opera sobre estándares de seguridad Cloudflare Pages con cifrado SSL de 256 bits.</p>
            `,
            ca: `
                <h3>📜 Termes i Condicions d'Ús</h3>
                <p>Aquest lloc web constitueix el portfolio professional oficial d'Alberto Trujillo Mingorance. Tots els continguts, codi font, logotips i dissenys exhibits són propietat intel·lectual protegida.</p>
                <p>Queda prohibida la reproducció no autoritzada, modificació o rascat automatitzat amb fins maliciosos. Tota la infraestructura opera sobre estàndards de seguretat Cloudflare Pages amb xifrat SSL de 256 bits.</p>
            `,
            en: `
                <h3>📜 Terms and Conditions of Use</h3>
                <p>This website represents the official professional portfolio of Alberto Trujillo Mingorance. All content, source code, logos, and design elements displayed are protected intellectual property.</p>
                <p>Unauthorized reproduction, modification, or automated scraping for malicious purposes is prohibited. All infrastructure operates on Cloudflare Pages security standards with 256-bit SSL encryption.</p>
            `
        },
        compliance: {
            es: `
                <h3>♿ Certificación Oficial de Discapacidad (>33%)</h3>
                <p>Alberto Trujillo Mingorance cuenta con un <strong>Certificado Oficial de Discapacidad acreditado superior al 33%</strong> emitido por el organismo público competente.</p>
                <p><strong>Ventajas de Contratación para Empleadores:</strong></p>
                <ul>
                    <li>Acceso a medidas de fomento del empleo e incentivos a la contratación indefinida o temporal.</li>
                    <li>Bonificaciones de hasta 4.500€/año en las cuotas patronales a la Seguridad Social (Ley 43/2006).</li>
                    <li>Cumplimiento directo de la cuota de reserva del 2% en empresas de 50 o más trabajadores (LISMI / LGD).</li>
                    <li>Garantía de adaptabilidad técnica y compromiso profesional absoluto.</li>
                </ul>
            `,
            ca: `
                <h3>♿ Certificació Oficial de Discapacitat (>33%)</h3>
                <p>Alberto Trujillo Mingorance compta amb un <strong>Certificat Oficial de Discapacitat acreditat superior al 33%</strong> emès per l'organisme públic competent.</p>
                <p><strong>Avantatges de Contractació per a Ocupadors:</strong></p>
                <ul>
                    <li>Accés a mesures de foment de l'ocupació i incentius a la contractació indefinida o temporal.</li>
                    <li>Bonificacions de fins a 4.500€/any en les quotes patronals a la Seguretat Social (Llei 43/2006).</li>
                    <li>Compliment directe de la quota de reserva del 2% en empreses de 50 o més treballadors (LISMI / LGD).</li>
                    <li>Garantia d'adaptabilitat tècnica i compromís professional absolut.</li>
                </ul>
            `,
            en: `
                <h3>♿ Official Disability Certification (>33%)</h3>
                <p>Alberto Trujillo Mingorance holds an <strong>Official Disability Certificate (>33%)</strong> issued by the authorized public authority.</p>
                <p><strong>Hiring Benefits for Employers:</strong></p>
                <ul>
                    <li>Access to employment promotion incentives for permanent or temporary contracts.</li>
                    <li>Social Security contribution tax deductions of up to €4,500/year (Law 43/2006).</li>
                    <li>Direct compliance with the 2% quota reservation for companies with 50+ employees (LISMI / LGD).</li>
                    <li>Guaranteed technical adaptability and complete professional commitment.</li>
                </ul>
            `
        }
    };

    if (legalTriggers && legalModal && modalContent) {
        legalTriggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = btn.getAttribute('data-modal');
                const lang = document.documentElement.lang || 'es';
                if (modalData[type]) {
                    const html = modalData[type][lang] || modalData[type]['es'];
                    modalContent.innerHTML = html;
                    legalModal.classList.remove('hidden');
                }
            });
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                legalModal.classList.add('hidden');
            });
        }

        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) {
                legalModal.classList.add('hidden');
            }
        });
    }
}
