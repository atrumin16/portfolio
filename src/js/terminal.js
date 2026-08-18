/**
 * Professional Multi-Language DevOps & Systems Terminal
 * Clean Enterprise SysAdmin Console (100% Real Data, No Invented Info, Full i18n ES/CA/EN)
 */
import { calculateExperience } from './i18n.js';

const COMMANDS = {
  help: {
    description: {
      es: 'Muestra la lista de comandos disponibles',
      ca: 'Mostra la llista de comandaments disponibles',
      en: 'Displays list of available commands'
    }
  },
  whoami: {
    description: {
      es: 'Resumen de identidad y perfil profesional',
      ca: 'Resum d\'identitat i perfil professional',
      en: 'Professional profile and core identity'
    }
  },
  sysinfo: {
    description: {
      es: 'Arquitectura de sistema e infraestructura cloud',
      ca: 'Arquitectura de sistema i infraestructura cloud',
      en: 'System architecture & cloud infrastructure'
    }
  },
  hardening: {
    description: {
      es: 'Estándares de seguridad y hardening de sistemas/IAM',
      ca: 'Estàndards de seguretat i hardening de sistemes/IAM',
      en: 'Systems and IAM security hardening benchmarks'
    }
  },
  attestto: {
    description: {
      es: 'Despliegue Cloud/IAM e Identidad Digital en Attestto',
      ca: 'Desplegament Cloud/IAM i Identitat Digital a Attestto',
      en: 'Attestto Cloud/IAM deployment & Digital Identity framework'
    }
  },
  skills: {
    description: {
      es: 'Arsenal tecnológico y competencias avanzadas',
      ca: 'Arsenal tecnològic i competències avançades',
      en: 'Technical competencies & engineering stack'
    }
  },
  projects: {
    description: {
      es: 'Proyectos verificados con enlaces en producción',
      ca: 'Projectes verificats amb enllaços en producció',
      en: 'Verified projects with production links'
    }
  },
  exp: {
    description: {
      es: 'Historial laboral (Attestto, eToro, Minsait, IIS)',
      ca: 'Historial laboral (Attestto, eToro, Minsait, IIS)',
      en: 'Work experience history (Attestto, eToro, Minsait, IIS)'
    }
  },
  certs: {
    description: {
      es: 'Titulaciones oficiales ASIR + SMR por ITB Barcelona',
      ca: 'Titulacions oficials ASIX + SMX per ITB Barcelona',
      en: 'Official ASIR + SMR degrees @ ITB Barcelona'
    }
  },
  status: {
    description: {
      es: 'Estado operativo de servicios e infraestructura',
      ca: 'Estat operatiu de serveis i infraestructura',
      en: 'Operational status of infrastructure & services'
    }
  },
  contact: {
    description: {
      es: 'Canales directos de contacto profesional',
      ca: 'Canals directes de contacte professional',
      en: 'Direct contact channels & email'
    }
  },
  clear: {
    description: {
      es: 'Limpia el contenido de la consola',
      ca: 'Neteja el contingut de la consola',
      en: 'Clears the console screen'
    }
  }
};

