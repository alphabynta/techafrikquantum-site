(function () {
  function initHScroll(section) {
    var cards = section.querySelector('.hscroll-cards');
    var bar = section.querySelector('.hscroll-bar');
    if (!cards) return;

    var current = 0;
    var target = 0;
    var rafId = null;

    function maxTravel() {
      return Math.max(0, cards.scrollWidth - window.innerWidth);
    }

    function setHeight() {
      var travel = maxTravel();
      section.style.height = (window.innerHeight + travel) + 'px';
    }

    function computeTarget() {
      var rect = section.getBoundingClientRect();
      var totalScroll = section.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return 0;
      var progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      return progress * maxTravel();
    }

    function tick() {
      target = computeTarget();
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) current = target;

      cards.style.transform = 'translateX(-' + current + 'px)';

      if (bar) {
        var travel = maxTravel();
        bar.style.width = (travel > 0 ? (current / travel) * 100 : 0) + '%';
      }

      if (Math.abs(target - current) > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function requestTick() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', function () {
      setHeight();
      requestTick();
    }, { passive: true });

    setHeight();
    requestTick();
  }

  function isMobile() { return window.innerWidth <= 768; }

  document.querySelectorAll('.hscroll-section').forEach(function (section) {
    if (!isMobile()) initHScroll(section);
  });
})();
