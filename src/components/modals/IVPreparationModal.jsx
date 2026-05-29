import React, { useState, useEffect } from 'react';
import { Droplets, AlertTriangle, Check, Beaker, Syringe } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * IVPreparationModal
 * Modal para preparação de medicamentos IV que requerem diluição.
 * Permite escolher mL aspirados e volume de diluente (opcional).
 * Calcula concentração final e valida segurança (flebite).
 */
export default function IVPreparationModal({ isOpen, onClose, onConfirm, drugConfig }) {
    if (!isOpen || !drugConfig) return null;

    // Default States
    // Se bolus é permitido (ex: Gluconato, Furosemida), começa SEM diluição.
    // Se não é (ex: KCl, Magnésio), começa COM diluição.
    const initialDilutionState = !drugConfig.isBolusAllowed;

    const [mlAspirated, setMlAspirated] = useState(drugConfig.recommendedPreparation?.drug || drugConfig.ampuleVolume);
    const [isDiluted, setIsDiluted] = useState(initialDilutionState);
    const [diluentVolume, setDiluentVolume] = useState(drugConfig.recommendedPreparation?.diluent || 100);

    // Reset ao abrir novo drug
    useEffect(() => {
        if (drugConfig) {
            setMlAspirated(drugConfig.recommendedPreparation?.drug || drugConfig.ampuleVolume);
            const shouldBeDiluted = !drugConfig.isBolusAllowed;
            setIsDiluted(shouldBeDiluted);
            setDiluentVolume(drugConfig.recommendedPreparation?.diluent || 100);
        }
    }, [drugConfig?.id]);

    // Cálculos
    const actualDiluent = isDiluted ? diluentVolume : 0;
    const totalMEq = mlAspirated * drugConfig.concentration; // Note: drugConfig.concentration depends on unit. 
    // Wait, drugConfig.concentration in arsenal is "mg/mL", "mEq/mL" etc.
    // Let's re-verify arsenal. 
    // Gluconato: conc=100 (mg/mL). Amp 10mL. Total = 1000mg = 1g. Correct. unit='g'. totalMEq here is misnamed, should be totalContent.

    // KCl: conc=2.5 (mEq/mL). Amp 10mL. Total = 25mEq. Correct. unit='mEq'.
    // Furo: conc=10 (mg/mL). Amp 2mL. Total = 20mg. Correct. unit='mg'.

    // So totalContent = mlAspirated * drugConfig.concentration
    const totalContent = mlAspirated * drugConfig.concentration;
    const totalVolume = mlAspirated + actualDiluent;

    // Concentration per 100mL (Standard Clinical Unit for safety check often implied)
    // Or just simple concentration (mg/mL or mEq/mL)
    // The previous code used: (totalMEq / totalVolume) * 100 => Amount per 100mL.
    // Let's stick to that if maxSafeConcentration is defined as "per 100mL".
    // Arsenal Check:
    // Gluconato: maxSafe=100. If pure (10mL): (1000mg / 10mL)*100 = 10000 mg/100mL. Wait.
    // Gluconato maxSafe is likely mg/mL? NO.
    // Let's look at previous file content.
    // "ConcentrationPer100ml".
    // If Gluconato pure: 100 mg/mL. *100 = 10000 mg/100mL.
    // maxSafeConcentration in new arsenal for Gluconato is 100. 
    // IF maxSafe is 100, then pure (10000) is WAY UNSAFE.
    // ERROR IN ARSENAL DEFINITION or CALCULATION.

    // Let's adjust calculation to be simpler: "Content per mL".
    // Conc = totalContent / totalVolume (e.g. mg/mL).
    // And update Arsenal maxSafe to be in mg/mL.

    // BUT I just wrote the arsenal.
    // Gluconato: maxSafe 100. Pure is 100mg/mL. So OK.
    // Magnésio: maxSafe 1. Pure is 100mg/mL (10%). Unsafe. Correct.
    // KCl: maxSafe 0.1 (mEq/mL). Pure is 2.5 mEq/mL. Unsafe. Correct.
    // Furosemida: maxSafe 10 (mg/mL). Pure is 10mg/mL. Safe. Correct.

    // SO: Calc should be per mL.
    const concentrationPerMl = totalVolume > 0 ? (totalContent / totalVolume) : 0;

    // Display Logic (User often thinks in % or per 100mL for fluids, but for drugs usually mg/mL)
    // Let's show mg/mL (or mEq/mL).

    const isSafe = concentrationPerMl <= (drugConfig.maxSafeConcentration * 1.01); // 1% tolerance for floating point

    const handleConfirm = () => {
        onConfirm({
            mlAspirated,
            diluentVolume: actualDiluent,
            totalContent: Math.round(totalContent * 10) / 10,
            concentration: Math.round(concentrationPerMl * 100) / 100,
            isDiluted,
            isSafe
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Beaker className="text-cyan-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">{drugConfig.label}</h2>
                        <p className="text-xs text-slate-400 mt-1">
                            {drugConfig.presentationLabel}
                        </p>
                    </div>
                </div>

                {/* Aspiration Slider */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-end">
                        <label className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
                            Dose a Aspirar
                        </label>
                        <div className="text-right">
                            <span className="text-2xl font-mono font-bold text-white">{mlAspirated.toFixed(1)} mL</span>
                            <span className="block text-xs text-slate-500">{(mlAspirated * drugConfig.concentration).toFixed(1)} {drugConfig.unit}</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        min={drugConfig.ampuleVolume <= 2 ? "0.5" : "1"}
                        max={Math.max(50, drugConfig.ampuleVolume * 10)} // Allow up to 10 amps or 50ml min
                        step={drugConfig.ampuleVolume <= 2 ? 0.5 : 1}
                        value={mlAspirated}
                        onChange={(e) => setMlAspirated(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </div>

                {/* Dilution Checkbox */}
                <div className="flex items-center gap-3 mb-6 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={isDiluted}
                            onChange={(e) => setIsDiluted(e.target.checked)}
                            className="w-5 h-5 appearance-none border-2 border-slate-600 rounded bg-slate-900 checked:bg-cyan-500 checked:border-cyan-500 transition-colors cursor-pointer"
                        />
                        {isDiluted && <Check size={14} className="absolute inset-0 m-auto text-black pointer-events-none" />}
                    </div>
                    <label className="text-sm font-medium text-slate-200 cursor-pointer select-none" onClick={() => setIsDiluted(!isDiluted)}>
                        Diluir em Soro Fisiológico (SF 0,9%)
                    </label>
                </div>

                {/* Diluent Slider (Conditional) */}
                {isDiluted && (
                    <div className="space-y-2 mb-6 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-blue-400 uppercase tracking-widest">
                                Volume de Diluente
                            </label>
                            <span className="text-2xl font-mono font-bold text-white">{diluentVolume} mL</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="250"
                            step="10"
                            value={diluentVolume}
                            onChange={(e) => setDiluentVolume(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>0 mL</span>
                            <span>250 mL</span>
                        </div>
                    </div>
                )}

                {/* Calculation Display */}
                <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <span className="text-xs text-slate-400 font-bold uppercase block">Dose Real</span>
                            <span className="text-xl font-bold text-cyan-400">{totalContent.toFixed(1)} {drugConfig.unit}</span>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 font-bold uppercase block">Volume Total</span>
                            <span className="text-xl font-bold text-slate-200">{totalVolume.toFixed(1)} mL</span>
                        </div>
                    </div>
                    <div className="h-px bg-slate-800 mb-3"></div>
                    <div>
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Concentração Estimada</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white font-mono">
                                {concentrationPerMl.toFixed(2)} <span className="text-sm">{drugConfig.unit}/mL</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Safety Alert (Reactive) */}
                {!isSafe && totalVolume > 0 && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 mb-4 flex items-start gap-3 animate-pulse">
                        <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="text-sm font-bold text-red-400">⚠️ ALERTA DE SEGURANÇA</p>
                            <p className="text-xs text-red-300 mt-1">
                                Concentração MUITO ALTA para via periférica!
                                <br />
                                Risco grave de flebite, hipotensão ou PCR.
                            </p>
                        </div>
                    </div>
                )}

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
                        disabled={mlAspirated === 0}
                        className={cn(
                            "flex-1 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2",
                            mlAspirated === 0
                                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                                : "bg-cyan-600 hover:bg-cyan-500 text-white active:scale-95"
                        )}
                    >
                        <Syringe size={18} />
                        Administrar
                    </button>
                </div>

            </div>
        </div>
    );
}
