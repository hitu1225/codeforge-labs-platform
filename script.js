/**
 * ============================================================
 * CODEFORGE LABS — MAIN SCRIPT
 * Architecture: Modular IIFE pattern, namespaced modules
 * Modules: App, Auth, Dashboard, UI, Services, Workflow
 * Storage: localStorage-backed persistence
 * ============================================================
 */

'use strict';

/* ============================================================
   DATA MODULE — All static platform data
   ============================================================ */
const DATA = {

  services: [
    {
      id: 'frontend',
      icon: '🖥️',
      title: 'Frontend Development',
      description: 'Pixel-perfect, performant interfaces built with modern HTML5, CSS3, and JavaScript. React, Vue, Angular — we speak every dialect.',
      tags: ['React','Vue','TypeScript','Performance','A11y'],
      timeline: '4–8 weeks',
      from: '$3,500',
      tier: 'Basic',
      useCases: ['Landing pages','Web apps','Admin dashboards','Component libraries','Design systems'],
      features: ['Responsive design','Animations & microinteractions','Cross-browser support','Core Web Vitals optimized','Accessibility (WCAG 2.1)'],
      tiers: { basic: '$3,500', pro: '$8,500', enterprise: 'Custom' }
    },
    {
      id: 'backend',
      icon: '⚙️',
      title: 'Backend Development',
      description: 'Robust, secure APIs and server-side systems engineered for scale. From microservices to monoliths — built right from the start.',
      tags: ['Node.js','Python','PostgreSQL','Redis','Docker'],
      timeline: '6–12 weeks',
      from: '$5,000',
      tier: 'Pro',
      useCases: ['REST APIs','GraphQL','Auth systems','Payment integrations','Data pipelines'],
      features: ['RESTful & GraphQL APIs','Authentication & authorization','Database design','Caching strategies','CI/CD pipelines'],
      tiers: { basic: '$5,000', pro: '$14,000', enterprise: 'Custom' }
    },
    {
      id: 'fullstack',
      icon: '🏗️',
      title: 'Full Stack Development',
      description: 'End-to-end product engineering from database schema to pixel-perfect UI. One team, total ownership, zero coordination overhead.',
      tags: ['Full Stack','Next.js','TypeScript','Cloud','DevOps'],
      timeline: '8–20 weeks',
      from: '$12,000',
      tier: 'Enterprise',
      useCases: ['SaaS products','Marketplaces','Enterprise portals','B2B tools','Consumer apps'],
      features: ['Full product lifecycle','Integrated frontend & backend','DevOps & infrastructure','Testing coverage','Documentation'],
      tiers: { basic: '$12,000', pro: '$28,000', enterprise: 'Custom' }
    },
    {
      id: 'uiux',
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Research-driven design that converts. We turn complex problems into intuitive experiences through user testing and iterative design.',
      tags: ['Figma','Research','Prototyping','Design Systems','Motion'],
      timeline: '3–8 weeks',
      from: '$2,500',
      tier: 'Basic',
      useCases: ['Product redesigns','MVP design sprints','Design systems','User research','Usability audits'],
      features: ['User research & personas','Wireframes & prototypes','High-fidelity mockups','Design system creation','Handoff specs'],
      tiers: { basic: '$2,500', pro: '$7,500', enterprise: 'Custom' }
    },
    {
      id: 'app',
      icon: '📱',
      title: 'App Development',
      description: 'Native and cross-platform mobile applications that users love. iOS, Android, or both — engineered for performance and retention.',
      tags: ['React Native','Flutter','iOS','Android','Push Notifications'],
      timeline: '10–20 weeks',
      from: '$15,000',
      tier: 'Pro',
      useCases: ['Consumer apps','B2B mobile tools','IoT interfaces','Companion apps','Commerce apps'],
      features: ['Cross-platform (iOS + Android)','Offline capability','Push notifications','App store submission','Analytics integration'],
      tiers: { basic: '$15,000', pro: '$35,000', enterprise: 'Custom' }
    },
    {
      id: 'software',
      icon: '💻',
      title: 'Software Development',
      description: 'Custom software built to solve hard problems. Desktop, embedded, CLI, or internal tooling — we craft software that actually gets used.',
      tags: ['Python','Go','Rust','Electron','CLI'],
      timeline: '8–24 weeks',
      from: '$10,000',
      tier: 'Pro',
      useCases: ['Internal tools','Automation scripts','Desktop apps','CLI tools','Integrations'],
      features: ['Requirements analysis','Architecture design','Clean code practices','Comprehensive tests','Documentation & support'],
      tiers: { basic: '$10,000', pro: '$25,000', enterprise: 'Custom' }
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'AI & Automation Systems',
      description: 'Intelligent automation pipelines and AI-integrated products. LLM integrations, ML models, and workflow automation that saves thousands of hours.',
      tags: ['LLMs','Python','ML','OpenAI','LangChain'],
      timeline: '6–16 weeks',
      from: '$8,000',
      tier: 'Enterprise',
      useCases: ['AI chat interfaces','Document processing','Predictive analytics','Workflow automation','Recommendation engines'],
      features: ['LLM integration & fine-tuning','Custom ML model training','RAG pipelines','Automation workflows','API integration'],
      tiers: { basic: '$8,000', pro: '$22,000', enterprise: 'Custom' }
    },
    {
      id: 'saas',
      icon: '☁️',
      title: 'Custom SaaS Development',
      description: 'From zero to SaaS: architecture, billing, multi-tenancy, auth, and everything in between. We build the infrastructure so you can focus on your product.',
      tags: ['SaaS','Multi-tenant','Stripe','Subscriptions','Scale'],
      timeline: '16–32 weeks',
      from: '$25,000',
      tier: 'Enterprise',
      useCases: ['B2B SaaS platforms','Subscription products','Developer tools','Analytics platforms','Vertical SaaS'],
      features: ['Multi-tenant architecture','Subscription billing (Stripe)','User management & teams','Usage analytics','Scale-ready infrastructure'],
      tiers: { basic: '$25,000', pro: '$60,000', enterprise: 'Custom' }
    },
    {
      id: 'seo',
      icon: '📈',
      title: 'Website Optimization & SEO',
      description: 'Speed, structure, and search visibility. We audit, optimize, and transform underperforming websites into high-converting, top-ranking machines.',
      tags: ['Core Web Vitals','SEO','Performance','Accessibility','Analytics'],
      timeline: '2–6 weeks',
      from: '$1,800',
      tier: 'Basic',
      useCases: ['Site speed audits','SEO campaigns','Conversion rate optimization','Technical SEO fixes','Performance monitoring'],
      features: ['Core Web Vitals audit','On-page SEO optimization','Technical SEO fixes','Performance monitoring','Reporting dashboard'],
      tiers: { basic: '$1,800', pro: '$4,500', enterprise: 'Custom' }
    }
  ],

  workflowSteps: [
    {
      step: '01',
      title: 'Requirement Analysis',
      brief: 'Deep discovery to understand your goals, constraints, and success criteria.',
      detail: 'We kick off every project with structured discovery sessions — stakeholder interviews, competitive analysis, technical constraint mapping, and goal alignment workshops. We produce a detailed requirements document that becomes the single source of truth for the entire project. Nothing gets built without clear, agreed-upon requirements.',
      duration: '3–5 days',
      deliverable: 'Requirements Document',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Planning & Proposal',
      brief: 'Detailed technical architecture, timelines, milestones, and resource allocation.',
      detail: 'Our architects and project managers produce a comprehensive technical proposal: system architecture diagrams, database schema drafts, API design, technology stack rationale, sprint breakdown with milestones, team composition, risk register, and a transparent pricing breakdown. You review and approve every detail before we begin.',
      duration: '3–7 days',
      deliverable: 'Technical Proposal + Contract',
      icon: '📋'
    },
    {
      step: '03',
      title: 'UI/UX Design',
      brief: 'Research-grounded wireframes, prototypes, and high-fidelity design systems.',
      detail: 'Our design team conducts user research, creates journey maps, and iterates through low-fidelity wireframes to high-fidelity prototypes. We validate every design decision with usability testing. You receive a complete Figma design file with a documented design system — tokens, components, patterns — all ready for developer handoff.',
      duration: '1–3 weeks',
      deliverable: 'Figma Design System + Prototypes',
      icon: '🎨'
    },
    {
      step: '04',
      title: 'Development Sprint',
      brief: 'Agile sprints with bi-weekly demos, continuous integration, and transparent tracking.',
      detail: 'Development happens in two-week sprints. You get access to a staging environment from day one. We run bi-weekly demo calls, share a live Kanban board, and push deployable code every sprint. All code is peer-reviewed, follows our style guide, and ships with automated tests. You see everything, always.',
      duration: '4–24 weeks',
      deliverable: 'Working Software + Sprint Reports',
      icon: '⚡'
    },
    {
      step: '05',
      title: 'Testing & QA',
      brief: 'Comprehensive automated and manual testing across all device and load scenarios.',
      detail: 'Every system we build undergoes rigorous quality assurance: unit tests, integration tests, end-to-end tests, load testing, security scanning (OWASP Top 10), cross-browser and cross-device testing, and accessibility audits. We target minimum 80% code coverage and document every bug found and resolved.',
      duration: '1–2 weeks',
      deliverable: 'QA Report + Test Suite',
      icon: '🧪'
    },
    {
      step: '06',
      title: 'Client Review',
      brief: 'Structured UAT sessions with clear feedback loops and documented sign-off.',
      detail: 'We conduct formal User Acceptance Testing sessions where you test the system against the original requirements. We provide a structured feedback form and issue tracker. All change requests are triaged, scoped, and prioritized collaboratively. Nothing ships without your explicit sign-off on every acceptance criterion.',
      duration: '3–7 days',
      deliverable: 'UAT Sign-off Document',
      icon: '✅'
    },
    {
      step: '07',
      title: 'Deployment',
      brief: 'Zero-downtime production deployment with monitoring, alerting, and runbooks.',
      detail: 'Production deployments use blue-green or canary strategies to eliminate downtime. We set up comprehensive monitoring (uptime, error rates, performance metrics), alerting pipelines, automated backups, and provide complete runbooks. Post-deployment, we monitor closely for 48–72 hours before handoff.',
      duration: '1–3 days',
      deliverable: 'Live Production System + Runbooks',
      icon: '🚀'
    },
    {
      step: '08',
      title: 'Maintenance & Support',
      brief: 'Ongoing SLA-backed support, security patches, and continuous improvement.',
      detail: 'All projects include a 30-day post-launch support window. Ongoing retainer packages provide SLA-backed support (response within 4–24 hours), monthly security patches, dependency updates, performance monitoring reports, and a dedicated Slack channel with your assigned engineer. We are long-term partners, not one-time vendors.',
      duration: 'Ongoing',
      deliverable: 'Support SLA Agreement',
      icon: '🛡️'
    }
  ],

  testimonials: [
    {
      text: 'CodeForge Labs rebuilt our entire platform in 14 weeks — under budget, on time, and with zero post-launch issues. Their transparency throughout the process was genuinely unlike anything we\'d experienced with other agencies.',
      author: 'Marcus Chen',
      role: 'CTO, Nexus Commerce',
      initials: 'MC',
      stars: 5
    },
    {
      text: 'The AI pipeline they built processes 200,000 documents a month with 97% accuracy. Their team understood our domain immediately and moved fast without cutting corners. We\'ll be using them for every major initiative going forward.',
      author: 'Priya Sharma',
      role: 'Head of Engineering, DataFlow AI',
      initials: 'PS',
      stars: 5
    },
    {
      text: 'As a non-technical founder, I was nervous about working with a dev agency. CodeForge explained every decision in plain language, showed us progress weekly, and delivered something genuinely world-class. Our app hit #3 in its App Store category on launch.',
      author: 'James Wilson',
      role: 'CEO, PulseApp',
      initials: 'JW',
      stars: 5
    },
    {
      text: 'We engaged CodeForge for a complete UX overhaul of our enterprise dashboard. They ran proper user research, challenged our assumptions constructively, and delivered something our clients actually love using. Conversion went up 34%.',
      author: 'Sofia Rodriguez',
      role: 'Product Director, LogisticsIQ',
      initials: 'SR',
      stars: 5
    }
  ],

  faqs: [
    {
      q: 'How do you handle intellectual property and code ownership?',
      a: 'Upon final payment, all work product — code, designs, documentation — is fully transferred to you. We use industry-standard NDAs and IP assignment agreements. You own everything; we retain nothing.'
    },
    {
      q: 'What is your typical timeline for a full-stack project?',
      a: 'Full-stack projects typically run 12–20 weeks depending on scope. We break down exact timelines in our proposal phase with milestone-by-milestone granularity so you always know when to expect what.'
    },
    {
      q: 'Do you work with existing codebases or only greenfield projects?',
      a: 'Both. We conduct thorough code audits on existing codebases, provide honest assessments of technical debt, and develop a plan to improve them incrementally without disrupting your business.'
    },
    {
      q: 'How transparent is the development process?',
      a: 'Extremely. You get access to our project management board, a staging environment updated daily, bi-weekly demo calls, and a dedicated Slack channel. You see every commit, every decision, every tradeoff.'
    },
    {
      q: 'What happens if the project scope changes mid-development?',
      a: 'Scope changes are handled through a lightweight Change Request process. We scope, price, and get your approval before any out-of-scope work begins. No surprise invoices — ever.'
    },
    {
      q: 'Do you offer fixed-price or time-and-materials contracts?',
      a: 'We offer both. Fixed-price works well for well-defined scopes; time-and-materials suits exploratory or evolving products. We help you choose the right model based on your project\'s nature and risk tolerance.'
    },
    {
      q: 'Can you work with our in-house development team?',
      a: 'Absolutely. We regularly act as an extension of in-house teams — whether that\'s providing specialized expertise, surge capacity, or handling a specific system while your team owns others.'
    }
  ]
};

