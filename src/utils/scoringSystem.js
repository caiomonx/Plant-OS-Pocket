/**
 * scoringSystem.js
 * Refactored to use Scoring Strategies (Strategy Pattern).
 */

// --- BASE STRATEGY INTERFACE ---
class ScoringStrategy {
    calculate(telemetry) {
        throw new Error("Generic Scorer not implemented");
    }

    createCategory(id, label, score, max) {
        return { id, label, score, maxScore: max, items: [] };
    }
}

// --- HELPERS ---
const TIMING_CONFIG = {
    SETUP_COST: 15, // Monitor (2) + Access (5) + ECG (7) + Reaction (1)
    CALCIUM: { GOLD: 25, SILVER: 40 }, // 15+10, 15+25
    SHIFT: { GOLD: 45, SILVER: 90 },   // 15+30, 15+75
    DIALYSIS: { GOLD: 60 }             // Decision within 1h
};

const getTimeWindow = (actionType, time) => {
    if (time === null || time === undefined) return 'MISSING';

    // Adjust for Setup Time (we don't penalize the physics of setup)
    // But our thresholds already account for it (25min = 15 setup + 10 act).

    const config = TIMING_CONFIG[actionType];
    if (!config) return 'UNKNOWN';

    if (time <= config.GOLD) return 'GOLD';
    if (config.SILVER && time <= config.SILVER) return 'SILVER';
    return 'LATE';
};

import { feedbackContent as FB } from '../data/feedbackContent.js';

