import React, { useState, useEffect } from 'react';
import { X, TestTube, CheckCircle2, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function LabSelectionModal({ isOpen, onClose, onConfirm }) {
    // Checkbox State
    const [selected, setSelected] = useState({
        electrolytes: false,
        renal: false,
        gasometry: false,
        glucose: false,
        cpk: false,
        cbc: false
    });

    // Zera o estado das checkboxes sempre que o modal é aberto
    useEffect(() => {
        if (isOpen) {
            setSelected({
                electrolytes: false,
                renal: false,
                gasometry: false,
                glucose: false,
                cpk: false,
                cbc: false
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const toggle = (key) => setSelected(prev => ({ ...prev, [key]: !prev[key] }));

    const handleConfirm = () => {
        // Flatten selection to a list of requested codes for the engine
        const requests = [];
        if (selected.electrolytes) requests.push('k', 'na', 'mg', 'cl', 'ca');
        if (selected.renal) requests.push('cr', 'ur', 'ureia'); // Safety fallback
        if (selected.gasometry) requests.push('ph', 'pco2', 'hco3', 'lac');
        if (selected.glucose) requests.push('glucose');
        if (selected.cpk) requests.push('cpk');
        if (selected.cbc) requests.push('cbc');

        onConfirm(requests);
    };

    const options = [
        { id: 'electrolytes', label: 'Eletrólitos (Na, K, Mg, Cl, Ca)', recommended: true },
        { id: 'renal', label: 'Função Renal (Cr, Ur)', recommended: true },
        { id: 'gasometry', label: 'Gasometria Arterial', recommended: true },
        { id: 'glucose', label: 'Glicemia', recommended: true },
        { id: 'cpk', label: 'Enzimas Musculares (CPK)', recommended: false }, // Critical for Rhabdo
        { id: 'cbc', label: 'Hemograma Completo', recommended: false },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-100">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-100">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400">
                            <TestTube size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-tight">Solicitação de Exames</h2>
                            <p className="text-sm text-slate-400">Selecione os painéis desejados</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-3">
                    {options.map((opt) => {
                        const isSelected = selected[opt.id];
                        return (
                            <button
                                key={opt.id}
                                onClick={() => toggle(opt.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-75 group text-left",
                                    isSelected
                                        ? "bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                                        : "bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        isSelected ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-500 group-hover:text-slate-400"
                                    )}>
                                        <TestTube size={20} />
                                    </div>
                                    <div>
                                        <span className={cn(
                                            "block font-bold leading-tight transition-colors",
                                            isSelected ? "text-blue-100" : "text-slate-300 group-hover:text-slate-200"
                                        )}>
                                            {opt.label.split('(')[0]}
                                        </span>
                                        {opt.label.includes('(') && (
                                            <span className={cn(
                                                "text-xs font-medium",
                                                isSelected ? "text-blue-300" : "text-slate-500"
                                            )}>
                                                ({opt.label.split('(')[1]}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    isSelected
                                        ? "border-blue-500 bg-blue-500 text-white scale-110"
                                        : "border-slate-600 bg-transparent text-transparent group-hover:border-slate-500"
                                )}>
                                    <Check size={14} strokeWidth={4} />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-400 hover:text-white font-bold transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                    >
                        Solicitar
                    </button>
                </div>
            </div>
        </div>
    );
}
