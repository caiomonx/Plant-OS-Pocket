import React, { useState, useEffect } from 'react';
import { Droplets, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FluidPreparationModal({ isOpen, onClose, onConfirm, drugConfig }) {
    if (!isOpen || !drugConfig) return null;

    const [volume, setVolume] = useState(drugConfig.defaultVolume || 500);

    // Reset when changing drug config
    useEffect(() => {
        if (drugConfig) {
            setVolume(drugConfig.defaultVolume || 500);
        }
    }, [drugConfig?.id]);

    const handleConfirm = () => {
        onConfirm({
            ...drugConfig, // Keep original config properties
            volume,
            // Provide a label override compatible with the PrescriptionTray
            labelOverride: `${drugConfig.label} ${volume}mL`,
            doseAmount: volume, // Consistent naming logic if needed
            totalContent: volume, 
            unit: 'mL'
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Droplets className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">{drugConfig.label}</h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Prescrição de Fluidoterapia
                        </p>
                    </div>
                </div>

                {/* Slider */}
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-end">
                        <label className="text-sm font-bold text-blue-400 uppercase tracking-widest">
                            Volume a Infundir
                        </label>
                        <span className="text-3xl font-mono font-bold text-white">{volume} <span className="text-lg text-slate-400">mL</span></span>
                    </div>
                    
                    <input
                        type="range"
                        min="0"
                        max={drugConfig.maxVolume || 5000}
                        step={drugConfig.step || 100}
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                        <span>0 mL</span>
                        <span>{drugConfig.maxVolume || 5000} mL</span>
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
                        disabled={volume === 0}
                        className={cn(
                            "flex-1 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2",
                            volume === 0
                                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-500 text-white active:scale-95"
                        )}
                    >
                        <Check size={18} />
                        Confirmar
                    </button>
                </div>

            </div>
        </div>
    );
}
