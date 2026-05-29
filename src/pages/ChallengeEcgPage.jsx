import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcgChallenge } from '../hooks/useEcgChallenge';
import EcgInteractiveCanvas from '../components/EcgInteractiveCanvas';
import AutocompleteInput from '../components/challenge/AutocompleteInput';
import EcgStatsModal from '../components/challenge/EcgStatsModal';
import ChallengeEcgHeader from '../components/challenge/ChallengeEcgHeader';
import EcgRefinementInline, { TOPOGRAPHY_OPTIONS, PATTERN_OPTIONS } from '../components/challenge/EcgRefinementInline';
import { computeEcgStats } from '../utils/ecgStats';

const ECG_WHITELIST = [
  'ritmo_sinusal', 'scacsst', 'scasst', 'brugada', 'long_qt', 'afib', 'vfib', 'vtach', 'svt', 
  'pericarditis', 'pe', 'cor_pulmonale', 'hyperkalemia', 'hypokalemia', 'hypercalcemia',
  'wpw', 'av_block_1', 'av_block_2', 'av_block_3', 'lbbb', 'rbbb', 'pac', 'pvc',
  'chagas', 'myopericarditis', 'prinzmetal', 'cardiogenic_shock', 'hf',
  'flutter_atrial_2_1', 'flutter_atrial_3_1', 'digitalis_effect', 'bavt', 'bav_1_grau', 'bav_2_grau',
  'bdase', 'brd', 'bre', 'atrial_tachycardia', 'right_ventricular_strain', 'bifascicular_block',
  'trn', 'isquemia_anterolateral', 'old_mi_inferior', 'left_ventricular_strain', 'old_mi_anterior'
];

const getFullDiagnosisName = (diagnosis, caseData) => {
    let baseName = diagnosis?.name || '';
    if (diagnosis?.id === 'scacsst' || diagnosis?.id === 'scasst') {
        const subId = caseData?.subDiagnosis || 'padrao_comum';
        const opt = [...TOPOGRAPHY_OPTIONS, ...PATTERN_OPTIONS].find(o => o.id === subId);
        if (opt && subId !== 'padrao_comum' && subId !== 'isquemia_comum') {
            if (diagnosis.id === 'scacsst') {
               baseName += ` de ${opt.label}`; 
            } else {
               baseName += ` (${opt.label})`;
            }
        }
    }
    return baseName;
};

