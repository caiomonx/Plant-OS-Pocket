import React, { useState, useEffect } from 'react';

export const TOPOGRAPHY_OPTIONS = [
  { id: 'anterior', label: 'Parede Anterior' },
  { id: 'inferior', label: 'Parede Inferior' },
  { id: 'lateral', label: 'Parede Lateral' },
  { id: 'posterior', label: 'Parede Posterior' },
  { id: 'ventriculo_direito', label: 'Ventrículo Direito' },
  { id: 'anterosseptal', label: 'Parede Anterosseptal' },
  { id: 'anterolateral', label: 'Parede Anterolateral' },
  { id: 'inferolateral', label: 'Parede Inferolateral' },
  { id: 'inferodorsal', label: 'Parede Inferodorsal' },
];

export const PATTERN_OPTIONS = [
  { id: 'isquemia_subendocardica_difusa', label: 'Isquemia Subendocárdica Difusa' },
  { id: 'padrao_wellens', label: 'Padrão de Wellens' },
  { id: 'padrao_de_winter', label: 'Padrão De Winter' },
  { id: 'padrao_aslanger', label: 'Padrão de Aslanger' },
  { id: 'isquemia_comum', label: 'Isquemia / Padrão Comum' },
];

export default function EcgRefinementInline({ isOpen, diagnosisId, correctId, onSubmit }) {
  const [selectedId, setSelectedId] = useState(null);

  // Reset internal state when hidden
  useEffect(() => {
    if (!isOpen) setSelectedId(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const isStemi = diagnosisId === 'scacsst';
  const options = isStemi ? TOPOGRAPHY_OPTIONS : PATTERN_OPTIONS;
  const title = isStemi ? 'Topografia da Isquemia' : 'Padrão Eletrocardiográfico';
  const diagnosisName = isStemi ? 'SCA com Supra' : 'SCA sem Supra';

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="relative w-full bg-slate-900 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)] rounded-3xl overflow-hidden">
        
        {/* Banner de Sucesso do Primeiro Passo */}
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">{diagnosisName} Confirmada!</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse">Última Chance</span>
            </div>
        </div>

        <div className="p-6">
            <div className="mb-4">
                <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
                <p className="text-slate-400 text-sm">Selecione o achado específico no traçado acima:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {options.map(opt => {
                    const actualCorrectId = correctId || 'padrao_comum';
                    const isCorrectOption = (opt.id === actualCorrectId) || (!correctId && (opt.id === 'padrao_comum' || opt.id === 'isquemia_comum'));
                    
                    let btnClass = "p-3 text-left rounded-xl border transition-all flex items-center justify-between ";
                    let textClass = "text-xs font-semibold transition-colors ";
                    
                    if (selectedId) {
                        if (opt.id === selectedId) {
                            if (isCorrectOption) {
                                btnClass += "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                                textClass += "text-emerald-300";
                            } else {
                                btnClass += "bg-rose-500/20 border-rose-500/50 shadow-[0_0_15px_rgba(225,29,72,0.2)]";
                                textClass += "text-rose-300";
                            }
                        } else if (isCorrectOption) {
                            btnClass += "bg-emerald-500/10 border-emerald-500/30 opacity-80";
                            textClass += "text-emerald-400";
                        } else {
                            btnClass += "bg-slate-800/20 border-slate-800/30 opacity-40 grayscale";
                            textClass += "text-slate-500";
                        }
                    } else {
                        btnClass += "group border-slate-800 bg-slate-800/40 hover:bg-rose-500/10 hover:border-rose-500/40 cursor-pointer";
                        textClass += "text-slate-300 group-hover:text-white";
                    }

                    return (
                        <button
                            key={opt.id}
                            disabled={!!selectedId}
                            onClick={() => {
                                if (selectedId) return;
                                setSelectedId(opt.id);
                                setTimeout(() => onSubmit(opt.id), 1200);
                            }}
                            className={btnClass}
                        >
                            <span className={textClass}>{opt.label}</span>
                            {!selectedId && (
                                <svg className="w-4 h-4 text-rose-500 transform translate-x-[-4px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                                </svg>
                            )}
                            {selectedId && opt.id === selectedId && isCorrectOption && (
                                <svg className="w-5 h-5 text-emerald-400 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            )}
                            {selectedId && opt.id === selectedId && !isCorrectOption && (
                                <svg className="w-5 h-5 text-rose-400 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
}
