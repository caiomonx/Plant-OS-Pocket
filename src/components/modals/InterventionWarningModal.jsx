import React from 'react';
import { X, AlertTriangle, PlayCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function InterventionWarningModal({
    isOpen,
    onClose,
    onConfirm,
    drugName,
    timeSince,
    remainingTime
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-slate-900 border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-5 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-400">
                        <AlertTriangle size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-yellow-400 leading-tight">Medicamento Ativo</h2>
                        <p className="text-sm text-yellow-200/60 mt-0.5">Ação farmacológica em curso</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm font-medium">Medicamento</span>
                            <span className="text-white font-bold">{drugName}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm font-medium">Administrado há</span>
                            <span className="text-cyan-400 font-mono font-bold">{timeSince} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm font-medium">Tempo Restante (Est.)</span>
                            <span className="text-yellow-400 font-mono font-bold">{remainingTime} min</span>
                        </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed text-center">
                        Este medicamento ainda está dentro da janela de efeito esperada.
                        A administração repetida pode resultar em superdosagem ou efeitos adversos.
                    </p>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-700/50 bg-slate-800/30 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 px-4 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 hover:border-slate-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg shadow-yellow-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <PlayCircle size={18} />
                        Readministrar
                    </button>
                </div>
            </div>
        </div>
    );
}
