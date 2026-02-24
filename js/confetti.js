/* ============================================
   READING RUSH — Canvas Confetti & Particle Engine
   ============================================ */

const ConfettiEngine = (() => {
  let canvas, ctx;
  let particles = [];
  let animFrame = null;

  const COLORS = ['#39ff14','#00f0ff','#ff2e63','#ffd700','#b14eff','#ff6f00','#ffffff'];

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* --- Confetti Burst --- */
  function burstConfetti(x, y, count = 60) {
    if (!canvas) init();
    for (let i = 0; i < count; i++) {
      const angle = randomRange(0, Math.PI * 2);
      const speed = randomRange(4, 12);
      particles.push({
        type: 'confetti',
        x: x ?? canvas.width / 2,
        y: y ?? canvas.height / 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        w: randomRange(6, 12),
        h: randomRange(4, 8),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: randomRange(0, Math.PI * 2),
        rotSpeed: randomRange(-0.2, 0.2),
        gravity: 0.15,
        life: 1,
        decay: randomRange(0.008, 0.015)
      });
    }
    if (!animFrame) loop();
  }

  /* --- Checkered Flag Particles --- */
  function checkeredBurst(x, y) {
    if (!canvas) init();
    for (let i = 0; i < 40; i++) {
      const angle = randomRange(0, Math.PI * 2);
      const speed = randomRange(3, 10);
      particles.push({
        type: 'checker',
        x: x ?? canvas.width / 2,
        y: y ?? canvas.height / 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: randomRange(8, 16),
        black: Math.random() > 0.5,
        gravity: 0.12,
        life: 1,
        decay: randomRange(0.01, 0.02)
      });
    }
    if (!animFrame) loop();
  }

  /* --- Exhaust Smoke (for car boost) --- */
  function exhaustSmoke(x, y, count = 15) {
    if (!canvas) init();
    for (let i = 0; i < count; i++) {
      particles.push({
        type: 'smoke',
        x: x,
        y: y + randomRange(-10, 10),
        vx: randomRange(-3, -0.5),
        vy: randomRange(-1, 1),
        radius: randomRange(4, 12),
        color: `rgba(200,200,220,${randomRange(0.3, 0.7)})`,
        life: 1,
        decay: randomRange(0.02, 0.04),
        grow: randomRange(0.3, 0.8)
      });
    }
    if (!animFrame) loop();
  }

  /* --- Star / Sparkle --- */
  function sparkle(x, y, count = 20) {
    if (!canvas) init();
    for (let i = 0; i < count; i++) {
      const angle = randomRange(0, Math.PI * 2);
      const speed = randomRange(1, 5);
      particles.push({
        type: 'spark',
        x: x ?? canvas.width / 2,
        y: y ?? canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: randomRange(1.5, 4),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
        decay: randomRange(0.015, 0.03)
      });
    }
    if (!animFrame) loop();
  }

  /* --- Full-screen Victory --- */
  function victoryExplosion() {
    if (!canvas) init();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    burstConfetti(cx, cy, 100);
    setTimeout(() => checkeredBurst(cx * 0.3, cy * 0.5), 200);
    setTimeout(() => burstConfetti(cx * 1.5, cy * 0.5, 80), 400);
    setTimeout(() => sparkle(cx, cy * 0.3, 40), 600);
  }

  /* --- Animation Loop --- */
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);

    if (particles.length === 0) {
      animFrame = null;
      return;
    }

    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);

      if (p.type === 'confetti') {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      else if (p.type === 'checker') {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.life -= p.decay;
        ctx.fillStyle = p.black ? '#000' : '#fff';
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.fillStyle = p.black ? '#fff' : '#000';
        ctx.fillRect(p.x + p.size/2, p.y, p.size/2, p.size/2);
        ctx.fillRect(p.x, p.y + p.size/2, p.size/2, p.size/2);
      }
      else if (p.type === 'smoke') {
        p.x += p.vx;
        p.y += p.vy;
        p.radius += p.grow;
        p.life -= p.decay;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      else if (p.type === 'spark') {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    }

    animFrame = requestAnimationFrame(loop);
  }

  return {
    burst: burstConfetti,
    checkered: checkeredBurst,
    smoke: exhaustSmoke,
    sparkle,
    victory: victoryExplosion,
    init
  };
})();
