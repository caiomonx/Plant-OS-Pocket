// ECG Vectors for Potassium Simulation - CLINICAL ACCURACY (DII, V2, V5)
// Scaled for ViewBox 0 -30 400 160 (Height 160, Baseline 50)

export const ecgPatterns = {
    // --- TORSADES DE POINTES [K < 2.0] - FATAL ---
    '-4': {
        DII: "M 0 50 L 5 30 L 10 70 L 15 30 L 20 70 L 25 40 L 30 65 L 35 35 L 40 60 L 45 30 L 50 70 L 55 25 L 60 75 L 65 20 L 70 80 L 75 30 L 80 70 L 85 40 L 90 60 L 95 45 L 100 50",
        V2: "M 0 50 L 5 25 L 10 75 L 15 20 L 20 80 L 25 30 L 30 70 L 35 25 L 40 75 L 45 20 L 50 80 L 55 15 L 60 85 L 65 10 L 70 90 L 75 20 L 80 80 L 85 30 L 90 70 L 95 40 L 100 50",
        V5: "M 0 50 L 5 35 L 10 65 L 15 30 L 20 70 L 25 35 L 30 65 L 35 30 L 40 70 L 45 25 L 50 75 L 55 20 L 60 80 L 65 25 L 70 75 L 75 35 L 80 65 L 85 40 L 90 60 L 95 45 L 100 50"
    },

    // --- SEVERE HYPOKALEMIA [K 2.0-2.5] - PRÉ-FATAL ---
    '-3': {
        DII: "M 0 50 L 10 50 Q 15 48 20 50 L 25 50 L 30 50 L 32 80 L 35 10 L 38 60 L 40 50 L 45 50 Q 50 60 55 50 L 60 50 Q 70 10 80 50 L 100 50",
        V2: "M 0 50 L 10 50 L 12 55 L 15 48 L 30 80 L 40 50 L 43 50 Q 48 62 53 50 L 58 50 Q 70 0 82 50 L 100 50", // GIANT U
        V5: "M 0 50 L 10 50 L 12 55 L 15 30 L 20 50 L 35 50 Q 43 60 51 50 L 58 50 Q 70 5 82 50 L 100 50"
    },

    // --- SEVERE HYPOKALEMIA [K < 3.0] ---
    // V2: GIANT U WAVE (> T Wave). T flattened/inverted.
    '-2': {
        DII: "M 0 50 L 10 50 Q 15 45 20 50 L 25 50 L 30 50 L 32 80 L 35 10 L 38 60 L 40 50 L 50 50 Q 60 55 70 50 L 75 50 Q 80 52 85 50 L 100 50",
        V2: "M 0 50 L 10 50 L 12 55 L 15 40 L 30 80 L 40 50 L 45 50 Q 55 60 65 50 L 70 50 Q 80 20 90 50 L 100 50", // Giant U
        V5: "M 0 50 L 10 50 L 12 55 L 15 20 L 20 50 L 40 50 Q 50 65 60 50 L 70 50 Q 80 55 90 50 L 100 50"
    },

    // --- MILD HYPOKALEMIA [K 3.0 - 3.4] ---
    // V2: Visible U Wave.
    '-1': {
        DII: "M 0 50 L 10 50 Q 15 45 20 50 L 25 50 L 30 50 L 32 80 L 35 10 L 38 60 L 40 50 L 60 50 Q 70 55 80 50 L 85 50 Q 90 52 95 50 L 100 50",
        V2: "M 0 50 L 10 50 L 12 55 L 15 45 L 30 80 L 40 50 L 50 50 Q 60 35 70 50 L 75 50 Q 85 40 95 50 L 100 50", // U visible
        V5: "M 0 50 L 10 50 L 12 55 L 15 25 L 20 50 L 40 50 Q 50 55 60 50 L 70 50 Q 80 55 90 50 L 100 50"
    },

    // --- NORMAL [K 3.5 - 5.8] ---
    // --- NORMAL [K 3.5 - 5.8] ---
    // --- NORMAL [K 3.5 - 5.8] ---
    0: {
        // DII: ST moderate (5 units). T narrower (width 16).
        // J(21,50) -> T_Start(26) -> T_Peak(34,25) -> T_End(42)
        DII: "M 0 50 L 3 50 Q 6 43 9 50 L 12 50 L 13 52 L 16 10 L 19 55 L 21 50 L 26 50 Q 34 25 42 50 L 100 50",

        // V2: rS. ST moderate (5 units). T narrower (width 15).
        // J(20,50) -> T_Start(25) -> T_Peak(32,35) -> T_End(40)
        V2: "M 0 50 L 12 50 L 14 40 L 17 85 L 20 50 L 25 50 Q 32 35 40 50 L 100 50",

        // V5: qR. ST moderate (5 units). T narrower (width 19).
        // J(20,50) -> T_Start(25) -> T_Peak(34,30) -> T_End(44)
        V5: "M 0 50 L 12 50 L 13 53 L 17 15 L 20 50 L 25 50 Q 34 30 44 50 L 100 50"
    },

    // --- MILD HYPER [K 5.9 - 6.5] ---
    // V2: Tented T (Narrow, Tall). DII: Subtle change.
    1: {
        DII: "M 0 50 L 10 50 Q 15 40 20 50 L 25 50 L 30 50 L 32 80 L 35 10 L 38 60 L 40 50 L 55 50 Q 65 25 75 50 L 100 50", // T slightly taller
        V2: "M 0 50 L 10 50 Q 15 45 20 50 L 25 50 L 27 50 L 29 45 L 35 90 L 40 50 L 50 50 L 60 0 L 70 50 L 100 50", // TENTED STARTS
        V5: "M 0 50 L 10 50 Q 15 45 20 50 L 25 50 L 27 55 L 30 15 L 35 50 L 50 50 L 60 20 L 70 50 L 100 50"
    },

    // --- MOD HYPER [K 6.6 - 7.5] ---
    // DII: P wave flattening (Low amplitude). QRS Widening.
    // V2: T Wave VERY Tall.
    2: {
        DII: "M 0 50 L 10 50 Q 15 48 20 50 L 25 50 L 30 50 L 35 80 L 40 10 L 45 60 L 50 50 L 65 50 Q 75 25 85 50 L 100 50", // Flat P
        V2: "M 0 50 L 10 50 Q 15 48 20 50 L 25 50 L 30 50 L 35 90 L 45 50 L 50 50 L 60 -20 L 70 50 L 100 50", // HUGE T
        V5: "M 0 50 L 10 50 L 25 50 L 35 90 L 45 30 L 55 50 L 65 50 L 75 20 L 85 50 L 100 50" // Wide QRS start
    },

    // --- SEVERE HYPER [K 7.6 - 9.0] ---
    // DII: No P wave. Wide QRS merging with T.
    // V2: QRS-T Fusion.
    3: {
        DII: "M 0 50 L 30 50 L 40 90 L 50 20 L 60 50 L 70 30 L 80 50 L 100 50", // Absent P, Bizarre
        V2: "M 0 50 L 20 50 L 40 100 L 60 -30 L 80 50 L 100 50", // Fusion
        V5: "M 0 50 L 20 50 L 40 90 L 60 10 L 80 50 L 100 50"
    },

    // --- CRITICAL / SINE WAVE [K > 9.0] ---
    4: {
        DII: "M 0 50 Q 25 0 50 50 Q 75 100 100 50",
        V2: "M 0 50 Q 25 -20 50 50 Q 75 120 100 50", // Larger amplitude
        V5: "M 0 50 Q 25 10 50 50 Q 75 90 100 50"
    }
};
