import { memo } from 'react';
import { cn } from '../../lib/utils';

const VitalBox = memo(function VitalBox({
    label,
    value,
    unit,
    color = "text-teal-400",
    shadowColor = "shadow-teal-500/50",
    icon: Icon,
    isAlarming = false,
    subValue = null
}) {
    return (
        <div className={cn(
            "relative flex flex-col items-center justify-center p-2 rounded-lg border-l-4 transition-all duration-300 overflow-hidden w-full",
            // Base Style
            "bg-slate-900/40 border-slate-800",
            // Alarm Style (conditional)
            isAlarming
                ? "animate-pulse border-red-500 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                : `hover:bg-slate-900/60 ${color.replace('text-', 'border-').replace('400', '900')}/30`
        )}>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-2 mb-0.5 md:mb-1 w-full">
                {Icon && <Icon size={12} className={cn("md:w-[14px] md:h-[14px]", isAlarming ? "text-red-500" : color)} />}
                <span className={cn(
                    "text-[9px] md:text-xs font-bold tracking-widest uppercase transition-colors text-center mt-0.5 md:mt-0",
                    isAlarming ? "text-red-400" : "text-slate-500"
                )}>
                    {label}
                </span>
            </div>

            {/* Value */}
            <div className="flex items-baseline justify-center gap-0.5 md:gap-1 w-full">
                <span className={cn(
                    "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold leading-none tracking-tighter transition-all whitespace-nowrap text-center",
                    // Text Color
                    isAlarming ? "text-red-500" : color,
                    // Glow Effect
                    isAlarming ? "drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" : `drop-shadow-[0_0_8px_rgba(var(--tw-shadow-color),0.5)]`
                )}
                >
                    {value}
                </span>

                {(unit || subValue) && (
                    <div className="flex flex-col flex-shrink-0 text-left">
                        {unit && (
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest opacity-60",
                                isAlarming ? "text-red-400" : color
                            )}>
                                {unit}
                            </span>
                        )}
                        {subValue && (
                            <span className={cn(
                                "text-xs font-mono font-bold leading-none",
                                isAlarming ? "text-red-400" : color
                            )}>
                                {subValue}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Alarm Text Overlay (Optional) */}
            {isAlarming && (
                <div className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
            )}
        </div>
    );
});

export default VitalBox;

