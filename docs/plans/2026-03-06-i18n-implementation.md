# i18n Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add EN/FR/AR language auto-detection and manual switching to all 6 pages of the TechAfrikQuantum static site.

**Architecture:** A single `js/i18n.js` file holds all translations as a JS object. Every translatable DOM element gets a `data-i18n="key"` attribute. On load, the script detects the browser language (or reads localStorage), sets `<html lang dir>`, and swaps all text content. A 3-pill switcher (EN · FR · AR) in the nav lets users override.

**Tech Stack:** Vanilla JS (no libraries), CSS custom properties, Google Fonts (Noto Sans Arabic for AR), localStorage for persistence.

---

### Task 1: Create js/i18n.js — translations + core logic

**Files:**
- Create: `js/i18n.js`

**Step 1: Create the file with the full translations object and apply function**

```js
/* ── i18n.js — Language detection, translations, switcher ── */
(function () {
  /* ── Translations ─────────────────────────────────────── */
  const translations = {
    en: {
      /* NAV */
      "nav.home": "Home",
      "nav.sectors": "Sectors",
      "nav.solutions": "Solutions",
      "nav.company": "Company",
      "nav.safety": "Safety & Surveillance",
      "nav.connectivity": "Critical Connectivity",
      "nav.assets": "Assets Management",
      "nav.ipnetworks": "IP Networks",
      "nav.cyber": "Cybersecurity",
      "nav.about": "About Us",
      "nav.partners": "Partners",
      "nav.contact": "Contact Us",
      /* HERO — index */
      "hero.headline": "Persistent Eyes & Comms. When Minutes Matter.",
      "hero.sub": "Techafrik Quantum Group delivers defense-grade surveillance, critical connectivity, and intelligent fleet management across West Africa.",
      "hero.cta": "Explore Solutions",
      "hero.cta2": "Contact Us",
      "hero.trust1": "Defense-Grade",
      "hero.trust2": "West Africa Coverage",
      "hero.trust3": "24/7 Support",
      /* INDEX — solutions preview */
      "index.sol.label": "What We Do",
      "index.sol.title": "End-to-End Technology Solutions",
      "index.sol.sub": "From perimeter surveillance to satellite connectivity, we deliver integrated systems built for demanding environments.",
      "index.card.safety.title": "Safety & Surveillance",
      "index.card.safety.body": "CCTV, drones, perimeter sensors, and command centers — integrated for real-time situational awareness.",
      "index.card.connectivity.title": "Critical Connectivity",
      "index.card.connectivity.body": "VSAT, LTE, microwave, and hybrid links ensuring uptime where fiber doesn't reach.",
      "index.card.assets.title": "Assets Management",
      "index.card.assets.body": "Fleet tracking, fuel anti-fraud, and driver behavior analytics for operational efficiency.",
      "index.card.ipnetworks.title": "IP Networks",
      "index.card.ipnetworks.body": "Enterprise LAN/WAN design, SD-WAN, and network orchestration for mission-critical operations.",
      "index.card.cyber.title": "Cybersecurity",
      "index.card.cyber.body": "SOC onboarding, IAM, penetration testing, and compliance frameworks tailored for African regulatory contexts.",
      "index.cta.label": "Get Started",
      "index.cta.title": "Ready to Secure Your Operations?",
      "index.cta.sub": "Our team is ready to assess your environment and propose the right solution.",
      "index.cta.btn": "Contact Us",
      "index.cta.btn2": "View Sectors",
      /* SECTORS */
      "defense.label": "Defense",
      "defense.title": "Defense",
      "defense.body": "We deliver hardened surveillance, secure communications, and ISR capabilities for defense forces operating in challenging environments. Our solutions are designed for reliability under pressure — from perimeter protection to command-and-control connectivity.",
      "defense.li1": "Tactical surveillance & ISR drone integration",
      "defense.li2": "Encrypted military-grade communications",
      "defense.li3": "Rapid deployment & field-serviceable systems",
      "defense.cta": "Contact Us",
      "government.label": "Government",
      "government.title": "Government",
      "government.body": "We support government agencies and public institutions with secure network infrastructure, surveillance systems, and digital governance tools. Our vendor-agnostic approach ensures the best-fit technology for critical public services.",
      "government.li1": "Public safety & smart city infrastructure",
      "government.li2": "Secure inter-agency communications",
      "government.li3": "Governance, risk & compliance frameworks",
      "government.cta": "Contact Us",
      "enterprise.label": "Enterprise",
      "enterprise.title": "Enterprise",
      "enterprise.body": "Corporate networks, cybersecurity operations, and assets management for businesses that cannot afford downtime. We help enterprises build resilient, observable, and secure IT/OT environments with clear SLAs and local support.",
      "enterprise.li1": "Enterprise network design & orchestration",
      "enterprise.li2": "SOC onboarding & IAM implementation",
      "enterprise.li3": "Fleet & assets tracking for operations",
      "enterprise.cta": "Contact Us",
      "oilgas.label": "Oil & Gas",
      "oilgas.title": "Oil & Gas",
      "oilgas.body": "Remote sites, offshore platforms, and pipeline corridors demand connectivity and safety systems that work without exception. We deploy satellite links, perimeter surveillance, and fleet tracking solutions built for the harshest operational conditions.",
      "oilgas.li1": "Satellite & radio connectivity for remote sites",
      "oilgas.li2": "Perimeter intrusion detection for critical assets",
      "oilgas.li3": "Fleet tracking & fuel anti-fraud systems",
      "oilgas.cta": "Contact Us",
      "cellular.label": "Cellular",
      "cellular.title": "Cellular",
      "cellular.body": "We partner with cellular operators to deliver RF engineering, spectrum management, and network orchestration services. From site surveys to QoS tuning and telemetry pipelines, we help operators achieve and maintain service quality targets.",
      "cellular.li1": "RF engineering & spectrum management",
      "cellular.li2": "Network telemetry & SLO observability",
      "cellular.li3": "QoS & traffic engineering for carrier-grade networks",
      "cellular.cta": "Contact Us",
      "mobility.label": "Mobility",
      "mobility.title": "Mobility",
      "mobility.body": "Transport operators, logistics companies, and national fleets rely on our mobility solutions to reduce costs, improve safety, and gain operational visibility. Real-time tracking, driver scoring, and route optimization transform data into decisions.",
      "mobility.li1": "Real-time GPS fleet tracking & geofencing",
      "mobility.li2": "Driver behavior scoring & safety compliance",
      "mobility.li3": "Route optimization & fuel efficiency analytics",
      "mobility.cta": "Contact Us",
      /* SOLUTIONS */
      "safety.label": "Safety & Surveillance",
      "safety.title": "Safety & Surveillance",
      "safety.body": "Integrated camera networks, drone monitoring, and analytics platforms that give your security team total situational awareness — day and night, indoors and outdoors.",
      "safety.li1": "IP CCTV & thermal imaging networks",
      "safety.li2": "ISR drone integration & airspace monitoring",
      "safety.li3": "AI-assisted video analytics & alerting",
      "safety.cta": "Contact Us",
      "connectivity.label": "Critical Connectivity",
      "connectivity.title": "Critical Connectivity",
      "connectivity.body": "When your operation cannot afford downtime, we engineer redundant, multi-path connectivity — satellite, microwave, LTE, and fiber — with failover designed for mission-critical environments.",
      "connectivity.li1": "VSAT & LEO satellite links for remote sites",
      "connectivity.li2": "Microwave & LTE hybrid WAN with automatic failover",
      "connectivity.li3": "Network SLA monitoring & proactive NOC support",
      "connectivity.cta": "Contact Us",
      "assets.label": "Assets Management",
      "assets.title": "Assets Management",
      "assets.body": "Real-time visibility over vehicles, equipment, and personnel. Our fleet management and tracking platforms reduce fuel waste, prevent theft, and deliver the data needed for smarter operational decisions.",
      "assets.li1": "GPS fleet tracking & geofencing",
      "assets.li2": "Fuel anti-fraud & consumption analytics",
      "assets.li3": "Driver behavior & safety scoring",
      "assets.cta": "Contact Us",
      "ipnetworks.label": "IP Networks",
      "ipnetworks.title": "IP Networks",
      "ipnetworks.body": "Enterprise-grade LAN/WAN design, SD-WAN deployment, and network orchestration. We architect IP networks that are secure, observable, and built to grow with your organisation.",
      "ipnetworks.li1": "LAN/WAN design, deployment & optimisation",
      "ipnetworks.li2": "SD-WAN & MPLS for multi-site enterprises",
      "ipnetworks.li3": "Network telemetry, SNMP & flow analytics",
      "ipnetworks.cta": "Contact Us",
      "cyber.label": "Cybersecurity",
      "cyber.title": "Cybersecurity",
      "cyber.body": "From risk assessment to SOC implementation, we help organisations build a security posture that meets international standards and withstands real-world threats in the West African threat landscape.",
      "cyber.li1": "Vulnerability assessment & penetration testing",
      "cyber.li2": "SOC onboarding & 24/7 threat monitoring",
      "cyber.li3": "IAM, zero-trust & compliance frameworks",
      "cyber.cta": "Contact Us",
      /* ABOUT */
      "about.mission.label": "Our Purpose",
      "about.mission.title": "Mission",
      "about.mission.body": "To deliver world-class, integrated technology solutions that secure, connect, and optimize the operations of defense forces, governments, and enterprises across West Africa.",
      "about.vision.label": "Where We're Going",
      "about.vision.title": "Vision",
      "about.vision.body": "To be West Africa's most trusted technology partner — known for engineering excellence, local expertise, and the ability to deliver in the most demanding environments.",
      "about.values.label": "What Drives Us",
      "about.values.title": "Our Values",
      "about.values.li1": "Reliability — systems that work when lives depend on them",
      "about.values.li2": "Integrity — honest advice, no vendor lock-in",
      "about.values.li3": "Excellence — internationally certified, locally proven",
      "about.values.li4": "Partnership — long-term relationships over one-time sales",
      "about.ceo.label": "Leadership",
      "about.ceo.title": "From Our CEO",
      "about.ceo.quote": "Africa's security and connectivity challenges demand solutions built for Africa. We exist to bridge the gap between global technology and the realities on the ground — with engineering that stands up to the environment, the mission, and the moment.",
      "about.team.label": "The People",
      "about.team.title": "Our Team",
      "about.team.body": "Our engineers, project managers, and support staff bring expertise in defense systems, telecommunications, cybersecurity, and enterprise IT — with deep regional knowledge across Guinea and West Africa.",
      "about.careers.label": "Join Us",
      "about.careers.title": "Careers",
      "about.careers.body": "We are always looking for talented engineers, project managers, and business development professionals who share our passion for technology and impact.",
      "about.careers.btn": "Email Careers",
      /* PARTNERS */
      "partners.tech.label": "Technology Partners",
      "partners.tech.title": "Our Partners",
      "partners.tech.lead": "Add your partner logos here. Each card below represents a partner or certified vendor relationship.",
      "partners.testimonials.label": "What They Say",
      "partners.testimonials.title": "Client Testimonials",
      "partners.t1.body": "\"Techafrik Quantum Group delivered a fully integrated surveillance and connectivity solution under a tight deadline. Their local support team made the difference.\"",
      "partners.t1.name": "Client Name",
      "partners.t1.role": "CTO, [Client Organization]",
      "partners.t2.body": "\"Their cybersecurity assessment identified critical gaps in our infrastructure. The SOC onboarding process was professional and thorough.\"",
      "partners.t2.name": "Client Name",
      "partners.t2.role": "Head of IT Security, [Client Organization]",
      "partners.t3.body": "\"The fleet tracking and fuel anti-fraud system reduced our operational losses significantly within the first quarter of deployment.\"",
      "partners.t3.name": "Client Name",
      "partners.t3.role": "Operations Director, [Client Organization]",
      /* CONTACT */
      "contact.form.label": "Send a Message",
      "contact.form.title": "How Can We Help?",
      "contact.name": "Full name",
      "contact.email": "Work email",
      "contact.company": "Company",
      "contact.topic": "Topic",
      "contact.message": "Message",
      "contact.submit": "Send Message",
      "contact.info.label": "Find Us",
      "contact.info.title": "Contact Information",
      "contact.email.title": "Email",
      "contact.location.title": "Location",
      "contact.location.body": "Conakry, Guinea\nWest Africa",
      "contact.careers.title": "Careers",
      /* FOOTER */
      "footer.tagline": "Secure · Connect · Optimize · Protect",
      "footer.sectors": "Sectors",
      "footer.solutions": "Solutions",
      "footer.company": "Company",
      "footer.contact.heading": "Contact",
      "footer.copyright": "© 2025 Techafrik Quantum Group. All rights reserved.",
    },

    fr: {
      /* NAV */
      "nav.home": "Accueil",
      "nav.sectors": "Secteurs",
      "nav.solutions": "Solutions",
      "nav.company": "Entreprise",
      "nav.safety": "Sécurité & Surveillance",
      "nav.connectivity": "Connectivité Critique",
      "nav.assets": "Gestion des Actifs",
      "nav.ipnetworks": "Réseaux IP",
      "nav.cyber": "Cybersécurité",
      "nav.about": "À Propos",
      "nav.partners": "Partenaires",
      "nav.contact": "Contactez-nous",
      /* HERO */
      "hero.headline": "Surveillance Permanente & Communications. Quand Chaque Minute Compte.",
      "hero.sub": "Techafrik Quantum Group fournit une surveillance de niveau défense, une connectivité critique et une gestion intelligente de flotte à travers l'Afrique de l'Ouest.",
      "hero.cta": "Explorer les Solutions",
      "hero.cta2": "Contactez-nous",
      "hero.trust1": "Niveau Défense",
      "hero.trust2": "Couverture Afrique de l'Ouest",
      "hero.trust3": "Support 24/7",
      /* INDEX */
      "index.sol.label": "Ce Que Nous Faisons",
      "index.sol.title": "Solutions Technologiques Intégrées",
      "index.sol.sub": "De la surveillance périmétrique à la connectivité satellite, nous livrons des systèmes intégrés conçus pour les environnements exigeants.",
      "index.card.safety.title": "Sécurité & Surveillance",
      "index.card.safety.body": "CCTV, drones, capteurs périmètriques et centres de commandement — intégrés pour une conscience situationnelle en temps réel.",
      "index.card.connectivity.title": "Connectivité Critique",
      "index.card.connectivity.body": "VSAT, LTE, micro-ondes et liaisons hybrides garantissant la disponibilité là où la fibre n'arrive pas.",
      "index.card.assets.title": "Gestion des Actifs",
      "index.card.assets.body": "Suivi de flotte, anti-fraude carburant et analyse du comportement des conducteurs pour l'efficacité opérationnelle.",
      "index.card.ipnetworks.title": "Réseaux IP",
      "index.card.ipnetworks.body": "Conception LAN/WAN d'entreprise, SD-WAN et orchestration réseau pour les opérations critiques.",
      "index.card.cyber.title": "Cybersécurité",
      "index.card.cyber.body": "SOC, IAM, tests de pénétration et cadres de conformité adaptés aux contextes réglementaires africains.",
      "index.cta.label": "Commencer",
      "index.cta.title": "Prêt à Sécuriser Vos Opérations ?",
      "index.cta.sub": "Notre équipe est prête à évaluer votre environnement et à proposer la bonne solution.",
      "index.cta.btn": "Contactez-nous",
      "index.cta.btn2": "Voir les Secteurs",
      /* SECTORS */
      "defense.label": "Défense",
      "defense.title": "Défense",
      "defense.body": "Nous livrons des systèmes de surveillance renforcés, des communications sécurisées et des capacités ISR pour les forces de défense opérant dans des environnements difficiles.",
      "defense.li1": "Surveillance tactique & intégration de drones ISR",
      "defense.li2": "Communications chiffrées de niveau militaire",
      "defense.li3": "Déploiement rapide & systèmes maintenables sur le terrain",
      "defense.cta": "Contactez-nous",
      "government.label": "Gouvernement",
      "government.title": "Gouvernement",
      "government.body": "Nous accompagnons les agences gouvernementales avec une infrastructure réseau sécurisée, des systèmes de surveillance et des outils de gouvernance numérique.",
      "government.li1": "Sécurité publique & infrastructure de ville intelligente",
      "government.li2": "Communications inter-agences sécurisées",
      "government.li3": "Cadres de gouvernance, risque & conformité",
      "government.cta": "Contactez-nous",
      "enterprise.label": "Entreprise",
      "enterprise.title": "Entreprise",
      "enterprise.body": "Réseaux d'entreprise, opérations de cybersécurité et gestion des actifs pour les entreprises qui ne peuvent se permettre d'interruption.",
      "enterprise.li1": "Conception & orchestration de réseaux d'entreprise",
      "enterprise.li2": "Intégration SOC & mise en œuvre IAM",
      "enterprise.li3": "Suivi de flotte & actifs pour les opérations",
      "enterprise.cta": "Contactez-nous",
      "oilgas.label": "Pétrole & Gaz",
      "oilgas.title": "Pétrole & Gaz",
      "oilgas.body": "Les sites distants, plateformes offshore et corridors de pipelines exigent une connectivité et des systèmes de sécurité sans faille.",
      "oilgas.li1": "Connectivité satellite & radio pour sites isolés",
      "oilgas.li2": "Détection d'intrusion périmétrique pour actifs critiques",
      "oilgas.li3": "Suivi de flotte & systèmes anti-fraude carburant",
      "oilgas.cta": "Contactez-nous",
      "cellular.label": "Cellulaire",
      "cellular.title": "Cellulaire",
      "cellular.body": "Nous partnons avec les opérateurs cellulaires pour livrer l'ingénierie RF, la gestion du spectre et des services d'orchestration réseau.",
      "cellular.li1": "Ingénierie RF & gestion du spectre",
      "cellular.li2": "Télémétrie réseau & observabilité SLO",
      "cellular.li3": "QoS & ingénierie de trafic pour réseaux opérateurs",
      "cellular.cta": "Contactez-nous",
      "mobility.label": "Mobilité",
      "mobility.title": "Mobilité",
      "mobility.body": "Les opérateurs de transport et flottes nationales s'appuient sur nos solutions de mobilité pour réduire les coûts, améliorer la sécurité et gagner en visibilité opérationnelle.",
      "mobility.li1": "Suivi GPS de flotte en temps réel & géofencing",
      "mobility.li2": "Score de comportement conducteur & conformité sécurité",
      "mobility.li3": "Optimisation des itinéraires & analyse d'efficacité carburant",
      "mobility.cta": "Contactez-nous",
      /* SOLUTIONS */
      "safety.label": "Sécurité & Surveillance",
      "safety.title": "Sécurité & Surveillance",
      "safety.body": "Réseaux de caméras intégrés, surveillance par drone et plateformes analytiques offrant une conscience situationnelle totale à votre équipe de sécurité.",
      "safety.li1": "Réseaux CCTV IP & imagerie thermique",
      "safety.li2": "Intégration de drones ISR & surveillance de l'espace aérien",
      "safety.li3": "Vidéo-analyse assistée par IA & alertes",
      "safety.cta": "Contactez-nous",
      "connectivity.label": "Connectivité Critique",
      "connectivity.title": "Connectivité Critique",
      "connectivity.body": "Quand votre opération ne peut pas se permettre une interruption, nous concevons une connectivité redondante multi-chemin avec basculement automatique.",
      "connectivity.li1": "Liaisons satellite VSAT & LEO pour sites isolés",
      "connectivity.li2": "WAN hybride micro-ondes & LTE avec basculement automatique",
      "connectivity.li3": "Surveillance SLA réseau & support NOC proactif",
      "connectivity.cta": "Contactez-nous",
      "assets.label": "Gestion des Actifs",
      "assets.title": "Gestion des Actifs",
      "assets.body": "Visibilité en temps réel sur les véhicules, équipements et personnel. Nos plateformes réduisent le gaspillage de carburant et préviennent le vol.",
      "assets.li1": "Suivi GPS de flotte & géofencing",
      "assets.li2": "Anti-fraude carburant & analyse de consommation",
      "assets.li3": "Comportement conducteur & score de sécurité",
      "assets.cta": "Contactez-nous",
      "ipnetworks.label": "Réseaux IP",
      "ipnetworks.title": "Réseaux IP",
      "ipnetworks.body": "Conception LAN/WAN d'entreprise, déploiement SD-WAN et orchestration réseau. Nous architecturons des réseaux IP sécurisés et observables.",
      "ipnetworks.li1": "Conception, déploiement & optimisation LAN/WAN",
      "ipnetworks.li2": "SD-WAN & MPLS pour entreprises multi-sites",
      "ipnetworks.li3": "Télémétrie réseau, SNMP & analyses de flux",
      "ipnetworks.cta": "Contactez-nous",
      "cyber.label": "Cybersécurité",
      "cyber.title": "Cybersécurité",
      "cyber.body": "De l'évaluation des risques à la mise en œuvre du SOC, nous aidons les organisations à construire une posture de sécurité robuste.",
      "cyber.li1": "Évaluation des vulnérabilités & tests de pénétration",
      "cyber.li2": "Intégration SOC & surveillance des menaces 24/7",
      "cyber.li3": "IAM, zéro confiance & cadres de conformité",
      "cyber.cta": "Contactez-nous",
      /* ABOUT */
      "about.mission.label": "Notre Raison d'Être",
      "about.mission.title": "Mission",
      "about.mission.body": "Fournir des solutions technologiques intégrées de classe mondiale qui sécurisent, connectent et optimisent les opérations des forces de défense, gouvernements et entreprises en Afrique de l'Ouest.",
      "about.vision.label": "Notre Direction",
      "about.vision.title": "Vision",
      "about.vision.body": "Être le partenaire technologique le plus fiable d'Afrique de l'Ouest — reconnu pour l'excellence en ingénierie, l'expertise locale et la capacité à livrer dans les environnements les plus exigeants.",
      "about.values.label": "Ce Qui Nous Anime",
      "about.values.title": "Nos Valeurs",
      "about.values.li1": "Fiabilité — des systèmes qui fonctionnent quand des vies en dépendent",
      "about.values.li2": "Intégrité — conseils honnêtes, sans verrouillage fournisseur",
      "about.values.li3": "Excellence — certifiés internationalement, éprouvés localement",
      "about.values.li4": "Partenariat — relations à long terme plutôt que ventes ponctuelles",
      "about.ceo.label": "Direction",
      "about.ceo.title": "Le Mot du PDG",
      "about.ceo.quote": "Les défis de sécurité et de connectivité de l'Afrique exigent des solutions construites pour l'Afrique. Nous existons pour combler l'écart entre la technologie mondiale et les réalités du terrain.",
      "about.team.label": "Les Personnes",
      "about.team.title": "Notre Équipe",
      "about.team.body": "Nos ingénieurs, chefs de projet et équipes de support apportent une expertise en systèmes de défense, télécommunications, cybersécurité et IT d'entreprise.",
      "about.careers.label": "Rejoignez-nous",
      "about.careers.title": "Carrières",
      "about.careers.body": "Nous recherchons toujours des ingénieurs, chefs de projet et professionnels du développement commercial passionnés par la technologie et l'impact.",
      "about.careers.btn": "Email Carrières",
      /* PARTNERS */
      "partners.tech.label": "Partenaires Technologiques",
      "partners.tech.title": "Nos Partenaires",
      "partners.tech.lead": "Ajoutez vos logos de partenaires ici. Chaque carte représente une relation partenaire ou fournisseur certifié.",
      "partners.testimonials.label": "Ce Qu'ils Disent",
      "partners.testimonials.title": "Témoignages Clients",
      "partners.t1.body": "\"Techafrik Quantum Group a livré une solution intégrée de surveillance et connectivité dans un délai serré. L'équipe de support locale a fait la différence.\"",
      "partners.t1.name": "Nom du Client",
      "partners.t1.role": "DSI, [Organisation Cliente]",
      "partners.t2.body": "\"Leur évaluation de cybersécurité a identifié des lacunes critiques dans notre infrastructure. Le processus d'intégration SOC était professionnel et minutieux.\"",
      "partners.t2.name": "Nom du Client",
      "partners.t2.role": "Responsable Sécurité IT, [Organisation Cliente]",
      "partners.t3.body": "\"Le système de suivi de flotte et d'anti-fraude carburant a significativement réduit nos pertes opérationnelles dès le premier trimestre de déploiement.\"",
      "partners.t3.name": "Nom du Client",
      "partners.t3.role": "Directeur des Opérations, [Organisation Cliente]",
      /* CONTACT */
      "contact.form.label": "Envoyer un Message",
      "contact.form.title": "Comment Pouvons-nous Vous Aider ?",
      "contact.name": "Nom complet",
      "contact.email": "Email professionnel",
      "contact.company": "Entreprise",
      "contact.topic": "Sujet",
      "contact.message": "Message",
      "contact.submit": "Envoyer le Message",
      "contact.info.label": "Nous Trouver",
      "contact.info.title": "Informations de Contact",
      "contact.email.title": "Email",
      "contact.location.title": "Localisation",
      "contact.location.body": "Conakry, Guinée\nAfrique de l'Ouest",
      "contact.careers.title": "Carrières",
      /* FOOTER */
      "footer.tagline": "Sécuriser · Connecter · Optimiser · Protéger",
      "footer.sectors": "Secteurs",
      "footer.solutions": "Solutions",
      "footer.company": "Entreprise",
      "footer.contact.heading": "Contact",
      "footer.copyright": "© 2025 Techafrik Quantum Group. Tous droits réservés.",
    },

    ar: {
      /* NAV */
      "nav.home": "الرئيسية",
      "nav.sectors": "القطاعات",
      "nav.solutions": "الحلول",
      "nav.company": "الشركة",
      "nav.safety": "السلامة والمراقبة",
      "nav.connectivity": "الاتصال الحيوي",
      "nav.assets": "إدارة الأصول",
      "nav.ipnetworks": "شبكات IP",
      "nav.cyber": "الأمن السيبراني",
      "nav.about": "من نحن",
      "nav.partners": "الشركاء",
      "nav.contact": "اتصل بنا",
      /* HERO */
      "hero.headline": "مراقبة دائمة واتصالات موثوقة. عندما تهم كل دقيقة.",
      "hero.sub": "تقدم مجموعة تكأفريك كوانتم مراقبة بمستوى الدفاع، واتصالاً حيوياً، وإدارة أسطول ذكية عبر غرب أفريقيا.",
      "hero.cta": "استكشف الحلول",
      "hero.cta2": "اتصل بنا",
      "hero.trust1": "مستوى الدفاع",
      "hero.trust2": "تغطية غرب أفريقيا",
      "hero.trust3": "دعم على مدار الساعة",
      /* INDEX */
      "index.sol.label": "ما نقدمه",
      "index.sol.title": "حلول تقنية متكاملة",
      "index.sol.sub": "من مراقبة المحيط إلى الاتصال عبر الأقمار الصناعية، نقدم أنظمة متكاملة مصممة للبيئات الصعبة.",
      "index.card.safety.title": "السلامة والمراقبة",
      "index.card.safety.body": "كاميرات المراقبة، والطائرات المسيّرة، وأجهزة الاستشعار المحيطية، ومراكز القيادة — مدمجة للوعي الظرفي الفوري.",
      "index.card.connectivity.title": "الاتصال الحيوي",
      "index.card.connectivity.body": "VSAT وLTE والميكروويف والروابط الهجينة لضمان الاتصال حيث لا تصل الألياف.",
      "index.card.assets.title": "إدارة الأصول",
      "index.card.assets.body": "تتبع الأسطول، ومكافحة احتيال الوقود، وتحليل سلوك السائقين لتعزيز الكفاءة التشغيلية.",
      "index.card.ipnetworks.title": "شبكات IP",
      "index.card.ipnetworks.body": "تصميم LAN/WAN للمؤسسات، وSD-WAN، وتنسيق الشبكة للعمليات الحيوية.",
      "index.card.cyber.title": "الأمن السيبراني",
      "index.card.cyber.body": "SOC وIAM واختبارات الاختراق وأطر الامتثال المصممة للسياق التنظيمي الأفريقي.",
      "index.cta.label": "ابدأ الآن",
      "index.cta.title": "هل أنت مستعد لتأمين عملياتك؟",
      "index.cta.sub": "فريقنا مستعد لتقييم بيئتك واقتراح الحل المناسب.",
      "index.cta.btn": "اتصل بنا",
      "index.cta.btn2": "عرض القطاعات",
      /* SECTORS */
      "defense.label": "الدفاع",
      "defense.title": "الدفاع",
      "defense.body": "نقدم أنظمة مراقبة متينة واتصالات آمنة وقدرات ISR لقوات الدفاع العاملة في البيئات الصعبة.",
      "defense.li1": "المراقبة التكتيكية ودمج طائرات ISR المسيّرة",
      "defense.li2": "اتصالات مشفرة بمستوى عسكري",
      "defense.li3": "أنظمة سريعة النشر وقابلة للصيانة الميدانية",
      "defense.cta": "اتصل بنا",
      "government.label": "الحكومة",
      "government.title": "الحكومة",
      "government.body": "ندعم الوكالات الحكومية والمؤسسات العامة ببنية تحتية آمنة للشبكات وأنظمة مراقبة وأدوات الحوكمة الرقمية.",
      "government.li1": "السلامة العامة والبنية التحتية للمدن الذكية",
      "government.li2": "اتصالات آمنة بين الوكالات",
      "government.li3": "أطر الحوكمة والمخاطر والامتثال",
      "government.cta": "اتصل بنا",
      "enterprise.label": "المؤسسات",
      "enterprise.title": "المؤسسات",
      "enterprise.body": "شبكات الشركات وعمليات الأمن السيبراني وإدارة الأصول للشركات التي لا تتحمل التوقف.",
      "enterprise.li1": "تصميم وتنسيق شبكات المؤسسات",
      "enterprise.li2": "دمج SOC وتنفيذ IAM",
      "enterprise.li3": "تتبع الأسطول والأصول للعمليات",
      "enterprise.cta": "اتصل بنا",
      "oilgas.label": "النفط والغاز",
      "oilgas.title": "النفط والغاز",
      "oilgas.body": "تتطلب المواقع النائية والمنصات البحرية وممرات خطوط الأنابيب أنظمة اتصال وسلامة لا تتوقف.",
      "oilgas.li1": "اتصال عبر الأقمار الصناعية والراديو للمواقع النائية",
      "oilgas.li2": "الكشف عن التسلل المحيطي للأصول الحيوية",
      "oilgas.li3": "تتبع الأسطول وأنظمة مكافحة احتيال الوقود",
      "oilgas.cta": "اتصل بنا",
      "cellular.label": "الشبكات الخلوية",
      "cellular.title": "الشبكات الخلوية",
      "cellular.body": "نتشارك مع مشغلي الشبكات الخلوية لتقديم هندسة RF وإدارة الطيف وخدمات تنسيق الشبكة.",
      "cellular.li1": "هندسة RF وإدارة الطيف",
      "cellular.li2": "قياس الشبكة وإمكانية ملاحظة SLO",
      "cellular.li3": "جودة الخدمة وهندسة حركة البيانات للشبكات الحاملة",
      "cellular.cta": "اتصل بنا",
      "mobility.label": "التنقل",
      "mobility.title": "التنقل",
      "mobility.body": "يعتمد مشغلو النقل وشركات اللوجستيات والأساطيل الوطنية على حلول التنقل لدينا لخفض التكاليف وتحسين السلامة.",
      "mobility.li1": "تتبع الأسطول بالـ GPS في الوقت الفعلي والسياج الجغرافي",
      "mobility.li2": "تقييم سلوك السائق والامتثال للسلامة",
      "mobility.li3": "تحسين المسارات وتحليلات كفاءة الوقود",
      "mobility.cta": "اتصل بنا",
      /* SOLUTIONS */
      "safety.label": "السلامة والمراقبة",
      "safety.title": "السلامة والمراقبة",
      "safety.body": "شبكات كاميرات متكاملة ومراقبة بالطائرات المسيّرة ومنصات تحليلية توفر وعياً ظرفياً كاملاً لفريق الأمن.",
      "safety.li1": "شبكات CCTV بالـ IP والتصوير الحراري",
      "safety.li2": "دمج طائرات ISR المسيّرة ومراقبة المجال الجوي",
      "safety.li3": "تحليل الفيديو بمساعدة الذكاء الاصطناعي والتنبيهات",
      "safety.cta": "اتصل بنا",
      "connectivity.label": "الاتصال الحيوي",
      "connectivity.title": "الاتصال الحيوي",
      "connectivity.body": "عندما لا تتحمل عملياتك التوقف، نصمم اتصالاً متكرراً متعدد المسارات مع تحويل تلقائي للبيئات الحيوية.",
      "connectivity.li1": "روابط الأقمار الصناعية VSAT وLEO للمواقع النائية",
      "connectivity.li2": "WAN هجين ميكروويف وLTE مع تحويل تلقائي",
      "connectivity.li3": "مراقبة SLA للشبكة ودعم NOC استباقي",
      "connectivity.cta": "اتصل بنا",
      "assets.label": "إدارة الأصول",
      "assets.title": "إدارة الأصول",
      "assets.body": "رؤية فورية للمركبات والمعدات والأفراد. تقلل منصاتنا من هدر الوقود وتمنع السرقة.",
      "assets.li1": "تتبع الأسطول بالـ GPS والسياج الجغرافي",
      "assets.li2": "مكافحة احتيال الوقود وتحليل الاستهلاك",
      "assets.li3": "سلوك السائق وتقييم السلامة",
      "assets.cta": "اتصل بنا",
      "ipnetworks.label": "شبكات IP",
      "ipnetworks.title": "شبكات IP",
      "ipnetworks.body": "تصميم LAN/WAN للمؤسسات ونشر SD-WAN وتنسيق الشبكة. نصمم شبكات IP آمنة وقابلة للملاحظة.",
      "ipnetworks.li1": "تصميم ونشر وتحسين LAN/WAN",
      "ipnetworks.li2": "SD-WAN وMPLS للمؤسسات متعددة المواقع",
      "ipnetworks.li3": "قياس الشبكة وSNMP وتحليلات التدفق",
      "ipnetworks.cta": "اتصل بنا",
      "cyber.label": "الأمن السيبراني",
      "cyber.title": "الأمن السيبراني",
      "cyber.body": "من تقييم المخاطر إلى تنفيذ SOC، نساعد المؤسسات على بناء وضع أمني يصمد أمام التهديدات الحقيقية.",
      "cyber.li1": "تقييم نقاط الضعف واختبار الاختراق",
      "cyber.li2": "دمج SOC ومراقبة التهديدات على مدار الساعة",
      "cyber.li3": "IAM والثقة الصفرية وأطر الامتثال",
      "cyber.cta": "اتصل بنا",
      /* ABOUT */
      "about.mission.label": "هدفنا",
      "about.mission.title": "المهمة",
      "about.mission.body": "تقديم حلول تقنية متكاملة عالمية المستوى تؤمّن وتربط وتحسّن عمليات قوات الدفاع والحكومات والمؤسسات في غرب أفريقيا.",
      "about.vision.label": "وجهتنا",
      "about.vision.title": "الرؤية",
      "about.vision.body": "أن نكون الشريك التقني الأكثر موثوقية في غرب أفريقيا — معروفين بالتميز الهندسي والخبرة المحلية والقدرة على التسليم في أصعب البيئات.",
      "about.values.label": "ما يحركنا",
      "about.values.title": "قيمنا",
      "about.values.li1": "الموثوقية — أنظمة تعمل عندما تعتمد عليها الأرواح",
      "about.values.li2": "النزاهة — نصائح صادقة، بلا تقييد بمورّد",
      "about.values.li3": "التميز — معتمدون دولياً، مثبتون محلياً",
      "about.values.li4": "الشراكة — علاقات طويلة الأمد أكثر من مبيعات آنية",
      "about.ceo.label": "القيادة",
      "about.ceo.title": "كلمة المدير التنفيذي",
      "about.ceo.quote": "تحديات الأمن والاتصال في أفريقيا تستدعي حلولاً مصممة لأفريقيا. نحن موجودون لسد الفجوة بين التكنولوجيا العالمية وحقائق الميدان.",
      "about.team.label": "الأشخاص",
      "about.team.title": "فريقنا",
      "about.team.body": "يجلب مهندسونا ومديرو المشاريع وفرق الدعم خبرة في أنظمة الدفاع والاتصالات والأمن السيبراني وتقنية المعلومات للمؤسسات.",
      "about.careers.label": "انضم إلينا",
      "about.careers.title": "الوظائف",
      "about.careers.body": "نبحث دائماً عن مهندسين ومديري مشاريع ومحترفي تطوير الأعمال الشغوفين بالتكنولوجيا والتأثير.",
      "about.careers.btn": "راسل قسم التوظيف",
      /* PARTNERS */
      "partners.tech.label": "الشركاء التقنيون",
      "partners.tech.title": "شركاؤنا",
      "partners.tech.lead": "أضف شعارات شركائك هنا. كل بطاقة تمثل شراكة أو علاقة بائع معتمد.",
      "partners.testimonials.label": "ماذا يقولون",
      "partners.testimonials.title": "شهادات العملاء",
      "partners.t1.body": "\"قدّمت مجموعة تكأفريك كوانتم حلاً متكاملاً للمراقبة والاتصال في ظل ضيق الوقت. فريق الدعم المحلي أحدث الفارق.\"",
      "partners.t1.name": "اسم العميل",
      "partners.t1.role": "المدير التقني، [مؤسسة العميل]",
      "partners.t2.body": "\"حدّد تقييمهم للأمن السيبراني ثغرات حيوية في بنيتنا التحتية. كان عملية دمج SOC احترافياً وشاملاً.\"",
      "partners.t2.name": "اسم العميل",
      "partners.t2.role": "رئيس أمن تقنية المعلومات، [مؤسسة العميل]",
      "partners.t3.body": "\"نظام تتبع الأسطول ومكافحة احتيال الوقود قلّل خسائرنا التشغيلية بشكل ملحوظ خلال الربع الأول من النشر.\"",
      "partners.t3.name": "اسم العميل",
      "partners.t3.role": "مدير العمليات، [مؤسسة العميل]",
      /* CONTACT */
      "contact.form.label": "أرسل رسالة",
      "contact.form.title": "كيف يمكننا المساعدة؟",
      "contact.name": "الاسم الكامل",
      "contact.email": "البريد الإلكتروني للعمل",
      "contact.company": "الشركة",
      "contact.topic": "الموضوع",
      "contact.message": "الرسالة",
      "contact.submit": "إرسال الرسالة",
      "contact.info.label": "تجدنا هنا",
      "contact.info.title": "معلومات الاتصال",
      "contact.email.title": "البريد الإلكتروني",
      "contact.location.title": "الموقع",
      "contact.location.body": "كوناكري، غينيا\nغرب أفريقيا",
      "contact.careers.title": "الوظائف",
      /* FOOTER */
      "footer.tagline": "آمن · متصل · محسَّن · محمي",
      "footer.sectors": "القطاعات",
      "footer.solutions": "الحلول",
      "footer.company": "الشركة",
      "footer.contact.heading": "اتصل بنا",
      "footer.copyright": "© 2025 مجموعة تكأفريك كوانتم. جميع الحقوق محفوظة.",
    },
  };

  /* ── Detection ────────────────────────────────────────── */
  function detectLang() {
    const saved = localStorage.getItem("lang");
    if (saved && translations[saved]) return saved;
    const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("ar")) return "ar";
    return "en";
  }

  /* ── Apply ────────────────────────────────────────────── */
  function applyLang(lang) {
    const t = translations[lang] || translations.en;
    const isRTL = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.textContent = t[key];
    });
    /* Update switcher active state */
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("lang-btn--active", btn.dataset.lang === lang);
    });
    localStorage.setItem("lang", lang);
  }

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang());
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.dataset.lang);
      });
    });
  });
})();
```

