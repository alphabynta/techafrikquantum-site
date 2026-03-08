/* ── What We Build background config ───────────────────────────
   rgb            — particle + link colour (R,G,B)
   bgColor        — page background colour (also set in section-bg.js)
   particleAlpha  — dot opacity  0–1
   showParticles  — draw neuron dots
   showLinks      — draw connecting lines between dots
   showSatellites — draw satellite objects
   showDrones     — draw ISR / military drones
   showGuineaDrone— draw the Guinea-tracking drone
   ──────────────────────────────────────────────────────────────── */
export default {
  speedMult:       0.25,
  rgb:             '107,142,35',
  bgColor:         '#0d0a00',
  particleAlpha:    0.80,
  showParticles:    true,
  showLinks:        true,
  satelliteRgb:     '107,142,35',
  showSatellites:   false,
  showDrones:       true,
  showGuineaDrone:  false,
};
