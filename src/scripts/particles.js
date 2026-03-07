/* particles.js — full-page fixed particle network animation + satellites */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 90;
  const SATELLITE_COUNT = 6;
  const MAX_DIST = 160;
  /* Colour is driven by section-bg.js via window.__particleRgb */
  function getRgb() { return window.__particleRgb || '245,165,36'; }
  let particles = [];
  let satellites = [];
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
      ctx.fillStyle = 'rgba(' + getRgb() + ',0.80)';
      ctx.fill();
    }
  }

  class Satellite {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * w;
      this.y  = Math.random() * h;
      /* same speed range as particles */
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      /* random tilt angle, rotates slowly */
      this.angle    = Math.random() * Math.PI * 2;
      this.spin     = (Math.random() - .5) * 0.004;
      /* body half-sizes */
      this.bw = 5; /* half-width of body */
      this.bh = 3; /* half-height of body */
      /* panel dimensions */
      this.pw = 8; /* panel width */
      this.ph = 2; /* panel height */
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      const rgb = getRgb();
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.fillStyle   = 'rgba(' + rgb + ',0.18)';
      ctx.lineWidth   = 0.8;

      /* body */
      ctx.beginPath();
      ctx.rect(-this.bw, -this.bh, this.bw * 2, this.bh * 2);
      ctx.fill();
      ctx.stroke();

      /* left solar panel */
      ctx.beginPath();
      ctx.rect(-this.bw - this.pw - 1, -this.ph, this.pw, this.ph * 2);
      ctx.fill();
      ctx.stroke();

      /* right solar panel */
      ctx.beginPath();
      ctx.rect(this.bw + 1, -this.ph, this.pw, this.ph * 2);
      ctx.fill();
      ctx.stroke();

      /* antenna — short line from top of body */
      ctx.beginPath();
      ctx.moveTo(0, -this.bh);
      ctx.lineTo(0, -this.bh - 4);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.55)';
      ctx.stroke();

      ctx.restore();
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
          ctx.strokeStyle = 'rgba(' + getRgb() + ',' + (0.55 * (1 - d / MAX_DIST)) + ')';
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
    satellites.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  particles  = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  satellites = Array.from({ length: SATELLITE_COUNT }, () => new Satellite());
  animate();
})();