**Step 2: Verify the file exists**
```bash
ls -lh js/i18n.js
```
Expected: file ~18–22 KB

**Step 3: Commit**
```bash
git add js/i18n.js
git commit -m "feat: add i18n translations and detection logic (EN/FR/AR)"
```

---

### Task 2: Update style.css — lang switcher + RTL rules

**Files:**
- Modify: `style.css`

**Step 1: Add lang switcher styles after the `.nav-toggle` block and RTL overrides at the end**

After `.nav-toggle { ... }` block, add:
```css
/* ── Language switcher ───────────────────────────────────── */
.lang-switcher{display:flex;gap:4px;align-items:center;margin-left:var(--space-2);flex-shrink:0}
.lang-btn{
  background:transparent;border:1px solid var(--border);
  color:var(--muted);border-radius:6px;
  padding:5px 10px;font-size:12px;font-weight:600;
  font-family:var(--font);cursor:pointer;
  transition:color .15s,border-color .15s,background .15s;
  letter-spacing:.04em;
}
.lang-btn:hover{color:var(--text);border-color:rgba(255,255,255,.2)}
.lang-btn--active{color:var(--accent);border-color:var(--accent);background:var(--accent-dim)}
```

At the very end of the file, add:
```css
/* ══════════════════════════════════════════════════════════════
   RTL — Arabic
   ══════════════════════════════════════════════════════════════ */
[dir="rtl"] body{font-family:'Noto Sans Arabic',var(--font)}
[dir="rtl"] .nav-list{flex-direction:row-reverse}
[dir="rtl"] .logo{flex-direction:row-reverse}
[dir="rtl"] .site-header .container{flex-direction:row-reverse}
[dir="rtl"] .section__head{direction:rtl}
[dir="rtl"] .sol-section__content{margin-left:0;margin-right:auto}
[dir="rtl"] .sol-section--flip .sol-section__content{margin-right:0;margin-left:auto}
[dir="rtl"] .sol-outcomes{justify-content:flex-end}
[dir="rtl"] .ceo-quote blockquote{padding:0 var(--space-4) 0 0;border-left:none;border-right:3px solid var(--accent)}
[dir="rtl"] .footer__columns{direction:rtl}
[dir="rtl"] .footer__links{text-align:right}
[dir="rtl"] .footer__address{text-align:right}
[dir="rtl"] .checklist li{padding-left:0;padding-right:20px}
[dir="rtl"] .checklist li::before{left:auto;right:0}
[dir="rtl"] .cta-group{justify-content:flex-end}
[dir="rtl"] .hero__grid{direction:rtl}
[dir="rtl"] .feature-list li{flex-direction:row-reverse}
[dir="rtl"] .feature-list li::before{padding-top:3px}
[dir="rtl"] .card-link{flex-direction:row-reverse}
[dir="rtl"] .trust-points{justify-content:flex-end}
[dir="rtl"] .nav-dropdown{left:auto;right:50%;transform:translateX(50%)}
[dir="rtl"] .lang-switcher{margin-left:0;margin-right:var(--space-2)}

/* RTL mobile */
@media(max-width:900px){
  [dir="rtl"] .nav-list{flex-direction:column}
  [dir="rtl"] .primary-nav .nav-list{align-items:flex-end}
}
```