/* ============================================================
   STORAGE MODULE — localStorage helpers
   ============================================================ */
const Storage = {
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(`cfl_${key}`);
      return val ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(`cfl_${key}`, JSON.stringify(val)); } catch {}
  },
  remove(key) { localStorage.removeItem(`cfl_${key}`); }
};

/* ============================================================
   UI MODULE — Toast, theme, scroll, animations
   ============================================================ */
const UI = {
  init() {
    this.initTheme();
    this.initNavScroll();
    this.initScrollTop();
    this.initScrollAnimations();
    this.initHamburger();
    this.initHeroCanvas();
    this.initTypingEffect();
  },

  /* --- Theme --- */
  initTheme() {
    const savedTheme = Storage.get('theme', 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
  },
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  },

  /* --- Navbar scroll --- */
  initNavScroll() {
    const nav = document.getElementById('navbar');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  /* --- Scroll to top --- */
  initScrollTop() {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  /* --- Scroll animations --- */
  initScrollAnimations() {
    const elements = document.querySelectorAll('section, .pillar, .service-card, .workflow-step, .faq-item');
    elements.forEach(el => el.classList.add('animate-in'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
  },

  /* --- Hamburger --- */
  initHamburger() {
    const btn = document.getElementById('hamburger');
    const links = document.getElementById('nav-links');
    btn.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  },

  /* --- Hero Canvas particle effect --- */
  initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.5 ? '0,229,255' : '124,92,252';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        p.update();
        p.draw();
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();
  },

  /* --- Typing effect --- */
  initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;
    const phrases = ['Digital Excellence.', 'Future-Proof Systems.', 'Scalable Products.', 'Business Value.'];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    const type = () => {
      const phrase = phrases[phraseIdx];
      el.textContent = isDeleting ? phrase.slice(0, charIdx--) : phrase.slice(0, charIdx++);

      if (!isDeleting && charIdx > phrase.length) {
        setTimeout(() => { isDeleting = true; type(); }, 1800);
        return;
      }
      if (isDeleting && charIdx < 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, isDeleting ? 50 : 80);
    };
    setTimeout(type, 1000);
  },

  /* --- Toast --- */
  toast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toastContainer');
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <span>${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

/* ============================================================
   AUTH MODULE — Registration, Login, Session
   ============================================================ */
const Auth = {
  currentUser: null,
  inactivityTimer: null,
  INACTIVITY_LIMIT: 30 * 60 * 1000, // 30 min

  init() {
    this.currentUser = Storage.get('currentUser');
    this.bindNavButtons();
    this.bindAuthForms();
    this.bindModalTabs();
    if (this.currentUser) this.onLoginSuccess(this.currentUser, false);
  },

  bindNavButtons() {
    document.getElementById('loginBtn').addEventListener('click', () => this.openModal('login'));
    document.getElementById('registerBtn').addEventListener('click', () => this.openModal('register'));
    document.getElementById('heroStartBtn').addEventListener('click', () => {
      this.currentUser ? scrollToSection('panel-new-project') : this.openModal('register');
    });
    document.getElementById('footerLoginLink')?.addEventListener('click', (e) => { e.preventDefault(); this.openModal('login'); });
    document.getElementById('footerRegisterLink')?.addEventListener('click', (e) => { e.preventDefault(); this.openModal('register'); });

    const closeBtn = document.getElementById('closeAuthModal');
    const overlay = document.getElementById('authModal');
    closeBtn?.addEventListener('click', () => this.closeModal());
    overlay?.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });
  },

  bindModalTabs() {
    document.getElementById('tabLogin').addEventListener('click', () => this.showAuthView('login'));
    document.getElementById('tabRegister').addEventListener('click', () => this.showAuthView('register'));
    document.getElementById('switchToRegister').addEventListener('click', (e) => { e.preventDefault(); this.showAuthView('register'); });
    document.getElementById('switchToLogin').addEventListener('click', (e) => { e.preventDefault(); this.showAuthView('login'); });
    document.getElementById('forgotLink').addEventListener('click', (e) => { e.preventDefault(); this.showAuthView('forgot'); });
    document.getElementById('backToLogin').addEventListener('click', (e) => { e.preventDefault(); this.showAuthView('login'); });
  },

  bindAuthForms() {
    document.getElementById('loginSubmit').addEventListener('click', () => this.handleLogin());
    document.getElementById('registerSubmit').addEventListener('click', () => this.handleRegister());
    document.getElementById('forgotSubmit').addEventListener('click', () => this.handleForgot());
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

    // Allow enter key submission
    ['loginEmail','loginPassword'].forEach(id => {
      document.getElementById(id).addEventListener('keypress', (e) => { if (e.key === 'Enter') this.handleLogin(); });
    });
  },

  openModal(view = 'login') {
    document.getElementById('authModal').classList.add('active');
    this.showAuthView(view);
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('authModal').classList.remove('active');
    document.body.style.overflow = '';
  },

  showAuthView(view) {
    document.getElementById('loginForm').style.display = view === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = view === 'register' ? 'block' : 'none';
    document.getElementById('forgotForm').style.display = view === 'forgot' ? 'block' : 'none';
    document.getElementById('tabLogin').classList.toggle('active', view === 'login');
    document.getElementById('tabRegister').classList.toggle('active', view === 'register');
    this.clearErrors();
  },

  clearErrors() {
    ['loginError','registerError'].forEach(id => {
      const el = document.getElementById(id);
      el.textContent = '';
      el.classList.remove('show');
    });
  },

  showError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.classList.add('show');
  },

  sanitize(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },

  handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;

    if (!email || !password) return this.showError('loginError', 'Please fill in all fields.');
    if (!this.isValidEmail(email)) return this.showError('loginError', 'Please enter a valid email address.');

    const users = Storage.get('users', []);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) return this.showError('loginError', 'No account found with this email.');
    if (user.password !== this.hashPassword(password)) return this.showError('loginError', 'Incorrect password. Please try again.');

    if (remember) Storage.set('rememberedEmail', email);
    this.onLoginSuccess(user);
  },

  handleRegister() {
    const name = document.getElementById('regName').value.trim();
    const company = document.getElementById('regCompany').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;

    if (!name || !email || !password) return this.showError('registerError', 'Please fill in all required fields.');
    if (!this.isValidEmail(email)) return this.showError('registerError', 'Please enter a valid email address.');
    if (password.length < 8) return this.showError('registerError', 'Password must be at least 8 characters.');
    if (password !== confirm) return this.showError('registerError', 'Passwords do not match.');

    const users = Storage.get('users', []);
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return this.showError('registerError', 'An account with this email already exists.');
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name: this.sanitize(name),
      company: this.sanitize(company),
      email: email.toLowerCase(),
      password: this.hashPassword(password),
      role: 'client',
      createdAt: new Date().toISOString(),
      avatar: name.charAt(0).toUpperCase()
    };

    users.push(newUser);
    Storage.set('users', users);

    // Seed demo project for new user
    this.seedDemoData(newUser.id);

    UI.toast('Account created successfully! Welcome to CodeForge Labs.', 'success');
    this.onLoginSuccess(newUser);
  },

  handleForgot() {
    const email = document.getElementById('forgotEmail').value.trim();
    if (!this.isValidEmail(email)) {
      UI.toast('Please enter a valid email address.', 'error');
      return;
    }
    UI.toast(`Password reset link sent to ${email} (simulated).`, 'success');
    this.showAuthView('login');
  },

  onLoginSuccess(user, showToast = true) {
    this.currentUser = user;
    Storage.set('currentUser', user);
    this.closeModal();

    // Update navbar
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').textContent = '⬡ Dashboard';
    document.getElementById('registerBtn').onclick = () => Dashboard.open();

    if (showToast) UI.toast(`Welcome back, ${user.name}!`, 'success');

    Dashboard.init(user);
    this.startInactivityTimer();
  },

  logout() {
    Storage.remove('currentUser');
    this.currentUser = null;
    this.clearInactivityTimer();

    // Reset navbar
    document.getElementById('loginBtn').style.display = '';
    document.getElementById('registerBtn').textContent = 'Start Project';
    document.getElementById('registerBtn').onclick = null;
    document.getElementById('registerBtn').addEventListener('click', () => Auth.openModal('register'));

    Dashboard.close();
    UI.toast('You\'ve been logged out.', 'info');
  },

  startInactivityTimer() {
    this.clearInactivityTimer();
    const reset = () => {
      this.clearInactivityTimer();
      this.inactivityTimer = setTimeout(() => {
        if (this.currentUser) {
          UI.toast('You\'ve been logged out due to inactivity.', 'warning');
          this.logout();
        }
      }, this.INACTIVITY_LIMIT);
    };
    ['mousemove','keydown','click','scroll'].forEach(ev => document.addEventListener(ev, reset, { passive: true }));
    reset();
  },

  clearInactivityTimer() {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  hashPassword(pw) {
    // Simple hash simulation (NOT secure — demo only)
    let hash = 0;
    for (let i = 0; i < pw.length; i++) hash = ((hash << 5) - hash + pw.charCodeAt(i)) | 0;
    return hash.toString(36);
  },

  seedDemoData(userId) {
    const existingProjects = Storage.get('projects', []);
    const demo = {
      id: 'proj_demo_' + userId,
      userId,
      title: 'E-Commerce Platform Redesign',
      category: 'Full Stack Development',
      description: 'Complete overhaul of our B2B e-commerce platform including new UI/UX, performance improvements, and API integrations.',
      budget: '$15,000 – $50,000',
      deadline: '2025-06-30',
      priority: 'high',
      status: 'in-development',
      progress: 65,
      developer: 'Alex Torres',
      developerRole: 'Full Stack Developer',
      submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Sprint 3 in progress. API integration complete. Starting frontend components this week.',
      invoiced: true
    };
    existingProjects.push(demo);
    Storage.set('projects', existingProjects);
  }
};

