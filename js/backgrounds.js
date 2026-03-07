/**
 * Techafrik Quantum Group — Themed Canvas Backgrounds
 * Scenes: waves | drones | cyber | network | fleet | comms
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

  /* ── Draw helpers ───────────────────────────────────────────── */
  function drawSoldier(ctx, x, ground, walkPhase, col) {
    ctx.save();
    ctx.translate(x, ground);
    ctx.strokeStyle = col;
    ctx.fillStyle   = col;
    ctx.shadowColor = col;
    ctx.shadowBlur  = 5;

    /* head */
    ctx.beginPath(); ctx.arc(0, -22, 3, 0, TAU); ctx.fill();
    /* helmet */
    ctx.fillRect(-4, -27, 8, 5);
    /* torso */
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, -19); ctx.lineTo(0, -11); ctx.stroke();
    /* arms */
    const armS = Math.sin(walkPhase) * 5;
    ctx.beginPath(); ctx.moveTo(0, -17); ctx.lineTo(-6, -12 + armS); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -17); ctx.lineTo( 6, -12 - armS); ctx.stroke();
    /* rifle */
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(6, -12 - armS); ctx.lineTo(13, -17 - armS); ctx.stroke();
    /* legs */
    ctx.lineWidth = 1.5;
    const legS = Math.sin(walkPhase) * 7;
    ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(-3, -5 - legS); ctx.lineTo(-3, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo( 3, -5 + legS); ctx.lineTo( 3, 0); ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawDroneSilhouette(ctx, x, y, size, col, rotorA) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = col;
    ctx.fillStyle   = col;
    ctx.lineWidth   = 1.2;
    ctx.shadowColor = col;
    ctx.shadowBlur  = 12;

    /* 4 arms */
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx, dy]) => {
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dx * size, dy * size); ctx.stroke();
      /* rotor arc */
      ctx.beginPath(); ctx.arc(dx * size, dy * size, size * 0.5, rotorA, rotorA + Math.PI * 1.4); ctx.stroke();
    });
    /* body square */
    ctx.fillRect(-size * 0.28, -size * 0.28, size * 0.56, size * 0.56);
    /* blinking nav light */
    if (Math.sin(rotorA * 2) > 0.4) {
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#ff3030';
      ctx.beginPath(); ctx.arc(0, -size * 0.6, 2, 0, TAU); ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: WAVES  — Cisco-style flowing wave ribbons + orbs
     Used: ALL page heroes
  ══════════════════════════════════════════════════════════════ */
  function sceneWaves(canvas) {
    const ctx = canvas.getContext('2d');
    let t = 0;

    const waveDefs = [
      { amp: 70,  freq: 0.007, speed: 0.35, phase: 0.0, Cr: '0,140,220',  a: 0.45, yFrac: 0.38 },
      { amp: 45,  freq: 0.011, speed: 0.55, phase: 1.8, Cr: '34,211,238', a: 0.35, yFrac: 0.52 },
      { amp: 90,  freq: 0.005, speed: 0.25, phase: 3.2, Cr: '0,80,180',   a: 0.20, yFrac: 0.62 },
      { amp: 35,  freq: 0.016, speed: 0.70, phase: 0.9, Cr: '245,165,36', a: 0.18, yFrac: 0.47 },
      { amp: 55,  freq: 0.009, speed: 0.45, phase: 2.5, Cr: '80,180,255', a: 0.22, yFrac: 0.56 },
    ];

    const orbs = Array.from({ length: 5 }, () => ({
      xF: rand(0.05, 0.95), yF: rand(0.1, 0.9),
      vx: rand(-0.00015, 0.00015), vy: rand(-0.00010, 0.00010),
      r:  rand(180, 380),
      Cr: ['0,100,200', '0,180,255', '34,211,238', '20,60,140'][rInt(0,4)],
      a:  rand(0.04, 0.11)
    }));

    const particles = Array.from({ length: 60 }, () => ({
      xF: rand(0, 1),
      wi: rInt(0, waveDefs.length),
      spd: rand(0.0003, 0.0012),
      sz:  rand(1.2, 2.8)
    }));

    function draw() {
      const W = canvas.width, H = canvas.height;

      ctx.fillStyle = 'rgba(4,8,22,0.14)';
      ctx.fillRect(0, 0, W, H);

      /* orbs */
      orbs.forEach(o => {
        o.xF = clamp(o.xF + o.vx, 0.05, 0.95);
        o.yF = clamp(o.yF + o.vy, 0.05, 0.95);
        const g = ctx.createRadialGradient(o.xF*W, o.yF*H, 0, o.xF*W, o.yF*H, o.r);
        g.addColorStop(0, `rgba(${o.Cr},${o.a})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      /* waves */
      waveDefs.forEach(w => {
        const baseY = w.yFrac * H;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = baseY + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${w.Cr},${w.a})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      /* particles riding waves */
      particles.forEach(p => {
        const w = waveDefs[p.wi];
        p.xF = (p.xF + p.spd) % 1;
        const px = p.xF * W;
        const py = w.yFrac * H + Math.sin(px * w.freq + t * w.speed + w.phase) * w.amp;
        ctx.beginPath();
        ctx.arc(px, py, p.sz, 0, TAU);
        ctx.fillStyle   = `rgba(${w.Cr},0.9)`;
        ctx.shadowColor = `rgba(${w.Cr},1)`;
        ctx.shadowBlur  = 10;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      t += 0.016;
      requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#040816';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: DRONES  — Radar sweep + drone silhouettes + soldiers
     Color: Green #00e5a0  |  Used: safety section, defense sector
  ══════════════════════════════════════════════════════════════ */
  function sceneDrones(canvas) {
    const ctx = canvas.getContext('2d');
    const C  = '#00e5a0';
    const Cr = '0,229,160';
    let angle = -Math.PI / 2;
    const SWEEP_DEG = 100 * (Math.PI / 180);

    function mkBlip() {
      return { r: rand(0.12, 0.88), a: rand(0, TAU), va: rand(-0.0006, 0.0006), born: angle, life: rInt(300, 700) };
    }
    const blips = Array.from({ length: 7 }, mkBlip);

    /* drones flying */
    function mkFlyingDrone(W, H) {
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: dir > 0 ? -60 : W + 60,
        y: rand(H * 0.06, H * 0.52),
        vx: rand(0.4, 1.1) * dir,
        phase: rand(0, TAU),
        size: rand(10, 22),
        rotorA: rand(0, TAU),
        col: Math.random() > 0.4 ? 'rgba(245,165,36,0.90)' : 'rgba(0,229,160,0.70)'
      };
    }

    /* soldiers patrol */
    function mkSoldier(W, H) {
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: dir > 0 ? rand(-60, 0) : rand(W, W + 60),
        ground: H * rand(0.82, 0.90),
        speed: rand(0.25, 0.55),
        walkPhase: rand(0, TAU),
        dir,
        col: `rgba(${Cr},0.85)`
      };
    }

    let flyingDrones = [];
    let soldiers     = [];
    let lastW = canvas.width;
    let frame = 0;

    function initEntities(W, H) {
      flyingDrones = Array.from({ length: 5 }, () => mkFlyingDrone(W, H));
      soldiers     = Array.from({ length: 9 }, () => mkSoldier(W, H));
    }
    initEntities(canvas.width, canvas.height);

    function draw() {
      const W = canvas.width, H = canvas.height;
      if (W !== lastW) { initEntities(W, H); lastW = W; }
      const cx = W * 0.5, cy = H * 0.5;
      const R  = Math.min(W, H) * 0.38;

      ctx.fillStyle = 'rgba(2,6,8,0.18)';
      ctx.fillRect(0, 0, W, H);

      /* tactical grid */
      ctx.strokeStyle = `rgba(${Cr},0.05)`;
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      /* --- SOLDIERS at ground level --- */
      soldiers.forEach(s => {
        s.x += s.speed * s.dir;
        s.walkPhase += 0.09;
        if (s.x > W + 40) s.x = -40;
        if (s.x < -40)    s.x = W + 40;
        drawSoldier(ctx, s.x, s.ground, s.walkPhase, s.col);
      });

      /* ground terrain line */
      ctx.strokeStyle = `rgba(${Cr},0.12)`;
      ctx.lineWidth = 1;
      const avgGround = H * 0.86;
      ctx.beginPath(); ctx.moveTo(0, avgGround); ctx.lineTo(W, avgGround); ctx.stroke();

      /* --- FLYING DRONES --- */
      flyingDrones.forEach(d => {
        d.x += d.vx;
        d.y += Math.sin(frame * 0.018 + d.phase) * 0.35;
        d.rotorA += 0.22;
        if (d.x > W + 70) d.x = -70;
        if (d.x < -70)    d.x = W + 70;
        drawDroneSilhouette(ctx, d.x, d.y, d.size, d.col, d.rotorA);
      });

      /* --- RADAR --- */
      /* rings */
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath(); ctx.arc(cx, cy, R * i / 4, 0, TAU);
        ctx.strokeStyle = `rgba(${Cr},0.12)`; ctx.lineWidth = 1; ctx.stroke();
      }
      /* crosshairs */
      ctx.strokeStyle = `rgba(${Cr},0.08)`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      /* sweep fill */
      ctx.save(); ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, angle - SWEEP_DEG, angle); ctx.closePath();
      const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      sg.addColorStop(0, `rgba(${Cr},0)`); sg.addColorStop(1, `rgba(${Cr},0.18)`);
      ctx.fillStyle = sg; ctx.fill(); ctx.restore();
      /* sweep arm */
      ctx.save(); ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
      ctx.strokeStyle = `rgba(${Cr},0.85)`; ctx.lineWidth = 2;
      ctx.shadowColor = C; ctx.shadowBlur = 10; ctx.stroke(); ctx.restore();
      /* center */
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, TAU);
      ctx.fillStyle = C; ctx.shadowColor = C; ctx.shadowBlur = 14;
      ctx.fill(); ctx.shadowBlur = 0;
      /* blips */
      blips.forEach((b, i) => {
        b.a += b.va; b.life--;
        if (b.life <= 0) blips[i] = mkBlip();
        const bx = cx + Math.cos(b.a) * b.r * R;
        const by = cy + Math.sin(b.a) * b.r * R;
        let dA = ((b.a - angle) % TAU + TAU) % TAU;
        const visible = dA < SWEEP_DEG || dA > TAU * 0.98;
        const alpha   = visible ? 1 : clamp(1 - (dA / SWEEP_DEG) * 0.8, 0.05, 1);
        ctx.beginPath(); ctx.arc(bx, by, 4, 0, TAU);
        ctx.fillStyle = `rgba(245,165,36,${alpha})`;
        ctx.shadowColor = '#f5a524'; ctx.shadowBlur = visible ? 18 : 6;
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(245,165,36,${alpha * 0.6})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(bx-9,by); ctx.lineTo(bx+9,by); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx,by-9); ctx.lineTo(bx,by+9); ctx.stroke();
      });

      /* HUD */
      ctx.font = '9px monospace'; ctx.fillStyle = `rgba(${Cr},0.5)`;
      ctx.fillText('MODE: SCAN', 14, 20);
      ctx.fillText(`HDG: ${String(Math.round(((angle%TAU+TAU)%TAU)*180/Math.PI)).padStart(3,'0')}°`, 14, 34);
      ctx.fillText(`TGT: ${blips.length.toString().padStart(2,'0')}`, 14, 48);
      ctx.fillText(`UAV: 0${flyingDrones.length}`, 14, 62);
      ctx.fillText('LINK: ENCRYPTED', W - 120, 20);
      ctx.fillText('FREQ: 4.8 GHz',   W - 120, 34);

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
     Color: Red #ff2d55  |  Used: cybersecurity section, contact hero
  ══════════════════════════════════════════════════════════════ */
  function sceneCyber(canvas) {
    const ctx = canvas.getContext('2d');
    const C  = '#ff2d55';
    const Cr = '255,45,85';
    const CHARS = '01アイウエカキクケサシスセタチツテナニABCDEF0123456789!@#$%^&*<>?';

    function mkCols(W) {
      return Array.from({ length: Math.floor(W / 14) }, () => ({
        y: rand(0, 60), speed: rand(0.3, 1.2), bright: Math.random() > 0.85
      }));
    }
    let drops = mkCols(canvas.width);
    let lastW = canvas.width, scanY = 0;

    function draw() {
      const W = canvas.width, H = canvas.height;
      if (W !== lastW) { drops = mkCols(W); lastW = W; }
      ctx.fillStyle = 'rgba(8,2,4,0.10)'; ctx.fillRect(0, 0, W, H);
      drops.forEach((d, i) => {
        const ch = CHARS[rInt(0, CHARS.length)];
        const x = i * 14, y = d.y * 14;
        ctx.fillStyle   = d.bright ? '#fff' : C;
        ctx.shadowColor = C; ctx.shadowBlur = d.bright ? 16 : 6;
        ctx.font = `${d.bright ? '13px' : '12px'} monospace`;
        ctx.fillText(ch, x, y); ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${Cr},0.28)`; ctx.font = '11px monospace';
        ctx.fillText(CHARS[rInt(0,CHARS.length)], x, y-14);
        ctx.fillStyle = `rgba(${Cr},0.10)`;
        ctx.fillText(CHARS[rInt(0,CHARS.length)], x, y-28);
        d.y += d.speed;
        if (d.y*14 > H && Math.random() > 0.97) { d.y=0; d.speed=rand(0.3,1.2); }
      });
      scanY = (scanY + 1.2) % H;
      ctx.fillStyle = `rgba(${Cr},0.05)`; ctx.fillRect(0, scanY, W, 2);
      if (Math.random() < 0.004) {
        const labels = ['ENCRYPTED','BREACH ATTEMPT','HASH VERIFIED','AUTH TOKEN','SOC ALERT','FIREWALL OK'];
        ctx.font = '10px monospace'; ctx.fillStyle = 'rgba(245,165,36,0.7)';
        ctx.fillText(labels[rInt(0,labels.length)], rInt(20,W-160), rInt(20,H-20));
      }
      requestAnimationFrame(draw);
    }
    ctx.fillStyle = '#080204'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: NETWORK  — Floating nodes + data packets
     Color: Blue #00b4ff  |  Used: IP Networks section
  ══════════════════════════════════════════════════════════════ */
  function sceneNetwork(canvas) {
    const ctx = canvas.getContext('2d');
    const C  = '#00b4ff';
    const Cr = '0,180,255';

    function mkNodes(W, H) {
      const n = Math.min(60, Math.max(20, Math.floor(W*H/14000)));
      return Array.from({ length: n }, () => ({
        x: rand(0,W), y: rand(0,H), vx: rand(-0.25,0.25), vy: rand(-0.25,0.25),
        r: rand(2,4.5), gold: Math.random() > 0.72
      }));
    }
    let nodes=mkNodes(canvas.width,canvas.height), packets=[], lastW=canvas.width;

    function spawnPacket(nodes,W,H) {
      const DIST=Math.min(W,H)*0.3;
      const a=nodes[rInt(0,nodes.length)], b=nodes[rInt(0,nodes.length)];
      if (a===b||Math.hypot(b.x-a.x,b.y-a.y)>DIST) return;
      packets.push({sx:a.x,sy:a.y,tx:b.x,ty:b.y,t:0,gold:a.gold});
    }

    function draw() {
      const W=canvas.width, H=canvas.height;
      if (W!==lastW) { nodes=mkNodes(W,H); lastW=W; }
      const DIST=Math.min(W,H)*0.30;
      ctx.fillStyle='rgba(2,4,10,0.14)'; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle=`rgba(${Cr},0.04)`; ctx.lineWidth=1;
      for(let x=0;x<W;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const d=Math.hypot(nodes[j].x-nodes[i].x,nodes[j].y-nodes[i].y);
        if(d<DIST){
          const a=(1-d/DIST)*0.32;
          ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(${Cr},${a})`;ctx.lineWidth=0.8;ctx.stroke();
        }
      }
      if(Math.random()<0.05) spawnPacket(nodes,W,H);
      for(let i=packets.length-1;i>=0;i--){
        const p=packets[i]; p.t=Math.min(p.t+0.022,1);
        const px=lerp(p.sx,p.tx,p.t), py=lerp(p.sy,p.ty,p.t);
        const col=p.gold?'#f5a524':C;
        ctx.beginPath();ctx.arc(px,py,3,0,TAU);
        ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=10;
        ctx.fill();ctx.shadowBlur=0;
        if(p.t>=1) packets.splice(i,1);
      }
      nodes.forEach(n=>{
        n.x+=n.vx;n.y+=n.vy;
        if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;
        const col=n.gold?'#f5a524':C;
        ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,TAU);
        ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=12;
        ctx.fill();ctx.shadowBlur=0;
      });
      requestAnimationFrame(draw);
    }
    ctx.fillStyle='#02040a'; ctx.fillRect(0,0,canvas.width,canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: FLEET  — Tactical map + vehicles + soldiers on foot
     Color: Amber #f59e0b  |  Used: assets section, mobility sector
  ══════════════════════════════════════════════════════════════ */
  function sceneFleet(canvas) {
    const ctx = canvas.getContext('2d');
    const C  = '#f59e0b';
    const Cr = '245,158,11';
    const CA = '#ffcf60';

    function mkVehicles(W, H) {
      return Array.from({ length: 9 }, () => ({
        x: rand(40,W-40), y: rand(40,H-40), tx: rand(40,W-40), ty: rand(40,H-40),
        speed: rand(0.4,1.0), trail: [], alt: Math.random()>0.5, pingR:0, pinging:false
      }));
    }
    function mkPatrol(W, H) {
      const dir = Math.random()>0.5?1:-1;
      return {
        x: dir>0?rand(-40,0):rand(W,W+40), ground:H*rand(0.78,0.88),
        speed:rand(0.2,0.4), walkPhase:rand(0,TAU), dir,
        col:`rgba(${Cr},0.8)`
      };
    }

    let vehicles=mkVehicles(canvas.width,canvas.height);
    let patrol=Array.from({length:6},()=>mkPatrol(canvas.width,canvas.height));
    let lastW=canvas.width, frame=0;

    function draw() {
      const W=canvas.width, H=canvas.height;
      if(W!==lastW){ vehicles=mkVehicles(W,H); patrol=Array.from({length:6},()=>mkPatrol(W,H)); lastW=W; }

      ctx.fillStyle='rgba(6,4,2,0.12)'; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle=`rgba(${Cr},0.07)`; ctx.lineWidth=1;
      for(let x=0;x<W;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      ctx.font='9px monospace'; ctx.fillStyle=`rgba(${Cr},0.25)`;
      ['A','B','C','D','E','F'].forEach((l,i)=>ctx.fillText(l,i*60+4,12));
      [1,2,3,4,5,6].forEach((n,i)=>ctx.fillText(n,4,i*60+52));

      /* soldiers on patrol */
      patrol.forEach(s=>{
        s.x+=s.speed*s.dir; s.walkPhase+=0.08;
        if(s.x>W+40)s.x=-40; if(s.x<-40)s.x=W+40;
        drawSoldier(ctx, s.x, s.ground, s.walkPhase, s.col);
      });

      vehicles.forEach(v=>{
        const dx=v.tx-v.x, dy=v.ty-v.y, dist=Math.hypot(dx,dy);
        if(dist<6){v.tx=rand(40,W-40);v.ty=rand(40,H-40);v.pinging=true;v.pingR=0;}
        const spd=Math.min(v.speed,dist); v.x+=dx/dist*spd; v.y+=dy/dist*spd;
        ctx.save(); ctx.setLineDash([5,9]);
        ctx.beginPath();ctx.moveTo(v.x,v.y);ctx.lineTo(v.tx,v.ty);
        ctx.strokeStyle=`rgba(${Cr},0.18)`;ctx.lineWidth=1;ctx.stroke();
        ctx.setLineDash([]);ctx.restore();
        v.trail.push({x:v.x,y:v.y});
        if(v.trail.length>45)v.trail.shift();
        for(let i=1;i<v.trail.length;i++){
          const a=(i/v.trail.length)*0.55;
          ctx.beginPath();ctx.moveTo(v.trail[i-1].x,v.trail[i-1].y);ctx.lineTo(v.trail[i].x,v.trail[i].y);
          ctx.strokeStyle=v.alt?`rgba(255,207,96,${a})`:`rgba(${Cr},${a})`;ctx.lineWidth=1.5;ctx.stroke();
        }
        if(v.pinging){
          ctx.beginPath();ctx.arc(v.x,v.y,v.pingR,0,TAU);
          ctx.strokeStyle=`rgba(${Cr},${Math.max(0,0.7-v.pingR/50)})`;ctx.lineWidth=1.2;ctx.stroke();
          v.pingR+=1.0;if(v.pingR>50)v.pinging=false;
        }
        const col=v.alt?CA:C;
        ctx.beginPath();ctx.arc(v.x,v.y,5,0,TAU);ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=16;ctx.fill();ctx.shadowBlur=0;
        const ang=Math.atan2(dy,dx);
        ctx.save();ctx.translate(v.x,v.y);ctx.rotate(ang);
        ctx.beginPath();ctx.moveTo(9,0);ctx.lineTo(-4,-4);ctx.lineTo(-4,4);ctx.closePath();
        ctx.fillStyle=col;ctx.fill();ctx.restore();
      });

      ctx.font='9px monospace'; ctx.fillStyle=`rgba(${Cr},0.5)`;
      ctx.fillText(`VEHICLES: ${vehicles.length.toString().padStart(2,'0')}`,14,H-30);
      ctx.fillText('TRACKING: LIVE',14,H-18);
      ctx.fillText('GPS LOCK: OK',W-100,H-18);
      frame++;
      requestAnimationFrame(draw);
    }
    ctx.fillStyle='#060402'; ctx.fillRect(0,0,canvas.width,canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     SCENE: COMMS  — Satellite orbit + radio waves + drones
     Color: Cyan #22d3ee  |  Used: connectivity section, about
  ══════════════════════════════════════════════════════════════ */
  function sceneComms(canvas) {
    const ctx = canvas.getContext('2d');
    const C  = '#22d3ee';
    const Cr = '34,211,238';
    let t=0, frame=0;
    const rings=[];

    function getSources(W,H){
      return [
        {x:W*0.18,y:H*0.72,type:'tower',col:'#f5a524'},
        {x:W*0.50,y:H*0.08,type:'satellite',col:C,orbitA:0},
        {x:W*0.82,y:H*0.68,type:'tower',col:'#f5a524'},
        {x:W*0.75,y:H*0.15,type:'drone',col:C}
      ];
    }
    function spawnRing(src){rings.push({x:src.x,y:src.y,r:6,maxR:rand(70,150),sp:rand(0.9,1.6),a:0.7,col:src.col});}

    let lastW=canvas.width, sources=getSources(canvas.width,canvas.height);
    let commsDrones=[];
    function initCommsDrones(W,H){
      commsDrones=Array.from({length:3},()=>{
        const dir=Math.random()>0.5?1:-1;
        return {x:dir>0?-50:W+50,y:rand(H*0.05,H*0.45),vx:rand(0.3,0.7)*dir,
                phase:rand(0,TAU),size:rand(8,16),rotorA:rand(0,TAU)};
      });
    }
    initCommsDrones(canvas.width,canvas.height);

    function drawWave(a,b,t,col){
      const segs=24;ctx.beginPath();
      for(let i=0;i<=segs;i++){
        const tt=i/segs,x=lerp(a.x,b.x,tt),y=lerp(a.y,b.y,tt)+Math.sin(tt*Math.PI*5+t)*10;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=col;ctx.lineWidth=1.2;ctx.stroke();
    }
    function drawSatellite(s){
      ctx.save();ctx.translate(s.x,s.y);ctx.strokeStyle=s.col;ctx.lineWidth=1.5;ctx.shadowColor=s.col;ctx.shadowBlur=10;
      ctx.strokeRect(-6,-4,12,8);
      [['-16,-2','-6,-2'],['16,-2','6,-2'],['6,-2','16,-2'],['-16,2','-6,2'],['6,2','16,2']].forEach(p=>{});
      ctx.beginPath();ctx.moveTo(-16,-2);ctx.lineTo(-6,-2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-16, 2);ctx.lineTo(-6, 2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(  6,-2);ctx.lineTo(16,-2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(  6, 2);ctx.lineTo(16, 2);ctx.stroke();
      ctx.shadowBlur=0;ctx.restore();
    }
    function drawTower(s){
      ctx.save();ctx.translate(s.x,s.y);ctx.strokeStyle=s.col;ctx.lineWidth=2;ctx.shadowColor=s.col;ctx.shadowBlur=8;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-22);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-7,-8);ctx.lineTo(7,-8);ctx.stroke();
      ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(10,0);ctx.stroke();ctx.restore();
    }

    function draw(){
      const W=canvas.width, H=canvas.height;
      if(W!==lastW){sources=getSources(W,H);initCommsDrones(W,H);lastW=W;}

      ctx.fillStyle='rgba(2,6,10,0.10)'; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle=`rgba(${Cr},0.05)`;ctx.lineWidth=1;
      for(let x=0;x<W;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

      /* flying comms drones */
      commsDrones.forEach(d=>{
        d.x+=d.vx; d.y+=Math.sin(frame*0.02+d.phase)*0.3; d.rotorA+=0.2;
        if(d.x>W+60)d.x=-60; if(d.x<-60)d.x=W+60;
        drawDroneSilhouette(ctx,d.x,d.y,d.size,`rgba(${Cr},0.7)`,d.rotorA);
      });

      const sat=sources[1];
      ctx.beginPath();ctx.ellipse(W*0.5,H*0.35,W*0.35,H*0.28,0,0,TAU);
      ctx.strokeStyle=`rgba(${Cr},0.08)`;ctx.lineWidth=1;ctx.setLineDash([4,8]);ctx.stroke();ctx.setLineDash([]);
      sat.orbitA=(sat.orbitA||0)+0.004;
      sat.x=W*0.5+Math.cos(sat.orbitA)*W*0.35; sat.y=H*0.35+Math.sin(sat.orbitA)*H*0.28;
      sources[3].y=H*0.15+Math.sin(t*0.8)*12; sources[3].x=W*0.75+Math.cos(t*0.5)*20;

      ctx.save();ctx.shadowBlur=0;
      drawWave(sources[0],sat,t*1.2,`rgba(${Cr},0.22)`);
      drawWave(sat,sources[2],t*0.9+2,`rgba(${Cr},0.18)`);
      drawWave(sources[0],sources[2],t*0.7,'rgba(245,165,36,0.15)');
      drawWave(sources[3],sat,t*1.1,'rgba(245,165,36,0.20)');
      ctx.restore();

      frame++;
      if(frame%50===0) sources.forEach(s=>spawnRing(s));
      for(let i=rings.length-1;i>=0;i--){
        const rg=rings[i];
        ctx.beginPath();ctx.arc(rg.x,rg.y,rg.r,0,TAU);
        const hexA=Math.round(rg.a*255).toString(16).padStart(2,'0');
        ctx.strokeStyle=rg.col+hexA;ctx.lineWidth=1.2;ctx.stroke();
        rg.r+=rg.sp;rg.a*=0.983;if(rg.r>rg.maxR||rg.a<0.02)rings.splice(i,1);
      }
      sources.forEach(s=>{
        if(s.type==='satellite')drawSatellite(s);
        else if(s.type==='tower')drawTower(s);
        ctx.beginPath();ctx.arc(s.x,s.y,4,0,TAU);
        ctx.fillStyle=s.col;ctx.shadowColor=s.col;ctx.shadowBlur=16;ctx.fill();ctx.shadowBlur=0;
        ctx.font='9px monospace';ctx.fillStyle=s.col+'88';
        ctx.fillText(s.type.toUpperCase(),s.x+10,s.y+4);
      });

      ctx.font='9px monospace';ctx.fillStyle=`rgba(${Cr},0.5)`;
      ctx.fillText('LINK: ACTIVE',14,20);ctx.fillText('FREQ: 4.8 GHz',14,34);
      ctx.fillText('UPTIME: 99.9%',W-110,20);
      t+=0.03;requestAnimationFrame(draw);
    }
    ctx.fillStyle='#02060a';ctx.fillRect(0,0,canvas.width,canvas.height);
    draw();
  }

  /* ══════════════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════════════ */
  function init(canvas) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.getContext('2d').fillStyle = '#040816';
      canvas.getContext('2d').fillRect(0, 0, 1, 1);
      return;
    }
    setupCanvas(canvas);
    switch (canvas.dataset.scene) {
      case 'waves':   sceneWaves(canvas);   break;
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