**Step 2: Commit**
```bash
git add style.css
git commit -m "feat: add lang switcher styles and RTL CSS overrides"
```

---

### Task 3: Update index.html

**Files:**
- Modify: `index.html`

**Step 1: Add Noto Sans Arabic to `<head>` (after the existing Inter font link)**
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

**Step 2: Add lang switcher to nav — inside `.site-header .container`, after `</nav>`**
```html
<div class="lang-switcher" aria-label="Language selector">
  <button class="lang-btn" data-lang="en">EN</button>
  <button class="lang-btn" data-lang="fr">FR</button>
  <button class="lang-btn" data-lang="ar">AR</button>
</div>
```

**Step 3: Add `data-i18n` attributes to all translatable elements**

Nav links (do in all `<ul id="nav-menu">` nav items):
```html
<li><a href="./index.html" aria-current="page" data-i18n="nav.home">Home</a></li>
<li><a href="./sectors.html" data-i18n="nav.sectors">Sectors</a></li>
<!-- Solutions dropdown button: -->
<button class="nav-dropdown-btn" ...><span data-i18n="nav.solutions">Solutions</span> <span class="nav-arrow" ...>▾</span></button>
<!-- Solutions dropdown items: -->
<li><a href="./solutions.html#safety" data-i18n="nav.safety">Safety &amp; Surveillance</a></li>
<li><a href="./solutions.html#connectivity" data-i18n="nav.connectivity">Critical Connectivity</a></li>
<li><a href="./solutions.html#assets" data-i18n="nav.assets">Assets Management</a></li>
<li><a href="./solutions.html#ipnetworks" data-i18n="nav.ipnetworks">IP Networks</a></li>
<li><a href="./solutions.html#cyber" data-i18n="nav.cyber">Cybersecurity</a></li>
<!-- Company dropdown button: -->
<button class="nav-dropdown-btn" ...><span data-i18n="nav.company">Company</span> <span ...>▾</span></button>
<li><a href="./about.html" data-i18n="nav.about">About Us</a></li>
<li><a href="./partners.html" data-i18n="nav.partners">Partners</a></li>
<li><a href="./contact.html" data-i18n="nav.contact">Contact Us</a></li>
```