/* ============================================================
   DASHBOARD MODULE
   ============================================================ */
const Dashboard = {
  currentPanel: 'overview',

  init(user) {
    document.getElementById('dashboard').style.display = 'flex';
    document.body.style.overflow = 'hidden';

    this.renderUserInfo(user);
    this.bindPanelNav();
    this.bindProjectForm();
    this.bindSearch();
    this.bindFileUpload();
    this.showPanel('overview');

    // Prefill settings
    document.getElementById('settingsName').value = user.name;
    document.getElementById('settingsEmail').value = user.email;
    document.getElementById('settingsCompany').value = user.company || '';
  },

  open() {
    document.getElementById('dashboard').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    this.showPanel('overview');
  },

  close() {
    document.getElementById('dashboard').style.display = 'none';
    document.body.style.overflow = '';
  },

  renderUserInfo(user) {
    document.getElementById('dashUserInfo').innerHTML = `
      <strong>${user.name}</strong>
      ${user.company || 'Client'}
      <br><small style="color:var(--accent)">${user.role}</small>
    `;
  },

  bindPanelNav() {
    document.querySelectorAll('.dash-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const panel = link.dataset.panel;
        this.showPanel(panel);
      });
    });
  },

  showPanel(panel) {
    this.currentPanel = panel;
    document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.dash-link').forEach(l => l.classList.remove('active'));

    const panelEl = document.getElementById(`panel-${panel}`);
    const linkEl = document.querySelector(`.dash-link[data-panel="${panel}"]`);
    if (panelEl) panelEl.classList.add('active');
    if (linkEl) linkEl.classList.add('active');

    const titles = {
      'overview': ['Overview', 'Your project dashboard at a glance'],
      'new-project': ['New Project Request', 'Submit a new project to our team'],
      'my-projects': ['My Projects', 'Track and manage your active projects'],
      'invoices': ['Invoices', 'View and download your invoices'],
      'notifications': ['Notifications', 'Your latest updates'],
      'settings': ['Settings', 'Manage your account preferences']
    };
    const [title, sub] = titles[panel] || ['Dashboard', ''];
    document.getElementById('panelTitle').textContent = title;
    document.getElementById('panelSub').textContent = sub;

    // Render panel content
    switch (panel) {
      case 'overview': this.renderOverview(); break;
      case 'my-projects': this.renderProjects(); break;
      case 'invoices': this.renderInvoices(); break;
      case 'notifications': this.renderNotifications(); break;
    }
  },

  renderOverview() {
    const user = Auth.currentUser;
    const projects = this.getUserProjects();
    const active = projects.filter(p => !['completed','pending'].includes(p.status)).length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const pending = projects.filter(p => p.status === 'pending').length;
    const notifications = this.getNotifications().filter(n => n.unread).length;

    document.getElementById('notifBadge').textContent = notifications;

    document.getElementById('overviewStats').innerHTML = `
      <div class="stat-card"><div class="stat-card-icon">📂</div><div class="stat-card-value">${projects.length}</div><div class="stat-card-label">Total Projects</div></div>
      <div class="stat-card"><div class="stat-card-icon">⚡</div><div class="stat-card-value">${active}</div><div class="stat-card-label">Active Projects</div></div>
      <div class="stat-card"><div class="stat-card-icon">✅</div><div class="stat-card-value">${completed}</div><div class="stat-card-label">Completed</div></div>
      <div class="stat-card"><div class="stat-card-icon">⏳</div><div class="stat-card-value">${pending}</div><div class="stat-card-label">Pending Review</div></div>
    `;

    const activities = [
      { icon: '🚀', text: 'Project <strong>E-Commerce Platform Redesign</strong> is in development — Sprint 3 in progress.', time: '2 hours ago' },
      { icon: '💬', text: 'New comment from <strong>Alex Torres</strong> on your project.', time: '1 day ago' },
      { icon: '📋', text: 'Invoice <strong>#INV-2025-001</strong> generated and ready for download.', time: '3 days ago' },
      { icon: '✅', text: 'Stage 4 <strong>Development Sprint</strong> marked as complete.', time: '1 week ago' }
    ];

    document.getElementById('activityList').innerHTML = activities.map(a => `
      <div class="activity-item">
        <span class="activity-icon">${a.icon}</span>
        <div>
          <div class="activity-text">${a.text}</div>
          <div class="activity-time">${a.time}</div>
        </div>
      </div>
    `).join('');
  },

  getUserProjects() {
    return (Storage.get('projects', [])).filter(p => p.userId === Auth.currentUser?.id);
  },

  getNotifications() {
    return [
      { id: 1, icon: '🔔', text: 'Your project <strong>E-Commerce Platform Redesign</strong> has been assigned to Alex Torres.', time: '2 hours ago', unread: true },
      { id: 2, icon: '💬', text: 'Developer added a progress note to your project.', time: '1 day ago', unread: true },
      { id: 3, icon: '📋', text: 'Invoice #INV-2025-001 is ready for download.', time: '3 days ago', unread: false },
      { id: 4, icon: '✅', text: 'Stage 2 (Planning & Proposal) completed for your project.', time: '1 week ago', unread: false }
    ];
  },

  renderProjects(filter = '') {
    let projects = this.getUserProjects();
    if (filter) {
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.category.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (!projects.length) {
      document.getElementById('projectsList').innerHTML = `
        <div class="empty-state" style="text-align:center;padding:60px 20px;color:var(--text-muted)">
          <div style="font-size:3rem;margin-bottom:16px">📂</div>
          <h3 style="font-family:var(--font-display);margin-bottom:8px">No projects yet</h3>
          <p>Submit your first project request to get started.</p>
          <button class="btn btn-primary" onclick="Dashboard.showPanel('new-project')" style="margin-top:16px">+ New Project</button>
        </div>`;
      return;
    }

    const statusLabels = {
      'pending': 'Pending',
      'assigned': 'Assigned',
      'in-development': 'In Development',
      'in-progress': 'In Progress',
      'testing': 'Testing',
      'completed': 'Completed',
      'on-hold': 'On Hold'
    };

    document.getElementById('projectsList').innerHTML = projects.map(p => `
      <div class="project-item">
        <div class="project-item-header">
          <div>
            <div class="project-item-title">${p.title}</div>
            <div class="project-item-meta">${p.category} • ${p.priority ? p.priority.charAt(0).toUpperCase() + p.priority.slice(1) + ' Priority' : ''} • ${p.budget || 'Budget TBD'}</div>
          </div>
          <span class="status-badge status-${p.status.replace(' ','-')}">${statusLabels[p.status] || p.status}</span>
        </div>
        <div class="progress-container">
          <div class="progress-label"><span>Progress</span><span>${p.progress || 0}%</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${p.progress || 0}%"></div></div>
        </div>
        ${p.developer ? `<div class="project-developer">👤 Assigned to <span>${p.developer}</span>${p.developerRole ? ' — ' + p.developerRole : ''}</div>` : '<div class="project-developer" style="color:var(--text-muted)">Awaiting developer assignment</div>'}
        ${p.notes ? `<div style="margin-top:12px;font-size:0.8rem;color:var(--text-muted);background:var(--surface-2);border-radius:var(--radius-sm);padding:10px 14px">📝 ${p.notes}</div>` : ''}
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-mono)">Submitted ${this.formatDate(p.submittedAt)}</span>
          ${p.deadline ? `<span style="font-size:0.75rem;color:var(--text-muted)">📅 Deadline: ${p.deadline}</span>` : ''}
        </div>
      </div>
    `).join('');
  },

  renderInvoices() {
    const projects = this.getUserProjects().filter(p => p.invoiced);

    if (!projects.length) {
      document.getElementById('invoicesList').innerHTML = `
        <div style="text-align:center;padding:60px 20px;color:var(--text-muted)">
          <div style="font-size:3rem;margin-bottom:16px">🧾</div>
          <h3 style="font-family:var(--font-display);margin-bottom:8px">No invoices yet</h3>
          <p>Invoices will appear here once a project is approved.</p>
        </div>`;
      return;
    }

    document.getElementById('invoicesList').innerHTML = projects.map((p, i) => {
      const baseAmount = p.budget ? parseInt(p.budget.replace(/[^0-9]/g, '').slice(0, 5)) || 15000 : 15000;
      const tax = Math.round(baseAmount * 0.08);
      const total = baseAmount + tax;
      return `
        <div class="invoice-card">
          <div class="invoice-header">
            <div>
              <div class="invoice-id">#INV-2025-00${i + 1}</div>
              <div class="invoice-title">${p.title}</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="Dashboard.downloadInvoice('INV-2025-00${i+1}')">⬇ Download PDF</button>
          </div>
          <div class="invoice-breakdown">
            <div class="invoice-row"><span>${p.category}</span><span>$${baseAmount.toLocaleString()}</span></div>
            <div class="invoice-row"><span>Project Management</span><span>Included</span></div>
            <div class="invoice-row"><span>QA & Testing</span><span>Included</span></div>
            <div class="invoice-row"><span>Tax (8%)</span><span>$${tax.toLocaleString()}</span></div>
          </div>
          <div class="invoice-total"><span>Total</span><span>$${total.toLocaleString()}</span></div>
        </div>`;
    }).join('');
  },

  renderNotifications() {
    const notifications = this.getNotifications();
    document.getElementById('notificationsList').innerHTML = notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}">
        <span class="notif-icon">${n.icon}</span>
        <div>
          <div class="notif-text">${n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>
        ${n.unread ? '<span style="width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0;margin-left:auto"></span>' : ''}
      </div>
    `).join('');
  },

  bindProjectForm() {
    document.getElementById('projectRequestForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitProjectRequest();
    });
  },

  submitProjectRequest() {
    const category = document.getElementById('projCategory').value;
    const title = document.getElementById('projTitle').value.trim();
    const desc = document.getElementById('projDesc').value.trim();
    const budget = document.getElementById('projBudget').value;
    const deadline = document.getElementById('projDeadline').value;
    const priority = document.getElementById('projPriority').value;

    if (!category || !title || !desc || !budget || !deadline || !priority) {
      UI.toast('Please fill in all required fields.', 'error');
      return;
    }

    const newProject = {
      id: 'proj_' + Date.now(),
      userId: Auth.currentUser.id,
      title,
      category,
      description: desc,
      budget,
      deadline,
      priority,
      status: 'pending',
      progress: 0,
      developer: null,
      submittedAt: new Date().toISOString(),
      notes: '',
      invoiced: false
    };

    const projects = Storage.get('projects', []);
    projects.push(newProject);
    Storage.set('projects', projects);

    document.getElementById('projectRequestForm').reset();
    document.getElementById('fileList').innerHTML = '';
    UI.toast('Project submitted successfully! Our team will review and respond within 24 hours.', 'success');
    this.showPanel('my-projects');
  },

  bindSearch() {
    document.getElementById('projectSearch').addEventListener('input', (e) => {
      this.renderProjects(e.target.value);
    });
  },

  bindFileUpload() {
    const zone = document.getElementById('fileDropZone');
    const input = document.getElementById('fileInput');
    const list = document.getElementById('fileList');

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.style.borderColor = 'var(--accent)'; });
    zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.style.borderColor = '';
      this.handleFiles(e.dataTransfer.files, list);
    });
    input.addEventListener('change', () => this.handleFiles(input.files, list));
  },

  handleFiles(files, listEl) {
    [...files].forEach(f => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `<span>📄 ${f.name}</span><span style="color:var(--text-muted)">${(f.size/1024).toFixed(1)} KB</span>`;
      listEl.appendChild(item);
    });
  },

  downloadInvoice(invoiceId) {
    UI.toast(`Invoice ${invoiceId} download simulated. In production, a PDF would be generated.`, 'info');
  },

  formatDate(iso) {
    if (!iso) return 'Unknown date';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

/* ============================================================
   SERVICES MODULE — Service cards and modal
   ============================================================ */
const Services = {
  init() {
    this.renderCards();
    this.bindModal();
  },

  renderCards() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = DATA.services.map(s => `
      <div class="service-card" data-service="${s.id}">
        <div class="service-icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <div class="service-tags">${s.tags.slice(0,4).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="service-meta">
          <span>⏱ ${s.timeline}</span>
          <span class="service-price">From ${s.from}</span>
        </div>
        <div style="margin-top:14px">
          <span class="service-cta">Explore service →</span>
        </div>
      </div>
    `).join('');
  },

  bindModal() {
    document.getElementById('services-grid').addEventListener('click', (e) => {
      const card = e.target.closest('.service-card');
      if (card) this.openModal(card.dataset.service);
    });

    const closeBtn = document.getElementById('closeServiceModal');
    const overlay = document.getElementById('serviceModal');
    closeBtn.addEventListener('click', () => this.closeModal());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });
  },

  openModal(serviceId) {
    const s = DATA.services.find(sv => sv.id === serviceId);
    if (!s) return;

    document.getElementById('serviceModalContent').innerHTML = `
      <div class="service-modal-header">
        <div class="service-modal-icon">${s.icon}</div>
        <h2>${s.title}</h2>
        <p>${s.description}</p>
      </div>
      <div class="pricing-tiers">
        <div class="tier">
          <div class="tier-name">Basic</div>
          <div class="tier-price">${s.tiers.basic}</div>
        </div>
        <div class="tier featured">
          <div class="tier-name">Pro ★</div>
          <div class="tier-price">${s.tiers.pro}</div>
        </div>
        <div class="tier">
          <div class="tier-name">Enterprise</div>
          <div class="tier-price">${s.tiers.enterprise}</div>
        </div>
      </div>
      <h4 style="font-family:var(--font-display);margin-bottom:12px;font-size:0.9rem">What's Included</h4>
      <div class="use-cases-grid">
        ${s.features.map(f => `<div class="use-case-item">${f}</div>`).join('')}
      </div>
      <h4 style="font-family:var(--font-display);margin-bottom:12px;font-size:0.9rem">Common Use Cases</h4>
      <div class="use-cases-grid">
        ${s.useCases.map(u => `<div class="use-case-item">${u}</div>`).join('')}
      </div>
      <div style="display:flex;gap:12px;margin-top:24px">
        <button class="btn btn-primary btn-full" onclick="Services.requestService('${s.title}')">Request This Service →</button>
        <button class="btn btn-outline" onclick="Services.closeModal()">Close</button>
      </div>
    `;
    document.getElementById('serviceModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('serviceModal').classList.remove('active');
    document.body.style.overflow = '';
  },

  requestService(serviceName) {
    this.closeModal();
    if (!Auth.currentUser) {
      Auth.openModal('register');
    } else {
      Dashboard.open();
      Dashboard.showPanel('new-project');
      setTimeout(() => {
        const select = document.getElementById('projCategory');
        if (select) {
          [...select.options].forEach(o => { if (o.text === serviceName) select.value = o.value; });
        }
      }, 100);
    }
  }
};

/* ============================================================
   WORKFLOW MODULE — Timeline steps + modal
   ============================================================ */
const Workflow = {
  init() {
    this.renderTimeline();
    this.bindModal();
  },

  renderTimeline() {
    const container = document.getElementById('workflow-timeline');
    if (!container) return;
    container.innerHTML = DATA.workflowSteps.map(s => `
      <div class="workflow-step" data-step="${s.step}">
        <div class="step-indicator">
          <div class="step-circle">${s.step}</div>
        </div>
        <div class="step-content">
          <div class="step-number">${s.icon} Stage ${s.step}</div>
          <h4>${s.title}</h4>
          <p>${s.brief}</p>
        </div>
      </div>
    `).join('');
  },

  bindModal() {
    document.getElementById('workflow-timeline').addEventListener('click', (e) => {
      const step = e.target.closest('.workflow-step');
      if (step) this.openModal(step.dataset.step);
    });

    const closeBtn = document.getElementById('closeWorkflowModal');
    const overlay = document.getElementById('workflowModal');
    closeBtn.addEventListener('click', () => this.closeModal());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });
  },

  openModal(stepNum) {
    const s = DATA.workflowSteps.find(ws => ws.step === stepNum);
    if (!s) return;
    document.getElementById('workflowModalContent').innerHTML = `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:3rem;margin-bottom:8px">${s.icon}</div>
        <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);letter-spacing:2px;margin-bottom:8px">STAGE ${s.step} OF 08</div>
        <h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:800;margin-bottom:8px">${s.title}</h2>
        <p style="color:var(--text-secondary);font-size:0.95rem">${s.brief}</p>
      </div>
      <div style="background:var(--surface-2);border-radius:var(--radius-md);padding:20px;margin-bottom:20px;line-height:1.7;font-size:0.9rem;color:var(--text-secondary)">${s.detail}</div>
      <div style="display:flex;gap:16px">
        <div style="flex:1;background:var(--surface-1);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;text-align:center">
          <div style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px">DURATION</div>
          <div style="font-family:var(--font-display);font-weight:700">${s.duration}</div>
        </div>
        <div style="flex:1;background:var(--surface-1);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;text-align:center">
          <div style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px">DELIVERABLE</div>
          <div style="font-family:var(--font-display);font-weight:700;font-size:0.85rem">${s.deliverable}</div>
        </div>
      </div>
    `;
    document.getElementById('workflowModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('workflowModal').classList.remove('active');
    document.body.style.overflow = '';
  }
};

/* ============================================================
   TESTIMONIALS MODULE — Slider
   ============================================================ */
const Testimonials = {
  current: 0,

  init() {
    this.render();
    this.bindControls();
    this.autoPlay();
  },

  render() {
    const track = document.getElementById('testimonials-track');
    const dots = document.getElementById('sliderDots');
    if (!track) return;

    track.innerHTML = DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
        <div class="testimonial-text">"${t.text}"</div>
        <div class="testimonial-author">
          <div class="author-avatar">${t.initials}</div>
          <div>
            <div class="author-name">${t.author}</div>
            <div class="author-role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join('');

    dots.innerHTML = DATA.testimonials.map((_, i) =>
      `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
    ).join('');

    dots.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot');
      if (dot) this.goTo(parseInt(dot.dataset.index));
    });
  },

  bindControls() {
    document.getElementById('prevTestimonial')?.addEventListener('click', () => {
      this.goTo((this.current - 1 + DATA.testimonials.length) % DATA.testimonials.length);
    });
    document.getElementById('nextTestimonial')?.addEventListener('click', () => {
      this.goTo((this.current + 1) % DATA.testimonials.length);
    });
  },

  goTo(idx) {
    this.current = idx;
    document.getElementById('testimonials-track').style.transform = `translateX(-${idx * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  },

  autoPlay() {
    setInterval(() => {
      this.goTo((this.current + 1) % DATA.testimonials.length);
    }, 6000);
  }
};

/* ============================================================
   FAQ MODULE — Accordion
   ============================================================ */
const FAQ = {
  init() {
    this.render();
    this.bind();
  },

  render() {
    const list = document.getElementById('faq-list');
    if (!list) return;
    list.innerHTML = DATA.faqs.map((faq, i) => `
      <div class="faq-item" data-faq="${i}">
        <button class="faq-question">
          <span>${faq.q}</span>
          <span class="faq-chevron">▼</span>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">${faq.a}</div>
        </div>
      </div>
    `).join('');
  },

  bind() {
    document.getElementById('faq-list')?.addEventListener('click', (e) => {
      const item = e.target.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-answer').classList.add('open');
      }
    });
  }
};

/* ============================================================
   CONTACT MODULE
   ============================================================ */
const Contact = {
  init() {
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !subject || !message) {
        UI.toast('Please fill in all fields.', 'error');
        return;
      }
      if (!Auth.isValidEmail(email)) {
        UI.toast('Please enter a valid email address.', 'error');
        return;
      }

      UI.toast(`Message sent! We'll get back to you at ${email} within 24 hours.`, 'success');
      document.getElementById('contactForm').reset();
    });
  }
};

