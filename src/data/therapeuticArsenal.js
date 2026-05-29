/**
 * ARSENAL TERAPÊUTICO GLOBAL
 * 
 * Este arquivo contém TODOS os medicamentos e fluidos disponíveis no simulador.
 * O arsenal é o mesmo para todos os casos - o desafio é escolher os corretos!
 * 
 * Organização: EV → Nebulização → Oral
 */

export const GLOBAL_MEDICATIONS = [
    // ==========================================
    // MEDICAMENTOS ENDOVENOSOS (EV)
    // ==========================================

    // Sedativos / Benzodiazepínicos
    {
        id: "drug_diazepam_iv",
        label: "Diazepam EV",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        drugConfig: {
            concentration: 5, // 10mg em 2mL
            ampuleVolume: 2,
            contentPerAmpule: 10,
            unit: 'mg',
            maxSafeConcentration: 5,
            isBolusAllowed: true,
            recommendedPreparation: { drug: 2, diluent: 0 },
            presentationLabel: "Ampola 2mL = 10mg"
        },
        resultLog: "Diazepam administrado EV lento.",
    },

    // Corticoides
    {
        id: "drug_methylprednisolone",
        label: "Metilprednisolona (Solu-Medrol)",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        drugConfig: {
            concentration: 62.5, // 125mg / 2mL
            ampuleVolume: 2,
            contentPerAmpule: 125,
            unit: 'mg',
            maxSafeConcentration: 125,
            isBolusAllowed: true,
            recommendedPreparation: { drug: 2, diluent: 0 },
            presentationLabel: "Frasco-ampola 125mg"
        },
        resultLog: "Metilprednisolona administrada.",
    },
    {
        id: "drug_hydrocortisone",
        label: "Hidrocortisona",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        drugConfig: {
            concentration: 250, // 500mg em 2ml
            ampuleVolume: 2,
            contentPerAmpule: 500,
            unit: 'mg',
            maxSafeConcentration: 250,
            isBolusAllowed: true,
            recommendedPreparation: { drug: 2, diluent: 0 },
            presentationLabel: "Frasco-ampola 500mg"
        },
        resultLog: "Hidrocortisona administrada.",
    },

    // Estabilização de Membrana (Hipercalemia)
    {
        id: "drug_calcium",
        label: "Gluconato de Cálcio 10%",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        potency: 0.0, // Effect is on membrane, not K+ levels
        drugConfig: {
            concentration: 0.1,      // g/mL (10% = 100mg/mL = 0.1g/mL)
            ampuleVolume: 10,        // mL por ampola
            contentPerAmpule: 1,     // g
            unit: 'g',
            maxSafeConcentration: 0.1, // Pode ser feito puro (10% = 0.1g/mL)
            isBolusAllowed: true,      // Permite administração sem diluição
            recommendedPreparation: { drug: 10, diluent: 0 }, // Puro
            presentationLabel: "Ampola 10mL = 1g"
        },
        resultLog: "Gluconato de Cálcio administrado. Estabilização de membrana cardíaca.",
        effectDuration: 30
    },

    // Shift de Potássio (Hipercalemia)
    {
        id: "drug_polarizing",
        label: "Solução Polarizante (Insulina + Glicose)",
        type: "Drogas",
        icon: "syringe",
        cost: 3,
        requiresIV: true,
        potency: 1.0, // Baseline for Shift. Can be boosted by Dose in Engine.
        resultLog: "Solução Polarizante em preparo.",
        effectDuration: 240
    },

    // Reposição de Potássio (Hipocalemia)
    {
        id: "drug_kcl_iv",
        label: "Cloreto de Potássio 19,1%",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        drugConfig: {
            concentration: 2.5,      // mEq/mL
            ampuleVolume: 10,        // mL por ampola
            contentPerAmpule: 25,    // mEq
            unit: 'mEq',
            maxSafeConcentration: 0.1, // 10 mEq/100mL = 0.1 mEq/mL (Muito diluído) - Wait, logic in modal uses mEq/100mL.
            // Let's stick to the modal logic: "Concentration (mEq/100mL)"
            // Max safe is 10 mEq/100mL (periphery).
            isBolusAllowed: false,    // KCl JAMAIS deve ser feito em bolus/puro
            recommendedPreparation: { drug: 4, diluent: 96 },
            presentationLabel: "Ampola 10mL = 25mEq totais"
        },
        resultLog: "KCl 19,1% em infusão controlada via periférica.",
        effectDuration: 60
    },

    // Diuréticos (Hipercalemia)
    {
        id: "drug_furosemide",
        label: "Furosemida",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        potency: 0.5, // New: Standardized Elimination Power
        drugConfig: {
            concentration: 10,       // mg/mL
            ampuleVolume: 2,         // mL por ampola
            contentPerAmpule: 20,    // mg
            unit: 'mg',
            maxSafeConcentration: 10, // mg/mL (Puro é 10mg/mL)
            isBolusAllowed: true,    // Comum ser feito puro
            recommendedPreparation: { drug: 2, diluent: 0 }, // Puro
            presentationLabel: "Ampola 2mL = 20mg"
        },
        resultLog: "Furosemida administrada.",
        effectDuration: 120
    },

    // Correção de Magnésio
    {
        id: "drug_magnesium",
        label: "Sulfato de Magnésio 10%",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true, // Agora usa IVPreparationModal
        potency: 0.1, // Mild protective effect or irrelevant for K+
        drugConfig: {
            concentration: 0.1,      // g/mL (10% = 100mg/mL = 0.1g/mL)
            ampuleVolume: 10,        // mL por ampola
            contentPerAmpule: 1,     // g
            unit: 'g',
            maxSafeConcentration: 0.01, // 1g/100mL = 1% = 0.01 g/mL. Puro é 10% (0.1 g/mL).
            // MgSO4 puro causa flebite e hipotensão. Deve diluir.
            isBolusAllowed: false,   // Recomendado diluir
            recommendedPreparation: { drug: 10, diluent: 100 }, // 1g em 100mL
            presentationLabel: "Ampola 10mL = 1g (10%)"
        },
        resultLog: "Sulfato de Magnésio administrado.",
        effectDuration: 240
    },

    // Vitamina (Wernicke Prevention)
    {
        id: "drug_thiamine",
        label: "Tiamina (B1)",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        drugConfig: {
            concentration: 50,      // mg/mL
            ampuleVolume: 2,        // mL
            contentPerAmpule: 100,  // mg (50*2)
            unit: "mg",
            maxSafeConcentration: 2, // Diluted 100mg in 100mL = 1mg/mL
            isBolusAllowed: false,   // Infusão lenta (30-60min)
            recommendedPreparation: { drug: 4, diluent: 100 }, // 2 Ampolas (4mL) + 100mL SF
            presentationLabel: "Ampola 2mL = 100mg (50mg/mL)"
        },
        resultLog: "Tiamina (B1) em infusão (30-60min). Profilaxia de Wernicke.",
        effectDuration: 360
    },

    // Antieméticos
    {
        id: "drug_ondansetron",
        label: "Ondansetrona (Vonau)",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        drugConfig: {
            concentration: 2,       // mg/mL
            ampuleVolume: 2,        // mL
            contentPerAmpule: 4,    // mg (2mg/ml * 2ml)
            unit: "mg",
            maxSafeConcentration: 0.1, // 8mg in 100mL = 0.08 mg/mL.
            isBolusAllowed: false,   // Infusão 15 min
            recommendedPreparation: { drug: 4, diluent: 100 }, // 4mL (2 amp = 8mg) + 100mL SF
            presentationLabel: "Ampola 2mL = 4mg (2mg/mL)"
        },
        resultLog: "Ondansetrona (Vonau) 8mg em infusão (15 min).",
        effectDuration: 240
    },
    {
        id: "drug_metoclopramide",
        label: "Metoclopramida (Plasil) 10mg",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true,
        drugConfig: {
            concentration: 5,       // mg/mL
            ampuleVolume: 2,        // mL
            contentPerAmpule: 10,   // mg
            unit: "mg",
            maxSafeConcentration: 1, // 10mg in 10mL = 1mg/mL
            isBolusAllowed: true,    // Slow Bolus
            recommendedPreparation: { drug: 2, diluent: 8 }, // 2mL + 8mL = 10mL total
            presentationLabel: "Ampola 2mL = 10mg (5mg/mL)"
        },
        resultLog: "Metoclopramida 10mg (diluída para 10ml) administrada em bólus lento (2 min).",
        effectDuration: 240
    },

    // ==========================================
    // MEDICAMENTOS POR NEBULIZAÇÃO
    // ==========================================
    {
        id: "drug_salbutamol",
        label: "Salbutamol (Nebulização)",
        type: "Drogas",
        icon: "wind",
        cost: 2,
        requiresIV: false,
        potency: 0.4, // New: Standardized Shift Power
        resultLog: "Salbutamol nebulizado.",
        effectDuration: 60
    },

    // ==========================================
    // CUIDADOS CRÍTICOS / DILUIÇÃO
    // ==========================================
    // ==========================================
    // CUIDADOS CRÍTICOS / DILUIÇÃO
    // ==========================================
    {
        id: "drug_bicarb",
        label: "Bicarbonato de Sódio 8,4%",
        type: "Drogas",
        icon: "syringe",
        cost: 2,
        requiresIV: true,
        requiresPreparation: true, // Uses IVPreparationModal (Standard)
        potency: 0.2, // Acid-Base correction effect
        drugConfig: {
            concentration: 1,        // mEq/mL (8.4% ~= 1mEq/mL)
            ampuleVolume: 10,        // mL
            contentPerAmpule: 10,    // mEq
            unit: 'mEq',
            maxSafeConcentration: 0.2, // ~1.5% is roughly 0.17 mEq/mL. Let's say 0.2 mEq/mL is limit.
            isBolusAllowed: false,   // Nunca puro em periférico
            recommendedPreparation: { drug: 50, diluent: 250 }, // 50mL Bicarb + 250mL SG5%
            presentationLabel: "Ampola 10mL = 10mEq (1 mEq/mL)"
        },
        resultLog: "Bicarbonato infundido.",
        effectDuration: 360
    },

    // ==========================================
    // MEDICAMENTOS ORAIS
    // ==========================================
    {
        id: "drug_prednisone_po",
        label: "Prednisona",
        type: "Drogas",
        icon: "pill",
        cost: 1,
        requiresIV: false,
        oralDrug: true,
        oralOptions: [
            { dose: 20, unit: "mg", label: "20 mg (1 comp)" },
            { dose: 40, unit: "mg", label: "40 mg (2 comp)" },
            { dose: 60, unit: "mg", label: "60 mg (3 comp)" }
        ],
        resultLog: "Prednisona administrada via oral."
    },
    {
        id: "drug_dipyrone_po",
        label: "Dipirona",
        type: "Drogas",
        icon: "pill",
        cost: 1,
        requiresIV: false,
        oralDrug: true,
        oralOptions: [
            { dose: 500, unit: "mg", label: "500 mg (1 comp ou 10 gotas)" },
            { dose: 1000, unit: "mg", label: "1 g (1 comp 1g ou 40 gotas)" }
        ],
        resultLog: "Dipirona administrada via oral."
    },
    {
        id: "drug_diazepam_po",
        label: "Diazepam",
        type: "Drogas",
        icon: "pill",
        cost: 1,
        requiresIV: false,
        oralDrug: true,
        oralOptions: [
            { dose: 5, unit: "mg", label: "5 mg (1 comp)" },
            { dose: 10, unit: "mg", label: "10 mg (1 comp)" }
        ],
        resultLog: "Diazepam administrado via oral."
    },
    {
        id: "drug_slowk",
        label: "Slow-K 600mg",
        type: "Drogas",
        icon: "pill",
        cost: 1,
        requiresIV: false,
        oralDrug: true,
        oralOptions: [
            { dose: 8, unit: "mEq", label: "1 Comprimido (8 mEq)" },
            { dose: 16, unit: "mEq", label: "2 Comprimidos (16 mEq)" }
        ],
        resultLog: "Slow-K via oral administrado.",
        effectDuration: 240
    },
    {
        id: "drug_sorcal",
        label: "Sorcal (Poliestireno Sulfonato de Cálcio)",
        type: "Drogas",
        icon: "pill",
        cost: 1,
        requiresIV: false,
        oralDrug: true,
        oralOptions: [
            { dose: 15, unit: "g", label: "15g (1 envelope)" },
            { dose: 30, unit: "g", label: "30g (2 envelopes)" }
        ],
        resultLog: "Sorcal administrado via oral/retal.",
        effectDuration: 240
    },
    {
        id: "drug_lokelma",
        label: "Lokelma (Silicato de Zircônio)",
        type: "Drogas",
        icon: "pill",
        cost: 1,
        requiresIV: false,
        oralDrug: true,
        oralOptions: [
            { dose: 5, unit: "g", label: "5g (Ataque Inicial)" },
            { dose: 10, unit: "g", label: "10g (Ataque Pleno)" }
        ],
        resultLog: "Lokelma administrado via oral.",
        effectDuration: 180
    }
];

