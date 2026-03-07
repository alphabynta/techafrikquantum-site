/* globe.js — orthographic 3D rotating globe for hero section */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let rotation = 0;
  const SPEED = 0.0015; /* radians per frame — slow drift */

  function resize() {
    const size = Math.min(window.innerHeight * 0.82, window.innerWidth * 0.55, 640);
    canvas.width  = size;
    canvas.height = size;
  }

  /* lat/lon → 3D unit-sphere point, rotated around Y axis */
  function toXYZ(lat, lon) {
    const phi = lat * Math.PI / 180;
    const lam = lon * Math.PI / 180 + rotation;
    return {
      x:  Math.cos(phi) * Math.sin(lam),
      y: -Math.sin(phi),                   /* flip so north is up */
      z:  Math.cos(phi) * Math.cos(lam),
    };
  }

  /* 3D → 2D canvas coords */
  function project(p) {
    const r  = canvas.width * 0.46;
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;
    return { x: cx + p.x * r, y: cy + p.y * r };
  }

  /* Simplified continent outlines as [lat, lon] arrays */
  const continents = [
    /* North America */
    [[70,-140],[72,-100],[60,-85],[55,-82],[47,-70],[44,-66],[42,-70],[40,-74],
     [35,-76],[30,-81],[25,-80],[24,-83],[19,-90],[16,-90],[8,-83],[9,-79],
     [15,-92],[22,-105],[32,-117],[38,-123],[49,-124],[54,-132],[60,-145],
     [65,-168],[66,-162],[70,-140]],
    /* South America */
    [[12,-72],[10,-62],[6,-60],[4,-52],[2,-50],[-5,-35],[-8,-35],[-10,-38],
     [-15,-39],[-23,-43],[-28,-49],[-34,-53],[-38,-57],[-42,-63],[-52,-68],
     [-55,-68],[-53,-70],[-45,-66],[-38,-57],[-34,-72],[-30,-72],[-18,-70],
     [-5,-81],[0,-80],[8,-77],[12,-72]],
    /* Europe */
    [[36,-9],[38,-9],[44,-9],[46,-2],[48,-5],[51,-1],[52,5],[54,10],[57,10],
     [58,7],[60,5],[58,6],[58,10],[60,18],[60,25],[65,22],[68,18],[70,22],
     [71,26],[70,30],[69,33],[68,40],[62,30],[56,37],[50,30],[44,29],[41,29],
     [38,26],[36,28],[37,22],[38,26],[36,22],[37,14],[37,9],[37,3],[36,-5],
     [36,-9]],
    /* Africa */
    [[36,-5],[37,3],[37,9],[37,14],[31,25],[30,32],[22,37],[15,42],[11,43],
     [12,44],[8,44],[2,42],[-1,42],[-5,40],[-10,40],[-15,36],[-18,36],
     [-25,33],[-34,26],[-35,20],[-34,18],[-28,16],[-22,14],[-18,12],[-6,12],
     [0,9],[6,2],[6,5],[4,8],[5,2],[6,-3],[5,-2],[10,2],[15,2],[14,-17],
     [16,-17],[18,-16],[22,-16],[28,-13],[32,-8],[36,-5]],
    /* Asia (main) */
    [[37,29],[42,29],[42,44],[40,50],[36,52],[28,57],[24,57],[20,58],[13,45],
     [15,42],[22,60],[22,70],[23,68],[22,74],[22,80],[13,80],[8,77],[8,80],
     [22,88],[26,89],[28,88],[27,90],[28,85],[34,74],[36,74],[38,78],[40,70],
     [42,80],[55,78],[58,82],[55,98],[52,106],[48,118],[45,132],[43,132],
     [40,124],[37,122],[35,120],[32,121],[30,122],[25,122],[22,114],[22,112],
     [30,121],[36,120],[40,120],[44,130],[48,135],[50,140],[55,138],[56,140],
     [60,152],[56,162],[58,164],[60,162],[60,155],[62,164],[66,170],[70,160],
     [72,142],[73,130],[72,110],[72,80],[70,60],[68,58],[62,55],[60,52],
     [56,38],[56,30],[50,36],[44,34],[42,29]],
    /* India */
    [[28,68],[28,74],[22,68],[22,74],[22,80],[13,80],[8,77],[8,78],[22,88],
     [26,89],[28,88],[34,74],[28,68]],
    /* Southeast Asia + Indochina */
    [[22,100],[22,108],[18,106],[16,108],[10,104],[2,104],[1,104],
     [5,100],[10,99],[14,98],[16,100],[22,100]],
    /* Australia */
    [[-18,122],[-14,126],[-12,130],[-14,132],[-12,136],[-12,136],
     [-16,138],[-18,140],[-24,151],[-26,153],[-34,151],[-38,147],
     [-38,144],[-36,138],[-32,134],[-32,130],[-34,120],[-32,116],
     [-26,114],[-22,114],[-18,122]],
    /* Greenland */
    [[83,-45],[80,-18],[76,-18],[72,-24],[68,-28],[62,-42],[60,-48],
     [63,-52],[70,-52],[74,-58],[76,-68],[80,-60],[83,-45]],
    /* Japan */
    [[44,142],[40,141],[36,136],[34,132],[34,132],[36,136],[40,141],[44,142]],
    /* UK + Ireland */
    [[58,-5],[56,-6],[54,-3],[52,-4],[50,-5],[51,0],[52,2],[54,0],[58,-4],[58,-5]],
    [[54,-10],[52,-10],[52,-8],[54,-6],[54,-10]],
    /* New Zealand */
    [[-34,172],[-40,175],[-46,168],[-44,170],[-40,175],[-34,172]],
    /* Madagascar */
    [[-12,49],[-18,44],[-26,44],[-26,48],[-18,50],[-12,50],[-12,49]],
  ];

  function drawGlobe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const r  = canvas.width  * 0.46;
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    /* Outer sphere circle */
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    /* Latitude grid lines */
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let pen = false;
      for (let lon = -180; lon <= 182; lon += 3) {
        const p = toXYZ(lat, lon);
        if (p.z <= 0) { pen = false; continue; }
        const s = project(p);
        pen ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y);
        pen = true;
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }

    /* Longitude grid lines */
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath();
      let pen = false;
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = toXYZ(lat, lon);
        if (p.z <= 0) { pen = false; continue; }
        const s = project(p);
        pen ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y);
        pen = true;
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }

    /* Equator highlight */
    ctx.beginPath();
    let pen = false;
    for (let lon = -180; lon <= 182; lon += 2) {
      const p = toXYZ(0, lon);
      if (p.z <= 0) { pen = false; continue; }
      const s = project(p);
      pen ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y);
      pen = true;
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.10)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    /* Continent outlines */
    continents.forEach(function (path) {
      ctx.beginPath();
      let penDown = false;
      path.forEach(function ([lat, lon]) {
        const p = toXYZ(lat, lon);
        if (p.z <= 0) { penDown = false; return; }
        const s = project(p);
        if (!penDown) { ctx.moveTo(s.x, s.y); penDown = true; }
        else ctx.lineTo(s.x, s.y);
      });
      ctx.strokeStyle = 'rgba(255,255,255,0.60)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
    });

    rotation += SPEED;
    requestAnimationFrame(drawGlobe);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  drawGlobe();
})();
