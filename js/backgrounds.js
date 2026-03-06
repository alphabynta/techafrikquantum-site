/**
 * Techafrik Quantum Group — Themed Canvas Backgrounds
 * Scenes: drones | cyber | network | fleet | comms
 */
(function () {
  'use strict';

  const rand  = (a, b) => Math.random() * (b - a) + a;
  const rInt  = (a, b) => Math.floor(rand(a, b));
  const lerp  = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const TAU   = Math.PI * 2;

  /* ── Resize helper ─────────────────────────────────────────── */
  function setupCanvas(canvas) {
    function resize() {
      const p = canvas.parentElement;
      canvas.width  = p.offsetWidth  || window.innerWidth;
      canvas.height = p.offsetHeight || window.innerHeight;
    }
    resize();
    if (window.ResizeObserver) {
      new ResizeObserver(resize).observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resize);
    }
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: DRONES  — Tactical radar sweep + drone blips
     Used: home hero, safety section
  ══════════════════════════════════════════════════════════════ */
  function sceneDrones(canvas) {
    const ctx = canvas.getContext('2d');
    let angle = -Math.PI / 2;
    const SWEEP_DEG = 100 * (Math.PI / 180);

    /* blips */
    function mkBlip() {
      return {
        r: rand(0.12, 0.88),   /* fraction of radar radius */
        a: rand(0, TAU),
        va: rand(-0.0006, 0.0006),
        born: angle,            /* sweep angle when born   */
        life: rInt(300, 700)
      };
    }
    const blips = Array.from({ length: 7 }, mkBlip);
    let frame = 0;

    function draw() {
      const W = canvas.width, H = canvas.height;
      const cx = W * 0.5, cy = H * 0.5;
      const R  = Math.min(W, H) * 0.40;

      /* dark clear */
      ctx.fillStyle = 'rgba(2,6,8,0.18)';
      ctx.fillRect(0, 0, W, H);

      /* tactical grid */
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,229,160,0.05)';
      for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      /* radar rings */
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, R * i / 4, 0, TAU);
        ctx.strokeStyle = 'rgba(0,229,160,0.14)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* crosshairs */
      ctx.strokeStyle = 'rgba(0,229,160,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();

      /* sweep fill */
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, angle - SWEEP_DEG, angle);
      ctx.closePath();
      const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      sg.addColorStop(0, 'rgba(0,229,160,0)');
      sg.addColorStop(1, 'rgba(0,229,160,0.20)');
      ctx.fillStyle = sg;
      ctx.fill();
      ctx.restore();

      /* sweep arm */
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
      ctx.strokeStyle = 'rgba(0,229,160,0.85)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00e5a0';
      ctx.shadowBlur  = 10;
      ctx.stroke();
      ctx.restore();

      /* center dot */
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, TAU);
      ctx.fillStyle = '#00e5a0';
      ctx.shadowColor = '#00e5a0'; ctx.shadowBlur = 14;
      ctx.fill(); ctx.shadowBlur = 0;

      /* blips */
      blips.forEach((b, i) => {
        b.a += b.va;
        b.life--;
        if (b.life <= 0) blips[i] = mkBlip();

        const bx = cx + Math.cos(b.a) * b.r * R;
        const by = cy + Math.sin(b.a) * b.r * R;

        /* angular distance since sweep last passed */
        let dA = ((b.a - angle) % TAU + TAU) % TAU;
        const visible = dA < SWEEP_DEG || dA > TAU * 0.98;
        const alpha   = visible ? 1 : clamp(1 - (dA / SWEEP_DEG) * 0.8, 0.05, 1);

        /* blip body */
        ctx.beginPath();
        ctx.arc(bx, by, 4, 0, TAU);
        ctx.fillStyle   = `rgba(245,165,36,${alpha})`;
        ctx.shadowColor = '#f5a524';
        ctx.shadowBlur  = visible ? 18 : 6;
        ctx.fill(); ctx.shadowBlur = 0;

        /* drone cross */
        ctx.strokeStyle = `rgba(245,165,36,${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(bx - 9, by); ctx.lineTo(bx + 9, by); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx, by - 9); ctx.lineTo(bx, by + 9); ctx.stroke();
      });

      /* HUD readouts */
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(0,229,160,0.5)';
      ctx.fillText('MODE: SCAN', 14, 20);
      ctx.fillText(`HDG: ${String(Math.round(((angle % TAU + TAU) % TAU) * 180 / Math.PI)).padStart(3,'0')}°`, 14, 34);
      ctx.fillText(`TGT: ${blips.length.toString().padStart(2,'0')}`, 14, 48);
      ctx.fillText(`ALT: ${String(rInt(200, 250))}m`, 14, 62);

      /* right-side readout */
      ctx.fillText('LINK: ENCRYPTED', W - 120, 20);
      ctx.fillText('FREQ: 4.8 GHz', W - 120, 34);

      angle += 0.014;
      frame++;
      requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#020608';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: CYBER  — Matrix rain + hex scan
     Used: cybersecurity section
  ══════════════════════════════════════════════════════════════ */
  function sceneCyber(canvas) {
    const ctx = canvas.getContext('2d');
    const CHARS = '01アイウエカキクケサシスセタチツテナニABCDEF0123456789!@#$%^&*<>?';

    function mkCols(W) {
      const cols = Math.floor(W / 14);
      return Array.from({ length: cols }, () => ({
        y: rand(0, 60),
        speed: rand(0.3, 1.2),
        bright: Math.random() > 0.85
      }));
    }

    let drops = mkCols(canvas.width);
    let lastW  = canvas.width;
    let scanY  = 0;

    function draw() {
      const W = canvas.width, H = canvas.height;
      if (W !== lastW) { drops = mkCols(W); lastW = W; }

      ctx.fillStyle = 'rgba(2,6,8,0.10)';
      ctx.fillRect(0, 0, W, H);

      drops.forEach((d, i) => {
        const ch = CHARS[rInt(0, CHARS.length)];
        const x  = i * 14;
        const y  = d.y * 14;

        /* lead glyph */
        ctx.fillStyle   = d.bright ? '#fff' : '#00e5a0';
        ctx.shadowColor = '#00e5a0';
        ctx.shadowBlur  = d.bright ? 16 : 6;
        ctx.font = `${d.bright ? '13px' : '12px'} monospace`;
        ctx.fillText(ch, x, y);
        ctx.shadowBlur = 0;

        /* trail */
        ctx.fillStyle = 'rgba(0,229,160,0.28)';
        ctx.font = '11px monospace';
        ctx.fillText(CHARS[rInt(0, CHARS.length)], x, y - 14);
        ctx.fillStyle = 'rgba(0,229,160,0.1)';
        ctx.fillText(CHARS[rInt(0, CHARS.length)], x, y - 28);

        d.y += d.speed;
        if (d.y * 14 > H && Math.random() > 0.97) { d.y = 0; d.speed = rand(0.3, 1.2); }
      });

      /* horizontal scan line */
      scanY = (scanY + 1.2) % H;
      ctx.fillStyle = 'rgba(0,229,160,0.05)';
      ctx.fillRect(0, scanY, W, 2);

      /* breach/encrypt labels */
      if (Math.random() < 0.004) {
        const labels = ['ENCRYPTED', 'BREACH ATTEMPT', 'HASH VERIFIED', 'AUTH TOKEN', 'SOC ALERT', 'FIREWALL OK'];
        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(245,165,36,0.7)';
        ctx.fillText(labels[rInt(0, labels.length)], rInt(20, W - 160), rInt(20, H - 20));
      }

      requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#020608';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: NETWORK  — Floating nodes + data packets
     Used: IP Networks section, solutions hero, contact
  ══════════════════════════════════════════════════════════════ */
  function sceneNetwork(canvas) {
    const ctx = canvas.getContext('2d');

    function mkNodes(W, H) {
      const n = Math.min(60, Math.max(20, Math.floor(W * H / 14000)));
      return Array.from({ length: n }, () => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
        r: rand(2, 4.5),
        gold: Math.random() > 0.72
      }));
    }

    let nodes   = mkNodes(canvas.width, canvas.height);
    let packets = [];
    let lastW   = canvas.width;

    function spawnPacket(nodes, W, H) {
      const DIST = Math.min(W, H) * 0.3;
      const a = nodes[rInt(0, nodes.length)];
      const b = nodes[rInt(0, nodes.length)];
      if (a === b) return;
      if (Math.hypot(b.x - a.x, b.y - a.y) > DIST) return;
      packets.push({ sx: a.x, sy: a.y, tx: b.x, ty: b.y, t: 0, gold: a.gold });
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      if (W !== lastW) { nodes = mkNodes(W, H); lastW = W; }
      const DIST = Math.min(W, H) * 0.30;

      ctx.fillStyle = 'rgba(2,6,8,0.14)';
      ctx.fillRect(0, 0, W, H);

      /* grid */
      ctx.strokeStyle = 'rgba(0,229,160,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      /* edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y);
          if (d < DIST) {
            const a = (1 - d / DIST) * 0.32;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,229,160,${a})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      /* packets */
      if (Math.random() < 0.05) spawnPacket(nodes, W, H);
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t = Math.min(p.t + 0.022, 1);
        const px = lerp(p.sx, p.tx, p.t);
        const py = lerp(p.sy, p.ty, p.t);
        const col = p.gold ? '#f5a524' : '#00e5a0';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, TAU);
        ctx.fillStyle   = col;
        ctx.shadowColor = col; ctx.shadowBlur = 10;
        ctx.fill(); ctx.shadowBlur = 0;
        if (p.t >= 1) packets.splice(i, 1);
      }

      /* nodes */
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const col = n.gold ? '#f5a524' : '#00e5a0';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, TAU);
        ctx.fillStyle   = col;
        ctx.shadowColor = col; ctx.shadowBlur = 12;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#020608';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: FLEET  — Tactical map with moving vehicles + GPS pings
     Used: assets management section, partners hero
  ══════════════════════════════════════════════════════════════ */
  function sceneFleet(canvas) {
    const ctx = canvas.getContext('2d');

    function mkVehicles(W, H) {
      return Array.from({ length: 9 }, () => ({
        x: rand(40, W - 40), y: rand(40, H - 40),
        tx: rand(40, W - 40), ty: rand(40, H - 40),
        speed: rand(0.4, 1.0),
        trail: [],
        gold: Math.random() > 0.5,
        pingR: 0, pinging: false
      }));
    }

    let vehicles = mkVehicles(canvas.width, canvas.height);
    let lastW = canvas.width;

    function draw() {
      const W = canvas.width, H = canvas.height;
      if (W !== lastW) { vehicles = mkVehicles(W, H); lastW = W; }

      ctx.fillStyle = 'rgba(2,6,8,0.12)';
      ctx.fillRect(0, 0, W, H);

      /* tactical grid */
      ctx.strokeStyle = 'rgba(0,229,160,0.07)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      /* grid labels */
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(0,229,160,0.2)';
      ['A','B','C','D','E','F'].forEach((l, i) => ctx.fillText(l, i * 60 + 4, 12));
      [1,2,3,4,5,6].forEach((n, i) => ctx.fillText(n, 4, i * 60 + 52));

      vehicles.forEach(v => {
        const dx = v.tx - v.x, dy = v.ty - v.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 6) {
          v.tx = rand(40, W - 40);
          v.ty = rand(40, H - 40);
          v.pinging = true; v.pingR = 0;
        }
        const spd = Math.min(v.speed, dist);
        v.x += (dx / dist) * spd;
        v.y += (dy / dist) * spd;

        /* dashed route */
        ctx.save();
        ctx.setLineDash([5, 9]);
        ctx.beginPath(); ctx.moveTo(v.x, v.y); ctx.lineTo(v.tx, v.ty);
        ctx.strokeStyle = 'rgba(245,165,36,0.18)'; ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        /* trail */
        v.trail.push({ x: v.x, y: v.y });
        if (v.trail.length > 45) v.trail.shift();
        for (let i = 1; i < v.trail.length; i++) {
          const a = (i / v.trail.length) * 0.55;
          const col = v.gold ? `rgba(245,165,36,${a})` : `rgba(0,229,160,${a})`;
          ctx.beginPath();
          ctx.moveTo(v.trail[i-1].x, v.trail[i-1].y);
          ctx.lineTo(v.trail[i].x, v.trail[i].y);
          ctx.strokeStyle = col; ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        /* GPS ping ring */
        if (v.pinging) {
          ctx.beginPath();
          ctx.arc(v.x, v.y, v.pingR, 0, TAU);
          ctx.strokeStyle = `rgba(0,229,160,${Math.max(0, 0.7 - v.pingR / 50)})`;
          ctx.lineWidth = 1.2; ctx.stroke();
          v.pingR += 1.0;
          if (v.pingR > 50) v.pinging = false;
        }

        /* vehicle dot */
        const col = v.gold ? '#f5a524' : '#00e5a0';
        ctx.beginPath(); ctx.arc(v.x, v.y, 5, 0, TAU);
        ctx.fillStyle = col;
        ctx.shadowColor = col; ctx.shadowBlur = 16;
        ctx.fill(); ctx.shadowBlur = 0;

        /* direction arrow */
        const ang = Math.atan2(dy, dx);
        ctx.save();
        ctx.translate(v.x, v.y); ctx.rotate(ang);
        ctx.beginPath(); ctx.moveTo(9,0); ctx.lineTo(-4,-4); ctx.lineTo(-4,4); ctx.closePath();
        ctx.fillStyle = col; ctx.fill();
        ctx.restore();
      });

      /* HUD */
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(0,229,160,0.5)';
      ctx.fillText(`VEHICLES: ${vehicles.length.toString().padStart(2,'0')}`, 14, H - 30);
      ctx.fillText('TRACKING: LIVE', 14, H - 18);
      ctx.fillText('GPS LOCK: OK', W - 100, H - 18);

      requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#020608';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: COMMS  — Satellite orbit + radio wave propagation
     Used: connectivity section, about/partners hero
  ══════════════════════════════════════════════════════════════ */
  function sceneComms(canvas) {
    const ctx = canvas.getContext('2d');
    let t = 0;
    let frame = 0;
    const rings = [];

    function getSources(W, H) {
      return [
        { x: W * 0.18, y: H * 0.72, type: 'tower', col: '#f5a524' },
        { x: W * 0.50, y: H * 0.08, type: 'satellite', col: '#00e5a0', orbitA: 0 },
        { x: W * 0.82, y: H * 0.68, type: 'tower', col: '#f5a524' },
        { x: W * 0.75, y: H * 0.15, type: 'drone', col: '#f5a524' }
      ];
    }

    function spawnRing(src) {
      rings.push({
        x: src.x, y: src.y,
        r: 6,
        maxR: rand(70, 150),
        sp: rand(0.9, 1.6),
        a: 0.7,
        col: src.col
      });
    }

    let lastW = canvas.width;
    let sources = getSources(canvas.width, canvas.height);

    function drawWave(a, b, t, col) {
      const segs = 24;
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const tt = i / segs;
        const x  = lerp(a.x, b.x, tt);
        const y  = lerp(a.y, b.y, tt) + Math.sin(tt * Math.PI * 5 + t) * 10;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    function drawSatellite(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.strokeStyle = s.col; ctx.lineWidth = 1.5;
      ctx.shadowColor = s.col; ctx.shadowBlur = 10;
      /* body */
      ctx.strokeRect(-6, -4, 12, 8);
      /* solar panels */
      ctx.beginPath(); ctx.moveTo(-16, -2); ctx.lineTo(-6, -2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-16,  2); ctx.lineTo(-6,  2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(  6, -2); ctx.lineTo(16, -2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(  6,  2); ctx.lineTo(16,  2); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function drawTower(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.strokeStyle = s.col; ctx.lineWidth = 2;
      ctx.shadowColor = s.col; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-7, -8); ctx.lineTo(7, -8); ctx.stroke();
      ctx.shadowBlur = 0;
      /* base */
      ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.stroke();
      ctx.restore();
    }

    function drawDrone(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.strokeStyle = s.col; ctx.lineWidth = 1.5;
      ctx.shadowColor = s.col; ctx.shadowBlur = 10;
      /* arms */
      [-1,1].forEach(sx => [-1,1].forEach(sy => {
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(sx*10, sy*10); ctx.stroke();
        ctx.beginPath(); ctx.arc(sx*10, sy*10, 4, 0, TAU); ctx.stroke();
      }));
      ctx.beginPath(); ctx.arc(0, 0, 3, 0, TAU); ctx.fillStyle = s.col; ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      if (W !== lastW) { sources = getSources(W, H); lastW = W; }

      ctx.fillStyle = 'rgba(2,6,8,0.10)';
      ctx.fillRect(0, 0, W, H);

      /* grid */
      ctx.strokeStyle = 'rgba(0,229,160,0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      /* satellite orbit arc */
      const sat = sources[1];
      ctx.beginPath();
      ctx.ellipse(W * 0.5, H * 0.35, W * 0.35, H * 0.28, 0, 0, TAU);
      ctx.strokeStyle = 'rgba(0,229,160,0.08)'; ctx.lineWidth = 1;
      ctx.setLineDash([4,8]); ctx.stroke(); ctx.setLineDash([]);

      /* move satellite on orbit */
      sat.orbitA = (sat.orbitA || 0) + 0.004;
      sat.x = W * 0.5 + Math.cos(sat.orbitA) * W * 0.35;
      sat.y = H * 0.35 + Math.sin(sat.orbitA) * H * 0.28;

      /* drone hover */
      sources[3].y = H * 0.15 + Math.sin(t * 0.8) * 12;
      sources[3].x = W * 0.75 + Math.cos(t * 0.5) * 20;

      /* signal beams */
      ctx.save();
      ctx.shadowBlur = 0;
      drawWave(sources[0], sat, t * 1.2, 'rgba(0,229,160,0.22)');
      drawWave(sat, sources[2], t * 0.9 + 2, 'rgba(0,229,160,0.18)');
      drawWave(sources[0], sources[2], t * 0.7, 'rgba(245,165,36,0.15)');
      drawWave(sources[3], sat, t * 1.1, 'rgba(245,165,36,0.20)');
      ctx.restore();

      /* spawn rings */
      frame++;
      if (frame % 50 === 0) sources.forEach(s => spawnRing(s));

      /* rings */
      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        ctx.beginPath(); ctx.arc(rg.x, rg.y, rg.r, 0, TAU);
        const hexA = Math.round(rg.a * 255).toString(16).padStart(2,'0');
        ctx.strokeStyle = rg.col + hexA;
        ctx.lineWidth = 1.2; ctx.stroke();
        rg.r += rg.sp; rg.a *= 0.983;
        if (rg.r > rg.maxR || rg.a < 0.02) rings.splice(i, 1);
      }

      /* icons */
      sources.forEach(s => {
        if (s.type === 'satellite') drawSatellite(s);
        else if (s.type === 'tower') drawTower(s);
        else drawDrone(s);

        /* center glow */
        ctx.beginPath(); ctx.arc(s.x, s.y, 4, 0, TAU);
        ctx.fillStyle = s.col;
        ctx.shadowColor = s.col; ctx.shadowBlur = 16;
        ctx.fill(); ctx.shadowBlur = 0;

        /* label */
        ctx.font = '9px monospace';
        ctx.fillStyle = s.col + '88';
        ctx.fillText(s.type.toUpperCase(), s.x + 10, s.y + 4);
      });

      /* HUD */
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(0,229,160,0.5)';
      ctx.fillText('LINK: ACTIVE', 14, 20);
      ctx.fillText('FREQ: 4.8 GHz', 14, 34);
      ctx.fillText('UPTIME: 99.9%', W - 110, 20);

      t += 0.03;
      requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#020608';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     INIT  — Find all canvas.bg-canvas and launch correct scene
  ══════════════════════════════════════════════════════════════ */
  function init(canvas) {
    /* respect reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.getContext('2d').fillStyle = '#020608';
      canvas.getContext('2d').fillRect(0, 0, 1, 1);
      return;
    }
    setupCanvas(canvas);
    switch (canvas.dataset.scene) {
      case 'drones':  sceneDrones(canvas);  break;
      case 'cyber':   sceneCyber(canvas);   break;
      case 'fleet':   sceneFleet(canvas);   break;
      case 'comms':   sceneComms(canvas);   break;
      case 'network':
      default:        sceneNetwork(canvas); break;
    }
  }

  document.querySelectorAll('canvas.bg-canvas').forEach(init);
})();
