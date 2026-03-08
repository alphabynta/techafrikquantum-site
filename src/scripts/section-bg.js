/* section-bg.js — scroll-driven background color interpolation */
(function () {

  /* Background colour per section — edit each independently */
  var bgColors = {
    hero:            '#000000',
    'who-we-are':    '#222222',
    'what-we-build': '#c8c8c8',
    partners:        '#f5f0e8',
    contact:         '#ffffff',
  };

  /* Sections whose background is light — needs dark text/tokens */
  var lightBg = { 'what-we-build': true, partners: true, contact: true };

  var bg = document.getElementById('page-bg');
  if (!bg) return;

  var nav = document.querySelector('.site-header');

  /* Disable CSS transition — we drive color manually on every scroll frame */
  bg.style.transition = 'none';
  if (nav) nav.style.transition = 'none';

  var darkTokens = {
    '--text':    '#f0f0f2',
    '--muted':   '#b0b0b0',
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

  /* ── Colour helpers ───────────────────────────────────────── */
  function hexToRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
  }

  function lerpColor(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    var ra = hexToRgb(a), rb = hexToRgb(b);
    return 'rgb(' +
      Math.round(ra[0] + (rb[0] - ra[0]) * t) + ',' +
      Math.round(ra[1] + (rb[1] - ra[1]) * t) + ',' +
      Math.round(ra[2] + (rb[2] - ra[2]) * t) + ')';
  }

  /* ── Token swap ───────────────────────────────────────────── */
  var activeSection = '';
  function applySection(id) {
    if (activeSection === id) return;
    activeSection = id;
    var isLight = !!lightBg[id];
    document.body.setAttribute('data-bg-tone', isLight ? 'light' : 'dark');
    document.body.setAttribute('data-section', id);
    var tokens = isLight ? lightTokens : darkTokens;
    var root = document.documentElement;
    Object.keys(tokens).forEach(function (k) { root.style.setProperty(k, tokens[k]); });
  }

  /* ── Section list ─────────────────────────────────────────── */
  var keys = Object.keys(bgColors);
  var sections = [];

  function buildSections() {
    sections = keys.map(function (id) {
      return { id: id, el: document.getElementById(id) };
    }).filter(function (s) { return !!s.el; });
  }

  /* ── Scroll update ────────────────────────────────────────── */
  /* Transition zone: color lerps over this many px as section enters viewport */
  var ZONE = window.innerWidth < 768 ? 500 : 300;

  function update() {
    var vh = window.innerHeight;
    var center = window.scrollY + vh * 0.5;

    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      var rect = s.el.getBoundingClientRect();
      var top = rect.top + window.scrollY;
      var bottom = rect.bottom + window.scrollY;

      if (center >= top && center < bottom) {
        var colorA = i > 0 ? bgColors[sections[i - 1].id] : bgColors[s.id];
        var colorB = bgColors[s.id];
        var t = Math.min(1, (center - top) / ZONE);

        var lerpedColor = lerpColor(colorA, colorB, t);
        bg.style.backgroundColor = lerpedColor;

        /* Nav follows the same interpolated color with opacity */
        if (nav) {
          var rgb = hexToRgb(colorA);
          var rgb2 = hexToRgb(colorB);
          var r = Math.round(rgb[0] + (rgb2[0] - rgb[0]) * t);
          var g = Math.round(rgb[1] + (rgb2[1] - rgb[1]) * t);
          var b = Math.round(rgb[2] + (rgb2[2] - rgb[2]) * t);
          nav.style.backgroundColor = 'rgba(' + r + ',' + g + ',' + b + ',0.88)';
        }

        /* Swap text tokens at the midpoint of the transition */
        applySection(t >= 0.5 ? s.id : (i > 0 ? sections[i - 1].id : s.id));
        return;
      }
    }
  }

  /* ── Init ─────────────────────────────────────────────────── */
  buildSections();
  applySection(keys[0]);
  bg.style.backgroundColor = bgColors[keys[0]];
  if (nav) nav.style.backgroundColor = 'rgba(0,0,0,0.88)';

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', function () {
    buildSections();
    update();
  }, { passive: true });

  update();
})();
