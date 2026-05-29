import React, { useState, useEffect } from 'react';
import { Syringe, AlertTriangle, Droplets, ArrowRight, Check, X } from 'lucide-react';

export default function DilutionDrugModal({ isOpen, onClose, onConfirm, drugConfig }) {
    // --- STATE ---
    // Hooks must run Unconditionally
    const [doseVol, setDoseVol] = useState(50); // mL of Drug
    const [isDiluted, setIsDiluted] = useState(false);
    const [diluentVol, setDiluentVol] = useState(250); // mL of Saline/D5W

    // Safety Checks
    const [warning, setWarning] = useState(null);

    // Reset details when opening new drug
    useEffect(() => {
        if (drugConfig) {
            setDoseVol(drugConfig.defaultDoseVol || 50);
            setIsDiluted(false);
            setDiluentVol(250);
            setWarning(null);
        }
    }, [drugConfig, isOpen]); // Added isOpen to ensure reset on open

    // --- CALCULATIONS ---
    const doseMEq = doseVol; // For Bicarb 8.4%, 1ml = 1mEq.
    const totalVol = isDiluted ? (doseVol + diluentVol) : doseVol;
    const concentration = (doseVol / totalVol) * 8.4; // % approximate (w/v)

    // Safety Logic (Bicarb specific)
    useEffect(() => {
        if (!isDiluted) {
            setWarning({
                type: 'critical',
                message: 'Concentração MUITO ALTA (8.4%) para via periférica! Risco grave de flebite/necrose.'
            });
        } else if (concentration > 1.5) {
            setWarning({
                type: 'warning',
                message: `Concentração de ${concentration.toFixed(1)}% ainda é arriscada para acesso periférico (Ideal < 1.5%).`
            });
        } else {
            setWarning(null);
        }
    }, [isDiluted, concentration]);

    const handleConfirm = () => {
        if (onConfirm && drugConfig) {
            onConfirm({
                ...drugConfig,
                doseAmount: doseVol, // mEq (since 1ml=1mEq)
                isDiluted,
                diluentVol: isDiluted ? diluentVol : 0,
                concentrationPercent: concentration.toFixed(1),
                labelOverride: `${drugConfig.label} ${doseVol}mL (${doseMEq}mEq) ${isDiluted ? `+ ${diluentVol}mL SF` : 'PURO'}`
            });
        }
    };

    if (!isOpen || !drugConfig) return null; // Early return IS safe IF it's at the end (render time), but hooks ran above.
    // Wait, if I return null here, the JSX below doesn't run.
    // BUT the hooks ABOVE have already registered.
    // This is valid React.
    // "Hooks must be called in the same order."
    // If I return early, the hooks above were called.
    // On next render, if I return early again, hooks above called.
    // Matches.
    // The previous code had `if (!isOpen) return null` AT THE TOP. That was the bug.

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* HEADER */}
                <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                            <Syringe size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-100">{drugConfig.label}</h2>
                            <p className="text-sm text-slate-400">Prescrição Complexa</p>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">

                    {/* 1. DOSE */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                            1. Dose Unitária (mL)
                            <span className="text-slate-500 text-xs normal-case">1mL = 1mEq</span>
                        </label>
                        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                            <input
                                type="range"
                                min="10" max="250" step="10"
                                value={doseVol}
                                onChange={(e) => setDoseVol(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <div className="min-w-[80px] text-right">
                                <span className="text-2xl font-bold text-white font-mono">{doseVol}</span>
                                <span className="text-xs text-slate-500 ml-1">mL</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. DILUTION CHECK */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800/50 transition-colors">
                            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${isDiluted ? 'bg-blue-500 border-blue-500' : 'border-slate-500'}`}>
                                {isDiluted && <Check size={14} className="text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isDiluted}
                                onChange={(e) => setIsDiluted(e.target.checked)}
                            />
                            <div className="flex-1">
                                <span className="block text-sm font-bold text-slate-200">Diluir Medicação?</span>
                                <span className="block text-xs text-slate-500">Adicionar diluente (SF 0.9% ou SG 5%)</span>
                            </div>
                            <Droplets className={isDiluted ? "text-blue-400" : "text-slate-600"} />
                        </label>
                    </div>

                    {/* 3. DILUENT VOL (Conditional) */}
                    <div className={`space-y-3 transition-all duration-300 overflow-hidden ${isDiluted ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                            3. Volume do Diluente
                        </label>
                        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                            <input
                                type="range"
                                min="100" max="1000" step="50"
                                value={diluentVol}
                                onChange={(e) => setDiluentVol(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <div className="min-w-[80px] text-right">
                                <span className="text-2xl font-bold text-white font-mono">{diluentVol}</span>
                                <span className="text-xs text-slate-500 ml-1">mL</span>
                            </div>
                        </div>
                    </div>

                    {/* SUMMARY & WARNINGS */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Solução Final</span>
                            <span className="text-xs text-slate-400">{concentration.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <span>{doseVol}mL Drug</span>
                            <ArrowRight size={14} className="text-slate-600" />
                            <span>{totalVol}mL Total</span>
                        </div>

                        {/* WARNING BOX */}
                        {warning && (
                            <div className={`mt-3 p-3 rounded-lg flex items-start gap-3 border ${warning.type === 'critical' ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-amber-500/10 border-amber-500/30 text-amber-200'}`}>
                                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                                <p className="text-xs font-medium leading-relaxed">
                                    {warning.message}
                                </p>
                            </div>
                        )}
                    </div>

                </div>

                {/* FOOTER */}
                <div className="p-6 pt-0 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={18} />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
