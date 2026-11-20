/*
  useEcoSound — Web Audio API synthesized eco-friendly sound.
  No external files needed. Generates a gentle C-major pentatonic chime
  layered with a soft wind-like noise burst.
*/
export function useEcoSound() {
  const playWelcomeChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      // ── Gentle pentatonic chime: C4 E4 G4 A4 C5 ──────────────────────
      const notes = [261.63, 329.63, 392.00, 440.00, 523.25];
      notes.forEach((freq, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        // Slight reverb using delay
        const delay = ctx.createDelay(0.4);
        const delayGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Pluck envelope: fast attack, slow decay
        const t = ctx.currentTime + i * 0.18;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

        // Delay echo
        delay.delayTime.value = 0.22;
        delayGain.gain.value = 0.18;

        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 2.0);
      });

      // ── Soft wind breath (filtered white noise) ───────────────────────
      const bufferSize = ctx.sampleRate * 0.8;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) data[j] = Math.random() * 2 - 1;

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const bpf = ctx.createBiquadFilter();
      bpf.type = 'bandpass';
      bpf.frequency.value = 400;
      bpf.Q.value = 0.4;

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0, ctx.currentTime);
      windGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
      windGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      noiseSource.connect(bpf);
      bpf.connect(windGain);
      windGain.connect(ctx.destination);
      noiseSource.start(ctx.currentTime);
      noiseSource.stop(ctx.currentTime + 1.0);

      // ── Low warm drone (earthy bass) ──────────────────────────────────
      const drone = ctx.createOscillator();
      const droneGain = ctx.createGain();
      drone.type = 'triangle';
      drone.frequency.value = 65.41; // C2 — deep earth tone
      droneGain.gain.setValueAtTime(0, ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.2);
      droneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      drone.connect(droneGain);
      droneGain.connect(ctx.destination);
      drone.start(ctx.currentTime);
      drone.stop(ctx.currentTime + 2.8);

    } catch (e) {
      // Audio not supported silently ignored
    }
  };

  return { playWelcomeChime };
}
