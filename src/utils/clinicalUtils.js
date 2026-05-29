export const INITIAL_PATIENT_STATE = {
    vitals: {
        hr: 50,
        bp: { sys: 95, dia: 60 },
        sats: 96,
        resp: 20,
        temp: 36.5
    },
    labs: {
        k: 7.2,
        gl: 110,
        ph: 7.25,
        cpk: 85
    },
    physiology: {
        membraneStability: 0,
        fluidBalance: 0,
        kShiftIntensity: 0,
        isAlive: true,
        causeOfDeath: null
    }
};

export const getECGStage = (k, stability, direction = 'HYPER') => {
    // Se protegido (>40%), mascara a gravidade baseado na direção
    // UPDATE: Se estabilidade > 80 (Gluconato recente), força normalização visual (Stage 0)
    let effectiveK = k;

    if (stability > 80) {
        effectiveK = (direction === 'HYPO' ? Math.max(k, 3.5) : Math.min(k, 5.0)); // Força Normal
    } else if (stability > 40) {
        effectiveK = (direction === 'HYPO' ? Math.max(k, 3.0) : Math.min(k, 6.0)); // Melhora parcial
    }

    if (direction === 'HYPO') {
        // HIPOCALEMIA: K+ baixo
        if (effectiveK < 2.0) return -4;  // Torsades de Pointes (FATAL)
        if (effectiveK < 2.5) return -3;  // U Wave Gigante + QT Muito Longo
        if (effectiveK < 3.0) return -2;  // U Wave Visível + QT Longo
        if (effectiveK < 3.5) return -1;  // T Achatamento + U Wave Sutil
        return 0;  // Normal
    } else {
        // HIPERCALEMIA: K+ alto
        if (effectiveK <= 5.8) return 0;  // Normal
        if (effectiveK <= 6.5) return 1;  // T Apiculada (V2 Tented)
        if (effectiveK <= 7.5) return 2;  // Achatamento P + QRS Largo
        if (effectiveK <= 9.0) return 3;  // Sinoventricular / Fusão
        return 4;                         // Sine Wave (> 9.0)
    }
};
