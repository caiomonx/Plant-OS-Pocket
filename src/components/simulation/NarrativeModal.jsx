import { Phone, AlertTriangle, CheckCircle2, Stethoscope } from 'lucide-react';
import React, { useEffect } from 'react';
import { stopAllGeneratedSounds } from '../../utils/soundUtils';

export default function NarrativeModal({ isOpen, renalStatus, onConfirm }) {
    if (!isOpen) return null;

    const isDialytic = renalStatus === 'dialysis';

    useEffect(() => {
        if (isOpen) {
            return () => stopAllGeneratedSounds();
        }
    }, [isOpen]);

    // TEXT CONFIGURATION
    const config = isDialytic ? {
        title: "Solicitação Aceita",
        icon: CheckCircle2,
        color: "text-emerald-400",
        borderColor: "border-emerald-500/30",
        bgGradient: "from-emerald-950/80 to-slate-900",
        text: "Solicitação aceita. A equipe de nefrologia confirmou vaga imediata e o transporte foi acionado.",
        subtext: "O paciente será transferido para o setor de hemodiálise."
    } : {
        title: "Interação com Nefrologia",
        icon: Phone, // Or Phone
        color: "text-amber-400",
        borderColor: "border-amber-500/30",
        bgGradient: "from-amber-950/80 to-slate-900",
        text: "O Nefrologista atende o telefone, resmunga sobre 'medidas clínicas antes', te insulta, mas aceita assumir o caso.",
        subtext: "A transferência foi autorizada, mas sua conduta será questionada."
    };

    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className={`w-full max-w-lg bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100`}>

                {/* Header with Icon */}
                <div className="p-8 flex flex-col items-center text-center gap-4">
                    <div className={`p-4 rounded-full bg-slate-950/50 border ${config.borderColor} shadow-xl`}>
                        <Icon size={48} className={config.color} />
                    </div>

                    <h2 className={`text-2xl font-bold tracking-wide ${config.color}`}>
                        {config.title}
                    </h2>
                </div>

                {/* Narrative Text */}
                <div className="px-8 pb-4 text-center">
                    <p className="text-xl text-slate-200 leading-relaxed font-medium italic">
                        "{config.text}"
                    </p>
                    <p className="mt-4 text-sm text-slate-500 uppercase tracking-widest font-bold">
                        {config.subtext}
                    </p>
                </div>

                {/* Confirm Button */}
                <div className="p-6 flex justify-center bg-slate-950/30 border-t border-white/5">
                    <button
                        onClick={onConfirm}
                        className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all
                            ${isDialytic
                                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20"
                                : "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/20"
                            }`}
                    >
                        Confirmar Transferência
                    </button>
                </div>
            </div>
        </div>
    );
}
