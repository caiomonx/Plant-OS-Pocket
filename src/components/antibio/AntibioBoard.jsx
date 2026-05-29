import React from 'react';

export default function AntibioBoard({ caseData, revealedCluesCount, status }) {
  if (!caseData) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3 mb-8">
       {caseData.clues.map((clue, index) => {
          const isRevealed = index < revealedCluesCount;
          
          return (
             <div 
               key={index}
               className={`p-5 rounded-xl border transition-all duration-500 ${
                 isRevealed 
                 ? 'bg-slate-800/80 border-lime-500/30 text-slate-200 shadow-[0_0_15px_rgba(132,204,22,0.05)]' 
                 : 'bg-slate-900/50 border-slate-800 text-slate-700 blur-[2px] select-none opacity-50'
               }`}
             >
                <div className="flex gap-4">
                   <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isRevealed ? 'bg-lime-500/20 text-lime-400' : 'bg-slate-800 text-slate-600'
                   }`}>
                      {index + 1}
                   </div>
                   <div className="text-lg leading-relaxed pt-0.5">
                      {isRevealed ? clue : "Conteúdo bloqueado. Faça uma tentativa para revelar a próxima dica."}
                   </div>
                </div>
             </div>
          )
       })}

       {/* Sumário final revelado após o jogo acabar */}
       {status !== 'playing' && caseData.summary && (
          <div className="mt-8 p-6 rounded-xl bg-lime-900/20 border border-lime-500/40 text-lime-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="font-bold text-lime-400 uppercase tracking-wide">Plano Terapêutico e Discussão</h3>
             </div>
             <p className="leading-relaxed text-slate-300">
                {caseData.summary}
             </p>
          </div>
       )}
    </div>
  )
}
