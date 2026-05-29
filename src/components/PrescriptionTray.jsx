import React, { useState } from 'react';
import { Pill, Trash2, Syringe, Clock, CheckCircle2, X, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function PrescriptionTray({ items, onRemove, onAdminister, onClear, totalTime = 0 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (items.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[80] animate-in slide-in-from-bottom duration-300 pointer-events-none">
            {/* 
                Pointer Events Logic: 
                The container is pointer-events-none so clicks pass through to content behind it (if transparent).
                The inner content is pointer-events-auto.
            */}

            {/* Glass Container */}
            <div className={cn(
                "bg-slate-900/95 backdrop-blur-md border-t-2 border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-auto",
                isExpanded ? "p-4 pb-6" : "p-2 pb-3" // Minimized padding
            )}>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6">

                    {/* MOBILE TOGGLE HEADER (Visible on small screens) */}
                    <div
                        className="md:hidden w-full flex items-center justify-between cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-center gap-2">
                            <Syringe size={16} className="text-teal-500" />
                            <span className="text-white font-bold">{items.length} Itens na Bandeja</span>
                        </div>
                        {isExpanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronUp size={20} className="text-slate-400" />}
                    </div>

                    {/* CONTENT WRAPPER - HIDDEN ON MOBILE UNLESS EXPANDED */}
                    <div className={cn(
                        "w-full flex-col md:flex-row items-center gap-6",
                        isExpanded ? "flex" : "hidden md:flex"
                    )}>

                        {/* Header / Info (Desktop) */}
                        <div className="hidden md:flex flex-col min-w-[150px]">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Syringe size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Bandeja</span>
                            </div>
                            <div className="text-white font-bold text-lg leading-none">
                                {items.length} {items.length === 1 ? 'Item' : 'Itens'}
                            </div>
                        </div>

                        {/* Items List (Scrollable) */}
                        <div className="w-full md:flex-1 overflow-x-auto pb-2 flex items-center gap-3 no-scrollbar mask-linear-fade">
                            {items.map((item, idx) => (
                                <div
                                    key={`${item.id}-${idx}`}
                                    className="flex-shrink-0 bg-slate-800 border border-slate-700 rounded-lg pl-3 pr-2 py-2 flex items-center gap-3 group hover:border-slate-500 transition-colors"
                                >
                                    <div className="flex flex-col max-w-[150px]">
                                        <span className="text-sm font-bold text-slate-200 truncate">{item.drugName}</span>
                                        <span className="text-xs text-cyan-400 font-mono truncate">
                                            {item.doseDetails}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
                                        className="p-1.5 rounded-md hover:bg-slate-700 text-slate-500 hover:text-red-400 transition-colors"
                                        title="Remover Item"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="w-full md:w-auto flex items-center justify-end gap-3 md:border-l md:border-slate-700 md:pl-4">
                            <button
                                onClick={onClear}
                                className="p-3 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
                                title="Limpar Bandeja"
                            >
                                <Trash2 size={20} />
                            </button>

                            <button
                                onClick={onAdminister}
                                className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 md:py-4 rounded-xl font-bold shadow-lg shadow-teal-900/20 active:scale-95 transition-all text-sm uppercase tracking-wide"
                            >
                                <div className="flex flex-col items-start leading-none gap-1">
                                    <span>Administrar</span>
                                    <span className="text-[10px] opacity-80 font-mono">+{totalTime} MIN</span>
                                </div>
                                <Clock size={20} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