export const GLOBAL_RESPIRATORY_SUPPORT = [
    {
        id: "resp_o2_catheter",
        label: "Cateter Nasal de O2",
        type: "Gás",
        icon: "wind",
        cost: 1,
        requiresIV: false,
        respiratorySupport: true,
        flowOptions: [
            { flow: 1, label: "1 L/min (~25% FiO2)" },
            { flow: 2, label: "2 L/min (~29% FiO2)" },
            { flow: 3, label: "3 L/min (~33% FiO2)" },
            { flow: 4, label: "4 L/min (~37% FiO2)" },
            { flow: 5, label: "5 L/min (~41% FiO2)" },
            { flow: 6, label: "6 L/min (~45% FiO2)" }
        ],
        resultLog: "Cateter Nasal de O2 instalado."
    },
    {
        id: "resp_o2_mask",
        label: "Máscara de Venturi",
        type: "Gás",
        icon: "wind",
        cost: 2,
        requiresIV: false,
        respiratorySupport: true,
        flowOptions: [
            { flow: 24, label: "2-4 L/min (~24% FiO2)" },
            { flow: 28, label: "4-6 L/min (~28% FiO2)" },
            { flow: 35, label: "8-10 L/min (~35% FiO2)" },
            { flow: 40, label: "10-12 L/min (~40% FiO2)" },
            { flow: 60, label: "12-15 L/min (~60% FiO2)" }
        ],
        resultLog: "Máscara de Venturi instalada."
    },
    {
        id: "resp_vni",
        label: "Ventilação Não Invasiva (VNI)",
        type: "Ventilação",
        icon: "wind",
        cost: 2,
        requiresIV: false,
        respiratorySupport: true,
        flowOptions: [
            { flow: 'cpap', label: "CPAP" },
            { flow: 'bipap', label: "BiPAP" }
        ],
        resultLog: "Suporte com VNI iniciado."
    },
    {
        id: "resp_intubation",
        label: "IOT / Ventilação Mecânica",
        type: "Ventilação",
        icon: "wind",
        cost: 10,
        requiresIV: false,
        respiratorySupport: true,
        flowOptions: [
            { flow: 'vcv', label: "Modo VCV" },
            { flow: 'pcv', label: "Modo PCV" },
            { flow: 'psv', label: "Modo PSV" }
        ],
        resultLog: "Paciente intubado. VM iniciada."
    }
];

