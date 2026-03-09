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
      'hero.sub': 'Mission-critical surveillance, secure connectivity, advanced cybersecurity, and intelligent fleet management — from Africa to the world.',
      'hero.cta2': 'Contact Us',

      /* WHO WE ARE */
      'whoweare.label': 'Who We Are',
      'whoweare.title': 'WHO WE ARE',
      'whoweare.intro': "TechAfrik is one of West Africa's fastest-growing system integrators — evolved from a specialized fleet management and fuel monitoring company into a multi-platform integrator. Our mission is to empower governments, enterprises, and security forces with world-class technology — with a vision to become West Africa's most trusted partner for defense, security, and connectivity. We are guided by reliability, integrity, excellence, and long-term partnership in everything we deliver.",

      /* SECTORS */
      'defgov.label': 'Defense & Government',
      'defgov.title': 'Defense & Government',
      'defgov.body': 'From tactical ISR and encrypted field communications to smart city infrastructure, governance frameworks, and remote education platforms — we equip defense forces and public institutions with technology built for reliability under pressure.',
      'defgov.li1': 'Tactical surveillance & ISR drone integration',
      'defgov.li2': 'Encrypted military-grade communications',
      'defgov.li3': 'Public safety & smart city infrastructure',
      'defgov.li4': 'Governance, risk & compliance frameworks',
      'defgov.li5': 'Remote Education (E-learning)',

      'enterprise.label': 'Enterprise',
      'enterprise.title': 'Enterprise',
      'enterprise.body': 'We equip enterprises with the tools to stay secure, operationally efficient, and customer-ready — from cybersecurity and fleet management to CRM systems that drive revenue.',
      'enterprise.li1': 'SOC onboarding & IAM implementation',
      'enterprise.li2': 'Fleet & assets tracking for operations',
      'enterprise.li3': 'Customer Relationship Management (CRM) Systems',

      'oilgas.label': 'Oil & Gas',
      'oilgas.title': 'Oil & Gas',
      'oilgas.body': 'Remote sites, offshore platforms, and pipeline corridors demand connectivity and safety systems that work without exception.',
      'oilgas.li1': 'Satellite & radio connectivity for remote sites',
      'oilgas.li2': 'Perimeter intrusion detection for critical assets',
      'oilgas.li3': 'Fleet tracking & fuel anti-fraud systems',

      'cellular.label': 'Cellular & Mobility',
      'cellular.title': 'Cellular & Mobility',
      'cellular.body': 'We deliver QoS and traffic engineering for cellular networks, and provide fleet connectivity, tracking, and safety solutions to transport operators across West Africa.',
      'cellular.li1': 'QoS & traffic engineering for carrier-grade networks',
      'cellular.li3': 'QoS & traffic engineering for carrier-grade networks',

      'mobility.label': 'Mobility',
      'mobility.title': 'Mobility',
      'mobility.body': 'Transport operators, logistics companies, and national fleets rely on our mobility solutions to reduce costs, improve safety, and gain operational visibility.',
      'mobility.li1': 'Real-time GPS fleet tracking & geofencing',
      'mobility.li2': 'Driver behavior scoring & safety compliance',
      'mobility.li3': 'Route optimization & fuel efficiency analytics',

      /* SOLUTIONS */
      'solutions.intro': 'From defense networks to enterprise infrastructure — we engineer secure, resilient, and always-on IT & telecommunications solutions across every sector we serve.',
      'safety.label': 'Safety & Surveillance',
      'safety.title': 'Safety & Surveillance',
      'safety.body': 'Integrated camera networks, drone monitoring, and analytics platforms that give your security team total situational awareness — day and night, indoors and outdoors.',
      'safety.li1': 'ISR drone integration & airspace monitoring',
      'safety.li2': 'Mobile Ad Hoc Networking Systems (MANET)',
      'safety.li3': 'IP CCTV & thermal imaging networks',
      'safety.li4': 'AI-assisted video analytics & alerting',

      'connectivity.label': 'Connectivity',
      'connectivity.title': 'Connectivity',
      'connectivity.body': 'When your operation cannot afford downtime, we engineer redundant, multi-path connectivity solutions — from satellite links to microwave backhaul — designed for mission-critical environments.',
      'connectivity.li1': 'Sites interconnection over Satellite',
      'connectivity.li2': 'Satellite on the Move (SOTM)',
      'connectivity.li3': 'Satellite on the Pause (SOTP)',
      'connectivity.li4': 'Site to site Microwave links',
      'connectivity.li5': 'Radio Communication',
      'connectivity.li6': 'Network telemetry, SLA monitoring & NOC support',

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
      'about.ceo.label': 'Leadership — TechAfrik',

      /* PARTNERS */
      'partners.tech.label': 'Technology Partners',
      'partners.tech.title': 'Our Partners',
      'partners.testimonials.label': 'What They Say',
      'partners.testimonials.title': 'Testimonials',
      'partners.t1.body': '"TechAfrik delivered a fully integrated surveillance and connectivity solution under a tight deadline. Their local support team made the difference."',
      'partners.t1.name': 'Client Name',
      'partners.t1.role': 'CTO, [Client Organization]',
      'partners.t2.body': '"Their cybersecurity assessment identified critical gaps in our infrastructure. The SOC onboarding process was professional and thorough."',
      'partners.t2.name': 'Client Name',
      'partners.t2.role': 'Head of IT Security, [Client Organization]',
      'partners.t3.body': '"The fleet tracking and fuel anti-fraud system reduced our operational losses significantly within the first quarter of deployment."',
      'partners.t3.name': 'Client Name',
      'partners.t3.role': 'Operations Director, [Client Organization]',
      'partners.t4.body': '"TechAfrik redesigned our entire WAN infrastructure across three sites. The transition was seamless, and network uptime has been exceptional ever since."',
      'partners.t4.name': 'Client Name',
      'partners.t4.role': 'IT Director, [Client Organization]',

      /* CONTACT */
      'contact.form.label': 'Leave Us a Message',
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
      'footer.copyright': '© 2025 TechAfrik. All rights reserved.',
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
      'hero.sub': "Surveillance de qualité défense, connectivité critique, cybersécurité et gestion intelligente de flotte à travers l'Afrique de l'Ouest.",
      'hero.cta2': 'Nous Contacter',

      /* WHO WE ARE */
      'whoweare.label': 'Qui Nous Sommes',
      'whoweare.title': 'QUI NOUS SOMMES',
      'whoweare.intro': "TechAfrik est l'un des intégrateurs de systèmes à la croissance la plus rapide en Afrique de l'Ouest — né d'une entreprise spécialisée dans la gestion de flotte et la surveillance du niveau de carburant, devenu un intégrateur multi-plateformes. Notre mission est d'autonomiser les gouvernements, les entreprises et les forces de sécurité avec des solutions technologiques de classe mondiale — avec la vision de devenir le partenaire le plus fiable d'Afrique de l'Ouest pour la défense, la sécurité et la connectivité. Nous sommes guidés par la fiabilité, l'intégrité, l'excellence et le partenariat à long terme dans tout ce que nous faisons.",

      /* SECTORS */
      'defgov.label': 'Défense & Gouvernement',
      'defgov.title': 'Défense & Gouvernement',
      'defgov.body': "De l'ISR tactique et des communications chiffrées de terrain aux infrastructures de villes intelligentes, aux cadres de gouvernance et aux plateformes d'éducation à distance — nous équipons les forces de défense et les institutions publiques avec des technologies conçues pour la fiabilité sous pression.",
      'defgov.li1': 'Surveillance tactique & intégration drone ISR',
      'defgov.li2': 'Communications militaires chiffrées',
      'defgov.li3': 'Sécurité publique & infrastructure ville intelligente',
      'defgov.li4': 'Cadres de gouvernance, risque & conformité',
      'defgov.li5': 'Éducation à distance (E-learning)',

      'enterprise.label': 'Entreprise',
      'enterprise.title': 'Entreprise',
      'enterprise.body': "Nous équipons les entreprises pour rester sécurisées, efficaces et orientées client — de la cybersécurité et la gestion de flotte aux systèmes CRM qui génèrent de la valeur.",
      'enterprise.li1': 'Intégration SOC & mise en œuvre IAM',
      'enterprise.li2': 'Suivi de flotte & gestion des actifs opérationnels',
      'enterprise.li3': 'Systèmes de gestion de la relation client (CRM)',

      'oilgas.label': 'Pétrole & Gaz',
      'oilgas.title': 'Pétrole & Gaz',
      'oilgas.body': "Les sites distants, plateformes offshore et corridors de pipelines exigent des systèmes de connectivité et de sécurité qui fonctionnent sans exception.",
      'oilgas.li1': 'Connectivité satellite & radio pour sites distants',
      'oilgas.li2': "Détection d'intrusion périmétrique pour actifs critiques",
      'oilgas.li3': 'Suivi de flotte & systèmes anti-fraude carburant',

      'cellular.label': 'Cellulaire & Mobilité',
      'cellular.title': 'Cellulaire & Mobilité',
      'cellular.body': "Nous assurons la qualité de service et l'ingénierie du trafic pour les réseaux cellulaires, et fournissons des solutions de connectivité, suivi et sécurité des flottes aux opérateurs de transport en Afrique de l'Ouest.",
      'cellular.li1': 'QoS & ingénierie du trafic pour réseaux carrier-grade',
      'cellular.li3': 'QoS & ingénierie du trafic pour réseaux opérateurs',

      'mobility.label': 'Mobilité',
      'mobility.title': 'Mobilité',
      'mobility.body': "Les transporteurs, sociétés de logistique et flottes nationales s'appuient sur nos solutions de mobilité pour réduire les coûts, améliorer la sécurité et gagner en visibilité opérationnelle.",
      'mobility.li1': 'Suivi GPS de flotte en temps réel & géofencing',
      'mobility.li2': 'Scoring comportement conducteur & conformité sécurité',
      'mobility.li3': "Optimisation des itinéraires & analyse d'efficacité carburant",

      /* SOLUTIONS */
      'solutions.intro': "Des réseaux de défense aux infrastructures d'entreprise — nous concevons des solutions IT & télécommunications sécurisées, résilientes et toujours disponibles dans chaque secteur que nous servons.",
      'safety.label': 'Sécurité & Surveillance',
      'safety.title': 'Sécurité & Surveillance',
      'safety.body': "Réseaux de caméras intégrés, surveillance par drone et plateformes analytiques offrant à votre équipe de sécurité une conscience situationnelle totale — jour et nuit, intérieur et extérieur.",
      'safety.li1': "Intégration drone ISR & surveillance de l'espace aérien",
      'safety.li2': 'Systèmes de réseaux ad hoc mobiles (MANET)',
      'safety.li3': 'Réseaux CCTV IP & imagerie thermique',
      'safety.li4': 'Vidéo analytique assistée par IA & alertes',

      'connectivity.label': 'Connectivité',
      'connectivity.title': 'Connectivité',
      'connectivity.body': "Quand votre opération ne peut pas se permettre d'interruption, nous concevons des solutions de connectivité redondantes — des liaisons satellite aux faisceaux hertziens — pour environnements critiques.",
      'connectivity.li1': 'Interconnexion de sites par satellite',
      'connectivity.li2': 'Satellite en mouvement (SOTM)',
      'connectivity.li3': 'Satellite à l\'arrêt (SOTP)',
      'connectivity.li4': 'Liaisons micro-ondes site à site',
      'connectivity.li5': 'Communication Radio',
      'connectivity.li6': 'Télémétrie réseau, monitoring SLA & support NOC',

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
      'about.ceo.label': 'Direction — TechAfrik',

      /* PARTNERS */
      'partners.tech.label': 'Partenaires Technologiques',
      'partners.tech.title': 'Nos Partenaires',
      'partners.testimonials.label': 'Ce Qu\'ils Disent',
      'partners.testimonials.title': 'Témoignages Clients',
      'partners.t1.body': '"TechAfrik a livré une solution intégrée de surveillance et connectivité dans des délais serrés. Leur équipe locale de support a fait la différence."',
      'partners.t1.name': 'Nom du Client',
      'partners.t1.role': 'CTO, [Organisation Cliente]',
      'partners.t2.body': '"Leur audit de cybersécurité a identifié des failles critiques dans notre infrastructure. Le processus d\'intégration SOC était professionnel et minutieux."',
      'partners.t2.name': 'Nom du Client',
      'partners.t2.role': 'Responsable Sécurité IT, [Organisation Cliente]',
      'partners.t3.body': '"Le système de suivi de flotte et d\'anti-fraude carburant a significativement réduit nos pertes opérationnelles dès le premier trimestre de déploiement."',
      'partners.t3.name': 'Nom du Client',
      'partners.t3.role': 'Directeur des Opérations, [Organisation Cliente]',
      'partners.t4.body': '"TechAfrik a repensé l\'intégralité de notre infrastructure WAN sur trois sites. La transition a été transparente et la disponibilité du réseau est exemplaire depuis lors."',
      'partners.t4.name': 'Nom du Client',
      'partners.t4.role': 'Directeur IT, [Organisation Cliente]',

      /* CONTACT */
      'contact.form.label': 'Laissez-Nous un Message',
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
      'footer.copyright': '© 2025 TechAfrik. Tous droits réservés.',
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
      'hero.cta2': 'تواصل معنا',

      /* WHO WE ARE */
      'whoweare.label': 'من نحن',
      'whoweare.title': 'من نحن',
      'whoweare.intro': 'تعدّ مجموعة تيكافريك كوانتم من أسرع شركات تكامل الأنظمة نموًا في غرب أفريقيا — انطلقت من شركة متخصصة في إدارة الأسطول ومراقبة مستوى الوقود، لتتحول إلى مُدمج متعدد المنصات. مهمتنا تمكين الحكومات والمؤسسات وقوات الأمن بحلول تكنولوجية عالمية — برؤية أن نصبح الشريك الأكثر ثقة في غرب أفريقيا للدفاع والأمن والاتصال. نسترشد بالموثوقية والنزاهة والتميز والشراكة طويلة الأمد في كل ما نقدمه.',

      /* SECTORS */
      'defgov.label': 'الدفاع والحكومة',
      'defgov.title': 'الدفاع والحكومة',
      'defgov.body': 'من ISR التكتيكي والاتصالات الميدانية المشفرة إلى بنية المدن الذكية وأطر الحوكمة ومنصات التعليم عن بُعد — نزوّد قوات الدفاع والمؤسسات العامة بتكنولوجيا مصممة للموثوقية تحت الضغط.',
      'defgov.li1': 'مراقبة تكتيكية وتكامل طائرات ISR بدون طيار',
      'defgov.li2': 'اتصالات عسكرية مشفرة',
      'defgov.li3': 'السلامة العامة وبنية المدن الذكية',
      'defgov.li4': 'أطر الحوكمة والمخاطر والامتثال',
      'defgov.li5': 'التعليم عن بُعد (التعلم الإلكتروني)',

      'enterprise.label': 'المؤسسات',
      'enterprise.title': 'المؤسسات',
      'enterprise.body': 'نزوّد المؤسسات بالأدوات للبقاء آمنة وفعّالة تشغيلياً وجاهزة للعملاء — من الأمن السيبراني وإدارة الأسطول إلى أنظمة CRM التي تدفع النمو.',
      'enterprise.li1': 'تأهيل SOC وتنفيذ IAM',
      'enterprise.li2': 'تتبع الأسطول وإدارة أصول العمليات',
      'enterprise.li3': 'أنظمة إدارة علاقات العملاء (CRM)',

      'oilgas.label': 'النفط والغاز',
      'oilgas.title': 'النفط والغاز',
      'oilgas.body': 'تتطلب المواقع النائية والمنصات البحرية وممرات خطوط الأنابيب أنظمة اتصال وسلامة تعمل دون استثناء.',
      'oilgas.li1': 'اتصال ساتلي وراديوي للمواقع النائية',
      'oilgas.li2': 'كشف التسلل المحيطي للأصول الحيوية',
      'oilgas.li3': 'تتبع الأسطول وأنظمة مكافحة الاحتيال في الوقود',

      'cellular.label': 'الخلوي',
      'cellular.title': 'الخلوي',
      'cellular.body': 'نقدم جودة الخدمة وهندسة حركة البيانات لشبكات الاتصالات الخلوية، ونوفر حلول اتصال وتتبع وسلامة الأسطول لمشغلي النقل في غرب أفريقيا.',
      'cellular.li1': 'جودة الخدمة وهندسة حركة البيانات لشبكات المشغلين',
      'cellular.li3': 'جودة الخدمة وهندسة حركة المرور لشبكات الناقلين',

      'mobility.label': 'المتنقلة',
      'mobility.title': 'المتنقلة',
      'mobility.body': 'يعتمد مشغلو النقل وشركات الخدمات اللوجستية والأساطيل الوطنية على حلول التنقل لدينا لتقليل التكاليف وتحسين السلامة.',
      'mobility.li1': 'تتبع أسطول GPS في الوقت الفعلي والسياج الجغرافي',
      'mobility.li2': 'تسجيل سلوك السائق والامتثال للسلامة',
      'mobility.li3': 'تحسين المسار وتحليلات كفاءة الوقود',

      /* SOLUTIONS */
      'solutions.intro': 'من شبكات الدفاع إلى البنية التحتية للمؤسسات — نهندس حلول تكنولوجيا المعلومات والاتصالات الآمنة والمرنة ودائمة التوفر في كل قطاع نخدمه.',
      'safety.label': 'السلامة والمراقبة',
      'safety.title': 'السلامة والمراقبة',
      'safety.body': 'شبكات كاميرا متكاملة ومراقبة بالطائرات المسيّرة ومنصات تحليلية تمنح فريق الأمن لديك وعياً كاملاً بالموقف.',
      'safety.li1': 'تكامل طائرات ISR ومراقبة المجال الجوي',
      'safety.li2': 'أنظمة الشبكات المتنقلة المخصصة (MANET)',
      'safety.li3': 'شبكات CCTV IP والتصوير الحراري',
      'safety.li4': 'تحليل فيديو بمساعدة الذكاء الاصطناعي والتنبيه',

      'connectivity.label': 'الاتصال',
      'connectivity.title': 'الاتصال',
      'connectivity.body': 'عندما لا تتحمل عمليتك أي انقطاع، نصمم حلول اتصال زائدة — من روابط الأقمار الصناعية إلى الميكروويف — للبيئات الحيوية.',
      'connectivity.li1': 'ربط المواقع عبر الأقمار الصناعية',
      'connectivity.li2': 'الأقمار الصناعية أثناء الحركة (SOTM)',
      'connectivity.li3': 'الأقمار الصناعية عند التوقف (SOTP)',
      'connectivity.li4': 'روابط الميكروويف بين المواقع',
      'connectivity.li5': 'الاتصالات الراديوية',
      'connectivity.li6': 'قياس الشبكة ومراقبة SLA ودعم NOC',

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
      'partners.t4.body': '"أعادت مجموعة تيكافريك كوانتم تصميم بنية الشبكة الواسعة بالكامل عبر ثلاثة مواقع. كان الانتقال سلساً، وظلّت نسبة تشغيل الشبكة استثنائية منذ ذلك الحين."',
      'partners.t4.name': 'اسم العميل',
      'partners.t4.role': 'مدير تكنولوجيا المعلومات، [المنظمة العميلة]',

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

  /* ── Language detection (browser/OS setting) ────────────── */
  function detectLang() {
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

  /* ── Init ────────────────────────────────────────────────── */
  applyLang(detectLang());
})();