Hero section:
```html
<h1 data-i18n="hero.headline">Persistent Eyes & Comms. When Minutes Matter.</h1>
<p data-i18n="hero.sub">Techafrik Quantum Group delivers...</p>
<a class="btn btn--primary" data-i18n="hero.cta" href="./solutions.html">Explore Solutions</a>
<a class="btn btn--ghost" data-i18n="hero.cta2" href="./contact.html">Contact Us</a>
```

Trust points:
```html
<li data-i18n="hero.trust1">Defense-Grade</li>
<li data-i18n="hero.trust2">West Africa Coverage</li>
<li data-i18n="hero.trust3">24/7 Support</li>
```

Solutions preview section:
```html
<p class="section-label" data-i18n="index.sol.label">What We Do</p>
<h2 data-i18n="index.sol.title">End-to-End Technology Solutions</h2>
<p data-i18n="index.sol.sub">From perimeter surveillance...</p>
```
Each solution card:
```html
<h3 data-i18n="index.card.safety.title">Safety & Surveillance</h3>
<p data-i18n="index.card.safety.body">CCTV, drones...</p>
```
(Repeat pattern for connectivity, assets, ipnetworks, cyber cards)

CTA section:
```html
<p class="section-label" data-i18n="index.cta.label">Get Started</p>
<h2 data-i18n="index.cta.title">Ready to Secure Your Operations?</h2>
<p data-i18n="index.cta.sub">Our team is ready...</p>
<a class="btn btn--primary" data-i18n="index.cta.btn" href="./contact.html">Contact Us</a>
<a class="btn btn--ghost" data-i18n="index.cta.btn2" href="./sectors.html">View Sectors</a>
```

