import React from 'react';
import { Droplet, Wind, Syringe, Pill, Activity, Monitor, Lock, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- CONSTANTS ---
const SINGLE_USE_IDS = [
    'exam_ecg',
    'exam_dialysis',
    'proc_monitor',
    'proc_iv_access',
    'proc_sonda'
];

// --- ICON MAPPING ---
const RenderActionIcon = ({ iconString }) => {
    switch (iconString) {
        case 'droplet':
        case 'water':
            return <Droplet size={18} className="text-cyan-400 fill-current" />;
        case 'blood':
            return <Droplet size={18} className="text-red-600 fill-current" />;
        case 'urine':
            return <Droplet size={18} className="text-yellow-400 fill-current" />;
        case 'wind':
            return <Wind size={18} className="text-slate-200" />;
        case 'syringe':
            return <Syringe size={18} className="text-emerald-500" />;
        case 'pill':
            return <Pill size={18} className="text-purple-400" />;
        case 'ecg':
            return <Activity size={18} className="text-yellow-400" />;
        case 'monitor':
            return <Monitor size={18} className="text-blue-400" />;
        default:
            return <Activity size={18} className="text-slate-400" />;
    }
};

export default function ActionGrid({
    actions,
    executedActionIds = [],
    status = {},
    hideTimeCost = false,
    onActionClick,
    theme = {}
}) {
    // Fallback theme if not provided
    const currentTheme = theme || {
        text: 'text-slate-200',
        btnBorder: 'border-slate-700 hover:border-slate-500'
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {actions.map((action) => {
                // ---- BUTTON STATE LOGIC ----
                const isDone = executedActionIds.includes(action.id);
                const isSingleUse = SINGLE_USE_IDS.includes(action.id);

                // Condition 1: Block by IV Access
                const needsIV = action.requiresIV && !status.hasIVAccess;

                // Condition 2: Block by Single Use Completion
                const isCompletedSingleUse = isSingleUse && isDone;

                const shouldDisable = needsIV || isCompletedSingleUse;

                // Determine disable reason for UI feedback
                const disableReason = needsIV ? 'needs_iv' : (isCompletedSingleUse ? 'completed' : null);

                return (
                    <button
                        key={action.id}
                        onClick={() => !shouldDisable && onActionClick(action)}
                        disabled={shouldDisable}
                        className={cn(
                            "group relative flex flex-col p-4 rounded-xl border bg-slate-800 transition-all text-left shadow-md",
                            shouldDisable
                                ? "opacity-50 cursor-not-allowed border-slate-700 bg-slate-800/50"
                                : `hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm ${currentTheme.btnBorder}`
                        )}
                    >
                        <div className="flex justify-between items-start w-full mb-3">
                            <div className={cn(
                                "p-1.5 rounded-md",
                                shouldDisable ? "bg-slate-800 text-slate-500" : `bg-slate-950 ${currentTheme.text}`
                            )}>
                                <RenderActionIcon iconString={action.icon} />
                            </div>

                            <div className="flex items-center gap-1">
                                {/* LOCK ICON for IV Block */}
                                {disableReason === 'needs_iv' && (
                                    <span className="text-red-500 bg-red-950/30 p-0.5 rounded mr-1">
                                        <Lock size={14} strokeWidth={2} />
                                    </span>
                                )}

                                {/* CHECK ICON for Completed Single Use */}
                                {disableReason === 'completed' && (
                                    <span className="text-green-500 bg-green-950/30 p-0.5 rounded mr-1">
                                        <Check size={14} strokeWidth={3} />
                                    </span>
                                )}

                                {/* TIME COST - IMPROVED VISIBILITY */}
                                {!hideTimeCost && (
                                    <span className={cn(
                                        "text-[10px] font-bold font-mono px-2 py-0.5 rounded",
                                        shouldDisable ? "text-slate-600 bg-slate-800" : "text-teal-300 bg-teal-950/40"
                                    )}>
                                        {action.id === 'exam_dialysis' ? "FIM" : `+${action.cost}m`}
                                    </span>
                                )}
                            </div>
                        </div>

                        <h3 className={cn(
                            "font-bold text-sm leading-snug",
                            shouldDisable ? "text-slate-500" : "text-slate-200 group-hover:text-white"
                        )}>
                            {action.label}
                        </h3>

                    </button>
                )
            })}
            {actions.length === 0 && (
                <div className="col-span-full h-32 flex items-center justify-center text-slate-600 italic">
                    Nenhuma ação disponível.
                </div>
            )}
        </div>
    );
}