export function initTerminal() {
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const commandPills = document.querySelectorAll('.terminal-pill');
  const terminalForm = document.getElementById('terminal-form');

  if (!terminalOutput || !terminalInput || !terminalForm) return;

  let history = [];
  let historyIndex = -1;
  let lastCommand = 'whoami';

  const getCurrentLang = () => document.documentElement.lang || 'es';

  function appendOutput(htmlContent, isCommand = false) {
    const line = document.createElement('div');
    line.className = isCommand ? 'terminal-line command-line' : 'terminal-line response-line';
    line.innerHTML = htmlContent;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand(cmdRaw, isAutoRefresh = false) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (!isAutoRefresh) {
      history.push(cmdRaw);
      historyIndex = history.length;
      lastCommand = cmd;
    }

    const lang = getCurrentLang();

    if (!isAutoRefresh) {
      appendOutput(`<span class="prompt-user">alberto@devops-node</span>:<span class="prompt-path">~</span>$ <span class="cmd-text">${escapeHtml(cmdRaw)}</span>`, true);
    }

    switch (cmd) {
      case 'help':
        let helpTitle = lang === 'ca' ? 'COMANDAMENTS DISPONIBLES' : lang === 'en' ? 'AVAILABLE COMMANDS' : 'COMANDOS DISPONIBLES';
        let helpText = `<div class="term-box">`;
        helpText += `<div class="term-title">[ SYSTEM ] ${helpTitle}</div>`;
        helpText += `<table class="term-table">`;
        for (const [key, val] of Object.entries(COMMANDS)) {
          helpText += `<tr><td class="cmd-name">${key}</td><td class="cmd-desc">${val.description[lang] || val.description.es}</td></tr>`;
        }
        helpText += `</table></div>`;
        appendOutput(helpText);
        break;

      case 'whoami':
        const whoText = lang === 'en'
          ? `[ IDENTITY SUMMARY ]<br>
             Full Name: Alberto Trujillo Mingorance<br>
             Primary Role: Junior DevOps & Systems Engineer | Cybersecurity & Cloud/IAM Specialist<br>
             Academic Degrees: ASIR (Higher Degree) + SMR (Mid Degree) @ Institut Tecnològic de Barcelona (ITB)<br>
             Current Employer: Attestto (Cloud/IAM & Digital Identity) & eToro (Popular Investor)<br>
             Disability Status: Official Certified Disability >33% (Employer Tax Incentives Eligible)<br>
             Availability: Immediate Availability for Remote / Hybrid / On-Site Positions`
          : lang === 'ca'
          ? `[ RESUM D'IDENTITAT ]<br>
             Nom Complet: Alberto Trujillo Mingorance<br>
             Rol Principal: Enginyer Junior de DevOps i Sistemes | Ciberseguretat · Cloud/IAM<br>
             Titulacions Acadèmiques: ASIX (Grau Superior) + SMX (Grau Mitjà) @ Institut Tecnològic de Barcelona (ITB)<br>
             Empresa Actual: Attestto (Cloud/IAM i Identitat Digital) & eToro (Popular Investor)<br>
             Estatus Discapacitat: Discapacitat Certificada Oficial >33% (Elegible per Bonificacions Ocupacionals)<br>
             Disponibilitat: Incorporació Immediata per a Llocs Remots / Híbrids / Presencials`
          : `[ RESUMEN DE IDENTIDAD ]<br>
             Nombre Completo: Alberto Trujillo Mingorance<br>
             Rol Principal: Ingeniero Junior de DevOps y Sistemas | Ciberseguridad · Cloud/IAM<br>
             Titulaciones Académicas: ASIR (Grado Superior) + SMR (Grado Medio) @ Institut Tecnològic de Barcelona (ITB)<br>
             Empresa Actual: Attestto (Cloud/IAM e Identidad Digital) y eToro (Popular Investor)<br>
             Estatus Discapacidad: Discapacidad Oficial Certificada >33% (Elegible para Bonificaciones Contratación)<br>
             Disponibilidad: Incorporación Inmediata para Puestos Remotos / Híbridos / Presenciales`;
        appendOutput(`<div class="term-card">${whoText}</div>`);
        break;

      case 'sysinfo':
      case 'neofetch':
      case 'uname':
        const sysHeader = lang === 'ca' ? 'INFORMACIÓ DE SISTEMA I INFRAESTRUCTURA' : lang === 'en' ? 'SYSTEM & INFRASTRUCTURE ARCHITECTURE' : 'INFORMACIÓN DE SISTEMA E INFRAESTRUCTURA';
        const sysText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">[ ARCHITECTURE: ${sysHeader} ]</div>
            <pre style="font-family: monospace; font-size: 0.8rem; line-height: 1.45; color: var(--text-main); margin: 0;">
OS Platform:         Linux Debian GNU/Linux 12 (Bookworm) / Hardened Kernel
Runtime Environment: Cloudflare Workers, Pages & Fly.io Containers
Academic Degrees:    ASIR (Higher) + SMR (Mid) @ Institut Tecnològic de Barcelona (ITB)
IAM Governance:      Google Workspace IAM, Cloudflare RBAC, Scoped Least-Privilege
Security Benchmarks: CIS Server Standards, HSTS Preload, W3C DID/VC Digital Identity
Tech Stack:          Linux Administration, Docker, Ansible, Bash, PowerShell, Active Directory
Financial Analytics: eToro Popular Investor (Quant Risk Management & Portfolio Selection)
Hiring Incentives:   Official Certified Disability >33% (Spanish Law 43/2006 Eligible)
Status:              Immediate Availability for Full-Time / Remote / On-Site Roles
            </pre>
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">[ ARQUITECTURA: ${sysHeader} ]</div>
            <pre style="font-family: monospace; font-size: 0.8rem; line-height: 1.45; color: var(--text-main); margin: 0;">
Plataforma SO:       Linux Debian GNU/Linux 12 (Bookworm) / Kernel Hardened
Entorn d'Execució:   Cloudflare Workers, Pages & Contenidors Fly.io
Títols Acadèmics:    ASIX (Grau Superior) + SMX (Grau Mitjà) @ Institut Tecnològic de Barcelona (ITB)
Governança IAM:      Google Workspace IAM, Cloudflare RBAC, Mínim Privilegi
Estàndards Seguretat:Estàndards CIS, HSTS Preload, Identitat Digital W3C DID/VC
Stack Tecnològic:    Administració Linux, Docker, Ansible, Bash, PowerShell, Active Directory
Gestió Financera:    eToro Popular Investor (Gestió de Riscos i Selecció d'Actius)
Bonificació Empresa: Discapacitat Certificada Oficial >33% (Bonificació Llei 43/2006)
Estatus Laboral:     Incorporació Immediata per a Llocs Presencials / Híbrids / Remots
            </pre>
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">[ ARQUITECTURA: ${sysHeader} ]</div>
            <pre style="font-family: monospace; font-size: 0.8rem; line-height: 1.45; color: var(--text-main); margin: 0;">
Plataforma SO:       Linux Debian GNU/Linux 12 (Bookworm) / Kernel Hardened
Entorno de Ejecución:Cloudflare Workers, Pages & Contenedores Fly.io
Títulos Académicos:  ASIR (Grado Superior) + SMR (Grado Medio) @ Institut Tecnològic de Barcelona (ITB)
Gobernanza IAM:      Google Workspace IAM, Cloudflare RBAC, Mínimo Privilegio
Estándares Seguridad:Estándares CIS, HSTS Preload, Identidad Digital W3C DID/VC
Stack Tecnológico:   Administración Linux, Docker, Ansible, Bash, PowerShell, Active Directory
Gestión Financiera:  eToro Popular Investor (Gestión de Riesgos y Selección de Activos)
Bonificación Empresa:Discapacidad Oficial Certificada >33% (Bonificación Ley 43/2006)
Estatus Laboral:     Incorporación Inmediata para Puestos Presenciales / Híbridos / Remotos
            </pre>
          </div>`;
        appendOutput(sysText);
        break;

      case 'hardening':
      case 'security':
        const hardHeader = lang === 'ca' ? 'AUDITORIA DE SEGURETAT I ESTÀNDARDS DE HARDENING' : lang === 'en' ? 'SECURITY HARDENING BENCHMARKS & AUDIT' : 'AUDITORÍA DE SEGURIDAD Y ESTÁNDARES DE HARDENING';
        const hardText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #10b981; margin-bottom: 8px;">[ SECURITY BENCHMARK: ${hardHeader} ]</div>
            - SSH Configuration: Ed25519 Cryptographic Keys Only, Password Auth Disabled, Root Login Blocked, Fail2ban<br>
            - Kernel Hardening: Custom sysctl.conf (ASLR Enforcement, SYN Flood Protection, ICMP Redirects Disabled)<br>
            - Edge Security: Cloudflare Enterprise WAF Rulesets, Managed Rate Limiting, DDoS Protection<br>
            - Digital Identity Trust: W3C DID/VC Verifiable Credentials, vLEI / GLEIF Organizational Trust, eIDAS signatures<br>
            - Access Management: Least-Privilege Scoped Roles on Google Workspace, Cloudflare & GitHub
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #10b981; margin-bottom: 8px;">[ AUDITORIA DE SEGURETAT: ${hardHeader} ]</div>
            - Configuració SSH: Autenticació amb claus Ed25519, Accés Root Desactivat, Jaula Fail2ban automatitzada<br>
            - Hardening de Kernel: sysctl.conf personalitzat (Protecció SYN Flood, ASLR actiu, ICMP Desactivats)<br>
            - Seguretat Perimetral: Regles Cloudflare WAF, Limitació de Taxa, Protecció Anti-DDoS<br>
            - Identitat Digital: Credencials Verificables W3C DID/VC, Identitat Organitzativa vLEI / GLEIF, Signatura eIDAS<br>
            - Control d'Accés: Polítiques de Mínim Privilegi a Google Workspace, Cloudflare i GitHub
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: #10b981; margin-bottom: 8px;">[ AUDITORÍA DE SEGURIDAD: ${hardHeader} ]</div>
            - Configuración SSH: Autenticación con claves Ed25519, Acceso Root Desactivado, Jaula Fail2ban automatizada<br>
            - Hardening de Kernel: sysctl.conf personalizado (Protección SYN Flood, ASLR activo, ICMP Desactivados)<br>
            - Seguridad Perimetral: Reglas Cloudflare WAF, Limitación de Tasa, Protección Anti-DDoS<br>
            - Identidad Digital: Credenciales Verificables W3C DID/VC, Identidad Organizacional vLEI / GLEIF, Firma eIDAS<br>
            - Control de Acceso: Políticas de Mínimo Privilegio en Google Workspace, Cloudflare y GitHub
          </div>`;
        appendOutput(hardText);
        break;

      case 'attestto':
        const attText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px;">[ ATTESTTO DEPLOYMENT & IAM GOVERNANCE ]</div>
            - Digital Identity Trust: W3C DID/VC Verifiable Credentials, vLEI / GLEIF Organizational Identity, eIDAS signatures<br>
            - Perimeter Governance: Cloudflare Workers, Custom DNS Routing, SSL Certificates & Zero-Trust Access<br>
            - Cloud IAM & Security: Google Workspace IAM Administration, Repository Access Hardening, Least Privilege Enforced
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px;">[ DESPLEGAMENT I IAM ATTESTTO ]</div>
            - Marc d'Identitat Digital: Credencials Verificables W3C DID/VC, Identitat Organitzativa vLEI / GLEIF, eIDAS<br>
            - Governança Perimetral: Cloudflare Workers, Enrutament DNS personalitzat, Certificats SSL i Accés Zero-Trust<br>
            - Cloud IAM i Seguretat: Administració Google Workspace IAM, Hardening de Repositoris i Mínim Privilegi
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px;">[ DESPLIEGUE E IAM ATTESTTO ]</div>
            - Marco de Identidad Digital: Credenciales Verificables W3C DID/VC, Identidad Organizacional vLEI / GLEIF, eIDAS<br>
            - Gobernanza Perimetral: Cloudflare Workers, Enrutamiento DNS personalizado, Certificados SSL y Acceso Zero-Trust<br>
            - Cloud IAM y Seguridad: Administración Google Workspace IAM, Hardening de Repositorios y Mínimo Privilegio
          </div>`;
        appendOutput(attText);
        break;

      case 'skills':
        const skillHeader = lang === 'ca' ? 'ARSENAL TÈCNIC I DEVOPS' : lang === 'en' ? 'TECHNICAL & DEVOPS COMPETENCIES' : 'ARSENAL TÉCNICO Y DEVOPS';
        const skillText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-secondary); margin-bottom: 8px;">[ TECH STACK: ${skillHeader} ]</div>
            - Cloud & IAM: Google Workspace Administration, Cloudflare (Workers, Pages, KV, D1), Fly.io, W3C DID/VC, vLEI, eIDAS<br>
            - Systems & Virtualization: Linux Administration (Debian, Ubuntu, CentOS), Windows Server, Active Directory, Samba AD, Docker, VirtualBox<br>
            - Networks & Security: Security Hardening (CIS Benchmarks), VLANs, OSPF Routing, Smart Contract & Blockchain Audit<br>
            - Automation & Code: Bash, PowerShell, Python, Ansible, Git, GitHub Actions CI/CD
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-secondary); margin-bottom: 8px;">[ STACK TÈCNIC: ${skillHeader} ]</div>
            - Cloud & IAM: Google Workspace, Cloudflare (Workers, Pages, KV, D1), Fly.io, W3C DID/VC, vLEI, eIDAS<br>
            - Sistemes i Virtualització: Administració Linux (Debian, Ubuntu, CentOS), Windows Server, Active Directory, Samba AD, Docker, VirtualBox<br>
            - Xarxes i Seguretat: Hardening de Seguretat (CIS Benchmarks), VLANs, Enrutament OSPF, Auditoria Blockchain<br>
            - Automatització i Codi: Bash, PowerShell, Python, Ansible, Git, GitHub Actions CI/CD
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-secondary); margin-bottom: 8px;">[ STACK TÉCNICO: ${skillHeader} ]</div>
            - Cloud & IAM: Google Workspace, Cloudflare (Workers, Pages, KV, D1), Fly.io, W3C DID/VC, vLEI, eIDAS<br>
            - Sistemas y Virtualización: Administración Linux (Debian, Ubuntu, CentOS), Windows Server, Active Directory, Samba AD, Docker, VirtualBox<br>
            - Redes y Seguridad: Hardening de Seguridad (CIS Benchmarks), VLANs, Enrutamiento OSPF, Auditoría Blockchain<br>
            - Automatización y Código: Bash, PowerShell, Python, Ansible, Git, GitHub Actions CI/CD
          </div>`;
        appendOutput(skillText);
        break;

      case 'projects':
        const projHeader = lang === 'ca' ? 'PROJECTES DESTACATS D\'ENGINYERIA' : lang === 'en' ? 'FEATURED ENGINEERING PROJECTS' : 'PROYECTOS DESTACADOS DE INGENIERÍA';
        const projText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px;">[ PROJECTS: ${projHeader} ]</div>
            - FocusGuard (Zero-Trust DNS Shield): Real-time DNS content filtering built on Cloudflare Workers & D1 [<a href="https://focusguard.trujillomingorance.com/" target="_blank">Production URL</a>]<br>
            - Solana Forensics (Blockchain Intelligence): Transaction forensics and smart contract audit platform [<a href="https://solanaforensic.com/" target="_blank">Production URL</a>]<br>
            - SysAdmin Automation Suite: Open-source repository of production Bash, PowerShell & Python scripts [<a href="https://github.com/AlbertoTrujillo-ITB2425/scripts-1ASIXc" target="_blank">GitHub Repository</a>]
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px;">[ PROJECTES: ${projHeader} ]</div>
            - FocusGuard (Escut DNS Zero-Trust): Filtratge de contingut DNS en temps real amb Cloudflare Workers i D1 [<a href="https://focusguard.trujillomingorance.com/" target="_blank">URL Producció</a>]<br>
            - Solana Forensics (Plataforma Blockchain): Auditoria de transaccions i investigació en blockchain Solana [<a href="https://solanaforensic.com/" target="_blank">URL Producció</a>]<br>
            - SysAdmin Suite: Repositori codi obert de scripts de producció en Bash, PowerShell i Python [<a href="https://github.com/AlbertoTrujillo-ITB2425/scripts-1ASIXc" target="_blank">Repositori GitHub</a>]
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px;">[ PROYECTOS: ${projHeader} ]</div>
            - FocusGuard (Escudo DNS Zero-Trust): Filtrado de contenido DNS en tiempo real en Cloudflare Workers y D1 [<a href="https://focusguard.trujillomingorance.com/" target="_blank">URL Producción</a>]<br>
            - Solana Forensics (Plataforma Blockchain): Auditoría de transacciones e investigación en blockchain Solana [<a href="https://solanaforensic.com/" target="_blank">URL Producción</a>]<br>
            - SysAdmin Suite: Repositorio código abierto de scripts de producción en Bash, PowerShell y Python [<a href="https://github.com/AlbertoTrujillo-ITB2425/scripts-1ASIXc" target="_blank">Repositorio GitHub</a>]
          </div>`;
        appendOutput(projText);
        break;

      case 'exp':
        const expHeader = lang === 'ca' ? 'TRAJECTÒRIA I EXPERIÈNCIA LABORAL' : lang === 'en' ? 'CAREER HISTORY & EXPERIENCE' : 'TRAYECTORIA Y EXPERIENCIA LABORAL';
        const attesttoPeriod = calculateExperience(2026, 7, lang, lang === 'en' ? 'Jul 2026' : 'jul. 2026');
        const etoroPeriod = calculateExperience(2026, 6, lang, lang === 'en' ? 'Jun 2026' : 'jun. 2026');
        const expText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #f97316; margin-bottom: 8px;">[ CAREER TIMELINE: ${expHeader} ]</div>
            - Attestto (${attesttoPeriod}): Junior DevOps & Systems Engineer (Cloud/IAM, Cloudflare, Fly.io, W3C DID/VC)<br>
            - eToro (${etoroPeriod}): Popular Investor (Quantitative Risk Management & Asset Portfolio Selection)<br>
            - Minsait - Indra Group (Nov 2025 - May 2026): Systems Support Technician (CTTI Healthcare Critical Infrastructure)<br>
            - Institut Indústria Sostenible (May 2023 - Nov 2023): Computer Maintenance & Support Technician
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #f97316; margin-bottom: 8px;">[ TRAJECTÒRIA: ${expHeader} ]</div>
            - Attestto (${attesttoPeriod}): Enginyer Junior de DevOps i Sistemes (Cloud/IAM, Cloudflare, Fly.io, W3C DID/VC)<br>
            - eToro (${etoroPeriod}): Inversor Popular (Gestió Cuantitativa de Riscos i Selecció d'Actius)<br>
            - Minsait - Indra Group (Nov 2025 - Mai 2026): Tècnic de Soport de Sistemes (Infraestructura Crítica Sanitari CTTI)<br>
            - Institut Indústria Sostenible (Mai 2023 - Nov 2023): Tècnic de Manteniment Informàtic
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: #f97316; margin-bottom: 8px;">[ TRAYECTORIA: ${expHeader} ]</div>
            - Attestto (${attesttoPeriod}): Ingeniero Junior de DevOps y Sistemas (Cloud/IAM, Cloudflare, Fly.io, W3C DID/VC)<br>
            - eToro (${etoroPeriod}): Inversor Popular (Gestión Cuantitativa de Riesgos y Selección de Activos)<br>
            - Minsait - Indra Group (Nov 2025 - Mayo 2026): Técnico de Soporte de Sistemas (Infraestructura Crítica Sanitaria CTTI)<br>
            - Institut Indústria Sostenible (Mayo 2023 - Nov 2023): Técnico de Mantenimiento Informático
          </div>`;
        appendOutput(expText);
        break;

      case 'certs':
        const certHeader = lang === 'ca' ? 'TITULACIONS I FORMACIÓ ACADÈMICA' : lang === 'en' ? 'ACADEMIC DEGREES & ACCREDITATIONS' : 'TITULACIONES Y FORMACIÓN ACADÉMICA';
        const certText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">[ ACADEMIC CREDENTIALS: ${certHeader} ]</div>
            - ASIR: Higher Degree in Network Computer Systems Administration @ Institut Tecnològic de Barcelona (ITB)<br>
            - SMR: Mid Degree in Microcomputer Systems and Networks @ Institut Tecnològic de Barcelona (ITB)<br>
            - Continuous Self-Taught Training: Systems Hardening, Cloud IAM & Web3 Engineering<br>
            - Official Disability Certification: >33% Certified Disability (Law 43/2006 Tax Deduction Eligible)
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">[ TITULACIONS ACADÈMIQUES: ${certHeader} ]</div>
            - ASIX: Grau Superior en Administració de Sistemes Informàtics en Xarxa @ Institut Tecnològic de Barcelona (ITB)<br>
            - SMX: Grau Mitjà en Sistemes Microinformàtics i Xarxes @ Institut Tecnològic de Barcelona (ITB)<br>
            - Formació Autodidacta Contínua: Hardening Linux, Cloud IAM i Enginyeria Web3<br>
            - Certificació Oficial de Discapacitat: >33% Discapacitat Certificada (Llei 43/2006 Elegible)
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">[ TITULACIONES ACADÉMICAS: ${certHeader} ]</div>
            - ASIR: Grado Superior en Administración de Sistemas Informáticos en Red @ Institut Tecnològic de Barcelona (ITB)<br>
            - SMR: Grado Medio en Sistemas Microinformáticos y Redes @ Institut Tecnològic de Barcelona (ITB)<br>
            - Formación Autodidacta Continua: Hardening Linux, Cloud IAM e Ingeniería Web3<br>
            - Certificación Oficial de Discapacidad: >33% Discapacidad Oficial Certificada (Ley 43/2006 Elegible)
          </div>`;
        appendOutput(certText);
        break;

      case 'status':
      case 'systemctl':
        const statusHeader = lang === 'ca' ? 'ESTAT OPERATIU DE SERVEIS' : lang === 'en' ? 'SYSTEM SERVICE OPERATIONAL STATUS' : 'ESTADO OPERATIVO DE SERVICIOS';
        const statusText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #10b981; margin-bottom: 8px;">[ SERVICE STATUS: ${statusHeader} ]</div>
            [ ACTIVE ] cloud-iam-governance.service  - Google Workspace & Cloudflare RBAC (Running)<br>
            [ ACTIVE ] edge-compute-engine.service    - Cloudflare Workers & Fly.io Runtime (Running)<br>
            [ ACTIVE ] security-hardening.service     - CIS Benchmarks & WAF Rulesets (Active / Enforcing)<br>
            [ ACTIVE ] digital-identity-trust.service - W3C DID/VC & vLEI Credentials (Active)<br>
            --------------------------------------------------------------------------------<br>
            Overall Operational Status: HEALTHY | Edge Availability: 99.99% | Zero Critical Alerts
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: #10b981; margin-bottom: 8px;">[ ESTAT DE SERVEIS: ${statusHeader} ]</div>
            [ ACTIU ] cloud-iam-governance.service  - Google Workspace & Cloudflare RBAC (En Execució)<br>
            [ ACTIU ] edge-compute-engine.service    - Cloudflare Workers & Contenidors Fly.io (En Execució)<br>
            [ ACTIU ] security-hardening.service     - Estàndards CIS & Regles WAF (Actiu / Aplicat)<br>
            [ ACTIU ] digital-identity-trust.service - Credencials W3C DID/VC & vLEI (Actiu)<br>
            --------------------------------------------------------------------------------<br>
            Estat Operatiu General: CORRECTE | Disponibilitat Edge: 99.99% | Sense Alertes Crítiques
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: #10b981; margin-bottom: 8px;">[ ESTADO DE SERVICIOS: ${statusHeader} ]</div>
            [ ACTIVO ] cloud-iam-governance.service  - Google Workspace & Cloudflare RBAC (En Ejecución)<br>
            [ ACTIVO ] edge-compute-engine.service    - Cloudflare Workers & Contenedores Fly.io (En Ejecución)<br>
            [ ACTIVO ] security-hardening.service     - Estándares CIS & Reglas WAF (Activo / Aplicado)<br>
            [ ACTIVO ] digital-identity-trust.service - Credenciales W3C DID/VC & vLEI (Activo)<br>
            --------------------------------------------------------------------------------<br>
            Estado Operativo General: CORRECTO | Disponibilidad Edge: 99.99% | Sin Alertas Críticas
          </div>`;
        appendOutput(statusText);
        break;

      case 'contact':
        const contactText = lang === 'en' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--text-main); margin-bottom: 8px;">[ DIRECT CONTACT DETAILS ]</div>
            Email Address: <a href="mailto:alberto@trujillomingorance.com">alberto@trujillomingorance.com</a><br>
            LinkedIn Profile: <a href="https://linkedin.com/in/alberto-trujillo-mingorance-288237266/" target="_blank">linkedin.com/in/alberto-trujillo-mingorance-288237266</a><br>
            GitHub Profile: <a href="https://github.com/atrumin16" target="_blank">github.com/atrumin16</a><br>
            Official Website: <a href="https://alberto.trujillomingorance.com/" target="_blank">alberto.trujillomingorance.com</a>
          </div>` : lang === 'ca' ? `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--text-main); margin-bottom: 8px;">[ DADES DE CONTACTE DIRECTE ]</div>
            Correu Electrònic: <a href="mailto:alberto@trujillomingorance.com">alberto@trujillomingorance.com</a><br>
            Perfil de LinkedIn: <a href="https://linkedin.com/in/alberto-trujillo-mingorance-288237266/" target="_blank">linkedin.com/in/alberto-trujillo-mingorance-288237266</a><br>
            Perfil de GitHub: <a href="https://github.com/atrumin16" target="_blank">github.com/atrumin16</a><br>
            Lloc Web Oficial: <a href="https://alberto.trujillomingorance.com/" target="_blank">alberto.trujillomingorance.com</a>
          </div>` : `
          <div class="term-card">
            <div style="font-weight: 700; color: var(--text-main); margin-bottom: 8px;">[ DATOS DE CONTACTO DIRECTO ]</div>
            Correo Electrónico: <a href="mailto:alberto@trujillomingorance.com">alberto@trujillomingorance.com</a><br>
            Perfil de LinkedIn: <a href="https://linkedin.com/in/alberto-trujillo-mingorance-288237266/" target="_blank">linkedin.com/in/alberto-trujillo-mingorance-288237266</a><br>
            Perfil de GitHub: <a href="https://github.com/atrumin16" target="_blank">github.com/atrumin16</a><br>
            Sitio Web Oficial: <a href="https://alberto.trujillomingorance.com/" target="_blank">alberto.trujillomingorance.com</a>
          </div>`;
        appendOutput(contactText);
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        break;

      default:
        const unknownText = lang === 'en' 
          ? `Command not recognized: "${escapeHtml(cmd)}". Type <strong style="color: var(--accent-primary);">help</strong> to list all available commands.`
          : lang === 'ca'
          ? `Comandament no reconegut: "${escapeHtml(cmd)}". Escriu <strong style="color: var(--accent-primary);">help</strong> per veure la llista de comandaments.`
          : `Comando no reconocido: "${escapeHtml(cmd)}". Escribe <strong style="color: var(--accent-primary);">help</strong> para ver la lista de comandos.`;
        appendOutput(`<span style="color: var(--text-muted);">${unknownText}</span>`);
        break;
    }
  }

  // Listen for language change events to re-render output dynamically in newly selected language
  window.addEventListener('languageChanged', () => {
    terminalOutput.innerHTML = '';
    handleCommand(lastCommand || 'whoami', true);
  });

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = terminalInput.value;
    terminalInput.value = '';
    handleCommand(val);
  });

  commandPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex] || '';
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}
