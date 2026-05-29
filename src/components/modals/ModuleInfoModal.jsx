import React from 'react';
import { X, Info, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ModuleInfoModal({
    isOpen,
    onClose,
    module
}) {
    if (!isOpen || !module) return null;

    // Use the module's color or default to teal/cyan
    const colorClass = module.color === 'emerald' ? 'text-emerald-400' :
        module.color === 'rose' ? 'text-rose-400' : 'text-cyan-400';

    const bgClass = module.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20' :
        module.color === 'rose' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-cyan-500/10 border-cyan-500/20';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-lg bg-[#0F111A] border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className={cn("p-6 flex items-start justify-between border-b", bgClass)}>
                    <div className="flex gap-4">
                        <div className={cn("p-3 rounded-xl bg-black/20 backdrop-blur-sm shadow-inner", colorClass)}>
                            <Info size={28} strokeWidth={2} />
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1 block">
                                Informações do Módulo
                            </span>
                            <h2 className="text-2xl font-bold text-white leading-tight">
                                {module.title}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-black/20 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">

                    {/* Description Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                            <BookOpen size={14} />
                            <h3>Sobre o Módulo</h3>
                        </div>
                        <p className="text-slate-300 text-base leading-relaxed">
                            {module.details || module.description}
                        </p>
                    </div>

                    {/* Simulation Context Warning - Dynamic by Module */}
                    {module.id === 'potassium' && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Info size={60} />
                            </div>
                            <h4 className="text-blue-400 font-bold mb-2 relative z-10">Como funciona a simulação:</h4>
                            <ul className="text-blue-200/80 text-sm space-y-2 list-disc list-inside relative z-10 leading-relaxed">
                                <li>Você assumirá o papel de médico plantonista.</li>
                                <li>O caso clínico evolui em <strong>tempo de solicitação</strong>.</li>
                                <li>Cada ação (ECG, monitorização, medicações) consome tempo, durante o qual o paciente reage às condutas.</li>
                                <li>Ao final, você receberá um <strong>feedback estilo OSCE</strong> detalhado sobre sua conduta.</li>
                            </ul>
                        </div>
                    )}

                    {module.id === 'diarrhea' && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Info size={60} />
                            </div>
                            <h4 className="text-amber-400 font-bold mb-2 relative z-10">Como funciona a mecânica:</h4>
                            <ul className="text-amber-200/80 text-sm space-y-2 list-disc list-inside relative z-10 leading-relaxed">
                                <li>Você receberá casos pediátricos em um cenário de Pronto Atendimento/UBS.</li>
                                <li><strong>Fase 1:</strong> Interaja ativamente com o paciente para revelar os sinais do exame físico.</li>
                                <li><strong>Fase 2:</strong> Escolha o Plano de Manejo (A, B ou C) baseado nas diretrizes do Ministério da Saúde.</li>
                                <li><strong>Fase 3:</strong> Planos B e C enfrentam um <strong>relógio de evolução contínua</strong>, exigindo reavaliação perante intercorrências.</li>
                                <li>Ao final, um Checklist formativo avaliará suas orientações não-farmacológicas, prescrições e diagnóstico.</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    );
}
