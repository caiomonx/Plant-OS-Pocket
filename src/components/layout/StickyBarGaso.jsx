import React from 'react';
import { RefreshCw, ArrowLeft, FileSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const StickyBarGaso = ({ scenario, labs, agValue, agLabel = "AG", onRestart, onBack, onOpenResults, showLabs = false }) => {
    const navigate = useNavigate();
    
    if (!scenario) return null;

    return (
        <div className="fixed bottom-4 left-0 right-0 z-40 animate-slide-up flex justify-center px-4 pointer-events-none">
            <div className={cn(
                "pointer-events-auto flex items-center justify-between",
                "bg-[#11131F]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
                "h-14 sm:h-16 px-4 sm:px-6 transition-all duration-500 max-w-[95%] sm:max-w-fit"
            )}>
                
                {/* 1. Primary Actions (Back) */}
                <div className="flex items-center sm:gap-2 pr-4 border-r border-white/5">
                    <button
                        onClick={onBack || (() => navigate('/'))}
                        className="p-2 text-slate-400 hover:text-white rounded-full transition-colors hover:bg-white/5"
                        title="Voltar"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                {/* 2. LAB HIGHLIGHTS (The Star of the show) */}
                {showLabs && labs ? (
                    <div className="flex items-center gap-2 sm:gap-8 px-2 sm:px-8 group">
                        <div className="flex flex-col items-center group/item scale-95 sm:scale-100">
                             <span className="text-[9px] font-black text-cyan-500/80 uppercase tracking-widest mb-0.5">pH</span>
                             <span className="text-base sm:text-lg font-black text-white font-mono tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{labs.ph?.toFixed(2) || '--'}</span>
                        </div>
                        <div className="flex flex-col items-center group/item scale-95 sm:scale-100">
                             <span className="text-[9px] font-black text-cyan-500/80 uppercase tracking-widest mb-0.5 whitespace-nowrap">HCO3</span>
                             <span className="text-base sm:text-lg font-black text-white font-mono tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{labs.hco3 || '--'}</span>
                        </div>
                        <div className="flex flex-col items-center group/item scale-95 sm:scale-100">
                             <span className="text-[9px] font-black text-cyan-500/80 uppercase tracking-widest mb-0.5">pCO2</span>
                             <span className="text-base sm:text-lg font-black text-white font-mono tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{labs.pco2 || '--'}</span>
                        </div>
                        {agValue && (
                            <div className="flex flex-col items-center group/item scale-95 sm:scale-100 ml-2 sm:ml-4 pl-4 sm:pl-8 border-l border-white/10">
                                 <span className="text-[9px] font-black text-teal-500/90 uppercase tracking-widest mb-0.5">{agLabel}</span>
                                 <span className="text-base sm:text-lg font-black text-teal-400 font-mono tracking-tighter drop-shadow-[0_0_8px_rgba(20,184,166,0.2)]">{agValue}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="px-8 animate-pulse italic text-xs text-slate-500 font-bold uppercase tracking-widest opacity-30">
                        Aguardando Exames...
                    </div>
                )}

                {/* 3. Result Action & Restart */}
                <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-white/5">
                    {showLabs && (
                        <button
                            onClick={onOpenResults}
                            className={cn(
                                "flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all group",
                                "bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95 shadow-xl shadow-cyan-500/20"
                            )}
                        >
                            <FileSearch size={18} strokeWidth={2.5} className="sm:group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider">Gasometria</span>
                        </button>
                    )}
                    
                    <button
                        onClick={onRestart}
                        className="p-2 text-slate-500 hover:text-white rounded-full transition-colors hover:bg-white/5"
                        title="Reiniciar Simulação"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