/* ============================================================
   PASSWORD STRENGTH MODULE
   ============================================================ */
function checkPasswordStrength(pw) {
  const bar = document.getElementById('pwBar');
  const label = document.getElementById('pwLabel');
  if (!bar) return;

  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const levels = [
    { pct: 0, color: 'transparent', text: 'Enter password' },
    { pct: 20, color: 'var(--red)', text: 'Very weak' },
    { pct: 40, color: 'var(--orange)', text: 'Weak' },
    { pct: 60, color: 'var(--yellow)', text: 'Fair' },
    { pct: 80, color: 'var(--accent-2)', text: 'Strong' },
    { pct: 100, color: 'var(--green)', text: 'Very strong ✓' }
  ];

  const level = levels[score] || levels[0];
  bar.style.width = level.pct + '%';
  bar.style.background = level.color;
  label.textContent = level.text;
  label.style.color = level.color;
}

/* ============================================================
   GLOBAL HELPERS
   ============================================================ */
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
  document.getElementById('nav-links')?.classList.remove('open');
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  Storage.set('theme', theme);
  UI.toast(`${theme === 'dark' ? '🌙 Dark' : '☀️ Light'} theme applied.`, 'info', 2000);
}

function saveSettings() {
  const user = Auth.currentUser;
  if (!user) return;

  user.name = document.getElementById('settingsName').value.trim() || user.name;
  user.email = document.getElementById('settingsEmail').value.trim() || user.email;
  user.company = document.getElementById('settingsCompany').value.trim();

  Storage.set('currentUser', user);
  const users = Storage.get('users', []);
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) { users[idx] = user; Storage.set('users', users); }

  Dashboard.renderUserInfo(user);
  UI.toast('Settings saved successfully.', 'success');
}

/* ============================================================
   LOADING SCREEN
   ============================================================ */
function hideLoadingScreen() {
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) screen.classList.add('hidden');
  }, 2200);
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }
});

/* ============================================================
   APP INIT — Bootstrap all modules
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  hideLoadingScreen();
  UI.init();
  Auth.init();
  Services.init();
  Workflow.init();
  Testimonials.init();
  FAQ.init();
  Contact.init();

  // Bind footer links after DOM is ready
  document.getElementById('footerLoginLink')?.addEventListener('click', (e) => { e.preventDefault(); Auth.openModal('login'); });
  document.getElementById('footerRegisterLink')?.addEventListener('click', (e) => { e.preventDefault(); Auth.openModal('register'); });

  // Nav link smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });
});
