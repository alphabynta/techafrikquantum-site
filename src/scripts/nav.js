(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  if (!header) return;

  /* Scroll state — transparent to frosted */
  window.addEventListener('scroll', function () {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
  }, { passive: true });

  /* Smooth scroll on nav link clicks */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        if (navList) navList.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* Active section highlight via IntersectionObserver */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* Mobile hamburger toggle */
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var open = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* Close nav when clicking outside on mobile */
  document.addEventListener('click', function (e) {
    if (navList && navList.classList.contains('is-open')) {
      if (!header.contains(e.target)) {
        navList.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
