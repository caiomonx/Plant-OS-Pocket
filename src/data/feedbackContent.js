/**
 * feedbackContent.js
 * Centralized repository for clinical feedback text.
 * Structure: [CATEGORY]_[ACTION]_[STATUS]
 */

export const feedbackContent = {
    // --- SEGURANÇA ---
    SAFETY_VOLUME_OVERLOAD: {
        title: "Sobrecarga Volumétrica",
        protocol: "Restrição Hídrica (< 1000ml)",
        explanation: "Em pacientes com risco de congestão ou anúricos, o volume deve ser restrito.",
        why_correct: "Você manteve o balanço hídrico negativo ou neutro.",
        why_wrong: "Volume excessivo (> 1000ml) aumenta risco de Edema Agudo de Pulmão."
    },

    // --- DIAGNÓSTICO ---
    DIAG_ECG_GOLD: {
        title: "Eletrocardiograma",
        protocol: "Imediato (< 10 min)",
        explanation: "O ECG é a ferramenta prioritária para definir a gravidade da hipercalemia.",
        why_correct: "Agilidade excelente. O diagnóstico de estabilidade elétrica foi feito prontamente.",
        why_wrong: ""
    },
    DIAG_ECG_LATE: {
        title: "Eletrocardiograma",
        protocol: "Imediato (< 10 min)",
        explanation: "O ECG é crucial para decidir o uso de Cálcio.",
        why_correct: "",
        why_wrong: "A demora no ECG atrasa a decisão de proteção miocárdica."
    },

    // --- ESTABILIZAÇÃO (Gluconato) ---
    STAB_CALCIUM_GOLD: {
        title: "Gluconato de Cálcio",
        protocol: "Imediato se ECG alterado ou K > 6.5",
        explanation: "O Cálcio antagoniza o efeito do potássio na membrana cardíaca, prevenindo FV/TV.",
        why_correct: "Perfeito. Você protegeu o miocárdio na janela de ouro.",
        why_wrong: ""
    },
    STAB_CALCIUM_SILVER: {
        title: "Gluconato de Cálcio",
        protocol: "Imediato se ECG alterado ou K > 6.5",
        explanation: "O atraso na administração do cálcio expõe o paciente ao risco de arritmia maligna.",
        why_correct: "Realizado, mas houve hesitação. O ideal é ser a primeira droga infundida.",
        why_wrong: ""
    },
    STAB_CALCIUM_LATE: {
        title: "Gluconato de Cálcio",
        protocol: "Imediato se ECG alterado ou K > 6.5",
        explanation: "A proteção de membrana é uma emergência médica.",
        why_correct: "",
        why_wrong: "Crítico. O paciente permaneceu desprotegido por tempo inaceitável."
    },

    // --- DEFINITIVA (Shift/Polarizante) ---
    DEF_SHIFT_GOLD: {
        title: "Solução Polarizante",
        protocol: "Iniciar em < 30 min",
        explanation: "A insulina move o K+ para o intracelular em 15-30 minutos, comprando tempo para a excreção.",
        why_correct: "Excelente. Shift iniciado precocemente, reduzindo o K+ sérico rapidamente.",
        why_wrong: ""
    },
    DEF_SHIFT_LATE: {
        title: "Solução Polarizante",
        protocol: "Iniciar em < 30 min",
        explanation: "Sem o shift, o potássio permanece em níveis letais até a diálise/diurese.",
        why_correct: "",
        why_wrong: "A demora em baixar o potássio manteve o risco de arritmia elevado."
    },

    // --- MANEJO (Adjuvantes) ---
    MGMT_SALBUTAMOL: {
        title: "Salbutamol (Beta-2)",
        protocol: "Adjuvante (Dose 10-20mg)",
        explanation: "Potencializa o efeito da insulina, mas não deve ser usado como monoterapia.",
        why_correct: "Boa conduta adjuvante. Ajuda a reduzir o K+ em mais 0.5-1.0 mEq/L.",
        why_wrong: "Sua falta não é erro crítico, mas perde-se uma ferramenta útil."
    },
    MGMT_LASIX: {
        title: "Diurético de Alça",
        protocol: "Se houver diurese residual",
        explanation: "Aumenta a excreção renal de potássio em pacientes não-anúricos.",
        why_correct: "Bem indicado. Forçar a caliurese é essencial.",
        why_wrong: "Não realizado."
    },
    // --- PSEUDO-HIPERCALEMIA ---
    PSEUDO_SAFE_APPROACH: {
        title: "Prudência Terapêutica",
        protocol: "Não tratar sem confirmação",
        explanation: "Em pacientes assintomáticos com ECG normal e K+ muito alto, deve-se suspeitar de erro laboratorial.",
        why_correct: "Excelente. Você evitou tratamentos agressivos (Insulina/Diálise) que causariam hipocalemia iatrogênica.",
        why_wrong: "Tratar agressivamente sem confirmar o valor real colocou o paciente em risco de Hipocalemia grave."
    },
    PSEUDO_INVESTIGATION: {
        title: "Investigação Diagnóstica",
        protocol: "Repetir coleta sem garrote",
        explanation: "A hemólise na coleta é a causa mais comum de pseudohipercalemia.",
        why_correct: "Você foi direto ao ponto. A nova coleta confirmou que o potássio real era normal.",
        why_wrong: "A solicitação de exames irrelevantes atrasa o diagnóstico e gera custos desnecessários."
    },
    PSEUDO_MISS: {
        title: "Foco na Investigação",
        protocol: "Solicitar Eletrólitos (K+)",
        explanation: "Para confirmar o erro, é necessário solicitar nova dosagem de Potássio.",
        why_correct: "",
        why_wrong: "Você solicitou exames que não ajudaram a esclarecer a dúvida diagnóstica."
    }
};
