import React, { useState, useEffect, useMemo } from 'react';
import { THERAPIES } from '../../data/antibio/therapies';
import { computeStats } from '../../utils/antibioStats';

const CLUE_LABELS = ['1ª Pista', '2ª Pista', '3ª Pista'];

export default function AntibioOutcomeModal({ status, caseData, onPlayAgain, mode }) {
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      if (status !== 'playing') {
         setIsOpen(true);
      } else {
         setIsOpen(false);
      }
   }, [status]);

   const stats = useMemo(() => computeStats(), [isOpen]);

   if (!isOpen || status === 'playing' || !caseData) return null;

   const isWin = status === 'won';
   const therapyObj = THERAPIES.find(d => d.id === caseData.correctTherapyId);
   const maxDistribution = Math.max(...stats.guessDistribution, 1);

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
         <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
            
            {/* Header decorativo color-coded */}
            <div className={`h-2 w-full ${isWin ? 'bg-gradient-to-r from-lime-400 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`} />
            
            <div className="p-6 text-center space-y-5">
               {/* Ícone de status */}
               <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${isWin ? 'bg-lime-500/20 text-lime-400' : 'bg-red-500/20 text-red-500'}`}>
                  {isWin ? (
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
               </div>

               {/* Título do resultado */}
               <div>
                  <h2 className="text-3xl font-extrabold text-slate-100 mb-1">
                     {isWin ? 'Conduta Correta!' : 'Fim de Jogo'}
                  </h2>
                  <p className="text-slate-400 text-sm">
                     {isWin ? 'Excelente raciocínio clínico terapêutico.' : 'As dicas esgotaram e você não selecionou a conduta ideal.'}
                  </p>
               </div>

               {/* Box do Tratamento — destaque máximo */}
               <div className={`p-5 rounded-xl border ${isWin ? 'bg-lime-950/40 border-lime-700/50' : 'bg-red-950/30 border-red-800/40'}`}>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-1.5">O Tratamento Ideal</p>
                  <p className={`text-xl font-black ${isWin ? 'text-lime-300' : 'text-red-400'}`}>
                     {therapyObj?.name || 'Desconhecido'}
                  </p>
               </div>

               {/* Distribuição de Acertos */}
               <div className="text-left">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                     Distribuição de Acertos
                  </h3>
                  <div className="space-y-1.5">
                     {stats.guessDistribution.map((count, index) => {
                        const barWidth = maxDistribution > 0 ? Math.max((count / maxDistribution) * 100, 8) : 8;
                        const hasValue = count > 0;

                        return (
                           <div key={index} className="flex items-center gap-2.5">
                              <span className="text-[11px] font-semibold text-slate-500 w-12 text-right shrink-0">
                                 {CLUE_LABELS[index]}
                              </span>
                              <div className="flex-1 relative h-6">
                                 <div
                                    className={`h-full rounded flex items-center justify-end pr-2 transition-all duration-700 ${
                                       hasValue
                                          ? 'bg-gradient-to-r from-lime-600/80 to-lime-500/90'
                                          : 'bg-slate-800'
                                    }`}
                                    style={{ 
                                       width: `${barWidth}%`,
                                       transitionDelay: `${index * 80}ms`,
                                    }}
                                 >
                                    <span className={`text-xs font-bold ${hasValue ? 'text-white' : 'text-slate-600'}`}>
                                       {count}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
               
               {/* Ações */}
               <div className="pt-2 flex flex-col gap-3">
                  <button 
                     onClick={() => setIsOpen(false)} 
                     className="w-full py-3.5 px-6 rounded-xl font-bold bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-slate-200 transition-colors"
                  >
                     Ver Plano Terapêutico Detalhado
                  </button>
                  
                  {mode === 'arcade' && (
                     <button 
                        onClick={onPlayAgain} 
                        className="w-full py-3.5 px-6 rounded-xl font-bold bg-lime-600 hover:bg-lime-500 text-slate-900 transition-colors shadow-lg shadow-lime-900/50"
                     >
                        Jogar Próximo Caso
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
