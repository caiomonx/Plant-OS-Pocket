import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { CheckCircle2, ChevronRight, Calculator, AlertTriangle, FlaskConical, User, Triangle } from 'lucide-react';
import FormulaHelpButton from './FormulaHelpButton';

// ─── Sub-componente: Balão de eletrólito ────────────────────────────────────
function LabBubble({ label, value, unit = 'mEq/L', color = 'text-cyan-400' }) {
    return (
        <div className="flex flex-col items-center gap-1 px-3 py-2 bg-slate-800/70 border border-white/5 rounded-2xl min-w-[68px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
            <span className={`text-base font-black ${color}`}>{value ?? '--'}</span>
            <span className="text-[9px] text-slate-600">{unit}</span>
        </div>
    );
}

// ─── Componente Principal ────────────────────────────────────────────────────
const GasoDiagnosticRefinementBuilder = forwardRef(({ scenario, onComplete, onExtBack, onAgUpdate, initialStep }, ref) => {
  const [internalStep, setInternalStep] = useState(initialStep || 2); 
  const [answers, setAnswers] = useState({
    agValue: '',
    agcValue: '',
    deltaValue: '',
    aguValue: '',
    aguDiagnosis: '', // nova resposta
    aguRequested: false,
  });
  const [revealedFormulas, setRevealedFormulas] = useState([]);
  const [formulaHintWeight, setFormulaHintWeight] = useState(0);
  const [urineRevealed, setUrineRevealed] = useState(false);

  const labs  = scenario?.initialState?.labs || {};
  const urine = labs.urine || {};

  const handleSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    if ((field === 'agValue' || field === 'agcValue') && onAgUpdate) {
      onAgUpdate(value, field === 'agcValue' ? 'AGc' : 'AG');
    }
  };

  useImperativeHandle(ref, () => ({
      goBack: () => {
          if (internalStep === 3) {
              setInternalStep(2.7);
          } else if (internalStep === 3.5) {
              setInternalStep(2.7);
          } else if (internalStep === 2.7) {
              setInternalStep(2.5);
          } else if (internalStep === 2.5) {
              setInternalStep(2.3);
          } else if (internalStep === 2.3) {
              setInternalStep(2);
          } else {
              if (onExtBack) onExtBack();
          }
      }
  }));

  const handleNextStep = () => {
    if (internalStep === 2) {
        setInternalStep(2.3);
    } else if (internalStep === 2.5) {
        setInternalStep(2.7);
    } else if (internalStep === 3) {
        submitRefinementWithForcedAnswers(null, false);
    } else if (internalStep === 3.5) {
        submitRefinementWithForcedAnswers(null, false);
    }
  };

  const skipRefinement = () => {
      submitRefinementWithForcedAnswers(null, true);
  };

  const requestUrine = () => {
      setUrineRevealed(true);
      setAnswers(prev => ({ ...prev, aguRequested: true }));
      setInternalStep(3.5);
  };

  const submitRefinementWithForcedAnswers = (forcedAnswers, isSkipped) => {
      const finalAnswers = forcedAnswers || answers;
      finalAnswers.skipped = isSkipped; 
      finalAnswers.formulaHintClicks = revealedFormulas.length;
      finalAnswers.formulaHintWeight = formulaHintWeight;
      onComplete([], finalAnswers);
  };

  // Progress steps definition
  const allSteps = [
    { key: 2, label: 'Anion Gap' },
    { key: 2.3, label: 'Conduta' },
    { key: 2.5, label: 'AG Corrigido' },
    { key: 2.7, label: 'Conduta' },
    { key: 3, label: 'Delta-Delta' },
    { key: 3.5, label: 'AG Urinário' },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-2 sm:px-4 mb-12">
      
      {/* ProgressBar */}
      <div className="flex gap-2 w-full max-w-sm mx-auto mb-10">
          {allSteps.map(({ key, label }) => {
              const stepOrder = allSteps.map(s => s.key);
              const currentIdx = stepOrder.indexOf(internalStep);
              const thisIdx = stepOrder.indexOf(key);
              const isPast = thisIdx < currentIdx;
              const isCurrent = key === internalStep;
              return (
                  <div key={key} className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden relative" title={label}>
                      {(isPast || isCurrent) && (
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "100%" }} 
                            className={cn("absolute inset-0", isPast ? "bg-slate-500" : "bg-teal-500")}
                          />
                      )}
                  </div>
              );
          })}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 2: Anion Gap Input */}
        {internalStep === 2 && (
          <motion.div 
            key="ag_input"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
             <div className="space-y-4">
               <label className="block text-2xl font-black text-white text-center">Qual o Anion Gap (AG)?</label>
               <div className="relative max-w-xs mx-auto">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calculator size={18} className="text-slate-500" />
                   </div>
                   <input 
                       type="number"
                       step="0.1"
                       placeholder="Ex: 12.0"
                       value={answers.agValue}
                       onChange={(e) => handleSelect('agValue', e.target.value)}
                       className="w-full bg-[#11131F] border border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-2xl py-4 pl-12 pr-4 text-center text-xl font-black text-white placeholder-slate-700 outline-none transition-all shadow-inner"
                   />
               </div>
               <FormulaHelpButton 
                   formulaKey="ag" 
                   title="Fórmula Clássica" 
                   formula="AG = Na - ( Cl + HCO3 )" 
                   isRevealed={revealedFormulas.includes('ag')}
                   onReveal={(key, weight = 1) => {
                       setRevealedFormulas(prev => [...prev, key]);
                       setFormulaHintWeight(prev => prev + weight);
                   }}
               />
            </div>

            {/* ─── Bubbles de Eletrólitos ─────────────────────────── */}
            <div className="space-y-2">
                <p className="text-center text-xs text-slate-500 font-bold uppercase tracking-widest">Eletrólitos Séricos</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    <LabBubble label="Na⁺" value={labs.na} color="text-sky-400" />
                    <LabBubble label="K⁺" value={labs.k} color="text-emerald-400" />
                    <LabBubble label="Cl⁻" value={labs.cl} color="text-violet-400" />
                    <LabBubble label="Ca²⁺" value={labs.ca} unit="mg/dL" color="text-amber-400" />
                    <LabBubble label="HCO₃⁻" value={labs.hco3} color="text-teal-400" />
                </div>
            </div>

            <button 
                onClick={handleNextStep}
                disabled={answers.agValue === ''}
                className="w-full mt-6 bg-teal-500 text-slate-950 py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-20 hover:bg-teal-400 transition-all active:scale-95 shadow-xl shadow-teal-500/20"
            >
                Confirmar AG
                <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* STEP 2.3: DECISION A */}
        {internalStep === 2.3 && (
          <motion.div 
            key="decision_a"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-12 text-center py-6"
          >
             <div className="space-y-2">
               <h2 className="text-2xl font-black text-white">Próxima Conduta</h2>
               <p className="text-slate-400 text-sm">O que você fará a seguir com o Anion Gap que acabou de avaliar?</p>
             </div>

             <div className="grid md:grid-cols-2 gap-4 mt-6">
                 <button 
                    onClick={() => skipRefinement()}
                    className="p-5 rounded-2xl bg-slate-800 border border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-500/5 transition-all text-center group"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                        <User size={20} className="text-blue-400 group-hover:text-blue-300" />
                        <div className="text-lg font-bold text-slate-200 group-hover:text-blue-300 mb-0 transition-colors">Tratar Paciente</div>
                    </div>
                </button>
                 <button 
                    onClick={() => setInternalStep(2.5)}
                    className="p-5 rounded-2xl bg-slate-800 border border-teal-500/30 hover:border-teal-500/70 hover:bg-teal-500/5 transition-all text-center group"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                        <CheckCircle2 size={20} className="text-teal-400 group-hover:text-teal-300" />
                        <div className="text-lg font-bold text-slate-200 group-hover:text-teal-300 mb-0 transition-colors">Corrigir AG pela Albumina</div>
                    </div>
                </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2.5: AGc Input */}
        {internalStep === 2.5 && (
          <motion.div 
            key="agc_input"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
             <div className="flex bg-slate-800/50 border border-slate-700 p-4 rounded-2xl justify-center items-center">
                 <span className="text-slate-300 font-bold">Albumina Sérica do Paciente:</span>
                 <span className="ml-2 text-xl font-black text-cyan-400">{labs.albumin || '--'} g/dL</span>
             </div>

             <div className="space-y-4">
               <label className="block text-2xl font-black text-white text-center">Qual o Anion Gap Corrigido (AGc)?</label>
               <div className="relative max-w-xs mx-auto">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calculator size={18} className="text-slate-500" />
                   </div>
                   <input 
                       type="number"
                       step="0.1"
                       placeholder="Ex: 16.0"
                       value={answers.agcValue}
                       onChange={(e) => handleSelect('agcValue', e.target.value)}
                       className="w-full bg-[#11131F] border border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-2xl py-4 pl-12 pr-4 text-center text-xl font-black text-white placeholder-slate-700 outline-none transition-all shadow-inner"
                   />
               </div>
               {/* ── FÓRMULA CORRIGIDA: 4.0 e não 4.5 ── */}
               <FormulaHelpButton 
                   formulaKey="agc" 
                   title="Correção pela Albumina" 
                   formula="AGc = AG + 2.5 × (4.0 - Albumina)" 
                   isRevealed={revealedFormulas.includes('agc')}
                   onReveal={(key, weight = 1) => {
                       setRevealedFormulas(prev => [...prev, key]);
                       setFormulaHintWeight(prev => prev + weight);
                   }}
               />
            </div>

            <button 
                onClick={handleNextStep}
                disabled={answers.agcValue === ''}
                className="w-full mt-6 bg-teal-500 text-slate-950 py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-20 hover:bg-teal-400 transition-all active:scale-95 shadow-xl shadow-teal-500/20"
            >
                Confirmar AGc
                <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* STEP 2.7: DECISION B (Post AGc) — agora com 3 botões */}
        {internalStep === 2.7 && (
          <motion.div 
            key="decision_b"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-10 text-center py-6"
          >
             <div className="space-y-2">
               <h2 className="text-2xl font-black text-white">Próxima Conduta</h2>
               <p className="text-slate-400 text-sm">O que você fará a seguir com o valor do Anion Gap Corrigido?</p>
             </div>

             <div className="grid grid-cols-1 gap-4 mt-6 max-w-md mx-auto">
                 <button 
                    onClick={() => skipRefinement()}
                    className="p-5 rounded-2xl bg-slate-800 border border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-500/5 transition-all text-center group"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                        <User size={20} className="text-blue-400 group-hover:text-blue-300" />
                        <div className="text-lg font-bold text-slate-200 group-hover:text-blue-300 mb-0 transition-colors">Tratar Paciente</div>
                    </div>
                </button>
                 <button 
                    onClick={() => setInternalStep(3)}
                    className="p-5 rounded-2xl bg-slate-800 border border-amber-500/30 hover:border-amber-500/70 hover:bg-amber-500/5 transition-all text-center group"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                        <Triangle size={20} className="text-amber-400 group-hover:text-amber-300" />
                        <div className="text-lg font-bold text-slate-200 group-hover:text-amber-300 mb-0 transition-colors">Relação Delta/Delta</div>
                    </div>
                </button>
                 <button 
                    onClick={requestUrine}
                    className="p-5 rounded-2xl bg-slate-800 border border-violet-500/30 hover:border-violet-500/70 hover:bg-violet-500/5 transition-all text-center group"
                >
                    <div className="flex items-center justify-center gap-2">
                        <FlaskConical size={18} className="text-violet-400 group-hover:text-violet-300" />
                        <div className="text-lg font-bold text-slate-200 group-hover:text-violet-300 mb-0 transition-colors">Calcular Anion Gap Urinário</div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Solicita Na⁺, K⁺ e Cl⁻ urinários</p>
                </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Delta-Delta */}
        {internalStep === 3 && (
          <motion.div 
            key="delta"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
             <div className="flex bg-teal-500/10 border border-teal-500/20 p-4 rounded-2xl gap-4">
                 <AlertTriangle className="text-teal-500 shrink-0" />
                 <div>
                     <h4 className="text-teal-500 font-bold text-sm">Atenção aos Distúrbios Mistos</h4>
                     <p className="text-teal-500/80 text-xs mt-1">Sempre que houver um AG aumentado ou suspeita clínica confirmada pelo AGc, é fundamental avaliar a relação Delta-Delta para buscar por distúrbios ocultos.</p>
                 </div>
             </div>

             <div className="space-y-4">
               <label className="block text-2xl font-black text-white text-center">Interpretação do Delta-Delta (Δ/Δ)</label>
               
               <div className="grid grid-cols-1 gap-3 mt-6">
                 {[
                     { id: 'normal', label: 'Normal (Entre 1 e 2)', desc: 'Sem outros distúrbios metabólicos associados' },
                     { id: 'baixo', label: 'Baixo (< 1)', desc: 'Acidose Metab. de AG Normal (Hiperclorêmica) associada' },
                     { id: 'alto', label: 'Alto (> 2)', desc: 'Alcalose Metabólica associada' }
                 ].map(opt => (
                     <button
                         key={opt.id}
                         onClick={() => handleSelect('deltaValue', opt.id)}
                         className={cn(
                             "p-4 sm:p-5 rounded-2xl border transition-all text-left group relative",
                             answers.deltaValue === opt.id 
                                 ? "bg-teal-500/10 border-teal-500/50 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
                                 : "bg-[#11131F] border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                         )}
                     >
                         <span className="font-bold block text-white text-base sm:text-lg mb-1">{opt.label}</span>
                         <span className="text-xs sm:text-sm md:text-sm">{opt.desc}</span>
                         {answers.deltaValue === opt.id && <CheckCircle2 size={20} className="absolute top-1/2 -translate-y-1/2 right-4 text-teal-500" />}
                     </button>
                 ))}
               </div>
               <FormulaHelpButton 
                   formulaKey="delta" 
                   title="Cálculo da Relação" 
                   formula="Δ/Δ = (AG - 12) / (24 - HCO3)" 
                   isRevealed={revealedFormulas.includes('delta')}
                   onReveal={(key, weight = 1) => {
                       setRevealedFormulas(prev => [...prev, key]);
                       setFormulaHintWeight(prev => prev + weight);
                   }}
               />
            </div>

            <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl text-xs text-slate-500 leading-relaxed italic text-center">
                 Clique em <span className="font-bold text-cyan-500">Gasometria</span> na barra abaixo se precisar consultar os valores para o cálculo.
            </div>

            <button 
                onClick={handleNextStep}
                disabled={!answers.deltaValue}
                className="w-full mt-6 bg-teal-500 text-slate-950 py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-20 hover:bg-teal-400 transition-all active:scale-95 shadow-xl shadow-teal-500/20"
            >
                Confirmar Refinamento Avançado
                <CheckCircle2 size={20} />
            </button>
          </motion.div>
        )}

        {/* STEP 3.5: Anion Gap Urinário */}
        {internalStep === 3.5 && (
          <motion.div 
            key="agu_input"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-violet-500/20 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
             {/* 1. Confirmacao no Topo */}
             <div className="flex bg-violet-500/10 border border-violet-500/20 p-4 rounded-2xl gap-4">
                 <FlaskConical className="text-violet-400 shrink-0 mt-0.5" size={20} />
                 <div>
                     <h4 className="text-violet-300 font-bold text-sm">Exame Urinário Solicitado com Sucesso!</h4>
                     <p className="text-violet-400/80 text-xs mt-1">Excelente conduta diagnóstica! Você solicitou o ionograma urinário para refinamento da acidose de Anion Gap normal. Preencha o valor e interprete o distúrbio.</p>
                 </div>
             </div>

             {/* 2. Cálculo do AGu e Fórmula */}
             <div className="space-y-4">
               <label className="block text-2xl font-black text-white text-center">Qual o Anion Gap Urinário?</label>
               <div className="relative max-w-xs mx-auto">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calculator size={18} className="text-slate-500" />
                   </div>
                   <input 
                       type="number"
                       step="0.1"
                       placeholder="Ex: -20.0"
                       value={answers.aguValue}
                       onChange={(e) => handleSelect('aguValue', e.target.value)}
                       className="w-full bg-[#11131F] border border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl py-4 pl-12 pr-4 text-center text-xl font-black text-white placeholder-slate-700 outline-none transition-all shadow-inner"
                   />
               </div>
               <FormulaHelpButton 
                   formulaKey="agu" 
                   title="Fórmula do AG Urinário" 
                   formula="AGu = (Na⁺U + K⁺U) - Cl⁻U" 
                   isRevealed={revealedFormulas.includes('agu')}
                   onReveal={(key, weight = 1) => {
                       setRevealedFormulas(prev => [...prev, key]);
                       setFormulaHintWeight(prev => prev + weight);
                   }}
               />
            </div>

             {/* 3. Balões do Ionograma */}
             <div className="space-y-2 pt-2 pb-2">
                 <p className="text-center text-xs text-slate-500 font-bold uppercase tracking-widest">Ionograma Urinário</p>
                 <div className="flex flex-wrap gap-2 justify-center">
                     <LabBubble label="Na⁺ U" value={urine.na} color="text-sky-400" />
                     <LabBubble label="K⁺ U" value={urine.k} color="text-emerald-400" />
                     <LabBubble label="Cl⁻ U" value={urine.cl} color="text-violet-400" />
                 </div>
             </div>

            {/* 4. Escolha do Diagnóstico */}
            <div className="space-y-4 mt-6">
                <label className="block text-xl font-black text-white text-center">Interpretação da Etiologia</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                 {[
                     { id: 'gi', label: 'Perda Gastrointestinal', desc: 'Rins secretam o ácido efetivamente NH₄⁺ na urina. AGu Negativo.' },
                     { id: 'renal', label: 'Causa Renal (Ex: ATR)', desc: 'Defeito renal na secreção do ácido (NH₄⁺ não é eliminado). AGu Positivo.' }
                 ].map(opt => (
                     <button
                         key={opt.id}
                         onClick={() => handleSelect('aguDiagnosis', opt.id)}
                         className={cn(
                             "p-4 sm:p-5 rounded-2xl border transition-all text-left group relative",
                             answers.aguDiagnosis === opt.id 
                                 ? "bg-violet-500/10 border-violet-500/50 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                                 : "bg-[#11131F] border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                         )}
                     >
                         <span className="font-bold block text-white text-base mb-1">{opt.label}</span>
                         <span className="text-xs">{opt.desc}</span>
                         {answers.aguDiagnosis === opt.id && <CheckCircle2 size={20} className="absolute top-1/2 -translate-y-1/2 right-4 text-violet-500" />}
                     </button>
                 ))}
               </div>
            </div>

            <button 
                onClick={handleNextStep}
                disabled={answers.aguValue === '' || answers.aguDiagnosis === ''}
                className="w-full mt-6 bg-violet-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-20 hover:bg-violet-500 transition-all active:scale-95 shadow-xl shadow-violet-500/20"
            >
                Confirmar Etiologia e Ir para Terapêutica
                <CheckCircle2 size={20} />
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
});

export default GasoDiagnosticRefinementBuilder;
