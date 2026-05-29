import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Activity, Timer, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

// Helper to format time
const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export default function PatientSidebar({
    patientName,
    age,
    weight,
    history,
    status,
    logs,
    timeElapsed,
    onNewCase,
    onFinish,
    hideFinishButton = false,
    scrollMode = 'content', // 'content' (default, internal scroll) or 'page' (grows with content)
    className
}) {
    const logsEndRef = useRef(null);

    useEffect(() => {
        if (scrollMode === 'content') {
            logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs, scrollMode]);

    const [isHistoryOpen, setIsHistoryOpen] = useState(true);

    return (
        <div className={cn(
            "bg-slate-900 flex flex-col shadow-2xl z-40 relative",
            scrollMode === 'content' ? "h-full" : "h-auto min-h-full",
            className
        )}>

            {/* Patient Header */}
            <div className="bg-slate-950 p-6 border-b border-slate-800 flex-shrink-0">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white leading-tight">{patientName}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded font-mono font-bold">
                                {String(age).toUpperCase().match(/ANO|MES|MÊS/) ? String(age).toUpperCase() : `${age} ANOS`}
                            </span>
                            <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded font-mono font-bold">{weight || "70kg"}</span>
                        </div>
                    </div>

                    {/* Only show New Case button if handler provided (Desktop) */}
                    {onNewCase && (
                        <div className="w-10 h-10 flex items-center justify-center">
                            <button
                                onClick={onNewCase}
                                className="group/btn relative w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:border-teal-500 hover:bg-slate-700 transition-all"
                                title="Novo Caso"
                            >
                                <RefreshCw size={18} className="text-slate-500 group-hover/btn:text-teal-400 group-hover/btn:rotate-180 transition-all duration-500" />
                            </button>
                        </div>
                    )}
                </div>

                {/* HISTORY */}
                {/* HISTORY (COLLAPSIBLE) */}
                <div className="bg-slate-800/50 border-l-4 border-teal-500 rounded-r-lg mt-4 overflow-hidden transition-all duration-300">
                    <button
                        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                        className="w-full flex items-center justify-between p-3 hover:bg-slate-700/50 transition-colors text-left group"
                    >
                        <span className="text-teal-400 font-bold text-xs uppercase tracking-wider group-hover:text-teal-300">
                            {isHistoryOpen ? "Ocultar História" : "Ver História Clínica"}
                        </span>
                        {isHistoryOpen ? <ChevronUp size={16} className="text-teal-500" /> : <ChevronDown size={16} className="text-teal-500" />}
                    </button>

                    {isHistoryOpen && (
                        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                            <p className="text-slate-100 font-medium text-sm leading-relaxed whitespace-pre-line">
                                {history}
                            </p>
                        </div>
                    )}
                </div>

                {/* Status Indicators */}
                <div className="flex flex-col gap-2 mt-4">
                    <div className={cn(
                        "flex items-center justify-between px-3 py-2 rounded border text-xs font-bold transition-all",
                        status.hasIVAccess
                            ? "bg-emerald-950/30 border-emerald-900/50 text-emerald-400"
                            : "bg-rose-950/30 border-rose-900/50 text-rose-400"
                    )}>
                        <div className="flex items-center gap-2">
                            {status.hasIVAccess ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                            <span>Acesso Venoso</span>
                        </div>
                        <span className="opacity-70">{status.hasIVAccess ? "Estabelecido" : "Ausente"}</span>
                    </div>
                </div>
            </div>

            {/* END GAME ACTION (Only if handler provided AND not hidden) */}
            {onFinish && !hideFinishButton && (
                <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex justify-center flex-shrink-0">
                    <button
                        onClick={() => onFinish('transferencia')}
                        className="w-[90%] bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 border border-red-900/50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Activity size={14} />
                        Encerrar / Transferir
                    </button>
                </div>
            )}

            {/* Log Feed */}
            <div className={cn(
                "flex flex-col bg-slate-950/50",
                scrollMode === 'content' ? "flex-1 overflow-hidden min-h-0" : "h-auto"
            )}>
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0 sticky top-0 z-20">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Log de Eventos</span>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50">
                            <Timer size={12} className="text-teal-500" />
                            <span className="font-mono text-teal-400 text-sm font-bold tracking-widest">
                                {formatTime(timeElapsed)}
                            </span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    </div>
                </div>

                <div className={cn(
                    "p-4 space-y-5",
                    scrollMode === 'content' ? "flex-1 overflow-y-auto" : "h-auto"
                )}>
                    {logs.length === 0 ? (
                        <div className="h-40 flex flex-col items-center justify-center text-slate-700 text-sm italic opacity-60">
                            <span>A simulação começou.</span>
                            <span>Aguardando condutas...</span>
                        </div>
                    ) : (
                        logs.map((log, idx) => (
                            <div key={idx} className="relative pl-6">
                                {/* Timeline Line */}
                                {idx !== logs.length - 1 && (
                                    <div className="absolute left-[3px] top-2 bottom-[-24px] w-[2px] bg-slate-800"></div>
                                )}

                                {/* Timeline Dot */}
                                <div className={cn(
                                    "absolute left-[-1px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 z-10",
                                    log.type === 'error' ? 'bg-red-500' : 'bg-cyan-500'
                                )}></div>

                                <div className="flex flex-col">
                                    <div className="flex items-baseline justify-between mb-0.5">
                                        <span className="text-slate-200 text-sm font-bold leading-tight">
                                            {log.text}
                                        </span>
                                        <span className="text-cyan-600 font-mono text-xs bg-cyan-950/20 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap font-bold">
                                            {log.time}
                                        </span>
                                    </div>
                                    <span className={cn(
                                        "text-xs leading-snug",
                                        log.type === 'error' ? "text-red-400 italic" : "text-slate-500"
                                    )}>
                                        {log.consequence}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={logsEndRef} />
                </div>
            </div>
        </div>
    );
}
