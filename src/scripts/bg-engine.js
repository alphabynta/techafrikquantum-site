/* bg-engine.js — animated background coordinator
   Per-section colours/behaviour live in ./bg-sections/*.js
   This file handles rendering; edit section files to customise each page. */

import heroConfig     from './bg-sections/hero.js';
import sectorsConfig  from './bg-sections/sectors.js';
import solutionsConfig from './bg-sections/solutions.js';
import aboutConfig    from './bg-sections/about.js';
import partnersConfig from './bg-sections/partners.js';
import contactConfig  from './bg-sections/contact.js';

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* ── Section config map ─────────────────────────────────────── */
  const SECTION_CONFIGS = {
    hero:      heroConfig,
    sectors:   sectorsConfig,
    solutions: solutionsConfig,
    about:     aboutConfig,
    partners:  partnersConfig,
    contact:   contactConfig,
  };

  let cfg = heroConfig; /* active config — updated by IntersectionObserver */

  /* ── Canvas resize ──────────────────────────────────────────── */
  const PARTICLE_COUNT = 90;
  const MAX_DIST = 160;
  const SAT_RGB   = '160,160,160';
  const DRONE_RGB = '148,51,234';
  let w, h;
  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }

  /* ── Particle ───────────────────────────────────────────────── */
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * w;
      this.y  = Math.random() * h;
      this.vx = (Math.random() - .5) * .175;
      this.vy = (Math.random() - .5) * .175;
      this.r  = Math.random() * 1.5 + .5;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cfg.rgb},${cfg.particleAlpha})`;
      ctx.fill();
    }
  }

  /* ── Satellite type A — Comsat ──────────────────────────────── */
  class SatComsat {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .00875; this.vy = (Math.random() - .5) * .00875;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.70)`; ctx.fillStyle = `rgba(${SAT_RGB},0.18)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.rect(-10,-14,20,28); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-42,-6,28,12); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(14,-6,28,12); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.35)`; ctx.lineWidth = 0.5;
      for (let i = 1; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(-42+i*9.3,-6); ctx.lineTo(-42+i*9.3,6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(14+i*9.3,-6); ctx.lineTo(14+i*9.3,6); ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${SAT_RGB},0.70)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.arc(0,-14,10,Math.PI,0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-14); ctx.lineTo(0,-24); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Satellite type B — Sputnik ─────────────────────────────── */
  class SatSputnik {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .00875; this.vy = (Math.random() - .5) * .00875;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.70)`; ctx.fillStyle = `rgba(${SAT_RGB},0.18)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill(); ctx.stroke();
      [45,135,225,315].forEach(deg => {
        const r = deg * Math.PI / 180;
        ctx.beginPath(); ctx.moveTo(Math.cos(r)*12,Math.sin(r)*12); ctx.lineTo(Math.cos(r)*40,Math.sin(r)*40);
        ctx.strokeStyle = `rgba(${SAT_RGB},0.55)`; ctx.lineWidth = 0.8; ctx.stroke();
      });
      ctx.restore();
    }
  }

  /* ── Satellite type C — ISS ─────────────────────────────────── */
  class SatISS {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .00875; this.vy = (Math.random() - .5) * .00875;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.70)`; ctx.fillStyle = `rgba(${SAT_RGB},0.18)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.rect(-52,-3,104,6); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-10,-8,20,16); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-6,-14,12,6); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-6,8,12,6); ctx.fill(); ctx.stroke();
      [-52,-28,20,44].forEach(px => {
        ctx.beginPath(); ctx.rect(px,-18,20,15); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.rect(px,3,20,15); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = `rgba(${SAT_RGB},0.30)`; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(px+10,-18); ctx.lineTo(px+10,18); ctx.stroke();
        ctx.strokeStyle = `rgba(${SAT_RGB},0.70)`; ctx.lineWidth = 0.9;
      });
      ctx.restore();
    }
  }

  /* ── Satellite type D — CubeSat ─────────────────────────────── */
  class SatCubeSat {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .00875; this.vy = (Math.random() - .5) * .00875;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.70)`; ctx.fillStyle = `rgba(${SAT_RGB},0.18)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.rect(-14,-14,28,28); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.30)`; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(14,0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-14); ctx.lineTo(0,14); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.70)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.rect(-46,-14,28,28); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(18,-14,28,28); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.30)`; ctx.lineWidth = 0.5;
      [-32,-23].forEach(px => { ctx.beginPath(); ctx.moveTo(px,-14); ctx.lineTo(px,14); ctx.stroke(); });
      [27,36].forEach(px => { ctx.beginPath(); ctx.moveTo(px,-14); ctx.lineTo(px,14); ctx.stroke(); });
      ctx.strokeStyle = `rgba(${SAT_RGB},0.55)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(14,-14); ctx.lineTo(22,-22); ctx.stroke();
      ctx.beginPath(); ctx.arc(22,-22,2,0,Math.PI*2); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Drone base ─────────────────────────────────────────────── */
  function droneBase() {
    return {
      reset() {
        this.x = Math.random() * w; this.y = Math.random() * h;
        this.speed = 1.75;
        this.angle = Math.random() * Math.PI * 2;
        this.spin  = (Math.random() - .5) * 0.02;
      },
      update() {
        this.angle += this.spin;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x < 0) { this.x = 0; this.angle = Math.PI - this.angle; }
        if (this.x > w) { this.x = w; this.angle = Math.PI - this.angle; }
        if (this.y < 0) { this.y = 0; this.angle = -this.angle; }
        if (this.y > h) { this.y = h; this.angle = -this.angle; }
      },
    };
  }

  /* ── Drone type 1 — ISR ─────────────────────────────────────── */
  class DroneISR {
    constructor() { Object.assign(this, droneBase()); this.reset(); }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle); ctx.scale(0.5, 0.5);
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.70)`; ctx.fillStyle = `rgba(${DRONE_RGB},0.18)`; ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(28,0); ctx.bezierCurveTo(28,-5,16,-5,10,-5);
      ctx.lineTo(-22,-4); ctx.lineTo(-28,0); ctx.lineTo(-22,4); ctx.lineTo(10,5);
      ctx.bezierCurveTo(16,5,28,5,28,0); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(28,0,6,-Math.PI/2,Math.PI/2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8,-5); ctx.lineTo(4,-52); ctx.lineTo(-4,-52); ctx.lineTo(-8,-5); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8,5); ctx.lineTo(4,52); ctx.lineTo(-4,52); ctx.lineTo(-8,5); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-22,-4); ctx.lineTo(-38,-16); ctx.lineTo(-36,-4); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-22,4); ctx.lineTo(-38,16); ctx.lineTo(-36,4); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.40)`; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.arc(4,0,4,Math.PI,0); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Drone type 2 — Military UCAV ───────────────────────────── */
  class DroneMilitary {
    constructor() { Object.assign(this, droneBase()); this.reset(); }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle); ctx.scale(0.5, 0.5);
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.70)`; ctx.fillStyle = `rgba(${DRONE_RGB},0.18)`; ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(26,0); ctx.lineTo(10,-6); ctx.lineTo(-10,-42); ctx.lineTo(-22,-40); ctx.lineTo(-20,-6);
      ctx.lineTo(-28,0); ctx.lineTo(-20,6); ctx.lineTo(-22,40); ctx.lineTo(-10,42); ctx.lineTo(10,6);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.35)`; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(26,0); ctx.lineTo(-28,0); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.70)`; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(-20,-6); ctx.lineTo(-36,-18); ctx.lineTo(-34,-6); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-20,6); ctx.lineTo(-36,18); ctx.lineTo(-34,6); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.55)`; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.rect(-2,-28,14,4); ctx.stroke();
      ctx.beginPath(); ctx.rect(-2,24,14,4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12,-26); ctx.lineTo(18,-26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12,26); ctx.lineTo(18,26); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Guinea patrol drone — always orbits Guinea on the map ──── */
  class DroneGuinea {
    constructor() {
      this.orbitAngle = 0;
      this.orbitSpeed = 0.008;
      this.orbitRadius = 50;
      const p = this._pos();
      this.x = p.x + this.orbitRadius;
      this.y = p.y;
      this.angle = Math.PI / 2;
    }
    _pos() {
      /* globe.js exposes Guinea's exact canvas coordinates each frame */
      const gc = document.getElementById('globe-canvas');
      if (!gc) return { x: w / 2, y: h / 2 };
      const r  = gc.getBoundingClientRect();
      const cx = window.__guineaCanvasX != null ? window.__guineaCanvasX : 1200;
      const cy = window.__guineaCanvasY != null ? window.__guineaCanvasY : 233;
      return {
        x: r.left + (cx / 2400) * r.width,
        y: r.top  + (cy / 1200) * r.height,
      };
    }
    update() {
      const p  = this._pos();
      const px = this.x, py = this.y;
      this.orbitAngle += this.orbitSpeed;
      this.x = p.x + Math.cos(this.orbitAngle) * this.orbitRadius;
      this.y = p.y + Math.sin(this.orbitAngle) * this.orbitRadius;
      this.angle = Math.atan2(this.y - py, this.x - px);
    }
    draw() {
      const rgb = DRONE_RGB;
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle); ctx.scale(0.5, 0.5);
      ctx.strokeStyle = `rgba(${rgb},0.90)`; ctx.fillStyle = `rgba(${rgb},0.28)`; ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(26,0); ctx.lineTo(10,-6); ctx.lineTo(-10,-42); ctx.lineTo(-22,-40); ctx.lineTo(-20,-6);
      ctx.lineTo(-28,0); ctx.lineTo(-20,6); ctx.lineTo(-22,40); ctx.lineTo(-10,42); ctx.lineTo(10,6);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${rgb},0.45)`; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(26,0); ctx.lineTo(-28,0); ctx.stroke();
      ctx.strokeStyle = `rgba(${rgb},0.90)`; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.moveTo(-20,-6); ctx.lineTo(-36,-18); ctx.lineTo(-34,-6); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-20,6);  ctx.lineTo(-36,18);  ctx.lineTo(-34,6);  ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${rgb},0.70)`; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.rect(-2,-28,14,4); ctx.stroke();
      ctx.beginPath(); ctx.rect(-2,24,14,4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12,-26); ctx.lineTo(18,-26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12,26);  ctx.lineTo(18,26);  ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Separation helpers ─────────────────────────────────────── */
  function separateAll(entities, minDist, maxSpeed) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const dx = entities[i].x - entities[j].x;
        const dy = entities[i].y - entities[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < minDist && d > 0) {
          const force = (minDist - d) / minDist * 0.5;
          const fx = (dx/d)*force, fy = (dy/d)*force;
          entities[i].vx += fx; entities[i].vy += fy;
          entities[j].vx -= fx; entities[j].vy -= fy;
          [entities[i], entities[j]].forEach(function (e) {
            const spd = Math.sqrt(e.vx*e.vx + e.vy*e.vy);
            if (spd > maxSpeed) { e.vx = e.vx/spd*maxSpeed; e.vy = e.vy/spd*maxSpeed; }
          });
        }
      }
    }
  }

  function shortAngleDiff(target, current) {
    let d = target - current;
    while (d >  Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    return d;
  }

  function separateDrones(drones, minDist) {
    for (let i = 0; i < drones.length; i++) {
      for (let j = i + 1; j < drones.length; j++) {
        const dx = drones[i].x - drones[j].x;
        const dy = drones[i].y - drones[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < minDist && d > 0) {
          const force = (minDist - d) / minDist * 0.15;
          drones[i].angle += shortAngleDiff(Math.atan2(dy, dx),   drones[i].angle) * force;
          drones[j].angle += shortAngleDiff(Math.atan2(-dy, -dx), drones[j].angle) * force;
        }
      }
    }
  }

  /* ── Links ──────────────────────────────────────────────────── */
  function drawLinks(particles) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${cfg.rgb},${0.55 * (1 - d/MAX_DIST)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Init entities ──────────────────────────────────────────── */
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  const satellites = [
    new SatComsat(), new SatComsat(),
    new SatSputnik(), new SatSputnik(),
    new SatISS(),     new SatISS(),
    new SatCubeSat(), new SatCubeSat(),
  ];
  const drones = [
    new DroneISR(),      new DroneISR(),      new DroneISR(),
    new DroneMilitary(), new DroneMilitary(), new DroneMilitary(),
  ];
  const guineaDrone = new DroneGuinea();

  /* ── Section observer ───────────────────────────────────────── */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && SECTION_CONFIGS[entry.target.id]) {
        cfg = SECTION_CONFIGS[entry.target.id];
      }
    });
  }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });

  Object.keys(SECTION_CONFIGS).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  /* ── Animate ────────────────────────────────────────────────── */
  function animate() {
    ctx.clearRect(0, 0, w, h);
    const showP = cfg.showParticles !== false;
    if (showP) particles.forEach(p => { p.update(); p.draw(); });
    else particles.forEach(p => p.update());
    if (showP && cfg.showLinks) drawLinks(particles);
    separateAll(satellites, 120, 0.00875);
    satellites.forEach(s => { s.update(); s.draw(); });
    separateDrones(drones, 80);
    drones.forEach(d => { d.update(); d.draw(); });
    guineaDrone.update(); guineaDrone.draw();
    requestAnimationFrame(animate);
  }
  animate();
})();