// --- STRATEGY: STANDARD (Normal/Chronic) ---
class StandardScorer extends ScoringStrategy {
    calculate(telemetry) {
        let totalScore = 0;
        let outcome = 'indefinido';
        const actions = telemetry.actionsTaken || [];

        const catSafety = this.createCategory('safety', 'Segurança', 20, 20);
        const catDiag = this.createCategory('diag', 'Diagnóstico', 0, 15);
        const catStab = this.createCategory('stab', 'Estabilização', 0, 25);
        const catDef = this.createCategory('def', 'Definitiva', 0, 20);
        const catMgmt = this.createCategory('mgmt', 'Manejo', 0, 20);

        // A. SAFETY
        const vol = telemetry.fluidBalance || 0;
        if (vol > 1000) {
            catSafety.score -= 5;
            catSafety.items.push({
                status: 'warning',
                ...FB.SAFETY_VOLUME_OVERLOAD,
                message: '> 1000ml.' // Context specific add-on
            });
        }
        catSafety.score = Math.max(0, catSafety.score);
        totalScore += catSafety.score;

        // B. DIAGNOSIS (ECG)
        // Setup Logic: ECG needs Monitor.
        // Ideal: Monitor(2) -> ECG(7) = 9min.
        if (telemetry.ecgTime !== null && telemetry.ecgTime <= 12) {
            catDiag.score = 15;
            catDiag.items.push({
                status: 'success',
                ...FB.DIAG_ECG_GOLD,
                message: `Realizado aos ${telemetry.ecgTime}min.`
            });
        } else if (telemetry.ecgTime !== null) {
            catDiag.score = 5;
            catDiag.items.push({
                status: 'warning',
                ...FB.DIAG_ECG_LATE,
                message: `Atraso (${telemetry.ecgTime}min).`
            });
        } else {
            catDiag.items.push({ status: 'error', title: 'ECG', message: 'Não realizado.', explanation: 'Erro grave. Sem ECG não há diagnóstico de gravidade.', why_wrong: 'Cegueira situacional.' });
        }
        totalScore += catDiag.score;

        // C. STABILIZATION (Calcium)
        const caWindow = getTimeWindow('CALCIUM', telemetry.calciumTime);
        if (caWindow === 'GOLD') {
            catStab.score = 25;
            catStab.items.push({ status: 'gold', message: `Ouro (${telemetry.calciumTime}min).`, ...FB.STAB_CALCIUM_GOLD });
        } else if (caWindow === 'SILVER') {
            catStab.score = 15;
            catStab.items.push({ status: 'success', message: `Prata (${telemetry.calciumTime}min).`, ...FB.STAB_CALCIUM_SILVER });
        } else if (caWindow === 'LATE') {
            catStab.score = 5;
            catStab.items.push({ status: 'warning', message: `Tardio (${telemetry.calciumTime}min).`, ...FB.STAB_CALCIUM_LATE });
        } else {
            catStab.items.push({ status: 'error', title: 'Gluconato de Cálcio', message: 'Não feito.', explanation: 'Sem proteção, o risco de FV é iminente.', why_wrong: 'Erro fatal.' });
        }
        totalScore += catStab.score;

        // D. DEFINITIVE (Polarizing)
        // Check if ANY definitive measure was taken (Polarizing OR Dialysis in some contexts)
        // Since this is Standard, Polarizing is the bridge to elimination.
        const polTime = telemetry.treatmentTime; // Captured implies Polarizing
        const shiftWindow = getTimeWindow('SHIFT', polTime);

        if (shiftWindow === 'GOLD') {
            catDef.score = 20;
            catDef.items.push({ status: 'gold', message: `Ouro (${polTime}min).`, ...FB.DEF_SHIFT_GOLD });
            outcome = 'uti_estavel';
        } else if (shiftWindow === 'SILVER') {
            catDef.score = 15;
            catDef.items.push({ status: 'success', message: `Prata (${polTime}min).`, ...FB.DEF_SHIFT_GOLD }); // Reuse description, just lower score
            outcome = 'uti_estavel';
        } else if (shiftWindow === 'LATE') {
            catDef.score = 5;
            catDef.items.push({ status: 'warning', message: 'Tardia.', ...FB.DEF_SHIFT_LATE });
            outcome = 'uti_instavel';
        } else {
            catDef.items.push({ status: 'error', title: 'Definitiva', message: 'Não tratou o K+.', explanation: 'Faltou baixar o potássio.', why_wrong: 'Tratamento incompleto.' });
            outcome = 'obito_arritmia';
        }
        totalScore += catDef.score;

        // E. MANAGEMENT (Fixing Math: 10pts Salnutamol + 10pts Lasix = 20 Max)
        let mgmtScore = 0;
        if (actions.some(id => id.includes('salbutamol'))) {
            mgmtScore += 10;
            catMgmt.items.push({ status: 'success', message: 'Feito.', ...FB.MGMT_SALBUTAMOL });
        }
        if (actions.some(id => id.includes('furosemida'))) {
            mgmtScore += 10;
            catMgmt.items.push({ status: 'success', message: 'Feito.', ...FB.MGMT_LASIX });
        }

        // Bonus for Sorcal/Lokelma? Maybe later.

        catMgmt.score = Math.min(20, mgmtScore);
        totalScore += catMgmt.score;

        // Fatal Override
        if (telemetry.fatalErrors > 0) {
            outcome = 'obito_erro';
            totalScore = 0;
        }

        return { score: totalScore, outcome, categories: [catSafety, catDiag, catStab, catDef, catMgmt] };
    }
}

