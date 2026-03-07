/* section-bg.js — scroll-driven background color transitions */
(function () {
  var light = window.matchMedia('(prefers-color-scheme: light)').matches;

  /* dark → military green → grey cycling per section */
  var darkColors = {
    hero:      '#000000',
    sectors:   '#0d1a0d',  /* dark military green */
    solutions: '#131313',
    about:     '#000000',
    partners:  '#0d1a0d',  /* dark military green */
    contact:   '#131313',
  };

  var lightColors = {
    hero:      '#f4f4f4',
    sectors:   '#edf2ed',  /* light military green tint */
    solutions: '#e8e8e8',
    about:     '#f4f4f4',
    partners:  '#edf2ed',
    contact:   '#e8e8e8',
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
