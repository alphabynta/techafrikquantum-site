/* particles.js — full-page fixed particle network animation */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 90;
  const MAX_DIST = 160;
  const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const dotColor = isLight ? 'rgba(0,0,0,0.30)' : 'rgba(255,255,255,0.50)';
  const lineAlpha = isLight ? 0.06 : 0.09;
  const rgb = isLight ? '0,0,0' : '255,255,255';
  let particles = [];
  let w, h;

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.r = Math.random() * 1.5 + .5;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
    }
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb},${lineAlpha * (1 - d / MAX_DIST)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  animate();
})();
