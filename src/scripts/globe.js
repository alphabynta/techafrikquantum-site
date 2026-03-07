/* globe.js — zoomed flat world map, JS-animated rotation */
(function () {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;

  const W = 2400, H = 1200;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const ZOOM  = 5;
  const SPEED = 360 / (700 * 60);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let centerLon = -12; /* start centred on Guinea (~12°W) */
  let countries, borders, graticule;

  function makeProjection() {
    return d3.geoEquirectangular()
      .scale(H / Math.PI * ZOOM)
      .translate([W / 2, H / 2])
      .rotate([-centerLon, 0]);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const proj = makeProjection();
    const path = d3.geoPath().projection(proj).context(ctx);

    /* Grid */
    ctx.beginPath(); path(graticule);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth   = 0.4; ctx.stroke();

    /* Equator */
    ctx.beginPath();
    path({ type: 'LineString', coordinates: [[-180,0],[180,0]] });
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth   = 0.8; ctx.stroke();

    /* Country fill */
    ctx.beginPath(); path(countries);
    ctx.fillStyle = 'rgba(255,255,255,0.10)'; ctx.fill();

    /* Coastlines */
    ctx.beginPath(); path(countries);
    ctx.strokeStyle = 'rgba(255,255,255,0.80)';
    ctx.lineWidth   = 1.2; ctx.stroke();

    /* Internal borders */
    ctx.beginPath(); path(borders);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth   = 0.7; ctx.stroke();

    if (!reduced) {
      centerLon = (centerLon + SPEED) % 360;
      window.__globeCenterLon = centerLon;
      requestAnimationFrame(draw);
    }
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js')
    .then(function () {
      return loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js');
    })
    .then(function () {
      return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
    })
    .then(function (r) { return r.json(); })
    .then(function (world) {
      countries = topojson.feature(world, world.objects.countries);
      borders   = topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; });
      graticule = d3.geoGraticule().step([30, 30])();
      draw();
    })
    .catch(function (e) { console.warn('globe.js: failed to load map data', e); });
})();
