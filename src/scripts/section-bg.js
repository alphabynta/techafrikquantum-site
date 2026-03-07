/* section-bg.js — scroll-driven background color transitions */
(function () {
  var light = window.matchMedia('(prefers-color-scheme: light)').matches;

  /* dark → amber → grey → olive drab cycling */
  var darkColors = {
    hero:      '#050505',  /* dark */
    sectors:   '#3a2000',  /* amber */
    solutions: '#1c1c1c',  /* grey */
    about:     '#1c2a02',  /* olive drab */
    partners:  '#3a2000',  /* amber */
    contact:   '#1c1c1c',  /* grey */
  };

  var lightColors = {
    hero:      '#f5f5f5',  /* light */
    sectors:   '#fdf0d0',  /* amber tint */
    solutions: '#ebebeb',  /* grey */
    about:     '#e8f2d4',  /* olive drab tint */
    partners:  '#fdf0d0',  /* amber tint */
    contact:   '#ebebeb',  /* grey */
  };

  var colors = light ? lightColors : darkColors;

  var bg = document.getElementById('page-bg');
  if (!bg) return;

  bg.style.backgroundColor = colors.hero;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var color = colors[entry.target.id];
        if (color) bg.style.backgroundColor = color;
      }
    });
  }, {
    rootMargin: '-35% 0px -35% 0px',
    threshold: 0,
  });

  Object.keys(colors).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
