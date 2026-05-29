import { motion } from 'framer-motion';

// ── Paletas de "Aurora" por contexto ──────────────────────────────────────────
//   Cada entry define dois halos radiais (primary / secondary)
//   com cor, posição (x/y em %), tamanho (w/h em vw/vh) e opacidade.
// ─────────────────────────────────────────────────────────────────────────────
const THEMES = {
    // Step 1 – Anamnese: tons frios, levemente ciano / esmeralda neutro
    anamnese: {
        primary: {
            color: '4, 120, 87',   // emerald-700
            x: '15%', y: '-10%',
            w: '70vw', h: '55vh',
            opacity: 0.18,
        },
        secondary: {
            color: '8, 145, 178',  // cyan-600
            x: '65%', y: '55%',
            w: '55vw', h: '50vh',
            opacity: 0.10,
        },
    },

    // Step 2 – Estadiamento: azul ciano + índigo suave
    estadiamento: {
        primary: {
            color: '14, 165, 233',  // sky-500
            x: '25%', y: '-5%',
            w: '65vw', h: '50vh',
            opacity: 0.14,
        },
        secondary: {
            color: '99, 102, 241',  // indigo-500
            x: '60%', y: '60%',
            w: '50vw', h: '55vh',
            opacity: 0.09,
        },
    },

    // Step 3 Plano A – Conduta: esmeralda vibrante
    planoA: {
        primary: {
            color: '16, 185, 129',  // emerald-500
            x: '10%', y: '-10%',
            w: '60vw', h: '60vh',
            opacity: 0.20,
        },
        secondary: {
            color: '5, 150, 105',   // emerald-600
            x: '70%', y: '60%',
            w: '45vw', h: '50vh',
            opacity: 0.12,
        },
    },

    // Step 3 Plano B – Conduta: âmbar dourado
    planoB: {
        primary: {
            color: '217, 119, 6',   // amber-600
            x: '20%', y: '-8%',
            w: '60vw', h: '55vh',
            opacity: 0.18,
        },
        secondary: {
            color: '180, 83, 9',    // amber-700
            x: '65%', y: '55%',
            w: '50vw', h: '50vh',
            opacity: 0.10,
        },
    },

    // Step 3 Plano C – Conduta: vermelho risco
    planoC: {
        primary: {
            color: '225, 29, 72',   // rose-600
            x: '15%', y: '-5%',
            w: '65vw', h: '55vh',
            opacity: 0.18,
        },
        secondary: {
            color: '190, 18, 60',   // rose-700
            x: '65%', y: '60%',
            w: '50vw', h: '50vh',
            opacity: 0.10,
        },
    },

    // Step 3.5 – Simulação: tons mais frios e intensos
    simulacao: {
        primary: {
            color: '56, 189, 248',  // sky-400
            x: '20%', y: '-5%',
            w: '65vw', h: '55vh',
            opacity: 0.14,
        },
        secondary: {
            color: '129, 140, 248', // indigo-400
            x: '60%', y: '55%',
            w: '55vw', h: '50vh',
            opacity: 0.10,
        },
    },

    // Step 4 – Feedback: neutro dourado / esmeralda
    feedback: {
        primary: {
            color: '16, 185, 129',  // emerald-500
            x: '15%', y: '-8%',
            w: '55vw', h: '55vh',
            opacity: 0.14,
        },
        secondary: {
            color: '234, 179, 8',   // yellow-500
            x: '65%', y: '60%',
            w: '50vw', h: '50vh',
            opacity: 0.08,
        },
    },
};

// ── Seleciona o tema certo com base no step atual e no plano ──────────────────
function resolveTheme(step, selectedPlan) {
    if (step === 1) return THEMES.anamnese;
    if (step === 2) return THEMES.estadiamento;
    if (step === 3) {
        if (selectedPlan === 'A') return THEMES.planoA;
        if (selectedPlan === 'B') return THEMES.planoB;
        if (selectedPlan === 'C') return THEMES.planoC;
        return THEMES.estadiamento; // fallback sem plano selecionado
    }
    if (step === 3.5) return THEMES.simulacao;
    if (step === 4) return THEMES.feedback;
    return THEMES.anamnese;
}

// ── Componente principal ──────────────────────────────────────────────────────
/**
 * AuroraBackground
 * Renderiza dois halos radiais desfocados no fundo, absolutamente posicionados
 * dentro do parent `relative`. Anima suavemente ao trocar de tema.
 *
 * Props:
 *   step         – número do step atual (1, 2, 3, 3.5, 4)
 *   selectedPlan – 'A' | 'B' | 'C' | null
 */
export default function AuroraBackground({ step, selectedPlan }) {
    const theme = resolveTheme(step, selectedPlan);

    const blobVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.6 } },
    };

    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-80"
        >
            {/* Halo Primário */}
            <motion.div
                key={`primary-${step}-${selectedPlan}`}
                variants={blobVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                    position: 'absolute',
                    left: theme.primary.x,
                    top: theme.primary.y,
                    width: theme.primary.w,
                    height: theme.primary.h,
                    background: `radial-gradient(ellipse at center, rgba(${theme.primary.color}, ${theme.primary.opacity}) 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                    borderRadius: '50%',
                    mixBlendMode: 'screen',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Halo Secundário */}
            <motion.div
                key={`secondary-${step}-${selectedPlan}`}
                variants={blobVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                    position: 'absolute',
                    left: theme.secondary.x,
                    top: theme.secondary.y,
                    width: theme.secondary.w,
                    height: theme.secondary.h,
                    background: `radial-gradient(ellipse at center, rgba(${theme.secondary.color}, ${theme.secondary.opacity}) 0%, transparent 70%)`,
                    filter: 'blur(80px)',
                    borderRadius: '50%',
                    mixBlendMode: 'screen',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </div>
    );
}
