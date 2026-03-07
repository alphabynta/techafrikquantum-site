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

  function drawMap(land, graticule) {
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
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth   = 0.7;
      ctx.stroke();

      /* Land fill */
      ctx.beginPath();
      path(land);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();

      /* Land outline */
      ctx.beginPath();
      path(land);
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth   = 1.1;
      ctx.stroke();
    });
  }

  loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js')
    .then(function () {
      return loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js');
    })
    .then(function () {
      return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json');
    })
    .then(function (r) { return r.json(); })
    .then(function (world) {
      const land      = topojson.feature(world, world.objects.land);
      const graticule = d3.geoGraticule().step([30, 30])();
      drawMap(land, graticule);
    })
    .catch(function (e) { console.warn('globe.js: failed to load map data', e); });
})();
