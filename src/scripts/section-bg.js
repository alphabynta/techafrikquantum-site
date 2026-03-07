/* section-bg.js — scroll-driven background + particle color transitions */
(function () {

  /* Background colours per section
   * Cycle: dark → white → dark-grey → olive → dark → white → … */
  var bgColors = {
    hero:      '#0a0a0a',  /* dark        */
    sectors:   '#f2f2f2',  /* white       */
    solutions: '#1e1e1e',  /* dark grey   */
    about:     '#0a0a0a',  /* dark        */
    partners:  '#0a0a0a',  /* dark        */
    contact:   '#f2f2f2',  /* white       */
  };

  /* Sections whose background is light — needs dark text */
  var lightBg = { sectors: true, contact: true };

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