export default function ChallengeEcgPage() {
  const navigate = useNavigate();
  const challenge = useEcgChallenge();
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [mode, setMode] = useState('daily'); // 'daily', 'arcade', 'history', 'history_replay'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [partialToast, setPartialToast] = useState(null);
  const toastTimerRef = useRef(null);
  const prevFoundCountRef = useRef(-1);

  const stats = computeEcgStats();

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    if (newMode === 'daily') challenge.loadDaily();
    else if (newMode === 'arcade') challenge.loadArcade();
    // 'history' just shows the list, no case loading needed
  };

  const handleHistoryReplay = (caseId) => {
    setMode('history_replay');
    challenge.loadHistoryReplay(caseId);
  };

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
     setActiveImageIndex(0);
     prevFoundCountRef.current = challenge.foundDiagnoses?.length || 0;
     setPartialToast(null);
  }, [challenge.caseData?.id]);

  // Detect partial diagnosis hits for toast
  useEffect(() => {
    const cd = challenge.caseData;
    const fd = challenge.foundDiagnoses;
    if (!cd || !cd.correctDiagnosisIds || cd.correctDiagnosisIds.length <= 1) return;
    const currentCount = fd?.length || 0;
    if (prevFoundCountRef.current >= 0 && currentCount > prevFoundCountRef.current && currentCount < cd.correctDiagnosisIds.length) {
      const newDiagId = fd[fd.length - 1];
      const diagnosis = cd.correctDiagnoses?.find(d => d.id === newDiagId);
      setPartialToast({ name: diagnosis?.name || newDiagId });
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setPartialToast(null), 3500);
    }
    prevFoundCountRef.current = currentCount;
  }, [challenge.foundDiagnoses, challenge.caseData]);

  useEffect(() => {
    return () => clearTimeout(toastTimerRef.current);
  }, []);

  if (!challenge.isLoaded) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-rose-500">Carregando...</div>;
  }

  const { caseData, status, attempts, attemptedDiagnoses, foundDiagnoses, pendingRefinement, submitGuess, submitRefinement } = challenge;

  return (
    <div className="h-screen bg-slate-950 text-slate-200 overflow-hidden flex flex-col">
      
      {/* Header */}
            <ChallengeEcgHeader 
         navigate={navigate}
         mode={mode}
         handleModeSwitch={handleModeSwitch}
         stats={stats}
         setIsStatsOpen={setIsStatsOpen}
      />

      {/* Main Content (Vertical Split ou Histórico) */}
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 gap-4 overflow-y-auto no-scrollbar">
         
         {mode === 'history' ? (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 pt-4">
               <div className="mb-6">
                  <h2 className="text-xl font-bold text-white">Livro Histórico</h2>
                  <p className="text-slate-400 text-sm">Resumo da sua jornada. Revise os laudos diários que você já jogou ou perdeu no passado.</p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-12">
                   {challenge.historyPreview.map((item) => (
                       <button
                           key={item.dayNumber}
                           onClick={() => handleHistoryReplay(item.caseId)}
                           className={`relative p-5 rounded-xl border text-left flex flex-col justify-between items-start transition-all ${
                               item.status === 'won' 
                               ? 'bg-rose-900/20 border-rose-700/50 hover:bg-rose-900/40 opacity-100 shadow-[0_0_10px_rgba(225,29,72,0.1)]' 
                               : item.status === 'lost'
                               ? 'bg-red-900/20 border-red-800/50 hover:bg-red-900/40 opacity-100'
                               : 'bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/50 opacity-60 grayscale-[30%]'
                           }`}
                       >
                           <div className="flex justify-between items-center w-full mb-2">
                               <span className="font-bold text-lg text-slate-200">#Dia {item.dayNumber}</span>
                               {item.status === 'won' && <svg className="w-6 h-6 text-rose-500 drop-shadow-[0_0_5px_rgba(225,29,72,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                               {item.status === 'lost' && <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                               {item.status === 'unplayed' && <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                           </div>
                           <p className="text-sm font-medium mt-1">
                               {item.status === 'won' && <span className="text-rose-400">Laudo Correto</span>}
                               {item.status === 'lost' && <span className="text-red-400">Falha no Laudo</span>}
                               {item.status === 'unplayed' && <span className="text-slate-400">Caso Perdido</span>}
                           </p>
                           <span className="text-xs text-slate-500 mt-3 font-semibold uppercase tracking-wider">Jogar do zero &rarr;</span>
                       </button>
                   ))}
               </div>
            </div>
         ) : (
            <>
               {/* Standalone Title */}
               <div className="flex flex-col items-center justify-center mt-2 mb-2 flex-shrink-0 text-center">
                  <span className="text-[10px] text-rose-500 uppercase tracking-widest font-bold mb-1">{mode === 'arcade' ? 'Treino Livre' : 'Caso Clínico Diário'}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide flex items-center justify-center gap-2">
                     Traçado Eletrocardiograma <span className="text-rose-400">#{mode === 'arcade' ? challenge.currentCaseIndex : caseData?.dayId}</span>
                  </h2>
               </div>

               {/* Top: ECG Viewer */}
               <div className="w-full h-[50vh] min-h-[400px] flex-shrink-0 flex flex-col">
                  {caseData?.images && caseData.images.length > 1 && (
                     <div className="flex justify-center gap-2 mb-2">
                        {caseData.images.map((img, idx) => (
                           <button 
                              key={idx}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`px-5 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider transition-colors border shadow-sm ${activeImageIndex === idx ? 'bg-rose-600 text-white border-rose-500 shadow-rose-900/50' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                           >
                              {img.label}
                           </button>
                        ))}
                     </div>
                  )}
                  <div className="flex-1 relative border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                     {caseData?.images ? (
                        <EcgInteractiveCanvas imageUrl={caseData.images[activeImageIndex].url} />
                     ) : caseData?.imageUrl ? (
                        <EcgInteractiveCanvas imageUrl={caseData.imageUrl} />
                     ) : null}
                  </div>
               </div>

               {/* Middle: Clinical Tip (Appears after 1st mistake) */}
               {attempts >= 1 && status === 'playing' && caseData?.clinicalCase && (
                  <div className="flex-shrink-0 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 animate-in slide-in-from-bottom-4 duration-500">
                     <h3 className="text-amber-400 font-bold text-sm mb-1 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Dica Clínica Revelada
                     </h3>
                     <p className="text-slate-300 text-sm leading-relaxed">{caseData.clinicalCase}</p>
                  </div>
               )}

               {/* Bottom: Search Input or Inline Outcome */}
               <div className="flex-shrink-0 z-20 pb-12 w-full max-w-2xl mx-auto mt-2">
                  {status === 'playing' ? (
                     <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                         {caseData?.correctDiagnosisIds?.length > 1 && (
                             <div className="mb-3 bg-slate-900/60 border border-rose-500/20 rounded-2xl p-3 animate-in fade-in duration-500">
                                 <div className="flex items-center justify-center gap-2 mb-2.5">
                                     <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                     </svg>
                                     <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                                         Achados: {foundDiagnoses?.length || 0} de {caseData.correctDiagnosisIds.length}
                                     </span>
                                 </div>
                                 <div className="flex flex-wrap justify-center gap-2">
                                     {caseData.correctDiagnosisIds.map((id, idx) => {
                                         const isFound = foundDiagnoses?.includes(id);
                                         const diagnosis = caseData.correctDiagnoses?.find(d => d.id === id);
                                         return (
                                             <div
                                                 key={id}
                                                 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-500 ${
                                                     isFound
                                                         ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.25)]'
                                                         : 'bg-slate-800/50 border-slate-700/50 text-slate-500'
                                                 }`}
                                                 style={{ animationDelay: `${idx * 100}ms` }}
                                             >
                                                 {isFound ? (
                                                     <>
                                                         <svg className="w-3.5 h-3.5 text-rose-400 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                         </svg>
                                                         <span>{diagnosis?.name || id}</span>
                                                     </>
                                                 ) : (
                                                     <span className="tracking-widest">? ? ?</span>
                                                 )}
                                             </div>
                                         );
                                     })}
                                 </div>
                             </div>
                         )}
                        {pendingRefinement ? (
                           <EcgRefinementInline 
                              isOpen={true}
                              diagnosisId={pendingRefinement.diagnosisId}
                              correctId={caseData?.subDiagnosis}
                              onSubmit={submitRefinement}
                           />
                        ) : (
                           <AutocompleteInput 
                              onSubmitGuess={submitGuess} 
                              status={status} 
                              attemptedDiagnoses={attemptedDiagnoses}
                              allowedIds={ECG_WHITELIST}
                           />
                        )}

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
                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Inline Outcome Card */}
                        <div className={`relative overflow-hidden rounded-3xl border shadow-lg p-5 md:p-6 flex flex-col items-center text-center ${status === 'won' ? 'bg-emerald-950/40 border-emerald-900/50' : 'bg-rose-950/40 border-rose-900/50'}`}>
                           
                           {/* Carimbo */}
                           <div className={`mb-3 px-4 py-1.5 border-2 rounded-lg font-bold tracking-widest text-sm md:text-base uppercase animate-in zoom-in duration-500 delay-150 ${status === 'won' ? 'border-emerald-500 text-emerald-400 rotate-[-2deg]' : 'border-rose-500 text-rose-400 rotate-[2deg]'}`}>
                              {status === 'won' ? 'Laudo Correto' : 'Falha no Laudo'}
                           </div>
                           
                           <p className="text-slate-400 text-xs mb-1">
                               {caseData?.correctDiagnoses?.length > 1 ? 'Os diagnósticos oficiais deste ECG são:' : 'O diagnóstico oficial deste ECG é:'}
                           </p>
                           <h3 className="text-xl md:text-2xl font-bold text-white">
                               {caseData?.correctDiagnoses?.map(d => getFullDiagnosisName(d, caseData)).join(' + ')}
                           </h3>
                        </div>
                        
                        {/* Clinical Case Context */}
                        {caseData?.clinicalCase && (
                           <div className="mt-4 bg-amber-950/30 border border-amber-900/40 rounded-3xl p-6">
                              <h4 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2 uppercase tracking-wide">
                                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                 Caso Clínico
                              </h4>
                              <p className="text-slate-300 text-sm leading-relaxed">{caseData.clinicalCase}</p>
                           </div>
                        )}

                        {/* Explanation Appended Below */}
                        {caseData?.explanation && (
                           <div className="mt-4 bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                              <h4 className="text-slate-300 font-bold text-sm mb-2 flex items-center gap-2 uppercase tracking-wide">
                                 <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                 Explicação Técnica
                              </h4>
                              <p className="text-slate-400 text-sm leading-relaxed">{caseData.explanation}</p>
                           </div>
                        )}
                     </div>
                  )}
                  
                  {mode === 'arcade' && status !== 'playing' && (
                     <div className="flex justify-center mt-6">
                         <button onClick={challenge.resetArcade} className="px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors shadow-lg shadow-rose-900/50 flex items-center gap-2">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                           Gerar Próximo Caso Aleatório
                        </button>
                     </div>
                  )}
               </div>
            </>
         )}

      </main>

      {/* Partial Diagnosis Toast */}
      {partialToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500 pointer-events-none">
          <div className="flex items-center gap-3 bg-rose-950/90 border border-rose-500/40 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex-shrink-0">
              <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <p className="text-rose-300 text-[10px] font-bold uppercase tracking-wider">Achado Parcial Confirmado</p>
              <p className="text-white text-sm font-semibold">{partialToast.name}</p>
            </div>
            <svg className="w-5 h-5 text-rose-400 ml-2 animate-in zoom-in duration-300 delay-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      {/* Modals */}
      <EcgStatsModal 
         isOpen={isStatsOpen}
         onClose={() => setIsStatsOpen(false)}
      />
    </div>
  );
}
