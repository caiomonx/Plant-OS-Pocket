import React, { useState } from 'react';
import { Wind, Pipette, Droplet, Check } from 'lucide-react';

export default function SalbutamolModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    const [drops, setDrops] = useState(20); // Standard dose 5mg
    const [saline, setSaline] = useState(5); // Standard 3-5ml

    const mgDose = (drops / 4).toFixed(2); // 20 drops = 1ml = 5mg? 
    // Wait, prompt said: 20 drops = 1ml. Concentration is 5mg/ml. So 20 drops = 5mg.
    // 1 drop = 0.25mg.
    // Logic: drops / 20 * 5 = drops / 4. Correct.

    const handleConfirm = () => {
        onConfirm({
            id: 'drug_salbutamol',
            label: 'Salbutamol (Nebulização)',
            drops: Number(drops),
            saline: Number(saline),
            mgDose: Number(mgDose),
            doseLabel: `${drops} gotas (${mgDose}mg) + ${saline}ml SF`
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                        <Wind className="text-teal-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">Salbutamol (Nebulização)</h2>
                        <p className="text-xs text-slate-400 mt-1">Preparo da Solução</p>
                    </div>
                </div>

                {/* Inputs */}
                <div className="space-y-6 mb-8">

                    {/* Drops Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Pipette size={14} />
                            Dose (Gotas)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="5"
                                max="60"
                                step="5"
                                value={drops}
                                onInput={(e) => setDrops(Number(e.target.value))}
                                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                            />
                            <div className="w-20 bg-slate-950 border border-slate-700 rounded-lg py-2 text-center font-mono font-bold text-white">
                                {drops}
                            </div>
                        </div>
                        <div className="text-right text-xs text-teal-400 font-bold">
                            = {mgDose} mg
                        </div>
                    </div>

                    {/* Saline Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Droplet size={14} />
                            Diluente (SF 0.9%)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {[3, 5, 10].map(vol => (
                                <button
                                    key={vol}
                                    onClick={() => setSaline(vol)}
                                    className={`py-2 rounded-lg text-sm font-bold border transition-colors ${saline === vol
                                        ? 'bg-teal-900/40 border-teal-500 text-teal-300'
                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                        }`}
                                >
                                    {vol} ml
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Info Box */}
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 text-xs text-slate-400 mb-6 leading-relaxed">
                    <strong className="text-slate-300">Nota:</strong> A nebulização será administrada em fluxo contínuo de O2 (6-8L/min).
                </div>

                {/* Actions */}
                <div className="flex gap-3">
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
                        Adicionar
                    </button>
                </div>

            </div>
        </div>
    );
}
