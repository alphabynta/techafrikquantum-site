/* section-bg.js — scroll-driven background + particle color transitions */
(function () {

  /* Background colours per section
   * Cycle: dark → white → dark-grey → olive → dark → white → … */
  var bgColors = {
    hero:      '#0a0a0a',  /* dark        */
    sectors:   '#f2f2f2',  /* white       */
    solutions: '#1e1e1e',  /* dark grey   */
    about:     '#2d3d08',  /* olive green */
    partners:  '#0a0a0a',  /* dark        */
    contact:   '#f2f2f2',  /* white       */
  };

  /* Sections whose background is light — needs dark text */
  var lightBg = { sectors: true, contact: true };

  /* Particle (neurone) RGB per section */
  var particleRgb = {
    hero:      '245,165,36',   /* amber       */
    sectors:   '107,142,35',   /* olive green */
    solutions: '255,120,20',   /* orange      */
    about:     '255,255,255',  /* white       */
    partners:  '255,255,255',  /* white       */
    contact:   '107,142,35',   /* olive green */
  };

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
    if (bgColors[id])    bg.style.backgroundColor = bgColors[id];
    if (particleRgb[id]) window.__particleRgb = particleRgb[id];
    var isLight = !!lightBg[id];
    document.body.setAttribute('data-bg-tone', isLight ? 'light' : 'dark');
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
