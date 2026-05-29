class DefibAudioSynth {
    constructor() {
        this.ctx = null;
        this.chargeOsc = null;
        this.chargeGain = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playChargeSound(durationMs = 4000) {
        this.init();
        this.stopChargeSound(); // Ensure no overlapping charges

        const duration = durationMs / 1000;
        
        // Oscillator for the whine
        this.chargeOsc = this.ctx.createOscillator();
        this.chargeOsc.type = 'sawtooth'; // Sawtooth gives that electronic buzz feel
        
        this.chargeGain = this.ctx.createGain();
        
        // Filter to make it sound like it's coming from a speaker
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 1.5;

        this.chargeOsc.connect(filter);
        filter.connect(this.chargeGain);
        this.chargeGain.connect(this.ctx.destination);

        // Pitch envelope: starts at 200Hz, goes up to 1800Hz
        this.chargeOsc.frequency.setValueAtTime(200, this.ctx.currentTime);
        this.chargeOsc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + duration);

        // Volume envelope: fades in slightly, then holds, then cuts off later
        this.chargeGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.chargeGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.5);
        this.chargeGain.gain.setValueAtTime(0.3, this.ctx.currentTime + duration - 0.1);
        this.chargeGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);

        this.chargeOsc.start();
        this.chargeOsc.stop(this.ctx.currentTime + duration);
    }

    stopChargeSound() {
        if (this.chargeOsc) {
            try {
                this.chargeOsc.stop();
                this.chargeOsc.disconnect();
            } catch (e) {}
            this.chargeOsc = null;
        }
    }

    playShockSound() {
        this.init();
        this.stopChargeSound();

        const now = this.ctx.currentTime;

        // 1. The mechanical "thud" (Low frequency sine wave drop)
        const thudOsc = this.ctx.createOscillator();
        const thudGain = this.ctx.createGain();
        thudOsc.type = 'sine';
        thudOsc.connect(thudGain);
        thudGain.connect(this.ctx.destination);

        thudOsc.frequency.setValueAtTime(150, now);
        thudOsc.frequency.exponentialRampToValueAtTime(40, now + 0.1); // Drop pitch fast
        
        thudGain.gain.setValueAtTime(1, now);
        thudGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2); // Fade out fast

        thudOsc.start(now);
        thudOsc.stop(now + 0.2);

        // 2. The electrical "crack/zap" (Filtered White Noise)
        const bufferSize = this.ctx.sampleRate * 0.2; // 0.2 seconds of noise
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(1.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noise.start(now);
    }
}

export const defibAudio = new DefibAudioSynth();