// --- STRATEGY: DIALYSIS PATIENT ---
class DialysisScorer extends ScoringStrategy {
    calculate(telemetry) {
        let totalScore = 0;
        let outcome = 'indefinido';
        const actions = telemetry.actionsTaken || [];

        const catSafety = this.createCategory('safety', 'Segurança', 20, 20);
        const catDef = this.createCategory('def', 'Eliminação Definitiva', 0, 20);
        const catMgmt = this.createCategory('mgmt', 'Manejo', 0, 20);

        // 1. Safety (Fluids & Forbidden Meds)
        const vol = telemetry.fluidBalance || 0;
        if (vol > 500) {
            catSafety.score -= 20;
            catSafety.items.push({ status: 'error', title: 'Sobrecarga', message: 'Volume excessivo em anúrico.', why_wrong: 'Risco de EAP.' });
        }

        // 2. Definitive (Dialysis is King)
        if (telemetry.dialysisRequested) {
            catDef.score = 20;
            outcome = 'uti_estavel';
            catDef.items.push({ status: 'success', title: 'Diálise', message: 'Indicada corretamente.', why_correct: 'Padrão-ouro.' });
        } else {
            catDef.items.push({ status: 'error', title: 'Omissão', message: 'Faltou Diálise.', why_wrong: 'Paciente anúrico precisa de HD.' });
            outcome = 'obito_arritmia';
        }

        // 3. Mgmt (Insulin Bridge)
        if (actions.some(id => id.includes('polarizante'))) {
            catMgmt.score += 10;
            catMgmt.items.push({ status: 'success', title: 'Ponte Terapêutica', message: 'Solução Polarizante feita.', why_correct: 'Compra tempo.' });
        }

        catSafety.score = Math.max(0, catSafety.score);
        totalScore = catSafety.score + catDef.score + catMgmt.score;

        if (telemetry.fatalErrors > 0) {
            outcome = 'obito_erro';
            totalScore = 0;
        }

        return { score: totalScore, outcome, categories: [catSafety, catDef, catMgmt] };
    }
}

