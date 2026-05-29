import React, { useState } from 'react';
import { Syringe, AlertTriangle, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function PolarizingSolutionModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    const [insulinType, setInsulinType] = useState('REGULAR'); // REGULAR, LISPRO, NPH
    const [insulinDose, setInsulinDose] = useState(10);
    const [glucoseDose, setGlucoseDose] = useState(50);

    const handleConfirm = () => {
        onConfirm({
            insulinType,
            insulinDose: Number(insulinDose),
            glucoseDose: Number(glucoseDose)
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-100">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Syringe className="text-purple-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Solução Polarizante</h2>
                        <p className="text-xs text-slate-400">Configure a administração</p>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-6">

                    {/* Insulin Type */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Insulina</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['REGULAR', 'LISPRO', 'NPH'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setInsulinType(type)}
                                    className={cn(
                                        "py-2 px-3 rounded-lg text-xs font-bold border transition-colors duration-75 active:scale-95",
                                        insulinType === type
                                            ? "bg-purple-600 border-purple-500 text-white"
                                            : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Doses Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Insulin Dose */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dose Insulina (UI)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={insulinDose}
                                    onChange={(e) => setInsulinDose(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white font-mono text-lg focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <span className="absolute right-3 top-4 text-xs text-slate-600 font-bold">UI</span>
                            </div>
                        </div>

                        {/* Glucose Dose */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Glicose (g)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={glucoseDose}
                                    onChange={(e) => setGlucoseDose(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white font-mono text-lg focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                                <span className="absolute right-3 top-4 text-xs text-slate-600 font-bold">g</span>
                            </div>
                        </div>
                    </div>

                    {/* Warning/Info */}
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex gap-3 items-start">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-xs text-slate-400 leading-relaxed">
                            A solução será infundida em bolus ou infusão rápida (2 min). Certifique-se de que o acesso venoso está pérvio.
                        </p>
                    </div>

                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold shadow-lg shadow-teal-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={18} />
                        Administrar
                    </button>
                </div>

            </div>
        </div>
    );
}
