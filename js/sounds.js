/* ============================================
   READING RUSH — Web Audio API Synthesized SFX
   No external audio files needed.
   ============================================ */

const SoundEngine = (() => {
    let ctx = null;

    function getCtx() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }

    function playTone(freq, duration, type = 'sine', volume = 0.3, ramp = true) {
        const c = getCtx();
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, c.currentTime);
        gain.gain.setValueAtTime(volume, c.currentTime);
        if (ramp) gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
        osc.connect(gain).connect(c.destination);
        osc.start(c.currentTime);
        osc.stop(c.currentTime + duration);
    }

    function correct() {
        const c = getCtx();
        const t = c.currentTime;
        [523, 659, 784, 1047].forEach((f, i) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, t + i * 0.1);
            gain.gain.setValueAtTime(0.25, t + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.3);
            osc.connect(gain).connect(c.destination);
            osc.start(t + i * 0.1);
            osc.stop(t + i * 0.1 + 0.3);
        });
    }

    function wrong() {
        const c = getCtx();
        const t = c.currentTime;
        [200, 180].forEach((f, i) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(f, t + i * 0.15);
            gain.gain.setValueAtTime(0.2, t + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.25);
            osc.connect(gain).connect(c.destination);
            osc.start(t + i * 0.15);
            osc.stop(t + i * 0.15 + 0.25);
        });
    }

    function buzzIn() {
        playTone(880, 0.15, 'sine', 0.3);
        setTimeout(() => playTone(1100, 0.15, 'sine', 0.25), 80);
    }

    function tick() {
        playTone(600, 0.06, 'sine', 0.15);
    }

    function turboBoost() {
        const c = getCtx();
        const t = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.4);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.connect(gain).connect(c.destination);
        osc.start(t);
        osc.stop(t + 0.5);
    }

    function nitro() {
        const c = getCtx();
        const t = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(2000, t + 0.6);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
        osc.connect(gain).connect(c.destination);
        osc.start(t);
        osc.stop(t + 0.7);
        setTimeout(() => playTone(1500, 0.1, 'sine', 0.15), 300);
    }

    function powerup() {
        const c = getCtx();
        const t = c.currentTime;
        [400, 500, 600, 800, 1000].forEach((f, i) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, t + i * 0.06);
            gain.gain.setValueAtTime(0.2, t + i * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.15);
            osc.connect(gain).connect(c.destination);
            osc.start(t + i * 0.06);
            osc.stop(t + i * 0.06 + 0.15);
        });
    }

    function countdown() {
        playTone(440, 0.2, 'square', 0.2);
    }

    function countdownGo() {
        const c = getCtx();
        const t = c.currentTime;
        [523, 784, 1047].forEach((f, i) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, t + i * 0.08);
            gain.gain.setValueAtTime(0.3, t + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
            osc.connect(gain).connect(c.destination);
            osc.start(t + i * 0.08);
            osc.stop(t + i * 0.08 + 0.3);
        });
    }

    function finishLine() {
        const c = getCtx();
        const t = c.currentTime;
        const notes = [523, 659, 784, 1047, 784, 1047, 1319, 1568];
        notes.forEach((f, i) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, t + i * 0.12);
            gain.gain.setValueAtTime(0.25, t + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.3);
            osc.connect(gain).connect(c.destination);
            osc.start(t + i * 0.12);
            osc.stop(t + i * 0.12 + 0.3);
        });
    }

    function engineRev() {
        const c = getCtx();
        const t = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.linearRampToValueAtTime(300, t + 0.3);
        osc.frequency.linearRampToValueAtTime(100, t + 0.6);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
        osc.connect(gain).connect(c.destination);
        osc.start(t);
        osc.stop(t + 0.7);
    }

    return {
        correct,
        wrong,
        buzzIn,
        tick,
        turboBoost,
        nitro,
        powerup,
        countdown,
        countdownGo,
        finishLine,
        engineRev
    };
})();
