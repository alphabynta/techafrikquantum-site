/* i18n.js — Language detection, translations, and switcher */
(function () {
  /* ── Translations ───────────────────────────────────────── */
  var translations = {
    en: {
      /* NAV */
      'nav.home': 'Home',
      'nav.sectors': 'Sectors',
      'nav.solutions': 'Solutions',
      'nav.about': 'About',
      'nav.partners': 'Partners',
      'nav.contact': 'Contact',
      'nav.safety': 'Safety & Surveillance',
      'nav.connectivity': 'Critical Connectivity',
      'nav.assets': 'Assets Management',
      'nav.ipnetworks': 'IP Networks',
      'nav.cyber': 'Cybersecurity',

      /* HERO */
      'hero.eyebrow': "West Africa's Defense & Connectivity Leader",
      'hero.line1': 'SECURE.',
      'hero.line2': 'CONNECT.',
      'hero.line3': 'PROTECT.',
      'hero.sub': 'Defense-grade surveillance, critical connectivity, and intelligent fleet management across West Africa.',
      'hero.cta': 'Explore Solutions',
      'hero.cta2': 'Contact Us',
      'hero.trust1': 'Defense-Grade',
      'hero.trust2': 'West Africa Coverage',
      'hero.trust3': '24/7 Support',

      /* SECTORS */
      'defense.label': 'Defense',
      'defense.title': 'Defense',
      'defense.body': 'We deliver hardened surveillance, secure communications, and ISR capabilities for defense forces operating in challenging environments. Our solutions are designed for reliability under pressure — from perimeter protection to command-and-control connectivity.',
      'defense.li1': 'Tactical surveillance & ISR drone integration',
      'defense.li2': 'Encrypted military-grade communications',
      'defense.li3': 'Rapid deployment & field-serviceable systems',

      'government.label': 'Government',
      'government.title': 'Government',
      'government.body': 'We support government agencies and public institutions with secure network infrastructure, surveillance systems, and digital governance tools.',
      'government.li1': 'Public safety & smart city infrastructure',
      'government.li2': 'Secure inter-agency communications',
      'government.li3': 'Governance, risk & compliance frameworks',

      'enterprise.label': 'Enterprise',
      'enterprise.title': 'Enterprise',
      'enterprise.body': 'Corporate networks, cybersecurity operations, and assets management for businesses that cannot afford downtime.',
      'enterprise.li1': 'Enterprise network design & orchestration',
      'enterprise.li2': 'SOC onboarding & IAM implementation',
      'enterprise.li3': 'Fleet & assets tracking for operations',

      'oilgas.label': 'Oil & Gas',
      'oilgas.title': 'Oil & Gas',
      'oilgas.body': 'Remote sites, offshore platforms, and pipeline corridors demand connectivity and safety systems that work without exception.',
      'oilgas.li1': 'Satellite & radio connectivity for remote sites',
      'oilgas.li2': 'Perimeter intrusion detection for critical assets',
      'oilgas.li3': 'Fleet tracking & fuel anti-fraud systems',

      'cellular.label': 'Cellular',
      'cellular.title': 'Cellular',
      'cellular.body': 'We partner with cellular operators to deliver RF engineering, spectrum management, and network orchestration services.',
      'cellular.li1': 'RF engineering & spectrum management',
      'cellular.li2': 'Network telemetry & SLO observability',
      'cellular.li3': 'QoS & traffic engineering for carrier-grade networks',

      'mobility.label': 'Mobility',
      'mobility.title': 'Mobility',
      'mobility.body': 'Transport operators, logistics companies, and national fleets rely on our mobility solutions to reduce costs, improve safety, and gain operational visibility.',
      'mobility.li1': 'Real-time GPS fleet tracking & geofencing',
      'mobility.li2': 'Driver behavior scoring & safety compliance',
      'mobility.li3': 'Route optimization & fuel efficiency analytics',

      /* SOLUTIONS */
      'safety.label': 'Safety & Surveillance',
      'safety.title': 'Safety & Surveillance',
      'safety.body': 'Integrated camera networks, drone monitoring, and analytics platforms that give your security team total situational awareness — day and night, indoors and outdoors.',
      'safety.li1': 'IP CCTV & thermal imaging networks',
      'safety.li2': 'ISR drone integration & airspace monitoring',
      'safety.li3': 'AI-assisted video analytics & alerting',

      'connectivity.label': 'Critical Connectivity',
      'connectivity.title': 'Critical Connectivity',
      'connectivity.body': 'When your operation cannot afford downtime, we engineer redundant, multi-path connectivity with failover designed for mission-critical environments.',
      'connectivity.li1': 'VSAT & LEO satellite links for remote sites',
      'connectivity.li2': 'Microwave & LTE hybrid WAN with automatic failover',
      'connectivity.li3': 'Network SLA monitoring & proactive NOC support',

      'assets.label': 'Assets Management',
      'assets.title': 'Assets Management',
      'assets.body': 'Real-time visibility over vehicles, equipment, and personnel. Reduce fuel waste, prevent theft, and make smarter operational decisions.',
      'assets.li1': 'GPS fleet tracking & geofencing',
      'assets.li2': 'Fuel anti-fraud & consumption analytics',
      'assets.li3': 'Driver behavior & safety scoring',

      'ipnetworks.label': 'IP Networks',
      'ipnetworks.title': 'IP Networks',
      'ipnetworks.body': 'Enterprise-grade LAN/WAN design, SD-WAN deployment, and network orchestration. Secure, observable, built to grow with your organisation.',
      'ipnetworks.li1': 'LAN/WAN design, deployment & optimisation',
      'ipnetworks.li2': 'SD-WAN & MPLS for multi-site enterprises',
      'ipnetworks.li3': 'Network telemetry, SNMP & flow analytics',

      'cyber.label': 'Cybersecurity',
      'cyber.title': 'Cybersecurity',
      'cyber.body': 'From risk assessment to SOC implementation, we help organisations build a security posture that withstands real-world threats in the West African threat landscape.',
      'cyber.li1': 'Vulnerability assessment & penetration testing',
      'cyber.li2': 'SOC onboarding & 24/7 threat monitoring',
      'cyber.li3': 'IAM, zero-trust & compliance frameworks',

      /* ABOUT */
      'about.mission.label': 'Our Purpose',
      'about.mission.title': 'Our Mission',
      'about.mission.body': 'To empower West African governments, enterprises, and security forces with world-class technology solutions — delivering reliable surveillance, connectivity, and intelligence systems that protect people and enable growth.',
      'about.vision.label': "Where We're Going",
      'about.vision.title': 'Our Vision',
      'about.vision.body': "To be West Africa's most trusted technology partner for defense, security, and connectivity — bridging the gap between global innovation and local operational realities.",
      'about.values.label': 'What Drives Us',
      'about.values.title': 'Our Values',
      'about.values.li1': 'Reliability — systems that work when lives depend on them',
      'about.values.li2': 'Integrity — honest advice, no vendor lock-in',
      'about.values.li3': 'Excellence — internationally certified, locally proven',
      'about.values.li4': 'Partnership — long-term relationships over one-time sales',
      'about.ceo.quote': '"Africa\'s security and connectivity challenges demand solutions built for Africa. We exist to bridge the gap between global technology and the realities on the ground."',
      'about.ceo.label': 'Leadership — Techafrik Quantum Group',

      /* PARTNERS */
      'partners.tech.label': 'Technology Partners',
      'partners.tech.title': 'Our Partners',
      'partners.testimonials.label': 'What They Say',
      'partners.testimonials.title': 'Client Testimonials',
      'partners.t1.body': '"Techafrik Quantum Group delivered a fully integrated surveillance and connectivity solution under a tight deadline. Their local support team made the difference."',
      'partners.t1.name': 'Client Name',
      'partners.t1.role': 'CTO, [Client Organization]',
      'partners.t2.body': '"Their cybersecurity assessment identified critical gaps in our infrastructure. The SOC onboarding process was professional and thorough."',
      'partners.t2.name': 'Client Name',
      'partners.t2.role': 'Head of IT Security, [Client Organization]',
      'partners.t3.body': '"The fleet tracking and fuel anti-fraud system reduced our operational losses significantly within the first quarter of deployment."',
      'partners.t3.name': 'Client Name',
      'partners.t3.role': 'Operations Director, [Client Organization]',

      /* CONTACT */
      'contact.form.label': 'Send a Message',
      'contact.form.title': 'How Can We Help?',
      'contact.name': 'Full name',
      'contact.email': 'Work email',
      'contact.company': 'Company',
      'contact.topic': 'Topic',
      'contact.message': 'Message',
      'contact.submit': 'Send Message',
      'contact.email.title': 'Email',
      'contact.location.title': 'Location',
      'contact.careers.title': 'Careers',

      /* FOOTER */
      'footer.copyright': '© 2025 Techafrik Quantum Group. All rights reserved.',
    },

    fr: {
      /* NAV */
      'nav.home': 'Accueil',
      'nav.sectors': 'Secteurs',
      'nav.solutions': 'Solutions',
      'nav.about': 'À Propos',
      'nav.partners': 'Partenaires',
      'nav.contact': 'Contact',
      'nav.safety': 'Sécurité & Surveillance',
      'nav.connectivity': 'Connectivité Critique',
      'nav.assets': 'Gestion des Actifs',
      'nav.ipnetworks': 'Réseaux IP',
      'nav.cyber': 'Cybersécurité',

      /* HERO */
      'hero.eyebrow': "Leader en Défense & Connectivité en Afrique de l'Ouest",
      'hero.line1': 'SÉCURISER.',
      'hero.line2': 'CONNECTER.',
      'hero.line3': 'PROTÉGER.',
      'hero.sub': "Surveillance de qualité défense, connectivité critique et gestion intelligente de flotte à travers l'Afrique de l'Ouest.",
      'hero.cta': 'Explorer les Solutions',
      'hero.cta2': 'Nous Contacter',
      'hero.trust1': 'Qualité Défense',
      'hero.trust2': "Couverture Afrique de l'Ouest",
      'hero.trust3': 'Support 24/7',

      /* SECTORS */
      'defense.label': 'Défense',
      'defense.title': 'Défense',
      'defense.body': "Nous fournissons des capacités de surveillance renforcées, des communications sécurisées et des capacités ISR pour les forces de défense opérant dans des environnements exigeants.",
      'defense.li1': 'Surveillance tactique & intégration drone ISR',
      'defense.li2': 'Communications militaires chiffrées',
      'defense.li3': 'Systèmes à déploiement rapide & maintenables sur le terrain',

      'government.label': 'Gouvernement',
      'government.title': 'Gouvernement',
      'government.body': "Nous accompagnons les agences gouvernementales et institutions publiques avec une infrastructure réseau sécurisée, des systèmes de surveillance et des outils de gouvernance numérique.",
      'government.li1': 'Sécurité publique & infrastructure ville intelligente',
      'government.li2': 'Communications inter-agences sécurisées',
      'government.li3': 'Cadres de gouvernance, risque & conformité',

      'enterprise.label': 'Entreprise',
      'enterprise.title': 'Entreprise',
      'enterprise.body': "Réseaux d'entreprise, opérations de cybersécurité et gestion des actifs pour les entreprises qui ne peuvent pas se permettre d'interruption.",
      'enterprise.li1': "Conception & orchestration de réseau d'entreprise",
      'enterprise.li2': 'Intégration SOC & mise en œuvre IAM',
      'enterprise.li3': 'Suivi de flotte & gestion des actifs opérationnels',

      'oilgas.label': 'Pétrole & Gaz',
      'oilgas.title': 'Pétrole & Gaz',
      'oilgas.body': "Les sites distants, plateformes offshore et corridors de pipelines exigent des systèmes de connectivité et de sécurité qui fonctionnent sans exception.",
      'oilgas.li1': 'Connectivité satellite & radio pour sites distants',
      'oilgas.li2': "Détection d'intrusion périmétrique pour actifs critiques",
      'oilgas.li3': 'Suivi de flotte & systèmes anti-fraude carburant',

      'cellular.label': 'Cellulaire',
      'cellular.title': 'Cellulaire',
      'cellular.body': "Nous collaborons avec les opérateurs cellulaires pour fournir des services d'ingénierie RF, de gestion du spectre et d'orchestration réseau.",
      'cellular.li1': 'Ingénierie RF & gestion du spectre',
      'cellular.li2': 'Télémétrie réseau & observabilité SLO',
      'cellular.li3': 'QoS & ingénierie du trafic pour réseaux opérateurs',

      'mobility.label': 'Mobilité',
      'mobility.title': 'Mobilité',
      'mobility.body': "Les transporteurs, sociétés de logistique et flottes nationales s'appuient sur nos solutions de mobilité pour réduire les coûts, améliorer la sécurité et gagner en visibilité opérationnelle.",
      'mobility.li1': 'Suivi GPS de flotte en temps réel & géofencing',
      'mobility.li2': 'Scoring comportement conducteur & conformité sécurité',
      'mobility.li3': "Optimisation des itinéraires & analyse d'efficacité carburant",

      /* SOLUTIONS */
      'safety.label': 'Sécurité & Surveillance',
      'safety.title': 'Sécurité & Surveillance',
      'safety.body': "Réseaux de caméras intégrés, surveillance par drone et plateformes analytiques offrant à votre équipe de sécurité une conscience situationnelle totale — jour et nuit, intérieur et extérieur.",
      'safety.li1': 'Réseaux CCTV IP & imagerie thermique',
      'safety.li2': "Intégration drone ISR & surveillance de l'espace aérien",
      'safety.li3': 'Vidéo analytique assistée par IA & alertes',

      'connectivity.label': 'Connectivité Critique',
      'connectivity.title': 'Connectivité Critique',
      'connectivity.body': "Quand votre opération ne peut pas se permettre d'interruption, nous concevons une connectivité redondante et multi-chemins avec basculement pour environnements critiques.",
      'connectivity.li1': 'Liaisons satellite VSAT & LEO pour sites distants',
      'connectivity.li2': 'WAN hybride micro-ondes & LTE avec basculement automatique',
      'connectivity.li3': 'Surveillance SLA réseau & support NOC proactif',

      'assets.label': 'Gestion des Actifs',
      'assets.title': 'Gestion des Actifs',
      'assets.body': "Visibilité en temps réel sur véhicules, équipements et personnel. Réduire le gaspillage de carburant, prévenir le vol et prendre de meilleures décisions opérationnelles.",
      'assets.li1': 'Suivi GPS de flotte & géofencing',
      'assets.li2': 'Anti-fraude carburant & analytique de consommation',
      'assets.li3': 'Comportement conducteur & scoring sécurité',

      'ipnetworks.label': 'Réseaux IP',
      'ipnetworks.title': 'Réseaux IP',
      'ipnetworks.body': "Conception LAN/WAN de qualité entreprise, déploiement SD-WAN et orchestration réseau. Sécurisé, observable, conçu pour évoluer avec votre organisation.",
      'ipnetworks.li1': 'Conception, déploiement & optimisation LAN/WAN',
      'ipnetworks.li2': 'SD-WAN & MPLS pour entreprises multi-sites',
      'ipnetworks.li3': 'Télémétrie réseau, SNMP & analytique de flux',

      'cyber.label': 'Cybersécurité',
      'cyber.title': 'Cybersécurité',
      'cyber.body': "De l'évaluation des risques à la mise en œuvre du SOC, nous aidons les organisations à construire une posture de sécurité face aux menaces réelles du paysage africain.",
      'cyber.li1': 'Évaluation des vulnérabilités & tests de pénétration',
      'cyber.li2': 'Intégration SOC & surveillance des menaces 24/7',
      'cyber.li3': 'IAM, zéro-confiance & cadres de conformité',

      /* ABOUT */
      'about.mission.label': 'Notre Mission',
      'about.mission.title': 'Notre Mission',
      'about.mission.body': "Donner aux gouvernements, entreprises et forces de sécurité ouest-africains des solutions technologiques de classe mondiale — offrant des systèmes fiables de surveillance, connectivité et renseignement qui protègent les personnes et favorisent la croissance.",
      'about.vision.label': 'Notre Direction',
      'about.vision.title': 'Notre Vision',
      'about.vision.body': "Devenir le partenaire technologique le plus fiable d'Afrique de l'Ouest pour la défense, la sécurité et la connectivité — comblant le fossé entre l'innovation mondiale et les réalités opérationnelles locales.",
      'about.values.label': 'Ce Qui Nous Anime',
      'about.values.title': 'Nos Valeurs',
      'about.values.li1': 'Fiabilité — des systèmes qui fonctionnent quand des vies en dépendent',
      'about.values.li2': "Intégrité — conseils honnêtes, sans enfermement fournisseur",
      'about.values.li3': 'Excellence — certifié internationalement, prouvé localement',
      'about.values.li4': 'Partenariat — relations à long terme plutôt que ventes ponctuelles',
      'about.ceo.quote': '"Les défis de sécurité et de connectivité africains exigent des solutions construites pour l\'Afrique. Nous existons pour combler le fossé entre la technologie mondiale et les réalités sur le terrain."',
      'about.ceo.label': 'Direction — Techafrik Quantum Group',

      /* PARTNERS */
      'partners.tech.label': 'Partenaires Technologiques',
      'partners.tech.title': 'Nos Partenaires',
      'partners.testimonials.label': 'Ce Qu\'ils Disent',
      'partners.testimonials.title': 'Témoignages Clients',
      'partners.t1.body': '"Techafrik Quantum Group a livré une solution intégrée de surveillance et connectivité dans des délais serrés. Leur équipe locale de support a fait la différence."',
      'partners.t1.name': 'Nom du Client',
      'partners.t1.role': 'CTO, [Organisation Cliente]',
      'partners.t2.body': '"Leur audit de cybersécurité a identifié des failles critiques dans notre infrastructure. Le processus d\'intégration SOC était professionnel et minutieux."',
      'partners.t2.name': 'Nom du Client',
      'partners.t2.role': 'Responsable Sécurité IT, [Organisation Cliente]',
      'partners.t3.body': '"Le système de suivi de flotte et d\'anti-fraude carburant a significativement réduit nos pertes opérationnelles dès le premier trimestre de déploiement."',
      'partners.t3.name': 'Nom du Client',
      'partners.t3.role': 'Directeur des Opérations, [Organisation Cliente]',

      /* CONTACT */
      'contact.form.label': 'Envoyer un Message',
      'contact.form.title': 'Comment Pouvons-Nous Vous Aider ?',
      'contact.name': 'Nom complet',
      'contact.email': 'Email professionnel',
      'contact.company': 'Entreprise',
      'contact.topic': 'Sujet',
      'contact.message': 'Message',
      'contact.submit': 'Envoyer le Message',
      'contact.email.title': 'Email',
      'contact.location.title': 'Localisation',
      'contact.careers.title': 'Carrières',

      /* FOOTER */
      'footer.copyright': '© 2025 Techafrik Quantum Group. Tous droits réservés.',
    },

    ar: {
      /* NAV */
      'nav.home': 'الرئيسية',
      'nav.sectors': 'القطاعات',
      'nav.solutions': 'الحلول',
      'nav.about': 'من نحن',
      'nav.partners': 'الشركاء',
      'nav.contact': 'اتصل بنا',
      'nav.safety': 'السلامة والمراقبة',
      'nav.connectivity': 'الاتصال الحيوي',
      'nav.assets': 'إدارة الأصول',
      'nav.ipnetworks': 'شبكات IP',
      'nav.cyber': 'الأمن السيبراني',

      /* HERO */
      'hero.eyebrow': 'رائد الدفاع والاتصال في غرب أفريقيا',
      'hero.line1': 'آمن.',
      'hero.line2': 'اتصل.',
      'hero.line3': 'احمِ.',
      'hero.sub': 'مراقبة بمستوى الدفاع، وتواصل حيوي، وإدارة ذكية للأسطول في جميع أنحاء غرب أفريقيا.',
      'hero.cta': 'استكشف الحلول',
      'hero.cta2': 'تواصل معنا',
      'hero.trust1': 'بمستوى الدفاع',
      'hero.trust2': 'تغطية غرب أفريقيا',
      'hero.trust3': 'دعم على مدار الساعة',

      /* SECTORS */
      'defense.label': 'الدفاع',
      'defense.title': 'الدفاع',
      'defense.body': 'نقدم قدرات مراقبة متصلبة واتصالات آمنة وقدرات ISR لقوات الدفاع العاملة في بيئات صعبة.',
      'defense.li1': 'مراقبة تكتيكية وتكامل طائرات ISR بدون طيار',
      'defense.li2': 'اتصالات عسكرية مشفرة',
      'defense.li3': 'أنظمة سريعة النشر وقابلة للصيانة ميدانياً',

      'government.label': 'الحكومة',
      'government.title': 'الحكومة',
      'government.body': 'ندعم الوكالات الحكومية والمؤسسات العامة ببنية تحتية شبكية آمنة وأنظمة مراقبة وأدوات الحوكمة الرقمية.',
      'government.li1': 'السلامة العامة وبنية المدن الذكية',
      'government.li2': 'اتصالات آمنة بين الوكالات',
      'government.li3': 'أطر الحوكمة والمخاطر والامتثال',

      'enterprise.label': 'المؤسسات',
      'enterprise.title': 'المؤسسات',
      'enterprise.body': 'شبكات الشركات وعمليات الأمن السيبراني وإدارة الأصول للمؤسسات التي لا يمكنها تحمل التوقف.',
      'enterprise.li1': 'تصميم وتنسيق شبكة المؤسسة',
      'enterprise.li2': 'تأهيل SOC وتنفيذ IAM',
      'enterprise.li3': 'تتبع الأسطول وإدارة أصول العمليات',

      'oilgas.label': 'النفط والغاز',
      'oilgas.title': 'النفط والغاز',
      'oilgas.body': 'تتطلب المواقع النائية والمنصات البحرية وممرات خطوط الأنابيب أنظمة اتصال وسلامة تعمل دون استثناء.',
      'oilgas.li1': 'اتصال ساتلي وراديوي للمواقع النائية',
      'oilgas.li2': 'كشف التسلل المحيطي للأصول الحيوية',
      'oilgas.li3': 'تتبع الأسطول وأنظمة مكافحة الاحتيال في الوقود',

      'cellular.label': 'الخلوي',
      'cellular.title': 'الخلوي',
      'cellular.body': 'نتعاون مع مشغلي الشبكات الخلوية لتقديم هندسة RF وإدارة الطيف وخدمات تنسيق الشبكات.',
      'cellular.li1': 'هندسة RF وإدارة الطيف',
      'cellular.li2': 'قياس عن بُعد للشبكة وإمكانية مراقبة SLO',
      'cellular.li3': 'جودة الخدمة وهندسة حركة المرور لشبكات الناقلين',

      'mobility.label': 'المتنقلة',
      'mobility.title': 'المتنقلة',
      'mobility.body': 'يعتمد مشغلو النقل وشركات الخدمات اللوجستية والأساطيل الوطنية على حلول التنقل لدينا لتقليل التكاليف وتحسين السلامة.',
      'mobility.li1': 'تتبع أسطول GPS في الوقت الفعلي والسياج الجغرافي',
      'mobility.li2': 'تسجيل سلوك السائق والامتثال للسلامة',
      'mobility.li3': 'تحسين المسار وتحليلات كفاءة الوقود',

      /* SOLUTIONS */
      'safety.label': 'السلامة والمراقبة',
      'safety.title': 'السلامة والمراقبة',
      'safety.body': 'شبكات كاميرا متكاملة ومراقبة بالطائرات المسيّرة ومنصات تحليلية تمنح فريق الأمن لديك وعياً كاملاً بالموقف.',
      'safety.li1': 'شبكات CCTV IP والتصوير الحراري',
      'safety.li2': 'تكامل طائرات ISR ومراقبة المجال الجوي',
      'safety.li3': 'تحليل فيديو بمساعدة الذكاء الاصطناعي والتنبيه',

      'connectivity.label': 'الاتصال الحيوي',
      'connectivity.title': 'الاتصال الحيوي',
      'connectivity.body': 'عندما لا تتحمل عمليتك أي انقطاع، نصمم اتصالاً زائداً متعدد المسارات مع تجاوز الفشل للبيئات الحيوية.',
      'connectivity.li1': 'روابط VSAT وساتل LEO للمواقع النائية',
      'connectivity.li2': 'WAN هجين للموجات الدقيقة وLTE مع تجاوز فشل تلقائي',
      'connectivity.li3': 'مراقبة SLA الشبكة ودعم NOC استباقي',

      'assets.label': 'إدارة الأصول',
      'assets.title': 'إدارة الأصول',
      'assets.body': 'رؤية في الوقت الفعلي على المركبات والمعدات والأفراد. تقليل هدر الوقود ومنع السرقة واتخاذ قرارات تشغيلية أذكى.',
      'assets.li1': 'تتبع أسطول GPS والسياج الجغرافي',
      'assets.li2': 'مكافحة احتيال الوقود وتحليلات الاستهلاك',
      'assets.li3': 'سلوك السائق وتسجيل السلامة',

      'ipnetworks.label': 'شبكات IP',
      'ipnetworks.title': 'شبكات IP',
      'ipnetworks.body': 'تصميم LAN/WAN على مستوى المؤسسات ونشر SD-WAN وتنسيق الشبكات. آمن وقابل للملاحظة ومبني للنمو مع مؤسستك.',
      'ipnetworks.li1': 'تصميم ونشر وتحسين LAN/WAN',
      'ipnetworks.li2': 'SD-WAN وMPLS للمؤسسات متعددة المواقع',
      'ipnetworks.li3': 'قياس عن بُعد للشبكة وSNMP وتحليلات التدفق',

      'cyber.label': 'الأمن السيبراني',
      'cyber.title': 'الأمن السيبراني',
      'cyber.body': 'من تقييم المخاطر إلى تنفيذ SOC، نساعد المنظمات على بناء وضع أمني يصمد أمام التهديدات الحقيقية في المشهد الأفريقي.',
      'cyber.li1': 'تقييم الثغرات واختبار الاختراق',
      'cyber.li2': 'تأهيل SOC ومراقبة التهديدات على مدار الساعة',
      'cyber.li3': 'IAM والثقة الصفرية وأطر الامتثال',

      /* ABOUT */
      'about.mission.label': 'هدفنا',
      'about.mission.title': 'المهمة',
      'about.mission.body': 'تمكين الحكومات والمؤسسات وقوات الأمن في غرب أفريقيا بحلول تكنولوجية عالمية المستوى — وتقديم أنظمة موثوقة للمراقبة والاتصال والاستخبارات تحمي الناس وتمكّن النمو.',
      'about.vision.label': 'وجهتنا',
      'about.vision.title': 'الرؤية',
      'about.vision.body': 'أن نكون الشريك التكنولوجي الأكثر ثقة في غرب أفريقيا للدفاع والأمن والاتصال — سد الفجوة بين الابتكار العالمي والواقع التشغيلي المحلي.',
      'about.values.label': 'ما يحركنا',
      'about.values.title': 'قيمنا',
      'about.values.li1': 'الموثوقية — أنظمة تعمل عندما تعتمد عليها الأرواح',
      'about.values.li2': 'النزاهة — نصيحة صادقة، دون قيود على البائع',
      'about.values.li3': 'التميز — معتمد دولياً، مثبت محلياً',
      'about.values.li4': 'الشراكة — علاقات طويلة الأمد بدلاً من مبيعات لمرة واحدة',
      'about.ceo.quote': '"تحديات الأمن والاتصال في أفريقيا تتطلب حلولاً مبنية لأفريقيا. نحن موجودون لسد الفجوة بين التكنولوجيا العالمية وحقائق الواقع."',
      'about.ceo.label': 'القيادة — مجموعة تكنافريك كوانتم',

      /* PARTNERS */
      'partners.tech.label': 'الشركاء التقنيون',
      'partners.tech.title': 'شركاؤنا',
      'partners.testimonials.label': 'ما يقولونه',
      'partners.testimonials.title': 'شهادات العملاء',
      'partners.t1.body': '"قدمت مجموعة تكنافريك كوانتم حلاً متكاملاً للمراقبة والاتصال في ظل موعد نهائي ضيق. فريق الدعم المحلي هو الفارق."',
      'partners.t1.name': 'اسم العميل',
      'partners.t1.role': 'مدير التقنية، [المنظمة العميلة]',
      'partners.t2.body': '"حدد تقييمهم للأمن السيبراني ثغرات حيوية في بنيتنا التحتية. كانت عملية تأهيل SOC احترافية وشاملة."',
      'partners.t2.name': 'اسم العميل',
      'partners.t2.role': 'رئيس أمن IT، [المنظمة العميلة]',
      'partners.t3.body': '"خفّض نظام تتبع الأسطول ومكافحة احتيال الوقود خسائرنا التشغيلية بشكل ملحوظ خلال الربع الأول من النشر."',
      'partners.t3.name': 'اسم العميل',
      'partners.t3.role': 'مدير العمليات، [المنظمة العميلة]',

      /* CONTACT */
      'contact.form.label': 'أرسل رسالة',
      'contact.form.title': 'كيف يمكننا مساعدتك؟',
      'contact.name': 'الاسم الكامل',
      'contact.email': 'البريد الإلكتروني للعمل',
      'contact.company': 'الشركة',
      'contact.topic': 'الموضوع',
      'contact.message': 'الرسالة',
      'contact.submit': 'إرسال الرسالة',
      'contact.email.title': 'البريد الإلكتروني',
      'contact.location.title': 'الموقع',
      'contact.careers.title': 'الوظائف',

      /* FOOTER */
      'footer.copyright': '© 2025 مجموعة تكنافريك كوانتم. جميع الحقوق محفوظة.',
    },
  };

  /* ── Language detection ─────────────────────────────────── */
  function detectLang() {
    var stored = localStorage.getItem('lang');
    if (stored && translations[stored]) return stored;
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('ar')) return 'ar';
    return 'en';
  }

  /* ── Apply translations ─────────────────────────────────── */
  function applyLang(lang) {
    var t = translations[lang] || translations.en;
    var dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    /* Update active lang button */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('lang-btn--active', btn.getAttribute('data-lang') === lang);
    });
  }

  /* ── Switcher ────────────────────────────────────────────── */
  function initSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        if (translations[lang]) {
          localStorage.setItem('lang', lang);
          applyLang(lang);
        }
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────── */
  var currentLang = detectLang();
  applyLang(currentLang);
  initSwitcher();
})();