Footer:
```html
<p class="footer__tagline" data-i18n="footer.tagline">Secure · Connect · Optimize · Protect</p>
<h4 class="footer__heading" data-i18n="footer.sectors">Sectors</h4>
<h4 class="footer__heading" data-i18n="footer.solutions">Solutions</h4>
<h4 class="footer__heading" data-i18n="footer.company">Company</h4>
<h4 class="footer__heading" data-i18n="footer.contact.heading">Contact</h4>
<p data-i18n="footer.copyright">© 2025 Techafrik Quantum Group...</p>
```

Footer nav links (same data-i18n as nav):
```html
<li><a href="./sectors.html#defense" data-i18n="defense.label">Defense</a></li>
... (all sector/solution/company footer links get their matching key)
```

**Step 4: Add `<script src="./js/i18n.js"></script>` before `</body>` (after skins.js)**

**Step 5: Commit**
```bash
git add index.html
git commit -m "feat: add data-i18n attributes and lang switcher to index.html"
```

---

### Task 4: Update sectors.html

**Files:**
- Modify: `sectors.html`

**Step 1: Add Noto Sans Arabic font link (same as Task 3 Step 1)**

**Step 2: Add lang switcher to nav (same HTML as Task 3 Step 2)**

**Step 3: Add `data-i18n` to nav links (same pattern as Task 3 Step 3 — nav section only)**

