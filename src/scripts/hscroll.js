(function () {
  function initHScroll(section) {
    const cards = section.querySelector('.hscroll-cards');
    const bar = section.querySelector('.hscroll-bar');
    if (!cards) return;

    function update() {
      const rect = section.getBoundingClientRect();
      const totalScroll = section.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const maxX = cards.scrollWidth - window.innerWidth + 120;
      if (maxX > 0) {
        cards.style.transform = `translateX(-${progress * maxX}px)`;
      }
      if (bar) bar.style.width = `${progress * 100}%`;
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  function isMobile() { return window.innerWidth <= 768; }

  document.querySelectorAll('.hscroll-section').forEach(function (section) {
    if (!isMobile()) initHScroll(section);
  });
})();
