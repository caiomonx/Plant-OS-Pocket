import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { CheckCircle2, ChevronRight, Calculator, AlertTriangle, ArrowRight, User } from 'lucide-react';
import FormulaHelpButton from './FormulaHelpButton';

const GasoDiagnosticBuilder = forwardRef(({ scenario, onComplete, onExtBack, initialStep }, ref) => {
  const [internalStep, setInternalStep] = useState(initialStep || 1);
  const [answers, setAnswers] = useState({
    phStatus: null,
    primaryDisturbance: null,
    winterValue: '',
    isCompensated: null,
    secondaryDisturbance: null,
  });
  const [revealedFormulas, setRevealedFormulas] = useState([]);
  
  const [formulaHintWeight, setFormulaHintWeight] = useState(0);
  const expected = scenario.initialState.expectedDiagnosis || {};

  useImperativeHandle(ref, () => ({
      goBack: () => {
          if (internalStep > 1) {
              setInternalStep(prev => prev - 1);
          } else {
              if (onExtBack) onExtBack();
          }
      }
  }));

  const handleSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (internalStep === 1 && answers.phStatus) setInternalStep(2);
    else if (internalStep === 2 && answers.primaryDisturbance) {
       setInternalStep(3); // Vamos sempre para o step de input do valor alvo.
    } else if (internalStep === 3 && answers.winterValue !== '') {
       setInternalStep(4);
       // We don't submit immediately if internalStep is 4 upon selection.
       // The user must click one of the two final decision buttons.
    }
  };

  const submitDiagnostic = (nextAction) => {
      // Os logs da Fase 3 serão todos gerados pelo GasoOSCEEngine post-mortem na Fase 5.
      const finalAnswers = { ...answers, formulaHintClicks: revealedFormulas.length, formulaHintWeight };
      onComplete([], finalAnswers, { nextAction });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-2 sm:px-4 mb-12">
      
      {/* ProgressBar do Builder */}
      <div className="flex gap-2 w-full max-w-sm mx-auto mb-10">
          {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                  {internalStep >= s && (
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100%" }} 
                        className={cn("absolute inset-0", internalStep > s ? "bg-slate-500" : "bg-cyan-500")}
                      />
                  )}
              </div>
          ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: pH */}
        {internalStep === 1 && (
          <motion.div 
            key="ph"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
            <div className="space-y-4 text-center">
               <h3 className="text-2xl font-black text-white">1. Qual a alteração principal?</h3>
               <p className="text-slate-400">Analise o valor do pH para determinar o estado atual da balança ácido-base.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
               {[
                 { id: 'acidemia', label: 'Acidemia' },
                 { id: 'normal', label: 'Normal' },
                 { id: 'alcalemia', label: 'Alcalemia' }
               ].map(opt => (
                 <button
                   key={opt.id}
                   onClick={() => handleSelect('phStatus', opt.id)}
                   className={cn(
                     "p-6 rounded-2xl border transition-all relative overflow-hidden group font-bold font-sm",
                     answers.phStatus === opt.id 
                      ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                      : "bg-[#11131F] border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                   )}
                 >
                   {answers.phStatus === opt.id && <CheckCircle2 size={16} className="absolute top-3 right-3 text-cyan-500" />}
                   {opt.label}
                 </button>
               ))}
            </div>

            <button 
                onClick={handleNextStep}
                disabled={!answers.phStatus}
                className="w-full mt-6 bg-cyan-500 text-slate-950 py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-20 hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-cyan-500/20"
            >
                Confirmar
                <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* STEP 2: ORIGIN */}
        {internalStep === 2 && (
          <motion.div 
            key="origin"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
             <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Avaliando:</span>
                <span className="text-cyan-400 font-black uppercase">{answers.phStatus}</span>
             </div>

             <div className="space-y-4 text-center">
               <h3 className="text-2xl font-black text-white">2. Quem é o Culpado?</h3>
               <p className="text-slate-400 text-sm">Qual parâmetro justifica de forma primária a alteração vista no pH?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               {[
                 { id: 'metabolica', label: 'Origem Metabólica', sub: 'O HCO3 explica a alteração' },
                 { id: 'respiratoria', label: 'Origem Respiratória', sub: 'O pCO2 explica a alteração' }
               ].map(opt => (
                 <button
                   key={opt.id}
                   onClick={() => handleSelect('primaryDisturbance', opt.id)}
                   className={cn(
                     "p-6 rounded-2xl border transition-all relative overflow-hidden group text-left",
                     answers.primaryDisturbance === opt.id 
                      ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                      : "bg-[#11131F] border-white/5 hover:border-white/20"
                   )}
                 >
                   {answers.primaryDisturbance === opt.id && <CheckCircle2 size={16} className="absolute top-4 right-4 text-cyan-500" />}
                   <div className={cn("font-black mb-1", answers.primaryDisturbance === opt.id ? "text-white" : "text-slate-300")}>{opt.label}</div>
                   <div className={cn("text-xs", answers.primaryDisturbance === opt.id ? "text-cyan-400" : "text-slate-500")}>{opt.sub}</div>
                 </button>
               ))}
            </div>

             <button 
                onClick={handleNextStep}
                disabled={!answers.primaryDisturbance}
                className="w-full mt-6 bg-cyan-500 text-slate-950 py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-20 hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-cyan-500/20"
            >
                Confirmar
                <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* STEP 3: COMPENSATION CALCULATION */}
        {internalStep === 3 && (
          <motion.div 
            key="winter"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
             <div className="space-y-4">
               <label className="block text-2xl font-black text-white text-center">
                   {answers.primaryDisturbance === 'metabolica' ? "Qual a pCO2 esperada?" : "Qual o HCO3 esperado?"}
               </label>
               <div className="relative max-w-xs mx-auto">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calculator size={18} className="text-slate-500" />
                   </div>
                   <input 
                       type="number"
                       step="0.1"
                       placeholder="Ex: 20.5"
                       value={answers.winterValue}
                       onChange={(e) => handleSelect('winterValue', e.target.value)}
                       className="w-full bg-[#11131F] border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-2xl py-4 pl-12 pr-4 text-center text-xl font-black text-white placeholder-slate-700 outline-none transition-all shadow-inner"
                   />
                   <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-sm font-bold text-slate-600">
                            {answers.primaryDisturbance === 'metabolica' ? "mmHg" : "mEq/L"}
                        </span>
                   </div>
               </div>
               <FormulaHelpButton 
                   formulaKey="winter" 
                   title={answers.primaryDisturbance === 'metabolica' ? (answers.phStatus === 'acidemia' ? 'Fórmula de Winter' : 'Compensação Metabólica') : 'Regra de Compensação'} 
                   formula={
                       answers.primaryDisturbance === 'metabolica' 
                       ? (answers.phStatus === 'acidemia' ? 'pCO2 = (1.5 × HCO3) + 8 ± 2' : 'pCO2 = HCO3 + 15')
                       : (answers.phStatus === 'acidemia' ? 'Aguda: ΔHCO3 = 1 p/ 10 | Crônica: 4 p/ 10' : 'Aguda: ΔHCO3 = 2 p/ 10 | Crônica: 5 p/ 10')
                   }
                   isRevealed={revealedFormulas.includes('winter')}
                   onReveal={(key, weight = 1) => {
                       setRevealedFormulas(prev => [...prev, key]);
                       setFormulaHintWeight(prev => prev + weight);
                   }}
               />
            </div>

            <button 
                onClick={handleNextStep}
                disabled={answers.winterValue === ''}
                className="w-full mt-6 bg-cyan-500 text-slate-950 py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-20 hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-cyan-500/20"
            >
                Avançar
                <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* STEP 4: DISTÚRBIO SECUNDÁRIO / PÍLULA DE COMPENSAÇÃO */}
        {internalStep === 4 && (
          <motion.div 
            key="status"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl"
          >
             {/* Balloon: recap of the value entered in step 3 */}
             {answers.winterValue !== '' && (
               <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex items-center justify-center gap-3 bg-cyan-500/10 border border-cyan-500/25 rounded-2xl px-5 py-3"
               >
                 <span className="text-[10px] font-black text-cyan-500/70 uppercase tracking-widest whitespace-nowrap">
                   {answers.primaryDisturbance === 'metabolica' ? 'pCO₂ calculada:' : 'HCO₃ calculado:'}
                 </span>
                 <span className="text-xl font-black text-cyan-300 font-mono">
                   {answers.winterValue}
                 </span>
                 <span className="text-xs font-bold text-cyan-500/50">
                   {answers.primaryDisturbance === 'metabolica' ? 'mmHg' : 'mEq/L'}
                 </span>
               </motion.div>
             )}

             <div className="space-y-4 text-center">
               <h3 className="text-2xl font-black text-white">Status da Compensação</h3>
               <p className="text-slate-400 text-sm">Cruzando a meta esperada com a atual da gasometria, há algum distúrbio sobreposto escondido ou o status é simples (puro)?</p>
             </div>

             <div className="flex bg-[#11131F] p-1.5 rounded-full max-w-sm mx-auto relative border border-white/5">
                 <div
                     className={cn(
                         "absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-300 ease-in-out shadow-lg",
                         answers.isCompensated === 'yes' ? "left-1.5 bg-cyan-500 text-white" : "",
                         answers.isCompensated === 'no' ? "left-[calc(50%+4.5px)] bg-red-500 text-white" : "",
                         !answers.isCompensated && "hidden"
                     )}
                 />
                 <button
                     onClick={() => handleSelect('isCompensated', 'yes')}
                     className={cn(
                         "flex-1 relative z-10 py-3 rounded-full text-sm font-bold transition-colors",
                         answers.isCompensated === 'yes' ? "text-slate-950" : "text-slate-500 hover:text-white"
                     )}
                 >
                     Simples (Compensado)
                 </button>
                 <button
                     onClick={() => handleSelect('isCompensated', 'no')}
                     className={cn(
                         "flex-1 relative z-10 py-3 rounded-full text-sm font-bold transition-colors",
                         answers.isCompensated === 'no' ? "text-slate-950" : "text-slate-500 hover:text-white"
                     )}
                 >
                     Distúrbio Misto
                 </button>
             </div>

             <AnimatePresence>
                 {answers.isCompensated === 'no' && (
                     <motion.div
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         className="space-y-4 pt-4 border-t border-slate-800"
                     >
                         <label className="block text-center text-sm font-bold text-slate-400 mb-4">Selecione o distúrbio oculto/secundário associado:</label>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {[
                                 { id: 'acidose_respiratoria', label: 'Acidose Respiratória' },
                                 { id: 'alcalose_respiratoria', label: 'Alcalose Respiratória' },
                                 { id: 'acidose_metabolica', label: 'Acidose Metabólica' },
                                 { id: 'alcalose_metabolica', label: 'Alcalose Metabólica' }
                             ].map(opt => (
                                 <button
                                     key={opt.id}
                                     onClick={() => handleSelect('secondaryDisturbance', opt.id)}
                                     className={cn(
                                         "p-4 rounded-xl border text-sm font-bold transition-all text-center",
                                         answers.secondaryDisturbance === opt.id 
                                             ? "bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                             : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                                     )}
                                 >
                                     {opt.label}
                                 </button>
                             ))}
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>

             <div className="grid md:grid-cols-2 gap-4 mt-6">
                 <button 
                    onClick={() => submitDiagnostic('treat')}
                    disabled={!answers.isCompensated || (answers.isCompensated === 'no' && !answers.secondaryDisturbance)}
                    className="p-5 rounded-2xl bg-slate-800 border border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-500/5 transition-all text-center group disabled:opacity-30 disabled:pointer-events-none"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                        <User size={20} className="text-blue-400 group-hover:text-blue-300" />
                        <div className="text-lg font-bold text-slate-200 group-hover:text-blue-300 mb-0 transition-colors">Tratar Paciente</div>
                    </div>
                </button>
                 <button 
                    onClick={() => submitDiagnostic('refine')}
                    disabled={!answers.isCompensated || (answers.isCompensated === 'no' && !answers.secondaryDisturbance)}
                    className="p-5 rounded-2xl bg-slate-800 border border-teal-500/30 hover:border-teal-500/70 hover:bg-teal-500/5 transition-all text-center group disabled:opacity-30 disabled:pointer-events-none"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                        <CheckCircle2 size={20} className="text-teal-400 group-hover:text-teal-300" />
                        <div className="text-lg font-bold text-slate-200 group-hover:text-teal-300 mb-0 transition-colors">Refinar Diagnóstico</div>
                    </div>
                </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
});

export default GasoDiagnosticBuilder;