**Step 4: Add `data-i18n` to sector sections**

For each of the 6 sectors (defense, government, enterprise, oilgas, cellular, mobility):
```html
<p class="section-label" data-i18n="defense.label">Defense</p>
<h2 id="defense-title" data-i18n="defense.title">Defense</h2>
<p data-i18n="defense.body">We deliver hardened surveillance...</p>
<li data-i18n="defense.li1">Tactical surveillance & ISR drone integration</li>
<li data-i18n="defense.li2">Encrypted military-grade communications</li>
<li data-i18n="defense.li3">Rapid deployment & field-serviceable systems</li>
<a class="btn btn--primary" data-i18n="defense.cta" href="./contact.html">Contact Us</a>
```
Repeat with `government.*`, `enterprise.*`, `oilgas.*`, `cellular.*`, `mobility.*`.

**Step 5: Add `data-i18n` to footer (same pattern as Task 3 — footer section)**

**Step 6: Add `<script src="./js/i18n.js"></script>` before `</body>`**

**Step 7: Commit**
```bash
git add sectors.html
git commit -m "feat: add data-i18n attributes and lang switcher to sectors.html"
```

---

### Task 5: Update solutions.html

**Files:**
- Modify: `solutions.html`

**Step 1–2:** Add Noto Sans Arabic font + lang switcher (same as Task 3)