export const GLOBAL_FLUIDS = [
    {
        id: "fluid_sf09",
        label: "Soro Fisiológico 0,9%",
        type: "Fluidos",
        icon: "droplet",
        cost: 1,
        requiresIV: true,
        resultLog: "SF 0,9% em infusão.",
        fluidBalance: 1.0
    },
    {
        id: "fluid_sf3",
        label: "Soro Fisiológico 3%",
        type: "Fluidos",
        icon: "droplet",
        cost: 1,
        requiresIV: true,
        resultLog: "SF 3% (hipertônico) em infusão.",
        fluidBalance: 1.0
    },
    {
        id: "fluid_sf045",
        label: "Soro Fisiológico 0,45%",
        type: "Fluidos",
        icon: "droplet",
        cost: 1,
        requiresIV: true,
        resultLog: "SF 0,45% (hipotônico) em infusão.",
        fluidBalance: 1.0
    },
    {
        id: "fluid_rl",
        label: "Ringer Lactato",
        type: "Fluidos",
        icon: "droplet",
        cost: 1,
        requiresIV: true,
        resultLog: "Ringer Lactato em infusão.",
        fluidBalance: 1.0
    },
    {
        id: "fluid_sg5",
        label: "Soro Glicosado 5%",
        type: "Fluidos",
        icon: "droplet",
        cost: 1,
        requiresIV: true,
        resultLog: "SG 5% em infusão.",
        fluidBalance: 1.0
    },
    {
        id: "fluid_sg50",
        label: "Soro Glicosado 50%",
        type: "Fluidos",
        icon: "droplet",
        cost: 1,
        requiresIV: true,
        resultLog: "SG 50% (hipertônico) em infusão.",
        fluidBalance: 1.0
    }
];

