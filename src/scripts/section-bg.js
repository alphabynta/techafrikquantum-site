/* section-bg.js — scroll-driven background + particle color transitions */
(function () {

  /* Background colours per section */
  var bgColors = {
    hero:            '#000000',  /* pure black      */
    'who-we-are':    '#0d0900',  /* amber-warm dark */
    'what-we-build': '#050a02',  /* olive dark      */
    partners:        '#060608',  /* cool grey dark  */
    contact:         '#0d0d0d',  /* neutral dark    */
  };

  /* Sections whose background is light — needs dark text */
  var lightBg = {};

  var bg = document.getElementById('page-bg');
  if (!bg) return;

  var darkTokens = {
    '--text':    '#f0f0f2',
    '--muted':   '#808080',
    '--surface': '#0d0d0d',
    '--surface-2': '#111111',
    '--border':  '#2a2a2a',
    '--input-bg': '#111111',
    '--nav-scrolled-bg': 'rgba(0,0,0,0.92)',
  };
  var lightTokens = {
    '--text':    '#0d0d0d',
    '--muted':   '#505050',
    '--surface': '#eaeaea',
    '--surface-2': '#e0e0e0',
    '--border':  '#cccccc',
    '--input-bg': '#ffffff',
    '--nav-scrolled-bg': 'rgba(244,244,244,0.94)',
  };

  function applySection(id) {
    if (bgColors[id]) bg.style.backgroundColor = bgColors[id];
    var isLight = !!lightBg[id];
    document.body.setAttribute('data-bg-tone', isLight ? 'light' : 'dark');
    document.body.setAttribute('data-section', id);
    /* Set tokens directly on :root — overrides any @media preference */
    var tokens = isLight ? lightTokens : darkTokens;
    var root = document.documentElement;
    Object.keys(tokens).forEach(function (k) { root.style.setProperty(k, tokens[k]); });
  }

  /* Set initial values */
  applySection('hero');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) applySection(entry.target.id);
    });
  }, {
    rootMargin: '-35% 0px -35% 0px',
    threshold: 0,
  });

  Object.keys(bgColors).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