// --- STRATEGY: RHABDOMYOLYSIS ---
class RhabdoScorer extends ScoringStrategy {
    calculate(telemetry) {
        let totalScore = 0;
        let outcome = 'indefinido';
        const actions = telemetry.actionsTaken || [];

        const catDiag = this.createCategory('diag', 'Investigação', 0, 20);
        const catHydration = this.createCategory('hydration', 'Hidratação Vigorosa', 0, 40);
        const catShift = this.createCategory('shift', 'Manejo de K+', 0, 20);
        const catSafety = this.createCategory('safety', 'Segurança', 20, 20);

        // A. DIAGNOSIS (CPK + Labs)
        const requestedCPK = actions.some(id => id.includes('exam_labs')); // Assuming CPK is in labs
        if (requestedCPK && telemetry.ecgTime !== null) {
            catDiag.score = 20;
            catDiag.items.push({
                status: 'success',
                title: 'Biomarcadores',
                message: 'CPK + ECG solicitados.',
                protocol: 'CPK + Eletrólitos + ECG',
                explanation: 'A dosagem de CPK confirma rabdomiólise e orienta a gravidade da lesão muscular.',
                why_correct: 'Investigação completa realizada precocemente.'
            });
        } else if (requestedCPK) {
            catDiag.score = 10;
            catDiag.items.push({
                status: 'warning',
                title: 'Biomarcadores',
                message: 'CPK solicitado, mas ECG atrasado.',
                protocol: 'CPK + Eletrólitos + ECG',
                explanation: 'O ECG é essencial para avaliar toxicidade cardíaca do potássio.',
                why_wrong: 'Faltou priorizar o ECG.'
            });
        } else {
            catDiag.items.push({
                status: 'error',
                title: 'Biomarcadores',
                message: 'CPK não solicitado.',
                protocol: 'CPK + Eletrólitos + ECG',
                explanation: 'Sem CPK, não há confirmação diagnóstica de rabdomiólise.',
                why_wrong: 'Erro diagnóstico grave.'
            });
        }
        totalScore += catDiag.score;

        // B. HYDRATION (The Core of Rhabdo Management)
        const vol = telemetry.fluidBalance || 0;

        if (vol >= 3000) {
            // GOLD: Aggressive hydration (3-5L)
            catHydration.score = 40;
            catHydration.items.push({
                status: 'gold',
                title: 'Hidratação Agressiva',
                message: `${vol}ml infundidos.`,
                protocol: '3-5L nas primeiras horas',
                explanation: 'A hidratação vigorosa dilui a mioglobina, previne precipitação tubular e mantém diurese > 200ml/h.',
                why_correct: 'Perfeito. Você protegeu a função renal com volume adequado.'
            });
        } else if (vol >= 1500) {
            // SILVER: Moderate hydration
            catHydration.score = 25;
            catHydration.items.push({
                status: 'success',
                title: 'Hidratação Moderada',
                message: `${vol}ml infundidos.`,
                protocol: '3-5L nas primeiras horas',
                explanation: 'Volume insuficiente. O ideal é 3-5L para garantir diurese > 200ml/h.',
                why_correct: 'Hidratou, mas poderia ser mais agressivo.'
            });
        } else if (vol >= 500) {
            // BRONZE: Minimal hydration
            catHydration.score = 10;
            catHydration.items.push({
                status: 'warning',
                title: 'Hidratação Insuficiente',
                message: `Apenas ${vol}ml.`,
                protocol: '3-5L nas primeiras horas',
                explanation: 'Volume muito baixo. O risco de IRA por precipitação de mioglobina permanece alto.',
                why_wrong: 'Hidratação inadequada para rabdomiólise.'
            });
        } else {
            // CRITICAL: No hydration
            catHydration.items.push({
                status: 'error',
                title: 'Sem Hidratação',
                message: 'Volume negligenciado.',
                protocol: '3-5L nas primeiras horas',
                explanation: 'Sem hidratação vigorosa, a IRA é praticamente inevitável.',
                why_wrong: 'Erro fatal. A hidratação é o pilar do tratamento.'
            });
        }
        totalScore += catHydration.score;

        // C. POTASSIUM SHIFT (Polarizing if K > 6.5)
        const usedPolarizing = actions.some(id => id.includes('polarizante'));
        const usedCalcium = actions.some(id => id.includes('calcium'));

        if (usedCalcium && usedPolarizing) {
            catShift.score = 20;
            catShift.items.push({
                status: 'success',
                title: 'Manejo Completo',
                message: 'Cálcio + Polarizante.',
                protocol: 'Gluconato + Insulina se K > 6.5',
                explanation: 'Proteção de membrana e shift intracelular realizados.',
                why_correct: 'Tratamento adequado da hipercalemia secundária.'
            });
        } else if (usedCalcium || usedPolarizing) {
            catShift.score = 10;
            catShift.items.push({
                status: 'warning',
                title: 'Manejo Parcial',
                message: usedCalcium ? 'Só Cálcio' : 'Só Polarizante',
                protocol: 'Gluconato + Insulina se K > 6.5',
                explanation: 'Faltou completar o tratamento da hipercalemia.',
                why_wrong: 'Manejo incompleto.'
            });
        } else {
            catShift.items.push({
                status: 'error',
                title: 'K+ Não Tratado',
                message: 'Hipercalemia ignorada.',
                protocol: 'Gluconato + Insulina se K > 6.5',
                explanation: 'Com K+ de 6.8, o risco de arritmia é alto.',
                why_wrong: 'Negligência perigosa.'
            });
        }
        totalScore += catShift.score;

        // D. SAFETY (Penalize Furosemide without volume, Reward Bicarbonate)
        const usedFurosemide = actions.some(id => id.includes('furosemida'));
        const usedBicarb = actions.some(id => id.includes('bicarb'));

        if (usedFurosemide && vol < 2000) {
            catSafety.score -= 10;
            catSafety.items.push({
                status: 'error',
                title: 'Furosemida Precoce',
                message: 'Diurético sem volume adequado.',
                protocol: 'Evitar diuréticos até volume > 3L',
                explanation: 'Furosemida sem hidratação prévia piora a IRA.',
                why_wrong: 'Erro iatrogênico grave.'
            });
        }

        if (usedBicarb) {
            catSafety.items.push({
                status: 'success',
                title: 'Alcalinização',
                message: 'Bicarbonato usado.',
                protocol: 'Bicarbonato se pH < 7.3',
                explanation: 'A alcalinização urinária previne precipitação de mioglobina.',
                why_correct: 'Boa conduta adjuvante.'
            });
        }

        catSafety.score = Math.max(0, catSafety.score);
        totalScore += catSafety.score;

        // Outcome Logic
        if (catHydration.score >= 25 && catShift.score >= 10) {
            outcome = 'uti_estavel';
        } else if (catHydration.score < 10) {
            outcome = 'obito_ira';
        } else {
            outcome = 'uti_instavel';
        }

        if (telemetry.fatalErrors > 0) {
            outcome = 'obito_erro';
            totalScore = 0;
        }

        return { score: totalScore, outcome, categories: [catDiag, catHydration, catShift, catSafety] };
    }
}