**Step 3:** Add `data-i18n` to nav (same pattern)

**Step 4:** Add `data-i18n` to solution sections

For each of the 5 solutions (safety, connectivity, assets, ipnetworks, cyber):
```html
<p class="section-label" data-i18n="safety.label">Safety & Surveillance</p>
<h2 data-i18n="safety.title">Safety & Surveillance</h2>
<p data-i18n="safety.body">Integrated camera networks...</p>
<li data-i18n="safety.li1">IP CCTV & thermal imaging networks</li>
<li data-i18n="safety.li2">ISR drone integration & airspace monitoring</li>
<li data-i18n="safety.li3">AI-assisted video analytics & alerting</li>
<a class="btn btn--primary" data-i18n="safety.cta" href="./contact.html">Contact Us</a>
```

**Step 5:** Footer + `<script>` tag (same pattern)

**Step 6: Commit**
```bash
git add solutions.html
git commit -m "feat: add data-i18n attributes and lang switcher to solutions.html"
```

---

### Task 6: Update about.html

**Files:**
- Modify: `about.html`

**Step 1–2:** Add Noto Sans Arabic font + lang switcher

**Step 3:** Add `data-i18n` to nav

**Step 4:** Add `data-i18n` to about sections:

```html
<!-- Mission -->
<p class="section-label" data-i18n="about.mission.label">Our Purpose</p>
<h2 data-i18n="about.mission.title">Mission</h2>
<p data-i18n="about.mission.body">To deliver world-class...</p>

<!-- Vision -->
<p class="section-label" data-i18n="about.vision.label">Where We're Going</p>
<h2 data-i18n="about.vision.title">Vision</h2>
<p data-i18n="about.vision.body">To be West Africa's...</p>

<!-- Values -->
<p class="section-label" data-i18n="about.values.label">What Drives Us</p>
<h2 data-i18n="about.values.title">Our Values</h2>
<li data-i18n="about.values.li1">Reliability — ...</li>
<li data-i18n="about.values.li2">Integrity — ...</li>
<li data-i18n="about.values.li3">Excellence — ...</li>
<li data-i18n="about.values.li4">Partnership — ...</li>

<!-- CEO -->
<p class="section-label" data-i18n="about.ceo.label">Leadership</p>
<h2 data-i18n="about.ceo.title">From Our CEO</h2>
<p data-i18n="about.ceo.quote">Africa's security...</p>

<!-- Team -->
<p class="section-label" data-i18n="about.team.label">The People</p>
<h2 data-i18n="about.team.title">Our Team</h2>
<p data-i18n="about.team.body">Our engineers...</p>

<!-- Careers -->
<p class="section-label" data-i18n="about.careers.label">Join Us</p>
<h2 data-i18n="about.careers.title">Careers</h2>
<p data-i18n="about.careers.body">We are always looking...</p>
<a data-i18n="about.careers.btn" ...>Email Careers</a>
```

