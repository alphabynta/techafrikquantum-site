/* section-bg.js — scroll-driven background color transitions */
(function () {
  /* dark → amber → grey cycling per section */
  var colors = {
    hero:      '#000000',
    sectors:   '#1a0e00',
    solutions: '#131313',
    about:     '#000000',
    partners:  '#1a0e00',
    contact:   '#131313',
  };

  var bg = document.getElementById('page-bg');
  if (!bg) return;

  /* Set initial color immediately */
  bg.style.backgroundColor = colors.hero;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var color = colors[entry.target.id];
        if (color) bg.style.backgroundColor = color;
      }
    });
  }, {
    /* Trigger when the section occupies the middle 30% of the viewport */
    rootMargin: '-35% 0px -35% 0px',
    threshold: 0,
  });

  Object.keys(colors).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
