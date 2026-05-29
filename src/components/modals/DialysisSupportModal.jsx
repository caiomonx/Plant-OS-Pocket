import React from 'react';
import { Activity, Check } from 'lucide-react';

export default function DialysisSupportModal({ isOpen, onClose, onConfirm, config }) {
    if (!isOpen || !config) return null;

    const [selectedFlow, setSelectedFlow] = React.useState(config.flowOptions?.[0]);

    const handleConfirm = () => {
        if (!selectedFlow) return;
        
        onConfirm({
            doseLabel: selectedFlow.label,
            totalContent: selectedFlow.flow,
            unit: 'flow',
            isDialysis: true
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Activity className="text-purple-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">{config.label}</h2>
                        <p className="text-xs text-slate-400 mt-1">Terapia de Suporte Renal</p>
                    </div>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Modalidade
                    </label>
                    <div className="flex flex-col gap-2">
                        {config.flowOptions?.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedFlow(opt)}
                                className={`py-4 px-3 rounded-xl text-left text-sm font-bold border transition-colors ${
                                    selectedFlow === opt
                                        ? 'bg-purple-900/40 border-purple-500 text-purple-300'
                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
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
                        className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold shadow-lg shadow-purple-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        disabled={!selectedFlow}
                    >
                        <Check size={18} />
                        Instalar
                    </button>
                </div>
            </div>
        </div>
    );
}
