/* section-bg.js — scroll-driven background + particle color transitions */
(function () {

  /* Background colours per section
   * Cycle: dark → white → dark-grey → olive → dark → white → …  */
  var bgColors = {
    hero:      '#0a0a0a',  /* dark        */
    sectors:   '#f2f2f2',  /* white       */
    solutions: '#1e1e1e',  /* dark grey   */
    about:     '#2d3d08',  /* olive green */
    partners:  '#0a0a0a',  /* dark        */
    contact:   '#f2f2f2',  /* white       */
  };

  /* Particle (neurone) RGB per section — matches contrast requirement */
  var particleRgb = {
    hero:      '245,165,36',   /* amber        */
    sectors:   '107,142,35',   /* olive green  */
    solutions: '255,120,20',   /* orange       */
    about:     '255,255,255',  /* white        */
    partners:  '255,255,255',  /* white        */
    contact:   '107,142,35',   /* olive green  */
  };

  var bg = document.getElementById('page-bg');
  if (!bg) return;

  /* Set initial values */
  bg.style.backgroundColor = bgColors.hero;
  window.__particleRgb = particleRgb.hero;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        if (bgColors[id])     bg.style.backgroundColor = bgColors[id];
        if (particleRgb[id])  window.__particleRgb = particleRgb[id];
      }
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
