import React, { useEffect, useRef } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import { playOutcomeSound, stopAllGeneratedSounds } from '../../utils/soundUtils';

export default function OutcomeHeader({ score, outcome, customTitle, customSubtitle }) {
    const outcomeData = {
        'uti_estavel': {
            title: "Excelente Desempenho",
            color: "text-emerald-400",
            bg: "bg-emerald-950/30",
            border: "border-emerald-500/30",
            icon: CheckCircle2
        },
        'uti_instavel': {
            title: "Desempenho Parcial",
            color: "text-yellow-400",
            bg: "bg-yellow-950/30",
            border: "border-yellow-500/30",
            icon: AlertTriangle
        },
        'obito_arritmia': {
            title: "Desempenho Crítico",
            color: "text-rose-500",
            bg: "bg-rose-950/30",
            border: "border-rose-500/30",
            icon: XCircle
        },
        'obito_erro': {
            title: "Erro Fatal",
            color: "text-red-600",
            bg: "bg-red-950/30",
            border: "border-red-500/30",
            icon: XCircle
        },
        'pseudo_success': {
            title: "Diagnóstico Preciso",
            color: "text-teal-400",
            bg: "bg-teal-950/30",
            border: "border-teal-500/30",
            icon: CheckCircle2
        },
        'pseudo_fail': {
            title: "Erro de Diagnóstico",
            color: "text-rose-500",
            bg: "bg-rose-950/30",
            border: "border-rose-500/30",
            icon: XCircle
        },
        'BOM': {
            title: "Transferência Segura",
            color: "text-emerald-400",
            bg: "bg-emerald-950/30",
            border: "border-emerald-500/30",
            icon: CheckCircle2
        },
        'REGULAR': {
            title: "Transferência Contestada",
            color: "text-yellow-400",
            bg: "bg-yellow-950/30",
            border: "border-yellow-500/30",
            icon: AlertTriangle
        },
        'RUIM': {
            title: "Óbito no Transporte",
            color: "text-red-600",
            bg: "bg-red-950/30",
            border: "border-red-500/30",
            icon: XCircle
        },
        'falha_critica': {
            title: "Inconclusivo",
            color: "text-slate-400",
            bg: "bg-slate-800/50",
            border: "border-slate-700",
            icon: HelpCircle
        }
    };

    // Calculate generic config based on SCORE if NO Outcome String is provided
    let config;
    if (outcome && outcomeData[outcome]) {
        config = outcomeData[outcome];
    } else {
        if (score >= 80) {
            config = {
                title: "Critérios de Alta Atendidos",
                color: "text-emerald-400",
                bg: "bg-emerald-950/30",
                border: "border-emerald-500/30",
                icon: CheckCircle2
            };
        } else if (score >= 50) {
            config = {
                title: "Atenção: Conduta Parcial",
                color: "text-yellow-400",
                bg: "bg-yellow-950/30",
                border: "border-yellow-500/30",
                icon: AlertTriangle
            };
        } else {
            config = {
                title: "Protocolo Quebrado",
                color: "text-rose-500",
                bg: "bg-rose-950/30",
                border: "border-rose-500/30",
                icon: XCircle
            };
        }
    }

    const Icon = config.icon;

    // Trigger audio effect on mount
    useEffect(() => {
        if (score !== undefined) {
            // Check outcome explicitly if available to ensure correct sound
            // 'victory', 'uti_estavel', 'pseudo_success', 'BOM' imply success regardless of strict points score
            const isSuccess = outcome === 'victory' || 
                              outcome === 'uti_estavel' || 
                              outcome === 'pseudo_success' || 
                              outcome === 'BOM' || 
                              (!outcome && score >= 70);

            if (isSuccess) {
                playOutcomeSound('success');
            } else {
                playOutcomeSound('failure');
            }
        }
        
        return () => {
            stopAllGeneratedSounds();
        };
    }, [score, outcome]);

    return (
        <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
            <span className="text-sm font-bold text-slate-400 tracking-[0.2em] mb-2 uppercase">
                Feedback OSCE
            </span>

            <h1 className="text-[8rem] leading-none font-black text-teal-400 drop-shadow-[0_0_25px_rgba(45,212,191,0.4)]">
                {Math.min(100, Math.max(0, Math.round(score)))}%
            </h1>

            <div className={`mt-6 flex flex-col items-center justify-center gap-3`}>
                <div className={`flex items-center gap-2 px-6 py-2.5 rounded-full border backdrop-blur-md ${config.bg} ${config.border} ${config.color} shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                    <Icon size={18} strokeWidth={3} />
                    <span className="font-bold text-sm tracking-wide uppercase">
                        {customTitle || config.title}
                    </span>
                </div>
                {customSubtitle && (
                    <p className="text-slate-400 max-w-lg mt-2 text-sm leading-relaxed font-medium">
                        {customSubtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
