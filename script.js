// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Debounce function for expensive operations
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Cache DOM queries
const domCache = new Map();
const getCached = (selector) => {
    if (!domCache.has(selector)) {
        domCache.set(selector, document.querySelector(selector));
    }
    return domCache.get(selector);
};

const getAllCached = (selector) => {
    const key = `all:${selector}`;
    if (!domCache.has(key)) {
        domCache.set(key, document.querySelectorAll(selector));
    }
    return domCache.get(key);
};

// ==================== LANGUAGE SWITCHER ====================
// Translation object
const translations = {
    en: {
        sectionTitles: {
            about: 'About Me',
            timeline: 'Professional Experience',
            projects: 'Featured Projects',
            publications: 'Publications',
            presentations: 'Presentations & Talks',
            awards: 'Awards & Recognition',
            collaborations: 'Collaborations & Networks',
            contact: 'Get in Touch'
        },
        presentationsSubtitle: 'Conference presentations, seminars, and research talks',
        showMore: 'Show More',
        showLess: 'Show Less',
        statLabels: {
            publications: 'Publications',
            miccai: 'MICCAI 2025 Early Acceptances',
            projects: 'Featured Projects',
            awards: 'Awards & Honors'
        },
        projectBadges: {
            underReview: 'Under Review',
            published: 'Published',
            inProgress: 'In Progress'
        },
        projectLinks: {
            paper: 'Paper',
            code: 'Code',
            website: 'Website',
            demo: 'Demo',
            info: 'Info'
        },
        projects: {
            caravelMetrics: {
                title: 'CaravelMetrics',
                description: 'Advanced metrics and evaluation framework for vessel segmentation analysis. Comprehensive toolset for assessing vascular structure segmentation quality. Submitted to ISBI 2026.'
            },
            vesselVerse: {
                title: 'VesselVerse',
                description: 'A comprehensive dataset and collaborative framework for vessel annotation, enabling multi-institutional collaboration in brain vessel segmentation research. Early Acceptance - Best 9%.'
            },
            oneShotAL: {
                title: 'One-Shot Active Learning',
                description: 'Novel approach for vessel segmentation using active learning techniques to dramatically reduce annotation requirements while maintaining high performance. Early Acceptance - Best 9%.'
            },
            multiDomain: {
                title: 'Multi-Domain Brain Vessel Segmentation',
                description: 'Feature disentanglement approach for robust brain vessel segmentation across multiple imaging domains, published in Machine Learning for Biomedical Imaging.'
            },
            a2v: {
                title: 'A2V Framework',
                description: 'Semi-supervised domain adaptation framework for brain vessel segmentation via two-phase training angiography-to-venography translation. Presented at BMVC 2023.'
            },
            topCow: {
                title: 'TopCoW Challenge',
                description: 'Benchmarking topology-aware anatomical segmentation of the Circle of Willis for CTA and MRA imaging modalities.'
            },
            multiPath: {
                title: 'MultiPath2Vec',
                description: 'Attention-based model for security vulnerability detection in code commits, developed during research internship at SAP Labs.'
            }
        },
        awards: {
            subtitle: 'Recognition for academic excellence and research contributions',
            docConsortium: {
                title: 'Doctoral Consortium Finalist',
                org: 'MICCAI 2025 Doctoral Consortium',
                desc: 'Selected among top PhD candidates worldwide'
            },
            spotlight: {
                title: 'Spotlight Presentation',
                org: 'MICCAI 2025 - VesselVerse',
                desc: 'Top 9% Early Acceptance with Spotlight presentation'
            },
            bestPaper: {
                title: 'Best Paper Award',
                org: 'MICCAI 2nd Deep Breast Workshop',
                desc: 'Best paper in AI and Imaging for Breast Care'
            },
            coOrganizer: {
                title: 'Challenge Co-Organizer',
                org: 'TopBrain MICCAI 2025 Challenge',
                desc: 'Leading international brain segmentation challenge'
            },
            dissemination: {
                title: 'Research Dissemination',
                org: 'World AI Cannes Festival (WAICF)',
                desc: 'Presenting AI research to global audience'
            },
            mobilityScholar: {
                title: 'Mobility Scholarship Winner',
                org: '18-months Double MSc. Degree @ EURECOM',
                desc: 'Competitive international exchange program'
            },
            academicScholar: {
                title: 'Academic Scholarship Winner',
                org: 'MSc. @ Politecnico di Torino',
                desc: 'Merit-based full tuition scholarship'
            },
            youngTalents: {
                title: 'Young Talents - Honors Program',
                org: 'Top 1% students @ Politecnico di Torino',
                desc: 'Exclusive program for exceptional students'
            }
        },
        footer: {
            subtitle: 'AI Research Scientist | 3D Computer Vision & Data-Efficiency',
            quickLinks: 'Quick Links',
            connect: 'Connect',
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            publications: 'Publications',
            presentations: 'Presentations',
            contact: 'Contact',
            rights: 'All rights reserved',
            builtWith: 'Built with 💙 and ☕'
        },
        // UPDATED: Optimized for Industry / Research Scientist Role
        aboutText: [
            "I am an <strong>AI Research Scientist (PhD Candidate)</strong> specializing in <strong>Data-Efficient Deep Learning</strong> and <strong>3D Computer Vision</strong>. My focus is solving the 'Data Scarcity' bottleneck by architecting scalable <strong>Active Learning</strong> frameworks and MLOps infrastructure that drastically reduce labeling costs while maximizing model performance.",
            "My research on <strong>Data-Centric AI</strong> for complex 3D topologies has achieved State-of-the-Art results, securing two <strong>Top 9% acceptances at MICCAI 2025</strong>. I bridge the gap between theoretical research and production engineering, using high-dimensional medical imaging as a high-complexity sandbox to solve universal computer vision problems.",
            "With a <strong>Double Degree MSc. in Data Science</strong> and a background in <strong>Biomedical Engineering</strong>, I am passionate about deploying robust, safety-critical AI systems in real-world environments."
        ],
        skillsTitle: 'Skills & Expertise',
        technicalProficiency: 'Technical Proficiency',
        skillLevels: {
            expert: 'Expert',
            advanced: 'Advanced',
            intermediate: 'Intermediate',
            beginner: 'Beginner'
        },
        contactText: "I'm always open to discussing research collaborations, new opportunities in AI/Computer Vision, or just chatting about interesting ideas in deep learning and scalable infrastructure.",
        timeline: [
            // UPDATED: Reframed PhD as a Job/Role
            {
                date: '2023 - Early 2026',
                title: '🔬 AI Research Scientist (PhD Candidate)',
                location: 'Sorbonne Université & EURECOM',
                description: 'Leading research on Data-Efficient Deep Learning. Architected "VesselVerse," a collaborative annotation infrastructure reducing labeling costs for 3D segmentation. Achieved SOTA results (Top 9% MICCAI) in Active Learning and Domain Adaptation.',
                tags: ['Deep Learning', 'Computer Vision', 'MLOps']
            },
            {
                date: '2023 - Present',
                title: '👨‍🏫 Teaching Assistant',
                location: 'EURECOM',
                description: "Teaching Assistant for MALIS (Machine Learning and Intelligent Systems) course and labs. Supporting graduate students in machine learning theory and practical implementations.",
                tags: ['Teaching', 'Machine Learning', 'Mentoring']
            },
            {
                date: '2022 - 2023',
                title: '💼 AI Research Engineer Intern',
                location: 'SAP Labs, France',
                description: 'Developed MultiPath2Vec, an attention-based model for security vulnerability detection in code commits. Applied NLP and deep learning techniques to software security.',
                tags: ['NLP', 'Security', 'Industry']
            },
            {
                date: '2021 - 2022',
                title: '📚 MSc. Data Science (Double Degree - Year 2)',
                location: 'EURECOM',
                description: 'Second year of Double Degree program with Mobility Scholarship. Specialized in Medical Image Analysis, Deep Learning, and Computer Vision with focus on healthcare applications.',
                tags: ['Data Science', 'Medical Imaging', 'Scholarship']
            },
            {
                date: '2020 - 2021',
                title: '📚 MSc. Data Science (Double Degree - Year 1)',
                location: 'Politecnico di Torino',
                description: 'First year of Double Degree program in Data Science. Focus on Machine Learning and Computer Vision fundamentals with strong theoretical and practical foundation.',
                tags: ['Data Science', 'Machine Learning', 'Double Degree']
            },
            {
                date: '2017 - 2020',
                title: '🎓 BSc. Biomedical Engineering',
                location: 'Politecnico di Torino',
                description: "Bachelor's degree with honors. Selected for Young Talents - Honors Program (Top 1% of students). Founded strong technical and theoretical background in engineering and medicine.",
                tags: ['Biomedical', 'Engineering', 'Top 1%']
            }
        ],
        loadingText: "Loading...",
        collaborations: [
            { name: 'EURECOM', location: '📍 Sophia Antipolis, France', role: 'Main Research Center', tags: ['Computer Vision', 'Medical AI'] },
            { name: 'Sorbonne Université', location: '📍 Biot, France', role: 'PhD Host Institution', tags: ['Neuroimaging', 'Clinical Research'] },
            { name: 'GIN Grenoble', location: '📍 Grenoble, France', role: 'Neurology Institute', tags: ['Neurology', 'Research'] },
            { name: 'INRIA', location: '📍 Sophia Antipolis, France', role: 'National Research Institute', tags: ['Algorithms', 'Imaging'] },
            { name: 'King\'s College London', location: '📍 London, UK', role: 'Clinical Research', tags: ['Clinical Trials', 'Collaboration'] },
            { name: 'UCL Queen Square', location: '📍 London, UK', role: 'Neurology Institute', tags: ['Neuroscience', 'Collaboration'] },
            { name: 'University of Milan', location: '📍 Milan, Italy', role: 'Academic Partnership', tags: ['Academic', 'Collaboration'] },
            { name: 'Politecnico di Torino', location: '📍 Turin, Italy', role: 'Academic Partnership', tags: ['AI Engineering', 'Innovation'] },
            { name: 'University of Zurich', location: '📍 Zurich, Switzerland', role: 'Research Collaboration', tags: ['Image Analysis', 'Segmentation'] },
            { name: 'University of Siena', location: '📍 Siena, Italy', role: 'Research Partnership', tags: ['Medical AI', 'Collaboration'] },
            { name: 'Universitat Oberta de Catalunya', location: '📍 Barcelona, Spain', role: 'Research Collaboration', tags: ['Deep Learning', 'AI Research'] }
        ]
        ,
        presentations: [
            { title: 'Invited Industrial Talk', venue: 'Viz.ai • 2025  🇮🇱' },
            { title: 'Journal Club Presentation #5', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'Doctoral Consortium - Finalist', venue: 'MICCAI 2025 • South Korea 🇰🇷' },
            { title: 'VesselVerse - Spotlight Presentation', venue: 'MICCAI 2025 • South Korea 🇰🇷' },
            { title: 'MICCAI Highlights', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'My MICCAI 2025', venue: 'INRIA Journal Club • 2025 🇫🇷' },
            { title: 'VesselMetrics', venue: 'GIN Grenoble • 2025 🇫🇷' },
            { title: 'VesselVerse - Method Presentation', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'Journal Club Presentation #4', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'Journal Club Presentation #3', venue: 'EURECOM • 2024 🇫🇷' },
            { title: 'Journal Club Presentation #2', venue: 'EURECOM • 2024 🇫🇷' },
            { title: 'Journal Club Presentation #1', venue: 'EURECOM • 2023 🇫🇷' },
            { title: 'TopCoW Challenge', venue: 'MICCAI 2023 • Canada 🇨🇦' }
        ]
    },
    it: {
        sectionTitles: {
            about: 'Chi Sono',
            timeline: 'Esperienza Professionale',
            projects: 'Progetti in Evidenza',
            publications: 'Pubblicazioni',
            presentations: 'Presentazioni e Conferenze',
            awards: 'Premi e Riconoscimenti',
            collaborations: 'Collaborazioni e Network',
            contact: 'Contattami'
        },
        presentationsSubtitle: 'Presentazioni a conferenze, seminari e interventi di ricerca',
        showMore: 'Mostra Altro',
        showLess: 'Mostra Meno',
        statLabels: {
            publications: 'Pubblicazioni',
            miccai: 'MICCAI 2025 Early Acceptance',
            projects: 'Progetti in Evidenza',
            awards: 'Premi e Riconoscimenti'
        },
        projectBadges: {
            underReview: 'In Revisione',
            published: 'Pubblicato',
            inProgress: 'In Corso'
        },
        projectLinks: {
            paper: 'Articolo',
            code: 'Codice',
            website: 'Sito Web',
            demo: 'Demo',
            info: 'Info'
        },
        projects: {
            caravelMetrics: {
                title: 'CaravelMetrics',
                description: 'Framework avanzato di metriche e valutazione per l\'analisi della segmentazione vascolare. Toolkit completo per valutare la qualità della segmentazione delle strutture vascolari. Sottomesso a ISBI 2026.'
            },
            vesselVerse: {
                title: 'VesselVerse',
                description: 'Un dataset completo e un framework collaborativo per l\'annotazione dei vasi, che consente la collaborazione multi-istituzionale nella ricerca sulla segmentazione vascolare cerebrale. Early Acceptance - Top 9%.'
            },
            oneShotAL: {
                title: 'Active Learning One-Shot',
                description: 'Approccio innovativo per la segmentazione vascolare utilizzando tecniche di active learning per ridurre drasticamente i requisiti di annotazione mantenendo alte prestazioni. Early Acceptance - Top 9%.'
            },
            multiDomain: {
                title: 'Segmentazione Vascolare Cerebrale Multi-Dominio',
                description: 'Approccio di separazione delle caratteristiche per una segmentazione vascolare cerebrale robusta attraverso molteplici domini di imaging, pubblicato su Machine Learning for Biomedical Imaging.'
            },
            a2v: {
                title: 'Framework A2V',
                description: 'Framework di adattamento di dominio semi-supervisionato per la segmentazione vascolare cerebrale tramite training bifase per la traduzione angiografia-venografia. Presentato a BMVC 2023.'
            },
            topCow: {
                title: 'TopCoW Challenge',
                description: 'Benchmark della segmentazione anatomica topology-aware del Circolo di Willis per modalità di imaging CTA e MRA.'
            },
            multiPath: {
                title: 'MultiPath2Vec',
                description: 'Modello basato su attention per il rilevamento di vulnerabilità di sicurezza nei commit di codice, sviluppato durante lo stage di ricerca presso SAP Labs.'
            }
        },
        awards: {
            subtitle: 'Riconoscimenti per l\'eccellenza accademica e i contributi di ricerca',
            docConsortium: {
                title: 'Finalista Doctoral Consortium',
                org: 'MICCAI 2025 Doctoral Consortium',
                desc: 'Selezionato tra i migliori dottorandi a livello mondiale'
            },
            spotlight: {
                title: 'Presentazione Spotlight',
                org: 'MICCAI 2025 - VesselVerse',
                desc: 'Top 9% Early Acceptance con presentazione Spotlight'
            },
            bestPaper: {
                title: 'Premio Miglior Articolo',
                org: 'MICCAI 2nd Deep Breast Workshop',
                desc: 'Miglior articolo in AI e Imaging per la Cura del Seno'
            },
            coOrganizer: {
                title: 'Co-Organizzatore Challenge',
                org: 'TopBrain MICCAI 2025 Challenge',
                desc: 'Coordinamento di una sfida internazionale sulla segmentazione cerebrale'
            },
            dissemination: {
                title: 'Divulgazione della Ricerca',
                org: 'World AI Cannes Festival (WAICF)',
                desc: 'Presentazione della ricerca AI al pubblico globale'
            },
            mobilityScholar: {
                title: 'Vincitore Borsa di Mobilità',
                org: 'MSc. Double Degree 18 mesi @ EURECOM',
                desc: 'Programma di scambio internazionale competitivo'
            },
            academicScholar: {
                title: 'Vincitore Borsa Accademica',
                org: 'MSc. @ Politecnico di Torino',
                desc: 'Borsa di studio completa per merito'
            },
            youngTalents: {
                title: 'Programma Giovani Talenti',
                org: 'Top 1% studenti @ Politecnico di Torino',
                desc: 'Programma esclusivo per i migliori studenti'
            }
        },
        footer: {
            subtitle: 'AI Research Scientist | 3D Computer Vision & Data-Efficiency',
            quickLinks: 'Link Rapidi',
            connect: 'Connetti',
            home: 'Home',
            about: 'Chi Sono',
            projects: 'Progetti',
            publications: 'Pubblicazioni',
            presentations: 'Presentazioni',
            contact: 'Contatti',
            rights: 'Tutti i diritti riservati',
            builtWith: 'Realizzato con 💙 e ☕'
        },
        // UPDATED: Optimized for Industry / Research Scientist Role (Italian)
        aboutText: [
            "Sono un <strong>AI Research Scientist (PhD Candidate)</strong> specializzato in <strong>Data-Efficient Deep Learning</strong> e <strong>3D Computer Vision</strong>. Il mio obiettivo è risolvere il problema della 'Data Scarcity' progettando framework scalabili di <strong>Active Learning</strong> e infrastrutture MLOps che riducono drasticamente i costi di annotazione massimizzando al contempo le prestazioni dei modelli.",
            "La mia ricerca sulla <strong>Data-Centric AI</strong> per topologie 3D complesse ha raggiunto risultati allo Stato dell'Arte (SOTA), ottenendo due accettazioni Top 9% alla conferenza MICCAI 2025. Colmo il divario tra ricerca teorica e ingegneria di produzione, utilizzando l'imaging medico ad alta dimensione come una 'sandbox' ad alta complessità per risolvere problemi universali di Computer Vision.",
            "Con una <strong>doppia laurea magistrale in Data Science</strong> e un background in <strong>Ingegneria Biomedica</strong>, mi appassiona lo sviluppo e il deployment di sistemi AI robusti e safety-critical in ambienti reali."
        ],
        skillsTitle: 'Competenze ed Esperienza',
        technicalProficiency: 'Competenza Tecnica',
        skillLevels: {
            expert: 'Esperto',
            advanced: 'Avanzato',
            intermediate: 'Intermedio',
            beginner: 'Principiante'
        },
        contactText: "Sono sempre disponibile a discutere collaborazioni di ricerca, nuove opportunità nell'IA e Computer Vision, o semplicemente chiacchierare di idee interessanti nel deep learning e infrastrutture scalabili.",
        timeline: [
            // UPDATED: Reframed PhD as a Job/Role (Italian)
            {
                date: '2023 - Presente (Fine Prevista: 2026)',
                title: '🔬 AI Research Scientist (Dottorando)',
                location: 'Sorbonne Université & EURECOM',
                description: 'Ricerca principale su Deep Learning Data-Efficient. Ingegnerizzazione di "VesselVerse", infrastruttura di annotazione collaborativa che riduce i costi di labeling. Risultati SOTA (Top 9% MICCAI) in Active Learning e Domain Adaptation.',
                tags: ['Deep Learning', 'Computer Vision', 'MLOps']
            },
            {
                date: '2023 - Presente',
                title: '👨‍🏫 Assistente alla Didattica',
                location: 'EURECOM',
                description: 'Assistente alla didattica per il corso MALIS (Machine Learning and Intelligent Systems) e relativi laboratori. Supporto agli studenti magistrali in teoria e pratica del machine learning.',
                tags: ['Didattica', 'Machine Learning', 'Mentoring']
            },
            {
                date: '2022 - 2023',
                title: '💼 AI Research Engineer Intern',
                location: 'SAP Labs, France',
                description: 'Sviluppo di MultiPath2Vec, un modello basato su attention per il rilevamento di vulnerabilità di sicurezza nei commit di codice. Applicazione di NLP e tecniche di deep learning per la sicurezza del software.',
                tags: ['NLP', 'Sicurezza', 'Industria']
            },
            {
                date: '2021 - 2022',
                title: '📚 MSc. Data Science (Doppia Laurea - Anno 2)',
                location: 'EURECOM',
                description: 'Secondo anno del programma a doppia laurea con Borsa di Mobilità. Specializzazione in Analisi di Immagini Mediche, Deep Learning e Computer Vision applicata alla sanità.',
                tags: ['Data Science', 'Imaging Medico', 'Borsa']
            },
            {
                date: '2020 - 2021',
                title: '📚 MSc. Data Science (Doppia Laurea - Anno 1)',
                location: 'Politecnico di Torino',
                description: 'Primo anno del programma in Data Science. Focus su Machine Learning e Computer Vision con solida base teorica e pratica.',
                tags: ['Data Science', 'Machine Learning', 'Doppia Laurea']
            },
            {
                date: '2017 - 2020',
                title: '🎓 Laurea Triennale in Ingegneria Biomedica',
                location: 'Politecnico di Torino',
                description: 'Laurea con lode. Selezionato per il Programma Giovani Talenti (Top 1% degli studenti). Solida formazione tecnica e teorica in ingegneria e medicina.',
                tags: ['Biomedico', 'Ingegneria', 'Top 1%']
            }
        ],
        loadingText: "Loading...",
        collaborations: [
            { name: 'EURECOM', location: '📍 Sophia Antipolis, Francia', role: 'Centro di Ricerca Principale', tags: ['Visione Computerizzata', 'AI Medico'] },
            { name: 'Sorbonne Université', location: '📍 Biot, Francia', role: 'Istituzione ospitante per il Dottorato', tags: ['Neuroimaging', 'Ricerca Clinica'] },
            { name: 'GIN Grenoble', location: '📍 Grenoble, Francia', role: 'Istituto di Neurologia', tags: ['Neurologia', 'Ricerca'] },
            { name: 'INRIA', location: '📍 Sophia Antipolis, Francia', role: 'Istituto Nazionale di Ricerca', tags: ['Algoritmi', 'Imaging'] },
            { name: 'King\'s College London', location: '📍 Londra, Regno Unito', role: 'Ricerca Clinica', tags: ['Sperimentazioni Cliniche', 'Collaborazione'] },
            { name: 'UCL Queen Square', location: '📍 Londra, Regno Unito', role: 'Istituto di Neurologia', tags: ['Neuroscienze', 'Collaborazione'] },
            { name: 'University of Milan', location: '📍 Milano, Italia', role: 'Partnership Accademica', tags: ['Accademico', 'Collaborazione'] },
            { name: 'Politecnico di Torino', location: '📍 Torino, Italia', role: 'Partnership Accademica', tags: ['AI Engineering', 'Innovazione'] },
            { name: 'University of Zurich', location: '📍 Zurigo, Svizzera', role: 'Collaborazione di Ricerca', tags: ['Analisi Immagini', 'Segmentazione'] },
            { name: 'University of Siena', location: '📍 Siena, Italia', role: 'Partnership di Ricerca', tags: ['Medical AI', 'Collaborazione'] },
            { name: 'Universitat Oberta de Catalunya', location: '📍 Barcellona, Spagna', role: 'Collaborazione di Ricerca', tags: ['Deep Learning', 'Ricerca AI'] }
        ]
        ,
        presentations: [
            { title: 'Presentazione in Azienda', venue: 'Viz.ai • 2025  🇮🇱' },
            { title: 'Journal Club Presentazione #5', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'Doctoral Consortium - Finalista', venue: 'MICCAI 2025 • Corea del Sud 🇰🇷' },
            { title: 'VesselVerse - Presentazione Spotlight', venue: 'MICCAI 2025 • Corea del Sud 🇰🇷' },
            { title: 'Highlights MICCAI', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'Il mio MICCAI 2025', venue: 'INRIA Journal Club • 2025 🇫🇷' },
            { title: 'VesselMetrics', venue: 'GIN Grenoble • 2025 🇫🇷' },
            { title: 'VesselVerse - Presentazione Metodo', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'Journal Club Presentazione #4', venue: 'EURECOM • 2025 🇫🇷' },
            { title: 'Journal Club Presentazione #3', venue: 'EURECOM • 2024 🇫🇷' },
            { title: 'Journal Club Presentazione #2', venue: 'EURECOM • 2024 🇫🇷' },
            { title: 'Journal Club Presentazione #1', venue: 'EURECOM • 2023 🇫🇷' },
            { title: 'TopCoW Challenge', venue: 'MICCAI 2023 • Canada 🇨🇦' }
        ]
    }
};

