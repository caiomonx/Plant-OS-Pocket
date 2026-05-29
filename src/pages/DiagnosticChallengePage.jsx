import React, { useState } from 'react';
import { useDiagnosticChallenge } from '../hooks/useDiagnosticChallenge';
import ChallengeBoard from '../components/challenge/ChallengeBoard';
import AutocompleteInput from '../components/challenge/AutocompleteInput';
import OutcomeModal from '../components/challenge/OutcomeModal';
import StatsModal from '../components/challenge/StatsModal';
import { useNavigate } from 'react-router-dom';
import { computeStats } from '../utils/challengeStats';

export default function DiagnosticChallengePage() {
  const [mode, setMode] = useState('daily'); // 'daily', 'arcade', 'history', 'history_replay'
  const [replayId, setReplayId] = useState(null);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const challenge = useDiagnosticChallenge(mode, replayId);
  const navigate = useNavigate();
  const { stats } = challenge;

  if (!challenge.isLoaded) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-500">Carregando...</div>;
  }

  return (
    <div className="h-screen bg-slate-950 text-slate-200 overflow-x-hidden overflow-y-auto no-scrollbar flex flex-col">
      
      {/* Header */}
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
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <circle cx="12" cy="12" r="10" strokeWidth="2" />
                   <circle cx="12" cy="12" r="6" strokeWidth="2" />
                   <circle cx="12" cy="12" r="2" strokeWidth="2" />
                </svg>
                <span>Desafio Diagnóstico</span>
             </h1>
           </div>

           <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 bg-slate-800/80 border border-cyan-500/30 px-3 py-1.5 rounded-full shadow-lg flex-shrink-0" title="Dias Seguidos (Streak)">
                <span className="text-cyan-400 text-lg leading-none">🔥</span>
                <span className="text-cyan-300 font-bold text-sm">{stats.currentStreak}</span>
             </div>

              <div className="flex bg-slate-800 rounded-full p-1 border border-slate-700 flex-shrink-0">
                 <button 
                    onClick={() => setMode('daily')}
                    className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${mode === 'daily' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                 >
                    Caso do Dia
                 </button>
                 <button 
                    onClick={() => setMode('arcade')}
                    className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${mode === 'arcade' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                 >
                    Treino Livre
                 </button>
                 <button 
                    onClick={() => setMode('history')}
                    className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${['history', 'history_replay'].includes(mode) ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                 >
                    Histórico
                 </button>
             </div>
             
             <button 
                onClick={() => setIsStatsOpen(true)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-400 hover:text-cyan-400 transition-all shadow-sm flex-shrink-0"
                title="Estatísticas"
             >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
             </button>
           </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col gap-3 w-full">
           {/* Top Row: Title */}
           <div className="flex justify-center items-center w-full">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                 <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <circle cx="12" cy="12" r="6" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" strokeWidth="2" />
                 </svg>
                 <span>Desafio Diagnóstico</span>
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
                     <button 
                        onClick={() => setMode('daily')}
                        className={`flex-1 py-1.5 px-1 text-[10px] sm:text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap ${mode === 'daily' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                     >
                        Caso Dia
                     </button>
                     <button 
                        onClick={() => setMode('arcade')}
                        className={`flex-1 py-1.5 px-1 text-[10px] sm:text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap ${mode === 'arcade' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                     >
                        Livre
                     </button>
                     <button 
                        onClick={() => setMode('history')}
                        className={`flex-1 py-1.5 px-1 text-[10px] sm:text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap ${['history', 'history_replay'].includes(mode) ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                     >
                        Histórico
                     </button>
                 </div>
              </div>

              <button 
                 onClick={() => setIsStatsOpen(true)}
                 className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-400 hover:text-cyan-400 transition-all shadow-sm flex-shrink-0 relative z-10"
                 title="Estatísticas"
              >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </button>
           </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
         
         {mode === 'history' ? (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
               <div className="mb-6">
                  <h2 className="text-xl font-bold text-white">Linha do Tempo</h2>
                  <p className="text-slate-400 text-sm">Resumo da sua jornada. Revise diagnósticos diários que você já jogou ou perdeu no passado.</p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-12">
                   {challenge.historyPreview.map((item) => (
                       <button
                           key={item.dayNumber}
                           onClick={() => {
                               setReplayId(item.caseId);
                               setMode('history_replay');
                           }}
                           className={`relative p-5 rounded-xl border text-left flex flex-col justify-between items-start transition-all ${
                               item.status === 'won' 
                               ? 'bg-cyan-900/20 border-cyan-700/50 hover:bg-cyan-900/40 opacity-100 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                               : item.status === 'lost'
                               ? 'bg-red-900/20 border-red-800/50 hover:bg-red-900/40 opacity-100'
                               : 'bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/50 opacity-60 grayscale-[30%]'
                           }`}
                       >
                           <div className="flex justify-between items-center w-full mb-2">
                               <span className="font-bold text-lg text-slate-200">#Dia {item.dayNumber}</span>
                               {item.status === 'won' && <svg className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                               {item.status === 'lost' && <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                               {item.status === 'unplayed' && <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                           </div>
                           <p className="text-sm font-medium mt-1">
                               {item.status === 'won' && <span className="text-cyan-300">Diagnóstico Correto</span>}
                               {item.status === 'lost' && <span className="text-red-400">Falha no Diagnóstico</span>}
                               {item.status === 'unplayed' && <span className="text-slate-400">Caso Perdido</span>}
                           </p>
                           <span className="text-xs text-slate-500 mt-3 font-semibold uppercase tracking-wider">Jogar do zero &rarr;</span>
                       </button>
                   ))}
               </div>
            </div>
         ) : (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
               {/* Standalone Title */}
               {mode !== 'history_replay' && (
                  <div className="flex flex-col items-center justify-center mt-2 mb-6 flex-shrink-0 text-center">
                     <span className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mb-1">
                        {mode === 'arcade' ? 'Treino Livre' : 'Caso Clínico Diário'}
                     </span>
                     <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide flex items-center justify-center gap-2">
                        Desafio Diagnóstico <span className="text-cyan-400">#{mode === 'arcade' ? challenge.currentCaseIndex : challenge.currentDayNumber}</span>
                     </h2>
                  </div>
               )}

               {mode === 'history_replay' && (
                  <div className="mb-6 flex items-center justify-between bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                    <span className="text-slate-300 font-semibold"><span className="text-cyan-400">Modo Replay:</span> Pontuação isolada</span>
                    <button onClick={() => setMode('history')} className="text-sm px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded drop-shadow transition-colors">Voltar</button>
                  </div>
               )}

               <ChallengeBoard 
                  caseData={challenge.caseData} 
                  revealedCluesCount={challenge.revealedCluesCount} 
                  status={challenge.status}
               />

               {challenge.status === 'playing' ? (
                   <div className="mt-8 mb-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                     <AutocompleteInput 
                        onSubmitGuess={challenge.submitGuess} 
                        status={challenge.status} 
                        attemptedDiagnoses={challenge.attemptedDiagnoses} 
                     />
                     
                     {mode === 'arcade' && (
                        <div className="flex justify-center mt-6">
                           <button onClick={challenge.resetArcade} className="text-sm px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                             Pular para outro caso
                           </button>
                        </div>
                     )}
                   </div>
               ) : (
                  <div className="mt-12 mb-12 flex justify-center flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
                     <div className={`px-6 py-3 rounded-full text-lg font-bold border ${challenge.status === 'won' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                         {challenge.status === 'won' ? 'Vitória Alcançada!' : 'Tentativas Esgotadas'}
                     </div>
                     
                     {mode === 'arcade' && (
                        <button onClick={challenge.resetArcade} className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors mt-6 shadow-lg shadow-cyan-900/50">
                           Gerar Próximo Caso Aleatório
                        </button>
                     )}

                     {mode === 'history_replay' && (
                        <button onClick={challenge.resetArcade} className="px-8 py-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors mt-6 shadow-lg">
                           Reiniciar Este Caso do Zero
                        </button>
                     )}
                  </div>
               )}
            </div>
         )}
      </main>

      <OutcomeModal 
         mode={mode}
         status={challenge.status} 
         caseData={challenge.caseData} 
         onPlayAgain={challenge.resetArcade} 
      />

      <StatsModal 
         isOpen={isStatsOpen}
         onClose={() => setIsStatsOpen(false)}
      />

    </div>
  );
}
