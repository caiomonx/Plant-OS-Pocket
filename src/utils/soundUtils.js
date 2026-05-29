/**
 * Singleton Audio Context & Master Gain
 */
let sharedAudioCtx = null;
let masterGainNode = null;

export const initAudioContext = () => {
    if (!sharedAudioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            sharedAudioCtx = new AudioContext();

            // Initialize Master Gain Node
            masterGainNode = sharedAudioCtx.createGain();
            masterGainNode.connect(sharedAudioCtx.destination);
            masterGainNode.gain.value = 1;
        }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
        sharedAudioCtx.resume().catch(e => console.warn("Audio resume failed", e));
    }
    return sharedAudioCtx;
};

// Internal reference for the file
const getAudioContext = initAudioContext;

/**
 * Stops all currently playing generated sounds with a fast fade-out.
 */
export const stopAllGeneratedSounds = () => {
    if (!sharedAudioCtx || !masterGainNode) return;

    try {
        const t = sharedAudioCtx.currentTime;
        const dyingNode = masterGainNode;

        // Cancel any future scheduled changes
        dyingNode.gain.cancelScheduledValues(t);

        // Fast fade-out (200ms) to avoid clipping/pops
        // The current value ensures smooth transition if it was already changing
        dyingNode.gain.setValueAtTime(dyingNode.gain.value, t);
        dyingNode.gain.linearRampToValueAtTime(0, t + 0.2);

        // Create a FRESH master node IMMEDIATELY so any new sounds 
        // scheduled right after this will use the new node and not be faded out!
        masterGainNode = sharedAudioCtx.createGain();
        masterGainNode.connect(sharedAudioCtx.destination);
        masterGainNode.gain.value = 1;

        // After fade-out completes, disconnect the old node
        setTimeout(() => {
            dyingNode.disconnect();
        }, 250);

    } catch (e) {
        console.warn("Error stopping generated sounds:", e);
    }
};

/**
 * playSentinelAlarm
 * Cardiac monitor alarm for sentinel events in Plans B and C.
 * Plays 3 pairs of urgent double-beeps (like a hospital monitor alarm).
 */
export const playSentinelAlarm = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Frequency: 880 Hz (A5) — classic medical monitor pitch
    // Pattern: 3 groups of 2 beeps, with short gap between groups
    const beepDuration = 0.08;
    const beepGap = 0.06;      // gap between pair
    const groupGap = 0.32;      // gap between groups
    const vol = 0.18;

    const scheduleBeep = (startTime) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = 880;

        osc.connect(gain);
        gain.connect(masterGainNode);

        // Sharp attack (0.01s), hold, sharp release — medical monitor style
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
        gain.gain.setValueAtTime(vol, startTime + beepDuration - 0.01);
        gain.gain.linearRampToValueAtTime(0, startTime + beepDuration);

        osc.start(startTime);
        osc.stop(startTime + beepDuration + 0.05);

        osc.onended = () => {
            osc.disconnect();
            gain.disconnect();
        };
    };

    // Schedule 3 groups × 2 beeps
    for (let group = 0; group < 3; group++) {
        const groupStart = t + 0.1 + group * (2 * beepDuration + beepGap + groupGap);
        scheduleBeep(groupStart);
        scheduleBeep(groupStart + beepDuration + beepGap);
    }
};

/**
 * playPhoneRing
 */
export const playPhoneRing = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    const playTone = (freq, startTime, duration, type = 'square') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);

        // Connect to Master Gain instead of destination
        gain.connect(masterGainNode);

        osc.type = type;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.linearRampToValueAtTime(0.05, startTime + duration - 0.05);
        gain.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.start(startTime);
        osc.stop(startTime + duration);

        osc.onended = () => {
            osc.disconnect();
            gain.disconnect();
        };
    };

    const riff = (start) => {
        const speed = 0.12;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            playTone(freq, start + (i * speed), (i === 3 ? speed * 2 : speed), 'sine');
        });

        const gap = 0.6;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            playTone(freq, start + gap + (i * speed), (i === 3 ? speed * 2 : speed), 'sine');
        });
    };

    riff(t + 0.1);
    riff(t + 3.0);
};

/**
 * playQrsBeep
 * Short, high-pitched sine wave to simulate a standard clinical monitor beep.
 */
export const playQrsBeep = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(masterGainNode);

    osc.type = 'sine';
    osc.frequency.value = 750; // Pitch of the beep (700-800Hz is typical)

    const beepDuration = 0.08;
    const vol = 0.12;

    // Sharp attack, hold, sharp release
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.setValueAtTime(vol, t + beepDuration - 0.01);
    gain.gain.linearRampToValueAtTime(0, t + beepDuration);

    osc.start(t);
    osc.stop(t + beepDuration + 0.05);

    osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
    };
};

