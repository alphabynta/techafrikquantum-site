/* bg-engine.js — animated background coordinator
   Per-section colours/behaviour live in ./bg-sections/*.js
   This file handles rendering; edit section files to customise each page. */

import heroConfig        from './bg-sections/hero.js';
import whoWeAreConfig    from './bg-sections/who-we-are.js';
import whatWeBuildConfig from './bg-sections/what-we-build.js';
import partnersConfig    from './bg-sections/partners.js';
import contactConfig     from './bg-sections/contact.js';

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* ── Section config map ─────────────────────────────────────── */
  const SECTION_CONFIGS = {
    hero:            heroConfig,
    'who-we-are':    whoWeAreConfig,
    'what-we-build': whatWeBuildConfig,
    partners:        partnersConfig,
    contact:         contactConfig,
  };

  let cfg = heroConfig; /* active config — updated by IntersectionObserver */
  let sectionSpeedMult = 1.0; /* per-section speed scale */

  /* ── Canvas resize ──────────────────────────────────────────── */
  const PARTICLE_COUNT = 40;
  const MAX_DIST = 160;
  const SAT_RGB        = '160,160,160';
  const DRONE_RGB      = '148,51,234';
  const GUINEA_DRONE_RGB = '245,165,36';
  const SPEED_MULT = window.innerWidth < 768 ? 0.35 : 1.0;
  let w, h;
  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }

  /* ── Particle ───────────────────────────────────────────────── */
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * w;
      this.y  = Math.random() * h;
      this.vx = (Math.random() - .5) * 0.6 * SPEED_MULT;
      this.vy = (Math.random() - .5) * 0.6 * SPEED_MULT;
      this.r  = Math.random() * 1.5 + .5;
    }
    update() {
      this.x += this.vx * sectionSpeedMult; this.y += this.vy * sectionSpeedMult;
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
      this.vx = -(Math.random() * 0.4 + 0.3) * SPEED_MULT; this.vy = (Math.random() - .5) * 0.3 * SPEED_MULT;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx * sectionSpeedMult; this.y += this.vy * sectionSpeedMult;
      if (this.x < -120) this.x = w + 120;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.92)`; ctx.fillStyle = `rgba(${SAT_RGB},0.38)`; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.rect(-10,-14,20,28); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-42,-6,28,12); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(14,-6,28,12); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.60)`; ctx.lineWidth = 0.7;
      for (let i = 1; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(-42+i*9.3,-6); ctx.lineTo(-42+i*9.3,6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(14+i*9.3,-6); ctx.lineTo(14+i*9.3,6); ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${SAT_RGB},0.92)`; ctx.lineWidth = 1.1;
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
      this.vx = -(Math.random() * 0.4 + 0.3) * SPEED_MULT; this.vy = (Math.random() - .5) * 0.3 * SPEED_MULT;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx * sectionSpeedMult; this.y += this.vy * sectionSpeedMult;
      if (this.x < -120) this.x = w + 120;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.92)`; ctx.fillStyle = `rgba(${SAT_RGB},0.38)`; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill(); ctx.stroke();
      [45,135,225,315].forEach(deg => {
        const r = deg * Math.PI / 180;
        ctx.beginPath(); ctx.moveTo(Math.cos(r)*12,Math.sin(r)*12); ctx.lineTo(Math.cos(r)*40,Math.sin(r)*40);
        ctx.strokeStyle = `rgba(${SAT_RGB},0.80)`; ctx.lineWidth = 1.0; ctx.stroke();
      });
      ctx.restore();
    }
  }

  /* ── Satellite type C — ISS ─────────────────────────────────── */
  class SatISS {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = -(Math.random() * 0.4 + 0.3) * SPEED_MULT; this.vy = (Math.random() - .5) * 0.3 * SPEED_MULT;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx * sectionSpeedMult; this.y += this.vy * sectionSpeedMult;
      if (this.x < -120) this.x = w + 120;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.92)`; ctx.fillStyle = `rgba(${SAT_RGB},0.38)`; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.rect(-52,-3,104,6); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-10,-8,20,16); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-6,-14,12,6); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(-6,8,12,6); ctx.fill(); ctx.stroke();
      [-52,-28,20,44].forEach(px => {
        ctx.beginPath(); ctx.rect(px,-18,20,15); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.rect(px,3,20,15); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = `rgba(${SAT_RGB},0.55)`; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(px+10,-18); ctx.lineTo(px+10,18); ctx.stroke();
        ctx.strokeStyle = `rgba(${SAT_RGB},0.92)`; ctx.lineWidth = 1.1;
      });
      ctx.restore();
    }
  }

  /* ── Satellite type D — CubeSat ─────────────────────────────── */
  class SatCubeSat {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = -(Math.random() * 0.4 + 0.3) * SPEED_MULT; this.vy = (Math.random() - .5) * 0.3 * SPEED_MULT;
      this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - .5) * 0.0001;
    }
    update() {
      this.x += this.vx * sectionSpeedMult; this.y += this.vy * sectionSpeedMult;
      if (this.x < -120) this.x = w + 120;
      if (this.y < 0 || this.y > h) this.vy *= -1;
      this.angle += this.spin;
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      ctx.strokeStyle = `rgba(${SAT_RGB},0.92)`; ctx.fillStyle = `rgba(${SAT_RGB},0.38)`; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.rect(-14,-14,28,28); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.55)`; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(14,0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-14); ctx.lineTo(0,14); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.92)`; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.rect(-46,-14,28,28); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(18,-14,28,28); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${SAT_RGB},0.55)`; ctx.lineWidth = 0.7;
      [-32,-23].forEach(px => { ctx.beginPath(); ctx.moveTo(px,-14); ctx.lineTo(px,14); ctx.stroke(); });
      [27,36].forEach(px => { ctx.beginPath(); ctx.moveTo(px,-14); ctx.lineTo(px,14); ctx.stroke(); });
      ctx.strokeStyle = `rgba(${SAT_RGB},0.80)`; ctx.lineWidth = 1.0;
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
        this.speed = 1.75 * SPEED_MULT;
        this.angle = Math.random() * Math.PI * 2;
        this.spin  = (Math.random() - .5) * 0.02;
      },
      update() {
        this.angle += this.spin;
        this.x += Math.cos(this.angle) * this.speed * sectionSpeedMult;
        this.y += Math.sin(this.angle) * this.speed * sectionSpeedMult;
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
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.92)`; ctx.fillStyle = `rgba(${DRONE_RGB},0.38)`; ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(28,0); ctx.bezierCurveTo(28,-5,16,-5,10,-5);
      ctx.lineTo(-22,-4); ctx.lineTo(-28,0); ctx.lineTo(-22,4); ctx.lineTo(10,5);
      ctx.bezierCurveTo(16,5,28,5,28,0); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(28,0,6,-Math.PI/2,Math.PI/2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8,-5); ctx.lineTo(4,-52); ctx.lineTo(-4,-52); ctx.lineTo(-8,-5); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8,5); ctx.lineTo(4,52); ctx.lineTo(-4,52); ctx.lineTo(-8,5); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-22,-4); ctx.lineTo(-38,-16); ctx.lineTo(-36,-4); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-22,4); ctx.lineTo(-38,16); ctx.lineTo(-36,4); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.65)`; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(4,0,4,Math.PI,0); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Drone type 2 — Military UCAV ───────────────────────────── */
  class DroneMilitary {
    constructor() { Object.assign(this, droneBase()); this.reset(); }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle); ctx.scale(0.5, 0.5);
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.92)`; ctx.fillStyle = `rgba(${DRONE_RGB},0.38)`; ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(26,0); ctx.lineTo(10,-6); ctx.lineTo(-10,-42); ctx.lineTo(-22,-40); ctx.lineTo(-20,-6);
      ctx.lineTo(-28,0); ctx.lineTo(-20,6); ctx.lineTo(-22,40); ctx.lineTo(-10,42); ctx.lineTo(10,6);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.60)`; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(26,0); ctx.lineTo(-28,0); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.92)`; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.moveTo(-20,-6); ctx.lineTo(-36,-18); ctx.lineTo(-34,-6); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-20,6); ctx.lineTo(-36,18); ctx.lineTo(-34,6); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${DRONE_RGB},0.80)`; ctx.lineWidth = 0.9;
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
      this.orbitRadius = 70;
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
      const rgb = GUINEA_DRONE_RGB;
      /* targeting circle at Guinea's center */
      const p = this._pos();
      ctx.beginPath();
      ctx.arc(p.x, p.y, this.orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb},0.25)`;
      ctx.lineWidth = 1; ctx.stroke();
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle); ctx.scale(0.8, 0.8);
      ctx.strokeStyle = `rgba(${rgb},1.00)`; ctx.fillStyle = `rgba(${rgb},0.45)`; ctx.lineWidth = 1.3;
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
          ctx.strokeStyle = `rgba(${cfg.rgb},${0.85 * (1 - d/MAX_DIST)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Signal links (drone ↔ satellite communication) ─────────── */
  const LINK_MAX_DIST = 380;
  var pingCircles  = [];
  var signalLinks  = [];
  var linkRebuildTimer = 0;

  function buildSignalLinks() {
    signalLinks = drones.map(function (drone) {
      var nearest = null, nearestDist = Infinity;
      satellites.forEach(function (sat) {
        var dx = sat.x - drone.x, dy = sat.y - drone.y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < nearestDist && d < LINK_MAX_DIST) { nearestDist = d; nearest = sat; }
      });
      return nearest ? { drone: drone, sat: nearest, packets: [], pingTimer: Math.floor(Math.random() * 120), satGlow: 0 } : null;
    }).filter(Boolean);
  }

  function updateSignalLinks() {
    linkRebuildTimer++;
    if (linkRebuildTimer > 180) { buildSignalLinks(); linkRebuildTimer = 0; }

    signalLinks.forEach(function (link) {
      var dx = link.sat.x - link.drone.x, dy = link.sat.y - link.drone.y;
      link.dist   = Math.sqrt(dx * dx + dy * dy);
      link.active = link.dist < LINK_MAX_DIST;

      link.packets = link.packets.filter(function (p) {
        p.t += 0.007 * sectionSpeedMult;
        if (p.t >= 1) {
          link.satGlow = 1;
          pingCircles.push({ x: link.sat.x, y: link.sat.y, r: 5, alpha: 0.75 });
          return false;
        }
        return true;
      });

      link.satGlow = Math.max(0, link.satGlow - 0.04);

      if (link.active) {
        link.pingTimer -= sectionSpeedMult;
        if (link.pingTimer <= 0) {
          link.packets.push({ t: 0 });
          link.pingTimer = 80 + Math.floor(Math.random() * 100);
          pingCircles.push({ x: link.drone.x, y: link.drone.y, r: 5, alpha: 0.55 });
        }
      }
    });

    pingCircles = pingCircles.filter(function (c) {
      c.r    += 1.4 * sectionSpeedMult;
      c.alpha -= 0.016;
      return c.alpha > 0;
    });
  }

  function drawSignalLinks() {
    var rgb = '160,160,160'; /* neutral grey for hero (no neuron rgb) */

    signalLinks.forEach(function (link) {
      if (!link.active) return;
      var dx   = link.sat.x - link.drone.x, dy = link.sat.y - link.drone.y;
      var fade = 1 - link.dist / LINK_MAX_DIST;

      /* dashed link line */
      ctx.save();
      ctx.setLineDash([4, 7]);
      ctx.beginPath();
      ctx.moveTo(link.drone.x, link.drone.y);
      ctx.lineTo(link.sat.x,   link.sat.y);
      ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.30 * fade) + ')';
      ctx.lineWidth = 0.7; ctx.stroke();
      ctx.restore();

      /* traveling signal packets */
      link.packets.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(link.drone.x + dx * p.t, link.drone.y + dy * p.t, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb + ',0.95)';
        ctx.fill();
      });

      /* satellite glow on receive */
      if (link.satGlow > 0.05) {
        ctx.save();
        ctx.shadowColor = 'rgba(' + rgb + ',' + link.satGlow + ')';
        ctx.shadowBlur  = 22;
        ctx.beginPath();
        ctx.arc(link.sat.x, link.sat.y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + rgb + ',' + (link.satGlow * 0.85) + ')';
        ctx.lineWidth = 1.5; ctx.stroke();
        ctx.restore();
      }
    });

    /* ping / handshake circles */
    pingCircles.forEach(function (c) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + rgb + ',' + c.alpha + ')';
      ctx.lineWidth = 1; ctx.stroke();
    });
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
  const pageBg = document.getElementById('page-bg');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && SECTION_CONFIGS[entry.target.id]) {
        cfg = SECTION_CONFIGS[entry.target.id];
        sectionSpeedMult = cfg.speedMult !== undefined ? cfg.speedMult : 1.0;
if (pageBg && cfg.bgColor) pageBg.style.backgroundColor = cfg.bgColor;
      }
    });
  }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });

  Object.keys(SECTION_CONFIGS).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  buildSignalLinks();
  window.addEventListener('resize', buildSignalLinks, { passive: true });

  /* ── Animate ────────────────────────────────────────────────── */
  function animate() {
    ctx.clearRect(0, 0, w, h);
    const showP = cfg.showParticles !== false;
    if (showP) particles.forEach(p => { p.update(); p.draw(); });
    else particles.forEach(p => p.update());
    if (showP && cfg.showLinks) drawLinks(particles);
    separateAll(satellites, 120, 0.645);
    if (cfg.showSatellites !== false) satellites.forEach(s => { s.update(); s.draw(); });
    else satellites.forEach(s => s.update());
    separateDrones(drones, 80);
    if (cfg.showDrones !== false) drones.forEach(d => { d.update(); d.draw(); });
    else drones.forEach(d => d.update());
    guineaDrone.update();
    if (cfg.showGuineaDrone !== false) guineaDrone.draw();
    if (cfg.showSignalLinks) { updateSignalLinks(); drawSignalLinks(); }
    requestAnimationFrame(animate);
  }
  animate();
})();
