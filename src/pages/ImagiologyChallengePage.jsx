import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImagiologyChallenge } from '../hooks/useImagiologyChallenge';
import ImagiologyInteractiveCanvas from '../components/challenge/ImagiologyInteractiveCanvas';
import ImagiologyHeader from '../components/challenge/ImagiologyHeader';
import ImagiologyStatsModal from '../components/challenge/ImagiologyStatsModal';
import { Heart, Eye, EyeOff, MapPin, FileText, Stethoscope } from 'lucide-react';

const FINDING_TYPES = [
  { id: 'consolidation', label: 'Consolidação' },
  { id: 'fracture', label: 'Fratura' },
  { id: 'effusion', label: 'Derrame Pleural' },
  { id: 'pneumothorax', label: 'Pneumotórax' },
  { id: 'mass', label: 'Massa/Nódulo' },
  { id: 'opacity', label: 'Opacidade' },
  { id: 'atelectasis', label: 'Atelectasia' },
  { id: 'cardiomegaly', label: 'Cardiomegalia' },
  { id: 'hyperlucency', label: 'Hiperlucência' },
  { id: 'other', label: 'Outro' }
];

export default function ImagiologyChallengePage() {
    const navigate = useNavigate();
    const challenge = useImagiologyChallenge();
    const [selectedType, setSelectedType] = useState('consolidation');
    const [toastMessage, setToastMessage] = useState(null);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [mode, setMode] = useState('daily');
    const [showAfterImage, setShowAfterImage] = useState(true);
    const [showPins, setShowPins] = useState(true);

    if (!challenge.isLoaded) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Carregando...</div>;
    }

    const { 
        caseData, 
        status, 
        lives, 
        foundIndices, 
        failedAttempts, 
        submitGuess,
        activeMode,
        stats,
        historyPreview,
        currentCaseIndex,
        loadDaily,
        loadArcade,
        loadHistoryReplay,
        resetArcade
    } = challenge;

    // Clinical case hint: revealed after first life lost (lives < 3)
    const showClinicalHint = lives < 3 && status === 'playing';

    const handleImageClick = (clickX, clickY, aspectRatio) => {
        if (status !== 'playing') return;

        const result = submitGuess(selectedType, clickX, clickY, aspectRatio);
        
        // Show ephemeral toast with feedback
        setToastMessage({ message: result.message, success: result.success });
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleModeSwitch = (newMode) => {
      setMode(newMode);
      setShowAfterImage(true);
      setShowPins(true);
      if (newMode === 'daily') loadDaily();
      else if (newMode === 'arcade') loadArcade();
    };

    const handleHistoryReplay = (caseId) => {
      setMode('history_replay');
      loadHistoryReplay(caseId);
    };

    // Sincroniza reativamente o modo visual da página com o modo ativo real do hook de desafio
    React.useEffect(() => {
        if (activeMode && activeMode !== mode && mode !== 'history') {
            setMode(activeMode);
        }
    }, [activeMode, mode]);

    return (
        <div className="h-screen bg-slate-950 text-slate-200 overflow-hidden flex flex-col font-sans">
            
            <ImagiologyHeader 
                navigate={navigate}
                mode={mode}
                handleModeSwitch={handleModeSwitch}
                stats={stats}
                setIsStatsOpen={setIsStatsOpen}
            />

            {/* Main Content - No ugly scrollbars */}
            <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 gap-4 overflow-y-auto no-scrollbar relative">
                
                {mode === 'history' ? (
                     <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 pt-4">
                       <div className="mb-6 text-center">
                          <h2 className="text-xl font-bold text-white">Livro Histórico</h2>
                          <p className="text-slate-400 text-sm">Resumo da sua jornada de Imaginologia. Revise ou jogue novamente laudos do passado.</p>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-12">
                           {historyPreview.map((item) => (
                               <button
                                   key={item.dayNumber}
                                   onClick={() => handleHistoryReplay(item.caseId)}
                                   className={`relative p-5 rounded-xl border text-left flex flex-col justify-between items-start transition-all ${
                                       item.status === 'won' 
                                       ? 'bg-slate-800/40 border-emerald-500/30 hover:bg-slate-800/60 opacity-100 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                                       : item.status === 'lost'
                                       ? 'bg-rose-900/10 border-rose-800/40 hover:bg-rose-900/20 opacity-100'
                                       : 'bg-slate-900 border-slate-800 hover:bg-slate-800 opacity-60 grayscale-[30%]'
                                   }`}
                               >
                                   <div className="flex justify-between items-center w-full mb-2">
                                       <span className="font-bold text-lg text-slate-200">#Dia {item.dayNumber}</span>
                                       {item.status === 'won' && <svg className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                       {item.status === 'lost' && <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                                       {item.status === 'unplayed' && <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                   </div>
                                   <p className="text-sm font-medium mt-1">
                                       {item.status === 'won' && <span className="text-emerald-400">Laudo Correto</span>}
                                       {item.status === 'lost' && <span className="text-rose-400">Falha no Laudo</span>}
                                       {item.status === 'unplayed' && <span className="text-slate-500">Caso Perdido</span>}
                                   </p>
                                   <span className="text-xs text-slate-500 mt-3 font-semibold uppercase tracking-wider">Jogar do zero &rarr;</span>
                               </button>
                           ))}
                       </div>
                     </div>
                ) : (
                    <>
                        {/* Title & Goal */}
                        <div className="flex flex-col items-center justify-center flex-shrink-0 text-center mt-2 mb-2">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                                {mode === 'arcade' ? 'Treino Livre' : 'Imagem Diária'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide flex items-center justify-center gap-2">
                                Exame de Imagem <span className="text-slate-400">#{mode === 'arcade' ? currentCaseIndex : caseData?.dayId}</span>
                            </h2>
                            
                            {caseData?.findings?.length > 1 && status === 'playing' && (
                                <div className="mt-3 px-4 py-1.5 bg-slate-900/60 border border-slate-700/50 rounded-full flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                        Achados: <span className="text-white">{foundIndices.length}</span> de {caseData.findings.length}
                                    </span>
                                </div>
                            )}

                            {/* Mobile Active Tool Indicator */}
                            {status === 'playing' && (
                                <div className="mt-3 px-4 py-2 bg-slate-800 border border-sky-500/30 rounded-lg flex items-center gap-2 lg:hidden shadow-lg animate-in fade-in slide-in-from-top-2">
                                    <MapPin className="w-4 h-4 text-sky-400" />
                                    <span className="text-xs font-bold text-slate-200">
                                        Procurando: <span className="text-sky-400 uppercase tracking-wider ml-1">{FINDING_TYPES.find(t => t.id === selectedType)?.label}</span>
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Central Workspace */}
                        <div className="flex-1 min-h-[400px] flex flex-col lg:flex-row gap-6 pb-6">
                            
                            {/* Left Column (Image + Contextual Post-Game Hint) */}
                            <div className="flex-1 flex flex-col gap-4 min-w-0">
                                <div className="flex-1 relative border border-slate-800 rounded-2xl overflow-hidden bg-black shadow-2xl min-h-[65vh] lg:min-h-[50vh] lg:h-auto group">
                                    {caseData?.imageUrl ? (
                                    <ImagiologyInteractiveCanvas 
                                        imageUrl={status !== 'playing' && showAfterImage && caseData.imageUrlAfter ? caseData.imageUrlAfter : caseData.imageUrl}
                                        resetKey={caseData.id}
                                        status={status}
                                        findings={caseData.findings}
                                        foundIndices={foundIndices}
                                        failedAttempts={failedAttempts}
                                        onImageClick={handleImageClick}
                                        showPins={showPins}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-500">Sem imagem disponível</div>
                                )}

                                {/* Post-Game Controls Bar (Bottom of image) */}
                                {status !== 'playing' && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                                        {/* Before/After Toggle */}
                                        {caseData?.imageUrlAfter && (
                                            <div className="flex bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full p-1 shadow-2xl">
                                                <button
                                                    onClick={() => setShowAfterImage(false)}
                                                    className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all uppercase tracking-wider ${
                                                        !showAfterImage
                                                            ? 'bg-white text-slate-900 shadow-md'
                                                            : 'text-slate-400 hover:text-slate-200'
                                                    }`}
                                                >
                                                    Original
                                                </button>
                                                <button
                                                    onClick={() => setShowAfterImage(true)}
                                                    className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all uppercase tracking-wider ${
                                                        showAfterImage
                                                            ? 'bg-white text-slate-900 shadow-md'
                                                            : 'text-slate-400 hover:text-slate-200'
                                                    }`}
                                                >
                                                    Achados
                                                </button>
                                            </div>
                                        )}

                                        {/* Toggle Pins */}
                                        <button
                                            onClick={() => setShowPins(!showPins)}
                                            className={`p-2 rounded-full backdrop-blur-md border shadow-2xl transition-all ${
                                                showPins
                                                    ? 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white'
                                                    : 'bg-slate-800/90 border-slate-600 text-slate-500 hover:text-slate-300'
                                            }`}
                                            title={showPins ? 'Ocultar marcadores' : 'Mostrar marcadores'}
                                        >
                                            {showPins ? <MapPin className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                    </div>
                                )}
                                </div>

                                {/* Post-Game Clinical Case (Option A - Rendered below image) */}
                                {status !== 'playing' && caseData?.clinicalCase && (
                                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 relative bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-500 to-sky-600/30" />
                                        <div className="flex items-center gap-2 mb-3">
                                            <Stethoscope className="w-4 h-4 text-sky-400" />
                                            <span className="text-[10px] font-bold text-sky-400/80 uppercase tracking-[0.2em]">História Clínica</span>
                                        </div>
                                        <p className="text-slate-200 text-sm leading-relaxed pl-1">{caseData.clinicalCase}</p>
                                    </div>
                                )}
                            </div>

                            {/* Right: Controls & Info */}
                            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
                                
                                {/* Lives / Hearts Indicator */}
                                {status === 'playing' && (
                                    <div className="flex flex-col items-center justify-center bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-sm">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">Tentativas Restantes</span>
                                        <div className="flex items-center justify-center gap-2">
                                            {[1, 2, 3].map((life) => (
                                                <Heart 
                                                    key={life}
                                                    className={`w-7 h-7 md:w-8 md:h-8 transition-all duration-300 ${life <= lives ? 'fill-slate-300 text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.4)] scale-100' : 'fill-slate-800 text-slate-700 scale-90 opacity-50'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Clinical Hint (revealed after 1st mistake, like ECG module) */}
                                {showClinicalHint && caseData?.clinicalCase && status === 'playing' && (
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-900/80 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-600/50" />
                                        <div className="flex items-center gap-2 mb-3">
                                            <Stethoscope className="w-4 h-4 text-amber-400" />
                                            <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-[0.2em]">Dica Clínica</span>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed pl-1">{caseData.clinicalCase}</p>
                                    </div>
                                )}

                                {/* Selector Area (Only when playing) */}
                                {status === 'playing' ? (
                                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-center">
                                        <div className="absolute top-0 left-0 w-1 bg-slate-500 h-full"></div>
                                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                            O que você procura?
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                            Selecione o tipo de achado abaixo e clique no local exato da radiografia.
                                        </p>
                                        <select
                                            value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-600 rounded-xl px-4 py-3.5 text-white text-base font-medium focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-inner appearance-none cursor-pointer"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
                                        >
                                            {FINDING_TYPES.map(t => (
                                                <option key={t.id} value={t.id}>{t.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    /* ───── Post-Game: Radiology Report Card ───── */
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">

                                        {/* Radiology Outcome Badge */}
                                        <div className={`relative overflow-hidden rounded-2xl border-2 p-6 text-center shadow-xl ${
                                            status === 'won'
                                                ? 'bg-gradient-to-br from-emerald-950/80 via-emerald-900/40 to-slate-900 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                                                : 'bg-gradient-to-br from-rose-950/80 via-rose-900/40 to-slate-900 border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.15)]'
                                        }`}>
                                            {/* Subtle radiology grid pattern */}
                                            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMEg0MFY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')]" />
                                            
                                            <div className="relative z-10">
                                                {/* Icon */}
                                                <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                                                    status === 'won' ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                                                }`}>
                                                    {status === 'won' ? (
                                                        <svg className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                    ) : (
                                                        <svg className="w-8 h-8 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    )}
                                                </div>

                                                {/* Main Text */}
                                                <h3 className={`text-xl font-black uppercase tracking-wider mb-1 ${
                                                    status === 'won' ? 'text-emerald-400' : 'text-rose-400'
                                                }`}>
                                                    {status === 'won' ? 'Achados Encontrados' : 'Achados Não Encontrados'}
                                                </h3>

                                                {/* Findings count */}
                                                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                                    {foundIndices.length} de {caseData?.findings?.length || 0} achados identificados
                                                </p>

                                                {/* Radiology joke — only on win */}
                                                {status === 'won' && (
                                                    <div className="mt-4 pt-3 border-t border-emerald-500/20">
                                                        <p className="text-emerald-300/60 text-[11px] italic font-medium tracking-wide">
                                                            "Correlacionar com dados clínicos e laboratoriais."
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Removed Clinical Case Card from right column (now below image) */}

                                        {/* Laudo / Explanation Card (styled) */}
                                        <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-slate-700/50 rounded-2xl p-5 shadow-lg overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-400 to-slate-500/30" />
                                            <div className="flex items-center gap-2 mb-3">
                                                <FileText className="w-4 h-4 text-slate-300" />
                                                <span className="text-[10px] font-bold text-slate-300/80 uppercase tracking-[0.2em]">Laudo Radiológico</span>
                                            </div>
                                            <p className="text-slate-300 text-sm leading-relaxed pl-1">{caseData?.explanation}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Arcade Skip Button (During Play) */}
                                {mode === 'arcade' && status === 'playing' && (
                                    <div className="flex justify-center mt-2">
                                       <button onClick={resetArcade} className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2">
                                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                         Pular para outro caso
                                       </button>
                                    </div>
                                )}

                                {/* Arcade Generate Next Button (After Play) */}
                                {mode === 'arcade' && status !== 'playing' && (
                                    <div className="flex justify-center mt-2">
                                        <button onClick={resetArcade} className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors shadow-lg border border-slate-600 flex items-center justify-center gap-2">
                                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                          Gerar Próximo Aleatório
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

            </main>

            {/* Dynamic Toast Feedback */}
            {toastMessage && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none">
                    <div className={`px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-md font-bold
                        ${toastMessage.success ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-400' : 'bg-slate-900/90 border-slate-600/50 text-white'}`}>
                        {toastMessage.message}
                    </div>
                </div>
            )}

            {/* Stats Modal */}
            <ImagiologyStatsModal 
                isOpen={isStatsOpen}
                onClose={() => setIsStatsOpen(false)}
                stats={stats}
            />
        </div>
    );
}
