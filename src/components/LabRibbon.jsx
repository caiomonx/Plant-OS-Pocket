import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
    Activity,
    Wind,
    Scale,
    Zap,
    Hexagon,
    ClipboardList,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Sub-component for a single lab metric
const LabMetric = ({ label, value, unit, icon: Icon, variant = 'default', colorClass = 'text-slate-300' }) => {
    return (
        <div className={cn(
            "flex items-center gap-2.5 px-3 py-1 rounded-lg border transition-all h-[42px] shrink-0",
            variant === 'highlight' && "bg-yellow-950/20 border-yellow-900/40 shadow-[0_0_10px_rgba(234,179,8,0.1)]",
            variant === 'default' && "bg-slate-800/50 border-slate-700/50",
            variant === 'subtle' && "bg-transparent border-transparent px-1"
        )}>
            {Icon && (
                <div className={cn(
                    "p-1.5 rounded-md flex-shrink-0",
                    variant === 'highlight' ? "bg-yellow-900/30 text-yellow-400" : "bg-slate-800 text-slate-400"
                )}>
                    <Icon size={14} className={colorClass} />
                </div>
            )}
            <div className="flex flex-col justify-center h-full pt-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 leading-none mb-0.5">{label}</span>
                <div className="flex items-baseline gap-1 leading-none">
                    <span className={cn(
                        "font-mono font-bold",
                        variant === 'highlight' ? "text-xl text-yellow-400" : "text-base text-slate-200",
                        colorClass
                    )}>
                        {value}
                    </span>
                    {unit && <span className="text-[8px] text-slate-600 font-bold self-end mb-0.5">{unit}</span>}
                </div>
            </div>
        </div>
    );
};

export default function LabRibbon({ visible, labs, onClose, onOpenResults, placement = 'bottom' }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Reset collapse state when visibility changes
    useEffect(() => {
        if (!visible) setIsCollapsed(false);
    }, [visible]);

    const isRequested = (id) => {
        if (!labs) return false;
        if (labs.requested === undefined || labs.requested === null) return false;
        if (labs.requested === true) return true; // Legacy
        if (Array.isArray(labs.requested)) return labs.requested.includes(id);

        return false;
    };

    const data = {
        k: isRequested('k') ? (labs?.k?.toFixed(1) || '—') : '—',
        ph: isRequested('ph') ? (labs?.ph?.toFixed(2) || '7.32') : '—',
        pco2: isRequested('pco2') ? (labs?.pco2 || '35') : '—',
        hco3: isRequested('hco3') ? (labs?.hco3 || '18') : '—',
        cl: isRequested('cl') ? (labs?.cl || '102') : '—'
    };

    const isTop = placement === 'top';

    return (
        <div className={cn(
            "relative w-full z-[90] pointer-events-none transition-all duration-500",
            visible ? "translate-y-0 opacity-100" : (isTop ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0")
        )}>
            {/* Puxador (Tab) */}
            <div className={cn(
                "absolute left-0 w-full flex justify-center transition-all duration-300 pointer-events-auto",
                isCollapsed
                    ? (isTop ? "-bottom-6 opacity-100" : "-top-7 opacity-100 transform delay-200")
                    : (isTop ? "bottom-0 opacity-0 pointer-events-none" : "top-0 opacity-0 pointer-events-none")
            )}>
                <button
                    onClick={() => setIsCollapsed(false)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-1 bg-[#0a0a0a]/95 backdrop-blur-md border border-slate-700/80 text-slate-400 hover:text-white transition-colors shadow-lg",
                        isTop ? "rounded-b-2xl border-t-0 pb-2" : "rounded-t-2xl border-b-0 pt-2"
                    )}
                    title="Restaurar Exames"
                >
                    {isTop ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none pt-px">Exames</span>
                    {isTop ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
            </div>

            {/* Ribbon Inner */}
            <div className={cn(
                "w-full bg-[#0a0a0a]/95 backdrop-blur-md h-[64px] pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isTop ? "border-b border-slate-800/80 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)]" : "border-t border-slate-800/80 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.5)]",
                isCollapsed ? (isTop ? "-translate-y-[65px]" : "translate-y-[65px]") : "translate-y-0"
            )}>
                <div className="flex items-center justify-start md:justify-between px-4 py-2 max-w-[1400px] mx-auto h-[64px] overflow-x-auto overflow-y-hidden no-scrollbar">

                    {/* 1. LEFT: POTASSIUM (HERO) */}
                    <div className="flex items-center gap-4 pr-6 border-r border-slate-800/50 shrink-0">
                        <LabMetric
                            label="Potássio"
                            value={data.k}
                            unit="mEq/L"
                            icon={Zap}
                            variant={isRequested('k') ? "highlight" : "default"}
                            colorClass={isRequested('k') ? "text-yellow-400" : "text-slate-600"}
                        />
                    </div>

                    {/* 2. CENTER: RESULTS MODAL TRIGGER */}
                    <div className="flex items-center gap-3 px-6 md:flex-1 justify-center shrink-0">
                        <button
                            onClick={onOpenResults}
                            className="flex items-center gap-3 px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-slate-500 rounded-xl transition-all shadow-lg group"
                        >
                            <div className="p-2 bg-cyan-900/30 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                                <ClipboardList size={18} />
                            </div>
                            <div className="flex flex-col items-start bg-transparent">
                                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Laudo Laboratorial</span>
                                <span className="text-sm font-bold text-slate-200">Abir Folha de Resultados</span>
                            </div>
                        </button>
                    </div>

                    {/* 3. RIGHT: GASOMETRY (GROUPED) */}
                    <div className="flex items-center gap-2 pl-4 border-l border-slate-800/50 bg-slate-900/20 rounded-xl px-3 py-1 border border-slate-800/30 shrink-0">
                        <div className="flex flex-col items-end mr-1">
                            <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest leading-tight">Gaso</span>
                        </div>

                        <div className="flex gap-2">
                            <LabMetric label="pH" value={data.ph} variant="subtle" icon={Scale} colorClass={isRequested('ph') ? "text-teal-300" : "text-slate-600"} />
                            <div className="w-px h-6 bg-slate-800 my-auto"></div>
                            <LabMetric label="pCO2" value={data.pco2} variant="subtle" colorClass={isRequested('pco2') ? "text-slate-300" : "text-slate-600"} />
                            <div className="w-px h-6 bg-slate-800 my-auto"></div>
                            <LabMetric label="HCO3" value={data.hco3} variant="subtle" colorClass={isRequested('hco3') ? "text-slate-300" : "text-slate-600"} />
                            <div className="w-px h-6 bg-slate-800 my-auto"></div>
                            <LabMetric label="Cl" value={data.cl} variant="subtle" colorClass={isRequested('cl') ? "text-slate-300" : "text-slate-600"} />
                        </div>
                    </div>

                    {/* 4. COLLAPSE BUTTON */}
                    <button
                        onClick={() => setIsCollapsed(true)}
                        className="ml-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-colors shrink-0"
                        title="Minimizar Painel"
                    >
                        {isTop ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                </div>

                {/* Elegant Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900/30 to-transparent"></div>
            </div>
        </div>
    );
}
