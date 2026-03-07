/* particles.js — full-page fixed particle network animation + satellites */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 90;
  const SATELLITE_COUNT = 8;
  const MAX_DIST = 160;
  /* Colour is driven by section-bg.js via window.__particleRgb */
  function getRgb() { return window.__particleRgb || '245,165,36'; }
  const DRONE_RGB = '148,51,234'; /* purple — fixed regardless of section */
  const SAT_RGB   = '160,160,160';  /* grey — fixed regardless of section */
  let particles = [];
  let satellites = [];
  let drones = [];
  let w, h;

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .175;
      this.vy = (Math.random() - .5) * .175;
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

  /* ── Satellite type A — Classic comsat ─────────────────────── */
  class SatComsat {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .0875;
      this.vy = (Math.random() - .5) * .0875;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - .5) * 0.001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      const rgb = SAT_RGB;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.fillStyle   = 'rgba(' + rgb + ',0.18)';
      ctx.lineWidth   = 0.9;
      /* cylindrical body */
      ctx.beginPath();
      ctx.rect(-10, -14, 20, 28);
      ctx.fill(); ctx.stroke();
      /* solar wings */
      ctx.beginPath(); ctx.rect(-42, -6, 28, 12); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(14,  -6, 28, 12); ctx.fill(); ctx.stroke();
      /* panel divider lines */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.35)';
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(-42 + i * 9.3, -6); ctx.lineTo(-42 + i * 9.3, 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(14  + i * 9.3, -6); ctx.lineTo(14  + i * 9.3, 6); ctx.stroke();
      }
      /* dish antenna */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(0, -14, 10, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, -24); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Satellite type B — Sputnik ─────────────────────────────── */
  class SatSputnik {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .0875;
      this.vy = (Math.random() - .5) * .0875;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - .5) * 0.001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      const rgb = SAT_RGB;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.fillStyle   = 'rgba(' + rgb + ',0.18)';
      ctx.lineWidth   = 0.9;
      /* sphere body */
      ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      /* 4 antenna spikes at 45° intervals */
      const spikes = [45, 135, 225, 315];
      spikes.forEach(function(deg) {
        const rad = deg * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * 12, Math.sin(rad) * 12);
        ctx.lineTo(Math.cos(rad) * 40, Math.sin(rad) * 40);
        ctx.strokeStyle = 'rgba(' + rgb + ',0.55)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      ctx.restore();
    }
  }

  /* ── Satellite type C — ISS-style ───────────────────────────── */
  class SatISS {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .0875;
      this.vy = (Math.random() - .5) * .0875;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - .5) * 0.001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      const rgb = SAT_RGB;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.fillStyle   = 'rgba(' + rgb + ',0.18)';
      ctx.lineWidth   = 0.9;
      /* central truss */
      ctx.beginPath(); ctx.rect(-52, -3, 104, 6); ctx.fill(); ctx.stroke();
      /* module cluster at center */
      ctx.beginPath(); ctx.rect(-10, -8, 20, 16); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-6,  -14, 12, 6);  ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-6,  8,   12, 6);  ctx.fill(); ctx.stroke();
      /* 4 solar panel segments — 2 each side */
      const panels = [-52, -28, 20, 44];
      panels.forEach(function(px) {
        ctx.beginPath(); ctx.rect(px, -18, 20, 15); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.rect(px,   3, 20, 15); ctx.fill(); ctx.stroke();
        /* panel divider */
        ctx.strokeStyle = 'rgba(' + rgb + ',0.30)';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(px + 10, -18); ctx.lineTo(px + 10, 18); ctx.stroke();
        ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
        ctx.lineWidth = 0.9;
      });
      ctx.restore();
    }
  }

  /* ── Satellite type D — CubeSat ─────────────────────────────── */
  class SatCubeSat {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .0875;
      this.vy = (Math.random() - .5) * .0875;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - .5) * 0.001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      const rgb = SAT_RGB;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.fillStyle   = 'rgba(' + rgb + ',0.18)';
      ctx.lineWidth   = 0.9;
      /* square body */
      ctx.beginPath(); ctx.rect(-14, -14, 28, 28); ctx.fill(); ctx.stroke();
      /* cross detail on face */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.30)';
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, 14); ctx.stroke();
      /* flat open solar panels — book-cover style */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.rect(-46, -14, 28, 28); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect( 18, -14, 28, 28); ctx.fill(); ctx.stroke();
      /* panel grid */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.30)';
      ctx.lineWidth = 0.5;
      [-32, -23].forEach(function(px) {
        ctx.beginPath(); ctx.moveTo(px, -14); ctx.lineTo(px, 14); ctx.stroke();
      });
      [18+9, 18+18].forEach(function(px) {
        ctx.beginPath(); ctx.moveTo(px, -14); ctx.lineTo(px, 14); ctx.stroke();
      });
      /* antenna nub on corner */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.55)';
      ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(14, -14); ctx.lineTo(22, -22); ctx.stroke();
      ctx.beginPath(); ctx.arc(22, -22, 2, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Drone base mixin ───────────────────────────────────────── */
  function droneBase() {
    return {
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - .5) * .35;
        this.vy = (Math.random() - .5) * .35;
        this.angle = Math.random() * Math.PI * 2;
        this.spin  = (Math.random() - .5) * 0.004;
      },
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
        this.angle += this.spin;
      },
    };
  }

  /* ── Drone type 1 — ISR (Global Hawk style) ─────────────────── */
  /* Top-down: long slender fuselage, very high-aspect straight wings,
     bulbous sensor nose, twin-boom V-tail */
  class DroneISR {
    constructor() { Object.assign(this, droneBase()); this.reset(); }
    draw() {
      const rgb = DRONE_RGB;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(0.5, 0.5);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.fillStyle   = 'rgba(' + rgb + ',0.18)';
      ctx.lineWidth   = 0.9;

      /* fuselage — long thin shape */
      ctx.beginPath();
      ctx.moveTo(28, 0);           /* nose tip */
      ctx.bezierCurveTo(28, -5,  16, -5,  10, -5);
      ctx.lineTo(-22, -4);
      ctx.lineTo(-28, 0);          /* tail tip */
      ctx.lineTo(-22,  4);
      ctx.lineTo(10,   5);
      ctx.bezierCurveTo(16, 5,  28, 5, 28, 0);
      ctx.fill(); ctx.stroke();

      /* bulbous sensor nose dome */
      ctx.beginPath();
      ctx.arc(28, 0, 6, -Math.PI/2, Math.PI/2);
      ctx.fill(); ctx.stroke();

      /* high-aspect straight wings — span ~100px */
      ctx.beginPath();
      ctx.moveTo(8,  -5);
      ctx.lineTo(4,  -52);
      ctx.lineTo(-4, -52);
      ctx.lineTo(-8, -5);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8,   5);
      ctx.lineTo(4,   52);
      ctx.lineTo(-4,  52);
      ctx.lineTo(-8,  5);
      ctx.fill(); ctx.stroke();

      /* V-tail — two angled fins at rear */
      ctx.beginPath();
      ctx.moveTo(-22, -4);
      ctx.lineTo(-38, -16);
      ctx.lineTo(-36, -4);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-22,  4);
      ctx.lineTo(-38,  16);
      ctx.lineTo(-36,  4);
      ctx.fill(); ctx.stroke();

      /* engine intake on top (center) */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.40)';
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.arc(4, 0, 4, Math.PI, 0); ctx.stroke();

      ctx.restore();
    }
  }

  /* ── Drone type 2 — Military UCAV (Reaper / stealth style) ──── */
  /* Top-down: swept delta wings, angular faceted fuselage,
     inverted V-tail, weapons pylons under wings */
  class DroneMilitary {
    constructor() { Object.assign(this, droneBase()); this.reset(); }
    draw() {
      const rgb = DRONE_RGB;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(0.5, 0.5);
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.fillStyle   = 'rgba(' + rgb + ',0.18)';
      ctx.lineWidth   = 0.9;

      /* main swept-wing body — flying wing delta */
      ctx.beginPath();
      ctx.moveTo(26,  0);    /* nose */
      ctx.lineTo(10, -6);
      ctx.lineTo(-10, -42);  /* left wingtip */
      ctx.lineTo(-22, -40);
      ctx.lineTo(-20, -6);
      ctx.lineTo(-28,  0);   /* tail notch */
      ctx.lineTo(-20,  6);
      ctx.lineTo(-22,  40);
      ctx.lineTo(-10,  42);  /* right wingtip */
      ctx.lineTo(10,   6);
      ctx.closePath();
      ctx.fill(); ctx.stroke();

      /* angular fuselage spine */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.35)';
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(-28, 0); ctx.stroke();

      /* inverted-V tail fins */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.70)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(-20, -6); ctx.lineTo(-36, -18); ctx.lineTo(-34, -6);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-20,  6); ctx.lineTo(-36,  18); ctx.lineTo(-34,  6);
      ctx.fill(); ctx.stroke();

      /* weapons pylons — small rectangles under each wing */
      ctx.strokeStyle = 'rgba(' + rgb + ',0.55)';
      ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.rect(-2, -28, 14, 4); ctx.stroke();
      ctx.beginPath(); ctx.rect(-2,  24, 14, 4); ctx.stroke();
      /* missile tips */
      ctx.beginPath(); ctx.moveTo(12, -26); ctx.lineTo(18, -26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12,  26); ctx.lineTo(18,  26); ctx.stroke();

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
    drones.forEach(d => { d.update(); d.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  particles  = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  satellites = [
    new SatComsat(), new SatComsat(),
    new SatSputnik(), new SatSputnik(),
    new SatISS(),     new SatISS(),
    new SatCubeSat(), new SatCubeSat(),
  ];
  drones = [
    new DroneISR(),      new DroneISR(),      new DroneISR(),
    new DroneMilitary(), new DroneMilitary(), new DroneMilitary(),
  ];
  animate();
})();