// Language switcher functionality
let currentLang = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.body.className = lang === 'it' ? 'lang-it' : '';
    document.documentElement.lang = lang;
    
    // Update flag icon
    const flagIcon = document.getElementById('current-flag');
    
    if (flagIcon) {
        if (lang === 'it') {
            flagIcon.textContent = '🇮🇹';
        } else {
            flagIcon.textContent = '🇬🇧';
        }
    }
    
    // Update section titles
    const aboutTitle = document.querySelector('#about .section-title');
    const timelineTitle = document.querySelector('#timeline .section-title');
    const projectsTitle = document.querySelector('#projects .section-title');
    const publicationsTitle = document.querySelector('#publications .section-title');
    const presentationsTitle = document.querySelector('#presentations .section-title');
    const awardsTitle = document.querySelector('#awards .section-title');
    const collaborationsTitle = document.querySelector('#collaborations .section-title');
    const contactTitle = document.querySelector('#contact .section-title');
    
    if (aboutTitle) aboutTitle.textContent = translations[lang].sectionTitles.about;
    if (timelineTitle) timelineTitle.textContent = translations[lang].sectionTitles.timeline;
    if (projectsTitle) projectsTitle.textContent = translations[lang].sectionTitles.projects;
    if (publicationsTitle) publicationsTitle.textContent = translations[lang].sectionTitles.publications;
    if (presentationsTitle) presentationsTitle.textContent = translations[lang].sectionTitles.presentations;
    if (awardsTitle) awardsTitle.textContent = translations[lang].sectionTitles.awards;
    if (collaborationsTitle) collaborationsTitle.textContent = translations[lang].sectionTitles.collaborations;
    if (contactTitle) contactTitle.textContent = translations[lang].sectionTitles.contact;
    
    // Update about section paragraphs (use innerHTML so <strong> markup is preserved)
    const aboutParagraphs = document.querySelectorAll('.about-text > p');
    translations[lang].aboutText.forEach((text, index) => {
        if (aboutParagraphs[index]) {
            aboutParagraphs[index].innerHTML = text;
        }
    });
    
    // Update Skills title
    const skillsTitle = document.querySelector('.skills h3');
    if (skillsTitle) skillsTitle.textContent = translations[lang].skillsTitle;
    
    // Update contact section text
    const contactText = document.querySelector('.contact-content > p');
    if (contactText) {
        contactText.textContent = translations[lang].contactText;
    }
    
    // Update loading text if still visible
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = translations[lang].loadingText;
    }
    
    // Update presentations subtitle
    const presSubtitle = document.querySelector('.presentations-subtitle');
    if (presSubtitle) {
        presSubtitle.textContent = translations[lang].presentationsSubtitle;
    }

    // Update individual presentation cards (title + venue)
    if (translations[lang].presentations) {
        // Map original cards by data-link (preferred stable key) or fallback to title text
        const originalPres = Array.from(document.querySelectorAll('.presentation-compact-card')).filter(c => !c.classList.contains('mock-presentation'));
        const presMap = new Map();
        originalPres.forEach((card, idx) => {
            const key = card.getAttribute('data-link') || card.getAttribute('data-embed') || card.querySelector('.presentation-compact-title')?.textContent?.trim();
            const trans = translations[lang].presentations[idx] || null;
            if (!trans) return;
            if (key) presMap.set(key, trans);
        });

        // Update all presentation cards including clones
        const allPres = document.querySelectorAll('.presentation-compact-card');
        allPres.forEach(card => {
            const key = card.getAttribute('data-link') || card.getAttribute('data-embed') || card.querySelector('.presentation-compact-title')?.textContent?.trim();
            let trans = key ? presMap.get(key) : null;

            // Fallback: if not found, try by original index
            if (!trans && !card.classList.contains('mock-presentation')) {
                const idx = originalPres.indexOf(card);
                if (idx !== -1) trans = translations[lang].presentations[idx] || null;
            }

            if (!trans) return;

            const titleEl = card.querySelector('.presentation-compact-title');
            if (titleEl) titleEl.textContent = trans.title;

            const venueEl = card.querySelector('.presentation-compact-venue');
            if (venueEl) venueEl.textContent = trans.venue;
        });
    }
    
    // Update Show More/Less button
    const timelineToggle = document.querySelector('.toggle-text');
    if (timelineToggle) {
        const isExpanded = document.querySelector('.timeline-toggle-btn').classList.contains('expanded');
        timelineToggle.textContent = isExpanded ? translations[lang].showLess : translations[lang].showMore;
    }

    // Update timeline items (dates, titles, locations, descriptions, tags)
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems && translations[lang].timeline) {
        timelineItems.forEach((item, index) => {
            const t = translations[lang].timeline[index];
            if (!t) return;

            const dateEl = item.querySelector('.timeline-date');
            const titleEl = item.querySelector('.timeline-title');
            const locEl = item.querySelector('.timeline-location');
            const descEl = item.querySelector('.timeline-description');
            const tagsEl = item.querySelector('.timeline-tags');

            if (dateEl) dateEl.textContent = t.date;
            if (titleEl) titleEl.textContent = t.title;
            if (locEl) locEl.textContent = t.location;
            if (descEl) descEl.textContent = t.description;
            if (tagsEl && Array.isArray(t.tags)) {
                tagsEl.innerHTML = '';
                t.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'timeline-tag';
                    span.textContent = tag;
                    tagsEl.appendChild(span);
                });
            }
        });
    }
    
    // Update stat labels
    const statLabels = document.querySelectorAll('.stat-label');
    const statTexts = [
        translations[lang].statLabels.publications,
        translations[lang].statLabels.miccai,
        translations[lang].statLabels.projects,
        translations[lang].statLabels.awards
    ];
    statLabels.forEach((label, index) => {
        if (statTexts[index]) {
            label.textContent = statTexts[index];
        }
    });
    
    // Update project badges
    document.querySelectorAll('.status-badge').forEach(badge => {
        const text = badge.textContent.trim();
        if (text === 'Under Review' || text === 'In Revisione') {
            badge.textContent = translations[lang].projectBadges.underReview;
        } else if (text === 'Published' || text === 'Pubblicato') {
            badge.textContent = translations[lang].projectBadges.published;
        } else if (text === 'In Progress' || text === 'In Corso') {
            badge.textContent = translations[lang].projectBadges.inProgress;
        }
    });
    
    // Update project link texts
    document.querySelectorAll('.project-link').forEach(link => {
        const text = link.textContent.trim();
        if (text === 'Paper' || text === 'Articolo') {
            link.innerHTML = link.innerHTML.replace(/(Paper|Articolo)/, translations[lang].projectLinks.paper);
        } else if (text === 'Code' || text === 'Codice') {
            link.innerHTML = link.innerHTML.replace(/(Code|Codice)/, translations[lang].projectLinks.code);
        } else if (text === 'Website' || text === 'Sito Web') {
            link.innerHTML = link.innerHTML.replace(/(Website|Sito Web)/, translations[lang].projectLinks.website);
        } else if (text === 'Demo') {
            link.innerHTML = link.innerHTML.replace(/Demo/, translations[lang].projectLinks.demo);
        }
    });
    
    // Update footer subtitle for both language elements if present
    const footerSubtitleEn = document.querySelector('.footer-section p[data-lang="en"]');
    const footerSubtitleIt = document.querySelector('.footer-section p[data-lang="it"]');
    if (footerSubtitleEn) footerSubtitleEn.textContent = translations.en.footer.subtitle;
    if (footerSubtitleIt) footerSubtitleIt.textContent = translations.it.footer.subtitle;

    // Update footer headings (separate elements for each language)
    const footerH4En = document.querySelector('.footer-section h4[data-lang="en"]');
    const footerH4It = document.querySelector('.footer-section h4[data-lang="it"]');
    if (footerH4En) footerH4En.textContent = translations.en.footer.quickLinks;
    if (footerH4It) footerH4It.textContent = translations.it.footer.quickLinks;

    const footerConnectEn = document.querySelector('.footer-section h4[data-lang="en"] + ul');

    // Update footer connect heading separate elements
    const footerConnectEnH4 = document.querySelector('.footer-section h4[data-lang="en"][data-connect]');
    // (fallback) update any h4 elements without data attributes
    const footerH4Fallbacks = document.querySelectorAll('.footer-section h4');
    // Update connect translations by selecting elements with matching text if present
    document.querySelectorAll('.footer-section h4').forEach(h4 => {
        const txt = h4.textContent.trim().toLowerCase();
        // match by existing language marker if present
        if (h4.getAttribute('data-lang') === 'en') h4.textContent = translations.en.footer.quickLinks;
        if (h4.getAttribute('data-lang') === 'it') h4.textContent = translations.it.footer.quickLinks;
    });

    // Update footer links list items (we use li[data-lang] entries)
    const footerLiEn = document.querySelectorAll('.footer-links li[data-lang="en"]');
    const footerLiIt = document.querySelectorAll('.footer-links li[data-lang="it"]');
    const enTexts = [translations.en.footer.home, translations.en.footer.about, translations.en.footer.projects, translations.en.footer.publications, translations.en.footer.presentations, translations.en.footer.contact];
    const itTexts = [translations.it.footer.home, translations.it.footer.about, translations.it.footer.projects, translations.it.footer.publications, translations.it.footer.presentations, translations.it.footer.contact];
    footerLiEn.forEach((li, idx) => {
        const a = li.querySelector('a');
        if (a && enTexts[idx]) a.textContent = enTexts[idx];
    });
    footerLiIt.forEach((li, idx) => {
        const a = li.querySelector('a');
        if (a && itTexts[idx]) a.textContent = itTexts[idx];
    });
    
    // Update footer copyright
    const footerBottom = document.querySelector('.footer-bottom p:first-child');
    if (footerBottom) {
        footerBottom.innerHTML = `&copy; 2025 Daniele Falcetta. ${translations[lang].footer.rights}.`;
    }
    
    const footerCredits = document.querySelector('.footer-credits');
    if (footerCredits) {
        footerCredits.textContent = translations[lang].footer.builtWith;
    }
    
    // Update project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectKeys = ['caravelMetrics', 'vesselVerse', 'oneShotAL', 'multiDomain', 'a2v', 'topCow', 'multiPath'];
    projectCards.forEach((card, index) => {
        const key = projectKeys[index];
        if (key && translations[lang].projects[key]) {
            const titleEl = card.querySelector('.project-title');
            const descEl = card.querySelector('.project-description');
            
            if (titleEl && !titleEl.querySelector('a')) {
                titleEl.textContent = translations[lang].projects[key].title;
            } else if (titleEl) {
                // Handle titles with links (like VesselVerse)
                const linkEl = titleEl.querySelector('a');
                if (linkEl) {
                    titleEl.childNodes[0].textContent = translations[lang].projects[key].title + ' ';
                }
            }
            if (descEl) {
                descEl.textContent = translations[lang].projects[key].description;
            }
        }
    });
    
    // Update awards section subtitle
    const awardsSubtitle = document.querySelector('#awards .section-subtitle');
    if (awardsSubtitle) {
        awardsSubtitle.textContent = translations[lang].awards.subtitle;
    }
    
    // Update award cards
    const awardCards = document.querySelectorAll('.award-card');
    const awardKeys = ['docConsortium', 'spotlight', 'bestPaper', 'coOrganizer', 'dissemination', 'mobilityScholar', 'academicScholar', 'youngTalents'];
    awardCards.forEach((card, index) => {
        const key = awardKeys[index];
        if (key && translations[lang].awards[key]) {
            const titleEl = card.querySelector('.award-title');
            const orgEl = card.querySelector('.award-organization');
            const descEl = card.querySelector('.award-description');
            
            if (titleEl) titleEl.textContent = translations[lang].awards[key].title;
            if (orgEl) orgEl.textContent = translations[lang].awards[key].org;
            if (descEl) descEl.textContent = translations[lang].awards[key].desc;
        }
    });
    
    // Update "Info" link text
    document.querySelectorAll('.project-link').forEach(link => {
        const text = link.textContent.trim();
        if (text === 'Info') {
            link.innerHTML = link.innerHTML.replace(/Info/, translations[lang].projectLinks.info);
        }
    });

    // Update collaborations list (name, location, role, tags)
    // Build a mapping from original collaboration items (non-clones) using a stable key
    // (prefer anchor href, fallback to name text). Then update ALL collaboration items
    // including `.mock-collab` clones by matching that key. This prevents wrap-around
    // jumps from showing untranslated clone nodes.
    if (translations[lang].collaborations) {
        const originalItems = Array.from(document.querySelectorAll('.collaboration-item')).filter(it => !it.classList.contains('mock-collab'));

        // Build key -> translation mapping
        const collabMap = new Map();
        originalItems.forEach((item, idx) => {
            const a = item.querySelector('.collaboration-name a');
            const nameText = item.querySelector('.collaboration-name')?.textContent?.trim();
            const trans = translations[lang].collaborations[idx] || null;
            if (!trans) return;
            if (a && a.href) collabMap.set(a.href, trans);
            if (nameText) collabMap.set(nameText, trans);
        });

        // Update every collaboration-item (including mocks) by matching href first, then name
        const allCollabItems = document.querySelectorAll('.collaboration-item');
        allCollabItems.forEach(item => {
            const nameEl = item.querySelector('.collaboration-name');
            const a = nameEl?.querySelector('a');
            let trans = null;

            if (a && a.href && collabMap.has(a.href)) {
                trans = collabMap.get(a.href);
            } else {
                const key = a ? a.textContent.trim() : nameEl?.textContent?.trim();
                if (key && collabMap.has(key)) trans = collabMap.get(key);
            }

            // Fallback: if mapping failed but this is one of the original items, try by index
            if (!trans && !item.classList.contains('mock-collab')) {
                const idx = originalItems.indexOf(item);
                if (idx !== -1) trans = translations[lang].collaborations[idx] || null;
            }

            if (!trans) return;

            // Update name (preserve anchor href if present)
            if (nameEl) {
                if (a) a.textContent = trans.name;
                else nameEl.textContent = trans.name;
            }

            const locEl = item.querySelector('.collaboration-location');
            if (locEl) locEl.textContent = trans.location;

            const roleEl = item.querySelector('.collaboration-role');
            if (roleEl) roleEl.textContent = trans.role;

            const tagsEl = item.querySelector('.collaboration-tags');
            if (tagsEl && Array.isArray(trans.tags)) {
                tagsEl.innerHTML = '';
                trans.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'collab-tag';
                    span.textContent = tag;
                    tagsEl.appendChild(span);
                });
            }
        });
    }

    // Ensure all [data-lang] elements are explicitly shown/hidden (defensive: overrides CSS if needed)
    document.querySelectorAll('[data-lang]').forEach(el => {
        const elLang = el.getAttribute('data-lang');
        if (elLang === lang) {
            const tag = el.tagName.toLowerCase();
            if (tag === 'li') {
                el.style.display = 'list-item';
            } else if (tag === 'a' || el.classList.contains('btn') || tag === 'button') {
                el.style.display = 'inline-flex';
            } else if (tag === 'span' || tag === 'p' || tag === 'div' || tag === 'h3' || tag === 'h4') {
                el.style.display = 'block';
            } else {
                el.style.display = '';
            }
        } else {
            el.style.display = 'none';
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    // Add click event to language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'it' : 'en';
            setLanguage(newLang);
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not(.modal-open-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Remove loading screen when page is fully loaded
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 300); // Small delay for better UX
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Navbar scroll effect and active link highlighting (throttled for performance)
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

const handleNavbarScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Highlight active nav link
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    lastScroll = currentScroll;
}, 100);

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .publication-item, .award-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Initialize 3D tilt effect for project cards
    init3DTilt();
    
    // Add particle effect to hero
    createParticles();
    
    // Animate statistics if present
    animateCounters();
    
    // Hide floating contact toolbar when the contact section is in view
    try {
        const floating = document.querySelector('.floating-contact');
        const contactSection = document.getElementById('contact');
        if (floating && contactSection) {
            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        floating.classList.add('hidden');
                        floating.setAttribute('aria-hidden', 'true');
                    } else {
                        floating.classList.remove('hidden');
                        floating.setAttribute('aria-hidden', 'false');
                    }
                });
            }, { threshold: 0.5 });

            contactObserver.observe(contactSection);

            // Ensure toolbar is hidden on narrow viewports where it isn't shown anyway
            const mq = window.matchMedia('(min-width: 1200px)');
            const handleMq = (e) => {
                if (!e.matches) {
                    floating.classList.add('hidden');
                } else {
                    // when returning to wide view, re-evaluate: if contact in view keep hidden
                    // trigger a manual check
                    const rect = contactSection.getBoundingClientRect();
                    const inView = rect.top < window.innerHeight && rect.bottom >= 0;
                    if (inView) floating.classList.add('hidden');
                    else floating.classList.remove('hidden');
                }
            };
            if (mq.addEventListener) mq.addEventListener('change', handleMq);
            else mq.addListener(handleMq);

            // initial state
            if (!mq.matches) floating.classList.add('hidden');
        }
    } catch (e) {
        console.warn('Floating contact observer failed', e);
    }
});

