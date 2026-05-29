import React from 'react';

export default function ChallengeEcgHeader({ 
  navigate, 
  mode, 
  handleModeSwitch, 
  stats, 
  setIsStatsOpen 
}) {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 shadow-md relative z-10 pt-4 pb-4 px-4 flex-shrink-0">
      
      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-6xl mx-auto justify-between items-center w-full px-6">
         <div className="flex items-center gap-6">
           <button 
              onClick={() => navigate('/')}
              className="group flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 backdrop-blur-md px-4 py-2 rounded-full text-slate-300 hover:text-white transition-all shadow-lg flex-shrink-0"
              title="Voltar para Módulos"
           >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span className="text-xs font-bold tracking-wide uppercase">Módulos</span>
           </button>

           <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap">
              <img src="/imagens/icones/ECGdiario.svg" alt="Desafio Diário ECG" className="w-6 h-6 object-contain" />
              <span>Desafio Diário ECG</span>
           </h1>
         </div>

         <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5 bg-slate-800/80 border border-orange-500/30 px-3 py-1.5 rounded-full shadow-lg flex-shrink-0" title="Dias Seguidos (Streak)">
              <span className="text-orange-500 text-lg leading-none">🔥</span>
              <span className="text-orange-400 font-bold text-sm">{stats?.currentStreak || 0}</span>
           </div>

            <div className="flex bg-slate-800 rounded-full p-1 border border-slate-700 flex-shrink-0">
               <button onClick={() => handleModeSwitch('daily')} className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${mode === 'daily' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>
                  Caso do Dia
               </button>
               <button onClick={() => handleModeSwitch('arcade')} className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${mode === 'arcade' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>
                  Treino Livre
               </button>
               <button onClick={() => handleModeSwitch('history')} className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${['history', 'history_replay'].includes(mode) ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>
                  Histórico
               </button>
           </div>
           
           <button onClick={() => setIsStatsOpen(true)} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-400 hover:text-rose-400 transition-all shadow-sm flex-shrink-0" title="Estatísticas">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
           </button>
         </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col gap-3 w-full">
         {/* Top Row: Title */}
         <div className="flex justify-center items-center w-full">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
               <img src="/imagens/icones/ECGdiario.svg" alt="Desafio Diário ECG" className="w-5 h-5 object-contain" />
               <span>ECG Diário</span>
            </h1>
         </div>

         {/* Bottom Row: Back, Modes, Stats */}
         <div className="flex items-center justify-between w-full relative">
            <button 
               onClick={() => navigate('/')}
               className="p-2.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-full text-slate-300 hover:text-white transition-all shadow-lg flex-shrink-0 relative z-10"
               title="Voltar para Módulos"
            >
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>

            {/* Centered Modes */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
               <div className="flex bg-slate-800 rounded-full p-1 border border-slate-700 w-full max-w-[260px] mx-12 pointer-events-auto">
                   <button onClick={() => handleModeSwitch('daily')} className={`flex-1 py-1.5 px-1 text-[10px] sm:text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap ${mode === 'daily' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>
                      Caso Dia
                   </button>
                   <button onClick={() => handleModeSwitch('arcade')} className={`flex-1 py-1.5 px-1 text-[10px] sm:text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap ${mode === 'arcade' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>
                      Livre
                   </button>
                   <button onClick={() => handleModeSwitch('history')} className={`flex-1 py-1.5 px-1 text-[10px] sm:text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap ${['history', 'history_replay'].includes(mode) ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>
                      Histórico
                   </button>
               </div>
            </div>

            <button 
               onClick={() => setIsStatsOpen(true)}
               className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-400 hover:text-rose-400 transition-all shadow-sm flex-shrink-0 relative z-10"
               title="Estatísticas"
            >
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </button>
         </div>
      </div>
    </header>
  );
}
