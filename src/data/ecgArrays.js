// High-Fidelity ECG Generation
// Resolution: 500 points per beat for smooth curves (subsampled by canvas if needed)
// Baseline: 50. Range: 0 (top) to 100 (bottom). Inverted logic for canvas Y.

const POINTS_PER_BEAT = 500;

// Helper: Gaussian function for smooth waves
// x: current index
// pos: peak position (0-1 relative to beat duration)
// width: spread (variance)
// amp: amplitude (height)
const gaussian = (x, pos, width, amp) => {
    const center = pos * POINTS_PER_BEAT;
    const spread = width * POINTS_PER_BEAT;
    return amp * Math.exp(-Math.pow(x - center, 2) / (2 * Math.pow(spread, 2)));
};

// Helper: Generate a full beat array
const generateComplexBeat = ({
    pWave = { pos: 0.15, width: 0.04, amp: 5 },
    qrs = { pos: 0.4, width: 0.02, amp: 30 }, // Narrow QRS default
    tWave = { pos: 0.7, width: 0.08, amp: 10 },
    uWave = null, // NEW: U Wave for hypokalemia
    isSineWave = false,
    noiseLevel = 0.5
}) => {
    const beat = [];
    for (let i = 0; i < POINTS_PER_BEAT; i++) {
        let y = 50; // Baseline

        if (isSineWave) {
            // Pure Sine Wave Logic for Critical (Stage 4)
            // Slow large undulation
            y -= Math.sin((i / POINTS_PER_BEAT) * Math.PI * 2) * 35;
        } else {
            // P Wave
            if (pWave) {
                y -= gaussian(i, pWave.pos, pWave.width, pWave.amp);
            }

            // QRS Complex
            // Q (small dip)
            y += gaussian(i, qrs.pos - (qrs.width * 0.8), qrs.width * 0.5, qrs.amp * 0.1);
            // R (main spike)
            y -= gaussian(i, qrs.pos, qrs.width, qrs.amp);
            // S (small dip)
            y += gaussian(i, qrs.pos + (qrs.width * 0.8), qrs.width * 0.6, qrs.amp * 0.2);

            // T Wave
            if (tWave) {
                // T wave is often slightly asymmetric, here approximated by gaussian
                y -= gaussian(i, tWave.pos, tWave.width, tWave.amp);
            }

            // U Wave (NEW - for hypokalemia)
            if (uWave) {
                y -= gaussian(i, uWave.pos, uWave.width, uWave.amp);
            }
        }

        // Add Noise (EMG/Baseline wander)
        y += (Math.random() - 0.5) * noiseLevel;

        beat.push(y);
    }
    return beat;
};


// --- DEFINING CLINICAL STAGES ---

// Stage 0: Normal Sinus Rhythm
// P present, Narrow QRS, Normal T
const stage0 = generateComplexBeat({
    pWave: { pos: 0.15, width: 0.035, amp: 4 },
    qrs: { pos: 0.35, width: 0.015, amp: 35 }, // Very Narrow
    tWave: { pos: 0.65, width: 0.07, amp: 8 }   // Normal, rounded
});

// Stage 1: Mild (Peaked T)
// T wave amplitude increases significantly, width decreases (tented)
// QT shortens slightly (T pos moves left)
const stage1 = generateComplexBeat({
    pWave: { pos: 0.15, width: 0.035, amp: 4 }, // Normal P
    qrs: { pos: 0.35, width: 0.015, amp: 35 }, // Normal QRS
    tWave: { pos: 0.60, width: 0.045, amp: 22 } // TALLL & Narrower (Peaked)
});

// Stage 2: Moderate (Wide QRS, Flat P)
// P wave flattens (amp down, width up)
// QRS widens
// T still peaked
const stage2 = generateComplexBeat({
    pWave: { pos: 0.15, width: 0.06, amp: 1.5 }, // Flat/Wide P
    qrs: { pos: 0.38, width: 0.04, amp: 30 },    // Wider QRS
    tWave: { pos: 0.65, width: 0.05, amp: 20 }   // Peaked
});

// Stage 3: Severe (Sinoventricular)
// No P wave
// QRS Very Wide & Bizarre, merging into T
const stage3 = generateComplexBeat({
    pWave: null, // Absent
    qrs: { pos: 0.4, width: 0.08, amp: 25 },     // VERY Wide
    tWave: { pos: 0.7, width: 0.08, amp: 15 }    // Merging
});

// Stage 4: Critical (Sine Wave)
// Single varying oscillation
const stage4 = generateComplexBeat({
    isSineWave: true
});

// --- HYPOKALEMIA STAGES (Negative) ---

// Stage -1: Mild Hypokalemia (K+ 3.0-3.5)
// T wave flattening, subtle U wave appearance
const stageMinus1 = generateComplexBeat({
    pWave: { pos: 0.15, width: 0.035, amp: 4 },
    qrs: { pos: 0.35, width: 0.015, amp: 35 },
    tWave: { pos: 0.65, width: 0.09, amp: 4 },  // FLATTENED T
    uWave: { pos: 0.80, width: 0.06, amp: 2 }   // Subtle U Wave (NEW parameter)
});

// Stage -2: Moderate Hypokalemia (K+ 2.5-3.0)
// Prominent U wave (> T wave), QT prolongation
const stageMinus2 = generateComplexBeat({
    pWave: { pos: 0.15, width: 0.035, amp: 4 },
    qrs: { pos: 0.35, width: 0.015, amp: 35 },
    tWave: { pos: 0.62, width: 0.10, amp: 3 },  // Very flat T
    uWave: { pos: 0.78, width: 0.08, amp: 8 }   // PROMINENT U Wave
});

// Stage -3: Severe Hypokalemia (K+ 2.0-2.5)
// GIANT U wave, QT very prolonged, occasional PVCs
// This represents the "still alive but critical" state
const stageMinus3 = generateComplexBeat({
    pWave: { pos: 0.15, width: 0.035, amp: 4 },
    qrs: { pos: 0.35, width: 0.015, amp: 35 },
    tWave: { pos: 0.60, width: 0.12, amp: 2 },   // Almost invisible T
    uWave: { pos: 0.80, width: 0.12, amp: 15 }   // GIANT U Wave (> QRS!)
});

// Stage -4: Torsades de Pointes (K+ < 2.0) - FATAL ARRHYTHMIA
// Polymorphic ventricular tachycardia with "twisting" pattern
// This is the death animation
// Helper function for Torsades pattern
const generateTorsades = () => {
    const points = [];
    for (let i = 0; i < POINTS_PER_BEAT; i++) {
        const phase = (i / POINTS_PER_BEAT) * Math.PI * 6; // 3 complete twists per beat
        const amplitude = 30 + 15 * Math.sin((i / POINTS_PER_BEAT) * Math.PI * 2); // Varying amplitude
        const twist = amplitude * Math.sin(phase);
        const baseline = 50;
        points.push(baseline - twist + (Math.random() - 0.5) * 2); // Added chaos
    }
    return points;
};

const stageMinus4 = generateTorsades();

export const ecgArrays = {
    '-4': stageMinus4,  // Torsades de Pointes (FATAL)
    '-3': stageMinus3,  // U Wave Gigante (Pré-Fatal)
    '-2': stageMinus2,  // U Wave Proeminente
    '-1': stageMinus1,  // T Achatado + U sutil
    0: stage0,
    1: stage1,
    2: stage2,
    3: stage3,
    4: stage4
};