// 3D Tilt Effect for Project Cards
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `
        translateY(-15px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.03)
    `;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
}

// Create floating particles in hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(37, 99, 235, ${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            left: ${startX}%;
            bottom: -20px;
            animation: floatUp ${duration}s ease-in ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    hero.insertBefore(particlesContainer, hero.firstChild);
    
    // Add float up animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate counters (for stats if you add them later)
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Animate number counting effect
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easeOutQuart));
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a little rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add smooth reveal for sections on scroll (throttled for performance)
const revealSections = throttle(() => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight * 0.85) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}, 150);

window.addEventListener('scroll', revealSections, { passive: true });
revealSections(); // Initial check

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            themeToggle.click();
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// ==================== COLLABORATIONS CAROUSEL ====================
class CollaborationsCarousel {
    constructor() {
        this.track = document.querySelector('.collaborations-track');
        this.originalCards = Array.from(document.querySelectorAll('.collaboration-item'));
        this.prevBtn = document.querySelector('.collaborations .carousel-nav.prev');
        this.nextBtn = document.querySelector('.collaborations .carousel-nav.next');
        this.dotsContainer = document.querySelector('.collaborations .carousel-dots');
        
        if (!this.track || this.originalCards.length === 0) return;
        
        this.totalCards = this.originalCards.length;
        this.cardsPerView = this.getCardsPerView();
        
        // Add mock cards for infinite scroll effect
        this.addMockCards();
        
        // Get all cards including mocks
        this.cards = Array.from(this.track.querySelectorAll('.collaboration-item'));
        
        // Start at the first real card (after mock cards)
        this.currentIndex = this.totalCards;
        
        this.init();
        // Attach click handlers so clicking a card centers it in the carousel
        this.attachCardClickHandlers();
    }

