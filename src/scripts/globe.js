/* globe.js — zoomed flat world map, JS-animated rotation */
(function () {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;

  const W = 2400, H = 1200;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const ZOOM    = 5;
  const SPEED   = 360 / (1400 * 60);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let centerLon = 0;
  let countries, borders, land;
  let graticule;

  function makeProjection() {
    return d3.geoEquirectangular()
      .scale(H / Math.PI * ZOOM)
      .translate([W / 2, H / 2])
      .rotate([-centerLon, 0]);
  }

  function latLine(path, lat) {
    ctx.beginPath();
    path({ type: 'LineString', coordinates: [[-180, lat], [180, lat]] });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const proj = makeProjection();
    const path = d3.geoPath().projection(proj).context(ctx);

    /* Grid — 15° steps */
    ctx.beginPath(); path(graticule);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth   = 0.4; ctx.stroke();

    /* Arctic & Antarctic circles (±66.5°) */
    [66.5, -66.5].forEach(function (lat) {
      latLine(path, lat);
      ctx.strokeStyle = 'rgba(255,255,255,0.09)';
      ctx.lineWidth   = 0.45; ctx.stroke();
    });

    /* Tropics of Cancer & Capricorn (±23.5°) — amber tint */
    [23.5, -23.5].forEach(function (lat) {
      latLine(path, lat);
      ctx.strokeStyle = 'rgba(245,165,36,0.18)';
      ctx.lineWidth   = 0.6; ctx.stroke();
    });

    /* Equator */
    latLine(path, 0);
    ctx.strokeStyle = 'rgba(255,255,255,0.20)';
    ctx.lineWidth   = 0.9; ctx.stroke();

    /* Prime meridian & antimeridian */
    [0, 180, -180].forEach(function (lon) {
      ctx.beginPath();
      path({ type: 'LineString', coordinates: [[lon, -90], [lon, 90]] });
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth   = 0.5; ctx.stroke();
    });

    /* Land fill — base tone */
    if (land) {
      ctx.beginPath(); path(land);
      ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fill();
    }

    /* Country fill */
    ctx.beginPath(); path(countries);
    ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fill();

    /* Internal country borders */
    ctx.beginPath(); path(borders);
    ctx.strokeStyle = 'rgba(255,255,255,0.40)';
    ctx.lineWidth   = 0.65; ctx.stroke();

    /* Coastlines — brightest layer */
    ctx.beginPath(); path(countries);
    ctx.strokeStyle = 'rgba(255,255,255,0.82)';
    ctx.lineWidth   = 1.1; ctx.stroke();

    if (!reduced) {
      centerLon = (centerLon + SPEED) % 360;
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
      return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then(function (r) { return r.json(); });
    })
    .then(function (world) {
      countries = topojson.feature(world, world.objects.countries);
      borders   = topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; });
      land      = topojson.feature(world, world.objects.land);
      graticule = d3.geoGraticule().step([15, 15])();
      draw();
    })
    .catch(function (e) { console.warn('globe.js: failed to load map data', e); });
})();