export const GLOBAL_PROCEDURES_EXAMS = [
    // --- EXAMES ---
    {
        id: "exam_ecg",
        label: "Solicitar ECG",
        type: "Exames",
        icon: "ecg",
        cost: 5,
        requiresIV: false,
        resultLog: "ECG realizado. Traçado disponível para análise."
    },
    {
        id: "exam_labs",
        label: "Solicitar Exames Séricos",
        type: "Exames",
        icon: "syringe",
        cost: 40,
        requiresIV: true,
        triggersLabs: true,
        resultLog: "Coleta de sangue realizada. Amostras enviadas ao laboratório."
    },
    {
        id: "exam_dialysis",
        label: "Solicitar Diálise de Urgência",
        type: "Exames",
        icon: "blood",
        cost: 0,
        requiresIV: false,
        resultLog: "Nefrologia assumiu o caso." // Generic
    },

    // --- PROCEDIMENTOS ---
    {
        id: "proc_monitor",
        label: "Monitorizar Paciente",
        type: "Procedimentos",
        icon: "monitor",
        cost: 2,
        requiresIV: false,
        triggersVitals: true,
        resultLog: "Eletrodos posicionados. Monitor multiparamétrico ligado."
    },
    {
        id: "proc_iv_access",
        label: "Estabelecer Acesso Venoso",
        type: "Procedimentos",
        icon: "syringe",
        cost: 5,
        requiresIV: false,
        resultLog: "Acesso venoso periférico calibroso garantido em MSE."
    },
    {
        id: "proc_sonda",
        label: "Sondagem Vesical",
        type: "Procedimentos",
        icon: "urine",
        cost: 7,
        requiresIV: false,
        resultLog: "Sondagem vesical de demora realizada. Drenagem de urina clara."
    }
];