/**
 * playOutcomeSound
 */
export const playOutcomeSound = (type) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;

    // Unified Note Player
    // Handles 'blip', 'sad_flute', and 'flatline' styles
    const playNote = (note, startTime) => {
        const { f: freq, d: duration, style = 'normal', v: vol = 0.1 } = note;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);

        // Connect to Master Gain instead of destination
        gain.connect(masterGainNode);

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, startTime);

        // Define stop time based on style (allowing tails)
        let stopTime = startTime + duration + 0.1;

        if (style === 'sad_flute') {
            // Flute-like: Soft Attack (0.1s), Sustain, Soft Release
            // Protection against incredibly short notes
            const attack = Math.min(0.1, duration * 0.3);
            const release = Math.min(0.1, duration * 0.3);

            gain.gain.linearRampToValueAtTime(vol, startTime + attack);
            gain.gain.setValueAtTime(vol, startTime + duration - release);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);

        } else if (style === 'chiptune') {
            // 8-bit Chiptune: Square Wave + Low-Pass Filter (800Hz)
            // Goal: Nostalgic, soft, "aveludado" (not harsh)
            osc.type = 'square';

            // Create low-pass filter to soften the square wave
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800; // Cutoff frequency
            filter.Q.value = 1; // Resonance

            // Reconnect audio graph: osc -> filter -> gain -> destination
            osc.disconnect();
            osc.connect(filter);
            filter.connect(gain);

            // Short attack (0.05s), sustain, soft release (0.3s)
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
            gain.gain.setValueAtTime(vol, startTime + duration - 0.3);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);

            stopTime = startTime + duration + 0.1;

        } else if (style === 'sad_bell') {
            // Piano/Bell Decay: Sine Wave, Quick Attack, Exponential Decay
            // Goal: "Pimmm..." not "BEEP"
            osc.type = 'sine'; // Override to sine for softness

            // Quick but smooth attack (0.02s - no click)
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.02);

            // Exponential decay from peak to silence over note duration
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            // Allow natural decay to finish
            stopTime = startTime + duration + 0.1;

        } else if (style === 'sad_instrument') {
            // Sad Instrument (Flute/Violin Hybrid): Triangle Wave, Soft Attack, Sustained
            osc.type = 'triangle';
            // Attack (0.1s - Soft/Crying) -> Sustain -> Release (1.5s)
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.15); // Slower attack for emotion
            gain.gain.setValueAtTime(vol, startTime + duration - 0.1);
            gain.gain.linearRampToValueAtTime(0, startTime + duration + 1.5); // Long melancholy tail

            // Allow tail to ring out
            stopTime = startTime + duration + 1.6;

        } else if (style === 'sustained') {
            // Sustained Beep (Medical Alarm Style)
            // Instant attack, Hold volume, Instant release.
            // No "swelling" (Ocarina) and no "plucking" (8-bit).
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.02);
            gain.gain.setValueAtTime(vol, startTime + duration - 0.02);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);

        } else if (style === 'polyphonic') {
            // POLYPHONIC SYNTHESIS - Melody + Bass Harmony
            // Goal: Create emotional depth through harmonic richness
            // Channel 1 (Melody): Triangle wave + LowPass filter
            // Channel 2 (Bass): Sine wave (2 octaves lower, 40% volume)

            try {
                // Melody Channel Setup
                osc.type = 'triangle';
                osc.frequency.value = freq;

                // Create LowPass filter for melody (removes digital harshness)
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 1000; // Cutoff at 1kHz
                filter.Q.value = 1;

                // Reconnect: osc -> filter -> gain -> destination
                osc.disconnect();
                osc.connect(filter);
                filter.connect(gain);

                // Bass Channel Setup (Harmony)
                const bassOsc = ctx.createOscillator();
                const bassGain = ctx.createGain();

                bassOsc.type = 'sine';
                bassOsc.frequency.value = freq / 4; // 2 octaves lower
                bassOsc.connect(bassGain);

                // Connect to Master Gain instead of destination
                bassGain.connect(masterGainNode);

                bassGain.gain.value = vol * 0.4; // 40% of melody volume

                // Envelope: Slow attack, long release (Legato feel)
                const attack = 0.1;
                const release = 0.8;

                // Melody envelope
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(vol, startTime + attack);
                gain.gain.setValueAtTime(vol, startTime + duration - release);
                gain.gain.linearRampToValueAtTime(0, startTime + duration);

                // Bass envelope (same timing)
                bassGain.gain.setValueAtTime(0, startTime);
                bassGain.gain.linearRampToValueAtTime(vol * 0.4, startTime + attack);
                bassGain.gain.setValueAtTime(vol * 0.4, startTime + duration - release);
                bassGain.gain.linearRampToValueAtTime(0, startTime + duration);

                // Start bass oscillator
                bassOsc.start(startTime);
                bassOsc.stop(startTime + duration);

                stopTime = startTime + duration + 1.0; // Allow release tail

                // Cleanup
                bassOsc.onended = () => {
                    bassOsc.disconnect();
                    bassGain.disconnect();
                };
            } catch (e) {
                console.error("Audio Error in Polyphonic block:", e);
            }

        } else if (style === 'monitor') {
            // Monitor Style: Standard Medical Alarm
            // Attack 0.01s (Crisp but not clicky), Sustain Full, Release 0.01s
            const attack = 0.01;
            const release = 0.01;

            gain.gain.linearRampToValueAtTime(vol, startTime + attack);
            gain.gain.setValueAtTime(vol, startTime + duration - release);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);

        } else if (style === 'flatline') {
            // Flatline: INSTANT Attack (Monitor Style), Hold, Long Fade Out
            gain.gain.linearRampToValueAtTime(0.05, startTime + 0.05);
            gain.gain.setValueAtTime(0.05, startTime + duration - 1.0);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);

        } else {
            // Normal (Blip): Sharp Attack, Decay
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        }

        osc.start(startTime);
        osc.stop(stopTime);

        osc.onended = () => {
            osc.disconnect();
            gain.disconnect();
        };
    };

    // --- SEQUENCER ---
    let notes = [];

    console.log(`[Sound] Playing outcome: ${type}`);

    if (type === 'success') {
        const m = 2; // Octave Shift
        notes = [
            // Intro
            { f: 523.25 * m, d: 0.10, wait: 0.12 },
            { f: 523.25 * m, d: 0.10, wait: 0.12 },
            { f: 523.25 * m, d: 0.10, wait: 0.12 },
            { f: 523.25 * m, d: 0.40, wait: 0.50 }, // Target
            // Bridge
            { f: 415.30 * m, d: 0.20, wait: 0.25 }, // G#
            { f: 466.16 * m, d: 0.20, wait: 0.25 }, // Bb
            // End
            { f: 523.25 * m, d: 0.12, wait: 0.15 }, // C
            { f: 466.16 * m, d: 0.12, wait: 0.15 }, // Bb
            { f: 523.25 * m, d: 0.80, wait: 1.0 }  // High C
        ];

    } else if (type === 'neutral') {
        notes = [
            { f: 523.25, d: 0.2, wait: 0.3 },
            { f: 523.25, d: 0.2, wait: 0.3 }
        ];

    } else if (type === 'failure') {
        console.log('[Sound] ========== DEFEAT SOUND TRIGGERED ==========');
        console.log('[Sound] Audio Context State:', ctx.state);

        // SADNESS AND SORROW - TRUE POLYPHONIC VERSION
        // Recreating the emotional depth of the Naruto OST
        // BPM: 60 (Adagio - Very slow and expressive)
        // 
        // ARCHITECTURE:
        // - Melody Channel: Triangle wave + LowPass filter (1kHz) - "The Cry"
        // - Bass Channel: Sine wave holding chord tones - "The Depth"
        //
        // The bass doesn't follow the melody. It holds sustained chord roots
        // like a left hand on a piano, creating harmonic foundation.

        const v = 0.08; // Melody volume (reduced for subtlety)
        const overlap = 0.05; // Legato overlap for smooth transitions

        // --- MELODY NOTES (Right Hand) ---
        const melodyNotes = [
            // PHRASE 1: Em chord (Bass holds E2)
            { f: 392.00, d: 0.3, wait: 0.3 - overlap },  // G4
            { f: 370.00, d: 0.3, wait: 0.3 - overlap },  // F#4
            { f: 392.00, d: 0.3, wait: 0.3 - overlap },  // G4
            { f: 440.00, d: 0.8, wait: 1.0 },            // A4 (sustained)

            // PHRASE 2: C chord resolution (Bass changes to C3)
            { f: 392.00, d: 0.3, wait: 0.3 - overlap },  // G4
            { f: 370.00, d: 0.3, wait: 0.3 - overlap },  // F#4
            { f: 329.63, d: 2.0, wait: 2.5 },            // E4 (very long, sad)

            // PHRASE 3: Em climax (Bass returns to E2)
            { f: 293.66, d: 0.4, wait: 0.4 - overlap },  // D4
            { f: 329.63, d: 0.4, wait: 0.4 - overlap },  // E4
            { f: 370.00, d: 0.4, wait: 0.4 - overlap },  // F#4
            { f: 392.00, d: 0.4, wait: 0.4 - overlap },  // G4
            { f: 440.00, d: 0.4, wait: 0.4 - overlap },  // A4
            { f: 493.88, d: 2.5, wait: 3.0 }             // B4 (climax - long fade)
        ];

        // --- BASS HARMONY (Left Hand) ---
        // These are sustained chord tones that change with the harmony
        const bassNotes = [
            // Phrase 1: Hold Em (E2) for 1.9s
            { f: 82.41, d: 1.9, wait: 1.9 },   // E2 (Em chord root)

            // Phrase 2: Hold C (C3) for 3.1s (the sad resolution)
            { f: 130.81, d: 3.1, wait: 3.1 },  // C3 (C chord root)

            // Phrase 3: Return to Em (E2) for the climax (3.5s)
            { f: 82.41, d: 3.5, wait: 3.5 }    // E2 (Em chord root)
        ];

        try {
            console.log('[Sound] Creating melody oscillators...');

            // --- PLAY MELODY CHANNEL ---
            let melodyCursor = t + 0.2;
            melodyNotes.forEach((note, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                // Setup: Triangle wave for flute-like quality
                osc.type = 'triangle';
                osc.frequency.value = note.f;

                // LowPass filter to remove digital harshness
                filter.type = 'lowpass';
                filter.frequency.value = 1000; // 1kHz cutoff
                filter.Q.value = 1;

                // Audio graph: osc -> filter -> gain -> masterGainNode
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(masterGainNode);

                // Envelope: Slow attack (0.1s), long release (0.8s)
                // CRITICAL FIX: Ensure release doesn't exceed note duration
                const attack = Math.min(0.1, note.d * 0.3);
                const release = Math.min(0.8, note.d * 0.5);
                const startTime = melodyCursor;
                const stopTime = startTime + note.d + release;

                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(v, startTime + attack);
                gain.gain.setValueAtTime(v, startTime + note.d - release);
                gain.gain.linearRampToValueAtTime(0, startTime + note.d);

                osc.start(startTime);
                osc.stop(stopTime);

                osc.onended = () => {
                    osc.disconnect();
                    filter.disconnect();
                    gain.disconnect();
                };

                console.log(`[Melody] Note ${idx}: ${note.f.toFixed(2)}Hz at ${startTime.toFixed(2)}s`);
                melodyCursor += note.wait;
            });

            console.log('[Sound] Creating bass oscillators...');

            // --- PLAY BASS CHANNEL ---
            let bassCursor = t + 0.2;
            bassNotes.forEach((note, idx) => {
                const bassOsc = ctx.createOscillator();
                const bassGain = ctx.createGain();

                // Setup: Pure sine wave for deep, clean bass
                bassOsc.type = 'sine';
                bassOsc.frequency.value = note.f;

                bassOsc.connect(bassGain);
                bassGain.connect(masterGainNode);

                // Envelope: Same timing as melody, but 40% volume
                // CRITICAL FIX: Ensure release doesn't exceed note duration
                const attack = Math.min(0.1, note.d * 0.3);
                const release = Math.min(0.8, note.d * 0.5);
                const startTime = bassCursor;
                const stopTime = startTime + note.d + release;
                const bassVol = v * 0.4; // 40% of melody volume

                bassGain.gain.setValueAtTime(0, startTime);
                bassGain.gain.linearRampToValueAtTime(bassVol, startTime + attack);
                bassGain.gain.setValueAtTime(bassVol, startTime + note.d - release);
                bassGain.gain.linearRampToValueAtTime(0, startTime + note.d);

                bassOsc.start(startTime);
                bassOsc.stop(stopTime);

                bassOsc.onended = () => {
                    bassOsc.disconnect();
                    bassGain.disconnect();
                };

                console.log(`[Bass] Chord ${idx}: ${note.f.toFixed(2)}Hz at ${startTime.toFixed(2)}s for ${note.d}s`);
                bassCursor += note.wait;
            });

            console.log('[Sound] ========== DEFEAT SOUND SCHEDULED ==========');
        } catch (error) {
            console.error('[Sound] ERROR creating defeat sound:', error);
        }

        // Skip the normal sequencer (we handled everything above)
        notes = [];
    }

    console.log(`[Sound] Playlist Length: ${notes.length} notes.`);

    // Execute Sequence
    let cursor = t + 0.2;
    notes.forEach((n, idx) => {
        console.log(`[Sound] Scheduling Note ${idx}: Freq=${n.f} Start=${cursor.toFixed(2)} Duration=${n.d}`);
        playNote(n, cursor);
        cursor += n.wait;
    });

    console.log(`[Sound] Total Sequence Duration: ${(cursor - t).toFixed(2)}s`);
};
