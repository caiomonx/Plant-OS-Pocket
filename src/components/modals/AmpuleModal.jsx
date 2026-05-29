import React, { useState, useEffect } from 'react';
import { Syringe, Plus, Minus, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AmpuleModal({ isOpen, onClose, onConfirm, drugConfig }) {
    if (!isOpen || !drugConfig) return null;

    // Default to 1 ampule
    const [count, setCount] = useState(1);

    // Reset when opening new drug
    useEffect(() => {
        setCount(1);
    }, [drugConfig.id]);

    const handleIncrement = () => setCount(c => Math.min(c + 10, c + 1));
    const handleDecrement = () => setCount(c => Math.max(1, c - 1));

    const totalContent = count * drugConfig.contentPerAmpule;
    const totalVolume = count * drugConfig.volPerAmpule;

    const unit = drugConfig.unit || 'mg'; // mg or g

    const handleConfirm = () => {
        onConfirm({
            ...drugConfig,
            count,
            totalContent,
            totalVolume,
            doseLabel: `${count} Ampola(s) (${totalContent}${unit})`
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Syringe className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">{drugConfig.label}</h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Apres: {drugConfig.presentationLabel}
                        </p>
                    </div>
                </div>

                {/* Counter UI */}
                <div className="flex flex-col items-center gap-6 mb-8">

                    <div className="flex items-center gap-4 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                        <button
                            onClick={handleDecrement}
                            className="w-12 h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 transition-colors active:scale-90"
                        >
                            <Minus size={20} />
                        </button>

                        <div className="flex flex-col items-center min-w-[80px]">
                            <span className="text-3xl font-bold text-white font-mono">{count}</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                {count === 1 ? 'Ampola' : 'Ampolas'}
                            </span>
                        </div>

                        <button
                            onClick={handleIncrement}
                            className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors active:scale-90 shadow-lg shadow-blue-900/20"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    {/* Calculation Display */}
                    <div className="w-full bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border border-slate-700/50">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-bold uppercase">Dose Total</span>
                            <span className="text-2xl font-bold text-blue-400">
                                {totalContent} <span className="text-base">{unit}</span>
                            </span>
                        </div>
                        <div className="h-8 w-px bg-slate-700"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-slate-400 font-bold uppercase">Volume</span>
                            <span className="text-lg font-bold text-slate-200">
                                {totalVolume} <span className="text-sm">ml</span>
                            </span>
                        </div>
                    </div>

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