// --- STRATEGY: PSEUDO HYPERKALEMIA ---
class PseudoScorer extends ScoringStrategy {
    calculate(telemetry) {
        let score = 100;
        const catSafety = this.createCategory('safety', 'Segurança', 20, 20);
        const catDiag = this.createCategory('diag', 'Diagnóstico', 0, 15);

        if (telemetry.pseudoPenalty) {
            score -= 60;
            catSafety.score = 0;
            catSafety.items.push({
                status: 'error',
                ...FB.PSEUDO_SAFE_APPROACH,
                why_wrong: FB.PSEUDO_SAFE_APPROACH.why_wrong
            });
        } else {
            catSafety.items.push({
                status: 'success',
                ...FB.PSEUDO_SAFE_APPROACH,
                message: FB.PSEUDO_SAFE_APPROACH.title // Override message
            });
        }

        // Missed Labs Penalty
        if (telemetry.pseudoMisses > 0) {
            const deduction = telemetry.pseudoMisses * 15; // 15 points per wrong guess
            score -= deduction;
            catDiag.score = Math.max(0, 15 - deduction);
            catDiag.items.push({
                status: 'warning',
                ...FB.PSEUDO_MISS,
                message: `Solicitou exames irrelevantes (${telemetry.pseudoMisses}x).`
            });
        } else {
            catDiag.score = 15;
            catDiag.items.push({
                status: 'success',
                ...FB.PSEUDO_INVESTIGATION,
                message: 'Nova coleta solicitada.'
            });
        }

        return { score: Math.max(0, score), outcome: 'pseudo_success', categories: [catSafety, catDiag] };
    }
}

