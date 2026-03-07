/* globe.js — accurate flat world map via D3 + Natural Earth / world-atlas */
(function () {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;

  const MAP_W = 1400;
  const MAP_H = 700;
  canvas.width  = MAP_W * 2;
  canvas.height = MAP_H;
  const ctx = canvas.getContext('2d');

  /* Dynamically load a script from CDN */
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function drawMap(countries, borders, graticule) {
    [0, MAP_W].forEach(function (offsetX) {
      const projection = d3.geoEquirectangular()
        .scale(MAP_H / Math.PI)
        .translate([offsetX + MAP_W / 2, MAP_H / 2]);

      const path = d3.geoPath().projection(projection).context(ctx);

      /* Grid lines */
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth   = 0.4;
      ctx.stroke();

      /* Equator */
      ctx.beginPath();
      path({ type: 'LineString', coordinates: [[-180, 0], [180, 0]] });
      ctx.strokeStyle = 'rgba(255,255,255,0.14)';
      ctx.lineWidth   = 0.8;
      ctx.stroke();

      /* Country fill */
      ctx.beginPath();
      path(countries);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fill();

      /* Outer coastline */
      ctx.beginPath();
      path(countries);
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth   = 1.0;
      ctx.stroke();

      /* Country borders (internal) */
      ctx.beginPath();
      path(borders);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    });
  }

  loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js')
    .then(function () {
      return loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js');
    })
    .then(function () {
      return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    })
    .then(function (r) { return r.json(); })
    .then(function (world) {
      const countries = topojson.feature(world, world.objects.countries);
      const borders   = topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; });
      const graticule = d3.geoGraticule().step([30, 30])();
      drawMap(countries, borders, graticule);
    })
    .catch(function (e) { console.warn('globe.js: failed to load map data', e); });
})();
