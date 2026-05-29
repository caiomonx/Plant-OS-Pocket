import React, { useState, useEffect } from 'react';
import { Ambulance, AlertTriangle, CheckCircle, Activity, ChevronRight, Loader2, Hospital } from 'lucide-react';
import { cn } from '../../lib/utils';
import { calculateScore } from '../../utils/scoringSystem';
import { stopAllGeneratedSounds } from '../../utils/soundUtils';

export default function SusFacilModal({ isOpen, onClose, telemetry, scenario, onTransferConfirm }) {
    const [phase, setPhase] = useState('LOADING'); // 'LOADING', 'RESULT'
    const [result, setResult] = useState(null);

    // Reset when opened
    useEffect(() => {
        if (isOpen) {
            setPhase('LOADING');
            setResult(null);

            // Simulate Regulation Delay & Calculate Score
            const timer = setTimeout(() => {
                const scoreData = calculateScore(telemetry, scenario);

                // Calculate Percentage
                const maxPossible = scoreData.categories.reduce((acc, cat) => acc + (cat.maxScore || 0), 0);
                const perc = maxPossible > 0 ? (scoreData.score / maxPossible) : 0;

                let outcomeType = 'REGULAR';
                if (perc < 0.30 || scoreData.outcome === 'obito_erro') {
                    outcomeType = 'RUIM';
                } else if (perc >= 0.80) {
                    outcomeType = 'BOM';
                }

                setResult({
                    percentage: perc,
                    type: outcomeType,
                    rawOutcome: scoreData.outcome
                });

                setPhase('RESULT');
            }, 3000); // 3 seconds of tension

            return () => {
                clearTimeout(timer);
                stopAllGeneratedSounds();
            };
        }
    }, [isOpen, telemetry, scenario]);

    if (!isOpen) return null;

    // Content based on Result Type
    const getResultContent = () => {
        if (!result) return null;

        switch (result.type) {
            case 'RUIM':
                return {
                    icon: AlertTriangle,
                    color: 'text-red-500',
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/50',
                    title: 'Óbito no Transporte',
                    message: 'Vaga liberada na UTI do Hospital de Clínicas. O transporte avançado foi iniciado, mas o paciente não resistiu ao tempo de deslocamento devido às condutas iniciais insuficientes ou falhas críticas na estabilização.'
                };
            case 'REGULAR':
                return {
                    icon: Ambulance,
                    color: 'text-yellow-500',
                    bg: 'bg-yellow-500/10',
                    border: 'border-yellow-500/50',
                    title: 'Aceite com Ressalvas',
                    message: 'Vaga cedida. O Médico Regulador questiona a otimização clínica do paciente antes da transferência (condutas incompletas), mas aceita o caso pelo risco iminente de vida. O paciente chega instável ao destino.'
                };
            case 'BOM':
                return {
                    icon: CheckCircle,
                    color: 'text-emerald-500',
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/50',
                    title: 'Transferência Bem-Sucedida',
                    message: 'Vaga conquistada sem ressalvas! O paciente foi adequadamente estabilizado na origem graças às suas condutas precisas e chegará em segurança ao hospital de referência.'
                };
            default: return null;
        }
    };

    const content = getResultContent();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">

                {/* Header = SUSFácil System Look */}
                <div className="bg-teal-950/80 px-4 py-3 border-b border-teal-900/50 flex items-center gap-3">
                    <Hospital className="text-teal-500" size={20} />
                    <div>
                        <h2 className="text-teal-50 text-sm font-bold tracking-wide">Sistema SUSFácil / CROSS</h2>
                        <p className="text-teal-500/70 text-[10px] font-mono uppercase tracking-widest mt-0.5">Módulo de Regulação Integrada</p>
                    </div>
                </div>

                <div className="p-6">
                    {phase === 'LOADING' ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-6">
                            <div className="relative">
                                <Activity className="text-slate-700 w-24 h-24" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-teal-500 w-10 h-10" />
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-bold text-white tracking-widest uppercase truncate animate-pulse">Aguardando Regulação...</h3>
                                <p className="text-slate-400 text-sm">Contatando médico regulador e buscando leitos de estabilização na rede habilitada.</p>
                            </div>

                            {/* Fake Progress Bar */}
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-4">
                                <div className="h-full bg-teal-500/50 w-full rounded-full origin-left animate-pulse" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col animate-in slide-in-from-bottom-4 duration-500 fade-in">
                            <div className={cn("flex flex-col items-center justify-center py-6 px-4 rounded-xl border text-center space-y-4", content.bg, content.border)}>
                                <div className={cn("p-4 rounded-full bg-slate-950/50", content.color)}>
                                    <content.icon size={32} />
                                </div>
                                <div>
                                    <h3 className={cn("text-xl font-bold mb-2", content.color)}>{content.title}</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
                                        {content.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="bg-slate-950 px-6 py-4 flex justify-end">
                    <button
                        onClick={() => onTransferConfirm(result?.rawOutcome || 'transferencia')}
                        disabled={phase === 'LOADING'}
                        className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                        {phase === 'LOADING' ? 'Processando...' : 'Ver Relatório Completo'}
                        {phase !== 'LOADING' && <ChevronRight size={16} />}
                    </button>
                </div>

            </div>
        </div>
    );
}