**Step 5:** Footer + `<script>` tag

**Step 6: Commit**
```bash
git add about.html
git commit -m "feat: add data-i18n attributes and lang switcher to about.html"
```

---

### Task 7: Update partners.html

**Files:**
- Modify: `partners.html`

**Step 1–2:** Add Noto Sans Arabic font + lang switcher

**Step 3:** Add `data-i18n` to nav

**Step 4:** Add `data-i18n` to partners sections:
```html
<p class="section-label" data-i18n="partners.tech.label">Technology Partners</p>
<h2 data-i18n="partners.tech.title">Our Partners</h2>
<p class="lead" data-i18n="partners.tech.lead">Add your partner logos here...</p>

<p class="section-label" data-i18n="partners.testimonials.label">What They Say</p>
<h2 data-i18n="partners.testimonials.title">Client Testimonials</h2>

<!-- Each testimonial: -->
<p data-i18n="partners.t1.body">"Techafrik Quantum Group delivered..."</p>
<cite>
  <span data-i18n="partners.t1.name">Client Name</span>
  <span data-i18n="partners.t1.role">CTO, [Client Organization]</span>
</cite>
```

**Step 5:** Footer + `<script>` tag

**Step 6: Commit**
```bash
git add partners.html
git commit -m "feat: add data-i18n attributes and lang switcher to partners.html"
```

---

### Task 8: Update contact.html

**Files:**
- Modify: `contact.html`

**Step 1–2:** Add Noto Sans Arabic font + lang switcher

**Step 3:** Add `data-i18n` to nav

**Step 4:** Add `data-i18n` to contact sections:
```html
<p class="section-label" data-i18n="contact.form.label">Send a Message</p>
<h2 data-i18n="contact.form.title">How Can We Help?</h2>

<!-- Form labels: -->
<label for="c-name" data-i18n="contact.name">Full name</label>
<label for="c-email" data-i18n="contact.email">Work email</label>
<label for="c-company" data-i18n="contact.company">Company</label>
<label for="c-topic" data-i18n="contact.topic">Topic</label>
<label for="c-message" data-i18n="contact.message">Message</label>
<button class="btn btn--primary" type="submit" data-i18n="contact.submit">Send Message</button>

<!-- Info section: -->
<p class="section-label" data-i18n="contact.info.label">Find Us</p>
<h2 data-i18n="contact.info.title">Contact Information</h2>
<h3 data-i18n="contact.email.title">Email</h3>
<h3 data-i18n="contact.location.title">Location</h3>
<h3 data-i18n="contact.careers.title">Careers</h3>
```

**Step 5:** Footer + `<script>` tag

**Step 6: Commit**
```bash
git add contact.html
git commit -m "feat: add data-i18n attributes and lang switcher to contact.html"
```

---

### Task 9: Final push and tag

**Step 1: Push all commits**
```bash
git push origin main
```

**Step 2: Create version tag**
```bash
git tag v2.1-i18n && git push origin v2.1-i18n
```

**Step 3: Verify in browser**
- Open site, check EN displays correctly
- Click FR — all text switches to French, no page reload
- Click AR — text switches to Arabic, layout flips RTL
- Reload — language persists from localStorage
- Change device language to French in browser settings, clear localStorage, reload — auto-detects FR

---

## Notes

- The nav dropdown button currently wraps text + arrow in one `<button>`. Wrap only the text in a `<span data-i18n="...">` to avoid replacing the arrow character.
- Do NOT add `data-i18n` to email `<a href="mailto:...">` text — those stay in EN always.
- The `contact.location.body` key uses `\n` — this won't render as a line break in HTML. Keep the existing `<br />` in the HTML and only add `data-i18n` to surrounding container if needed, or split into two `<span>` elements.
- For `footer.copyright` which contains the `©` symbol and year, add `data-i18n` and ensure each translation has it verbatim.