    attachCardClickHandlers() {
        // Build a map from a stable key (anchor href or name text) to original index
        this.keyToIndex = new Map();
        this.originalCards.forEach((card, i) => {
            const anchor = card.querySelector('.collaboration-name a');
            const key = (anchor && anchor.getAttribute('href')) ? anchor.getAttribute('href').trim() : card.querySelector('.collaboration-name')?.textContent.trim();
            if (key) this.keyToIndex.set(key, i);
        });

        // Add click listeners to all cards (including mocks)
        this.cards.forEach((card) => {
            card.addEventListener('click', (e) => {
                // If the user clicked an actual link, allow default (don't intercept)
                if (e.target.closest('a')) return;

                const anchor = card.querySelector('.collaboration-name a');
                const key = (anchor && anchor.getAttribute('href')) ? anchor.getAttribute('href').trim() : card.querySelector('.collaboration-name')?.textContent.trim();
                const idx = this.keyToIndex.get(key);
                if (typeof idx === 'number') {
                    this.goToSlide(idx);
                }
            });
        });
    }
    
    getCardsPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    addMockCards() {
        // Clone cards and add to beginning and end
        const fragment = document.createDocumentFragment();
        
        // Add clones at the beginning (for seamless backward scrolling)
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-collab');
            fragment.appendChild(clone);
        });
        this.track.insertBefore(fragment, this.track.firstChild);
        
        // Add clones at the end (for seamless forward scrolling)
        const fragmentEnd = document.createDocumentFragment();
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-collab');
            fragmentEnd.appendChild(clone);
        });
        this.track.appendChild(fragmentEnd);
    }
    
    init() {
        // Create dots (only for original cards)
        this.createDots();
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Enhanced touch support with momentum
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartTime = 0;
        let isSwiping = false;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartTime = Date.now();
            isSwiping = true;
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            const touchDiff = touchStartX - touchEndX;
            const touchDuration = Date.now() - touchStartTime;
            const velocity = Math.abs(touchDiff) / touchDuration;
            
            // Swipe detection with velocity
            if (Math.abs(touchDiff) > 50 || velocity > 0.3) {
                if (touchDiff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            isSwiping = false;
        }, { passive: true });
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                }
                this.updateCarousel(true); // Instant update on resize
            }, 200);
        });
        
        // Initial update (instant, no transition)
        this.updateCarousel(true);
        
        // Auto-play (optional)
        // this.startAutoPlay();
    }
    
    createDots() {
        const totalDots = this.totalCards;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to project ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel(instant = false) {
        // Robust centering: compute the target card's center relative to the track
        const targetCard = this.cards[this.currentIndex];
        if (!targetCard) return;
        const carouselWidth = this.track.parentElement.offsetWidth;
        const cardCenter = targetCard.offsetLeft + (targetCard.offsetWidth / 2);
        // Desired translate so that cardCenter aligns with carousel center
        const offset = (carouselWidth / 2) - cardCenter;
        
        // Apply transition
        if (instant) {
            this.track.style.transition = 'none';
        }
        this.track.style.transform = `translateX(${offset}px)`;
        
        if (instant) {
            // Force reflow
            this.track.offsetHeight;
            this.track.style.transition = '';
        }
        
        // Update active states - only the current card is active
        this.cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Update dots (map to original card index)
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        const realIndex = (this.currentIndex - this.totalCards + this.totalCards) % this.totalCards;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }
    
    next() {
        this.currentIndex++;
        this.updateCarousel();
        
        // Check if we're at the end of the second set
        if (this.currentIndex >= this.totalCards * 2) {
            setTimeout(() => {
                // Jump back to the start of the real cards (middle set)
                this.currentIndex = this.totalCards;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    prev() {
        this.currentIndex--;
        this.updateCarousel();
        
        // Check if we're before the middle set
        if (this.currentIndex < this.totalCards) {
            setTimeout(() => {
                // Jump to the end of the middle set
                this.currentIndex = this.totalCards * 2 - 1;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    goToSlide(index) {
        // Map the dot index to the actual card index (in the middle set)
        this.currentIndex = this.totalCards + index;
        this.updateCarousel();
    }
    
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => this.next(), interval);
        
        // Pause on hover
        this.track.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        this.track.addEventListener('mouseleave', () => {
            this.autoPlayInterval = setInterval(() => this.next(), interval);
        });
    }
}

// Presentations Carousel
class PresentationsCarousel {
    constructor() {
        this.track = document.querySelector('.presentations-track');
        this.originalCards = Array.from(document.querySelectorAll('.presentation-compact-card'));
        this.prevBtn = document.querySelector('.presentations .carousel-nav.prev');
        this.nextBtn = document.querySelector('.presentations .carousel-nav.next');
        this.dotsContainer = document.querySelector('.presentations .carousel-dots');
        
        if (!this.track || this.originalCards.length === 0) return;
        
        this.totalCards = this.originalCards.length;
        this.cardsPerView = this.getCardsPerView();
        
        // Add mock cards for infinite scroll effect
        this.addMockCards();
        
        // Get all cards including mocks
        this.cards = Array.from(this.track.querySelectorAll('.presentation-compact-card'));
        
        // Start at the first real card (after mock cards)
        this.currentIndex = this.totalCards;
        
        this.init();
        // Attach click handlers so clicking a presentation card centers it and opens the modal
        this.attachCardClickHandlers();
    }
    
    getCardsPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    addMockCards() {
        // Clone cards and add to beginning and end
        const fragment = document.createDocumentFragment();
        
        // Add clones at the beginning (for seamless backward scrolling)
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-presentation');
            fragment.appendChild(clone);
        });
        this.track.insertBefore(fragment, this.track.firstChild);
        
        // Add clones at the end (for seamless forward scrolling)
        const fragmentEnd = document.createDocumentFragment();
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-presentation');
            fragmentEnd.appendChild(clone);
        });
        this.track.appendChild(fragmentEnd);
    }
    
    init() {
        // Create dots (only for original cards)
        this.createDots();
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Enhanced touch support with momentum
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartTime = 0;
        let isSwiping = false;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartTime = Date.now();
            isSwiping = true;
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            const touchDiff = touchStartX - touchEndX;
            const touchDuration = Date.now() - touchStartTime;
            const velocity = Math.abs(touchDiff) / touchDuration;
            
            // Swipe detection with velocity
            if (Math.abs(touchDiff) > 50 || velocity > 0.3) {
                if (touchDiff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            isSwiping = false;
        }, { passive: true });
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                }
                this.updateCarousel(true); // Instant update on resize
            }, 200);
        });
        
        // Initial update (instant, no transition)
        this.updateCarousel(true);
    }
    
    createDots() {
        const totalDots = this.totalCards;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to presentation ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    attachCardClickHandlers() {
        // Map stable key (data-link/data-embed/title) to original index
        this.keyToIndex = new Map();
        this.originalCards.forEach((card, i) => {
            const key = card.getAttribute('data-link') || card.getAttribute('data-embed') || card.querySelector('.presentation-compact-title')?.textContent.trim();
            if (key) this.keyToIndex.set(key, i);
        });

        // Modal elements (may exist on the page)
        const modal = document.getElementById('presentationModal');
        const modalIframe = document.getElementById('modalIframe');
        const modalTitle = document.getElementById('modalTitle');
        const modalLink = document.getElementById('modalLink');

        // Add click listeners to all cards (including mock clones)
        this.cards.forEach((card) => {
            card.addEventListener('click', (e) => {
                // If user clicked an actual <a>, allow default behavior
                if (e.target.closest('a')) return;

                const key = card.getAttribute('data-link') || card.getAttribute('data-embed') || card.querySelector('.presentation-compact-title')?.textContent.trim();
                const idx = this.keyToIndex.get(key);
                if (typeof idx === 'number') {
                    this.goToSlide(idx);

                    // Open modal for this presentation (preserve previous behavior)
                    if (modal && modalIframe) {
                        const embedUrl = card.getAttribute('data-embed');
                        const linkUrl = card.getAttribute('data-link');
                        const title = card.querySelector('.presentation-compact-title')?.textContent || '';
                        modalIframe.src = embedUrl;
                        if (modalTitle) modalTitle.textContent = title;
                        if (modalLink) modalLink.href = linkUrl;
                        modal.classList.add('active');
                    }
                }
            });
        });
    }
    
    updateCarousel(instant = false) {
        // Robust centering: compute the target card's center relative to the track
        const targetCard = this.cards[this.currentIndex];
        if (!targetCard) return;
        const carouselWidth = this.track.parentElement.offsetWidth;
        const cardCenter = targetCard.offsetLeft + (targetCard.offsetWidth / 2);
        // Desired translate so that cardCenter aligns with carousel center
        const offset = (carouselWidth / 2) - cardCenter;
        
        // Apply transition
        if (instant) {
            this.track.style.transition = 'none';
        }
        this.track.style.transform = `translateX(${offset}px)`;
        
        if (instant) {
            // Force reflow
            this.track.offsetHeight;
            this.track.style.transition = '';
        }
        
        // Update active states - only the current card is active
        this.cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Update dots (map to original card index)
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        const realIndex = (this.currentIndex - this.totalCards + this.totalCards) % this.totalCards;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }
    
    next() {
        this.currentIndex++;
        this.updateCarousel();
        
        // Check if we're at the end of the second set
        if (this.currentIndex >= this.totalCards * 2) {
            setTimeout(() => {
                // Jump back to the start of the real cards (middle set)
                this.currentIndex = this.totalCards;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    prev() {
        this.currentIndex--;
        this.updateCarousel();
        
        // Check if we're before the middle set
        if (this.currentIndex < this.totalCards) {
            setTimeout(() => {
                // Jump to the end of the middle set
                this.currentIndex = this.totalCards * 2 - 1;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    goToSlide(index) {
        // Map the dot index to the actual card index (in the middle set)
        this.currentIndex = this.totalCards + index;
        this.updateCarousel();
    }
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CollaborationsCarousel();
    new PresentationsCarousel();
});

// ==================== PIPELINE MODAL ====================
document.addEventListener('DOMContentLoaded', () => {
    const pipelineModal = document.getElementById('pipelineModal');
    const pipelineModalImage = document.getElementById('pipelineModalImage');
    const pipelineModalTitle = document.getElementById('pipelineModalTitle');
    const pipelineCloseBtn = document.querySelector('.pipeline-modal-close');
    
    if (!pipelineModal) return;
    
    // Make project cards with pipeline data clickable
    const projectCards = document.querySelectorAll('.project-card[data-pipeline]');
    
    projectCards.forEach(card => {
        const pipelineSrc = card.getAttribute('data-pipeline');
        const projectTitle = card.querySelector('.project-title')?.textContent?.trim() || 'Project Pipeline';
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
        
        // Card click handler
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links
            if (e.target.closest('a')) {
                return;
            }
            
            pipelineModalImage.src = pipelineSrc;
            pipelineModalTitle.textContent = projectTitle;
            pipelineModal.classList.add('active');
        });
    });
    
    // Close modal
    const closePipelineModal = () => {
        pipelineModal.classList.remove('active');
        pipelineModalImage.src = '';
    };
    
    if (pipelineCloseBtn) {
        pipelineCloseBtn.addEventListener('click', closePipelineModal);
    }
    
    // Close when clicking outside
    pipelineModal.addEventListener('click', (e) => {
        if (e.target === pipelineModal) {
            closePipelineModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pipelineModal.classList.contains('active')) {
            closePipelineModal();
        }
    });
});

// ==================== PRESENTATION MODAL ====================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('presentationModal');
    const modalIframe = document.getElementById('modalIframe');
    const modalTitle = document.getElementById('modalTitle');
    const modalLink = document.getElementById('modalLink');
    const closeBtn = document.querySelector('.presentation-modal-close');
    const presentationCards = document.querySelectorAll('.presentation-compact-card');

    // Presentation card clicks are handled by the PresentationsCarousel
    // which will center the clicked card and open the modal.

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        modalIframe.src = ''; // Stop iframe loading
    };

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Scroll-triggered animations for timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});

// ==================== TIMELINE TOGGLE (Show More/Less) ====================
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('timeline-toggle-btn');
    const hiddenItems = document.querySelectorAll('.timeline-item-hidden');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    let isExpanded = false;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        hiddenItems.forEach(item => {
            if (isExpanded) {
                item.classList.remove('timeline-item-hidden');
                item.style.display = 'flex';
                // Trigger animation
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            } else {
                item.classList.remove('visible');
                // Wait for fade out animation before hiding
                setTimeout(() => {
                    item.style.display = 'none';
                    item.classList.add('timeline-item-hidden');
                }, 800);
            }
        });
        
        // Update button text and icon rotation (with language support)
        const lang = currentLang || 'en';
        toggleText.textContent = isExpanded ? translations[lang].showLess : translations[lang].showMore;
        toggleBtn.classList.toggle('expanded', isExpanded);
        
        // Scroll to timeline section if collapsing
        if (!isExpanded) {
            const timelineSection = document.getElementById('timeline');
            const offset = 100;
            const targetPosition = timelineSection.offsetTop - offset;
            setTimeout(() => {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 200);
        }
    });
});

// ==================== PUBLICATIONS MOBILE SCROLL ANIMATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile()) {
        const publicationItems = document.querySelectorAll('.publication-item');
        let currentActiveItem = null;
        
        // Trigger when card is centered on screen
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-40% 0px -40% 0px' // Center 20% of viewport
        };
        
        const publicationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Activate when card is in the center zone (intersecting with center 20%)
                if (entry.isIntersecting) {
                    // Remove active class from previous item
                    if (currentActiveItem && currentActiveItem !== entry.target) {
                        currentActiveItem.classList.remove('mobile-active');
                    }
                    // Add active class to current item
                    entry.target.classList.add('mobile-active');
                    currentActiveItem = entry.target;
                } else if (entry.target === currentActiveItem) {
                    // Remove active class when scrolling away from center
                    entry.target.classList.remove('mobile-active');
                    if (currentActiveItem === entry.target) {
                        currentActiveItem = null;
                    }
                }
            });
        }, observerOptions);
        
        publicationItems.forEach(item => {
            publicationObserver.observe(item);
        });
    }
});