// --- DYNAMIC RULES ENGINE (Feedback 2.0) ---
const evaluateRules = (telemetry, rules) => {
    let totalScore = 0;
    let categoriesMap = {};
    let fatalError = false;

    // 1. Initialize Categories based on rules
    rules.forEach(rule => {
        if (!categoriesMap[rule.category]) {
            categoriesMap[rule.category] = {
                id: rule.category.toLowerCase().replace(/\s+/g, '_'),
                label: rule.category,
                score: 0,
                maxScore: 0,
                items: []
            };
        }
        // Only sum positive scores to maxScore
        if (rule.score > 0) {
            categoriesMap[rule.category].maxScore += rule.score;
        }
    });

    // 2. Evaluate Each Rule
    rules.forEach(rule => {
        const category = categoriesMap[rule.category];
        let passed = false;
        let value = null;

        // Resolve Target Value
        if (rule.target === 'actionsTaken') {
            const actions = telemetry.actionsTaken || [];
            // value is the check
            if (rule.type === 'includes') passed = actions.some(id => id.includes(rule.value));
            if (rule.type === 'not_includes') passed = !actions.some(id => id.includes(rule.value));
        }
        else if (rule.target === 'ecgTime' || rule.target === 'fluidBalance') {
            value = telemetry[rule.target];
            if (value !== undefined && value !== null) {
                if (rule.type === 'less_than' || rule.type === 'time_less_than') passed = value <= rule.value;
                if (rule.type === 'greater_than' || rule.type === 'time_greater_than') passed = value >= rule.value;
            } else {
                // If target value is missing (e.g. ECG never done), it fails 'less_than' usually
                passed = false;
            }
        }
        else if (rule.target === 'labs') {
            // Complex lab checks could go here
        }

        // Apply Logic
        if (passed) {
            // Success Case
            if (rule.score > 0) {
                category.score += rule.score;
                if (rule.feedback?.success) {
                    if (typeof rule.feedback.success === 'object') {
                        category.items.push({
                            status: 'success',
                            ...rule.feedback.success
                        });
                    } else {
                        category.items.push({ status: 'success', message: rule.feedback.success });
                    }
                }
            } else {
                // Negative Score (Penalty that was triggered? No, usually rules reward doing right)
                // If rule says "Avoid Calcium" (score -10), and we managed to avoid it?
                // Usually penalties are "If X then -10". So passed means we DID the bad thing?
                // Convention: 
                // Positive Score Rule: "Do X to gain points". Passed = Good.
                // Negative Score Rule: "If you do X, lose points". Passed = Bad.

                // Let's standardize: 
                // Rule: "Correct Action" -> Score > 0. Passed = Gain Score.
                // Rule: "Error Action" -> Score < 0. Passed = Lose Score.

                category.score += rule.score;
                if (rule.feedback?.failure) { // Failure message for doing the bad thing
                    if (typeof rule.feedback.failure === 'object') {
                        category.items.push({
                            status: 'error',
                            ...rule.feedback.failure
                        });
                    } else {
                        category.items.push({ status: 'error', message: rule.feedback.failure });
                    }
                }
            }
        } else {
            // Failed Case (Didn't do the good thing)
            if (rule.score > 0) {
                // Missed opportunity
                if (rule.feedback?.failure) {
                    if (typeof rule.feedback.failure === 'object') {
                        category.items.push({
                            status: 'warning',
                            ...rule.feedback.failure
                        });
                    } else {
                        category.items.push({ status: 'warning', message: rule.feedback.failure });
                    }
                }
            }
            // If failed to do a bad thing (score < 0), that's good! No msg needed.
        }

        // Critical Flags
        if (passed && rule.isFatal) fatalError = true;
    });

    // 3. Finalize
    let outcome = 'uti_estavel';
    const categories = Object.values(categoriesMap).map(cat => {
        cat.score = Math.max(0, cat.score); // No negative category totals
        return cat;
    });

    totalScore = categories.reduce((acc, cat) => acc + (cat.score || 0), 0);

    // Simple Outcome Logic based on Score %
    const maxPossible = categories.reduce((acc, cat) => acc + (cat.maxScore || 0), 0);
    let percentage = maxPossible > 0 ? totalScore / maxPossible : 0;

    if (isNaN(percentage)) percentage = 0;
    if (isNaN(totalScore)) totalScore = 0;

    if (fatalError || (telemetry.fatalErrors > 0)) {
        outcome = 'obito_erro';
        totalScore = 0;
    } else if (percentage >= 0.8) {
        outcome = 'uti_estavel';
    } else if (percentage >= 0.5) {
        outcome = 'uti_instavel';
    } else {
        outcome = 'obito_arritmia'; // Low score generic
    }

    return { score: totalScore, outcome, categories };
};

// --- FACTORY ---
export const calculateScore = (telemetry, scenario) => {
    // 1. DYNAMIC ENGINE (Priority)
    if (scenario && scenario.scoring && scenario.scoring.rules) {
        return evaluateRules(telemetry, scenario.scoring.rules);
    }

    // 2. LEGACY FALLBACK
    let strategy;
    if (telemetry.reason === 'pseudo_resolution') {
        strategy = new PseudoScorer();
    } else if (telemetry.renalStatus === 'dialysis') {
        strategy = new DialysisScorer();
    } else if (telemetry.scenarioId && telemetry.scenarioId.includes('rhabdo')) {
        strategy = new RhabdoScorer();
    } else {
        // Default standard
        strategy = new StandardScorer();
    }

    return strategy.calculate(telemetry);
};
