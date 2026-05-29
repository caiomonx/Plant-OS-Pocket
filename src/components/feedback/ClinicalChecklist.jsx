import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp, BookOpen, Award, User } from 'lucide-react';
import { feedbackContent } from '../../data/feedbackContent';

const ChecklistItem = ({ id, status, label, userAction, protocolAction, detailedExplanation, whyCorrect, whyWrong }) => {
    const [isOpen, setIsOpen] = useState(false);
    const content = feedbackContent[id] || {};

    const statusConfig = {
        gold: {
            icon: CheckCircle2,
            color: 'text-emerald-400',
            bg: 'bg-emerald-950/40',
            border: 'border-emerald-500/50',
            badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        },
        success: {
            icon: CheckCircle2,
            color: 'text-teal-400',
            bg: 'bg-teal-950/40',
            border: 'border-teal-500/50',
            badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        },
        info: {
            icon: AlertTriangle,
            color: 'text-sky-400',
            bg: 'bg-sky-950/40',
            border: 'border-sky-500/50',
            badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-yellow-500',
            bg: 'bg-yellow-950/40',
            border: 'border-yellow-500/50',
            badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
        },
        error: {
            icon: XCircle,
            color: 'text-rose-500',
            bg: 'bg-rose-950/40',
            border: 'border-rose-500/50',
            badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
        }
    };

    const config = statusConfig[status] || statusConfig.warning;
    const Icon = config.icon;

    return (
        <div className="mb-6 last:mb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl border transition-all duration-300 bg-[#0f172a] hover:bg-[#1e293b] ${isOpen ? 'border-slate-600 shadow-2xl' : 'border-slate-800'}`}
            >
                {/* HEADLINE CONTENT (Collapsed) */}
                <div className="flex items-start gap-5 flex-1 min-w-0 w-full">

                    {/* ICON BOX */}
                    <div className={`p-4 rounded-2xl shrink-0 ${config.bg} ${config.color} shadow-lg ring-1 ring-inset ${config.border} flex items-center justify-center`}>
                        <Icon size={24} strokeWidth={2.5} className="w-6 h-6 shrink-0" />
                    </div>

                    <div className="text-left flex-1 min-w-0 w-full">
                        {/* TITLE & BADGE */}
                        <div className="flex items-center gap-3 mb-3">
                            <h4 className="font-bold text-slate-100 text-lg leading-tight">
                                {label}
                            </h4>
                            {(status === 'gold' || status === 'success') && (
                                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Perfeito
                                </span>
                            )}
                        </div>

                        {/* COMPARISON GRID (The "Vs" View) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                            {/* USER ACTION */}
                            <div className="flex items-start gap-3">
                                <div className={`p-1.5 rounded-md shrink-0 bg-slate-800 text-slate-400 mt-0.5`}>
                                    <User size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Sua Conduta</span>
                                    <span className={`text-sm font-medium ${config.color} break-words leading-snug`}>
                                        {userAction || "Não realizada"}
                                    </span>
                                </div>
                            </div>

                            {/* PROTOCOL ACTION */}
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-md shrink-0 bg-amber-500/10 text-amber-500 mt-0.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                    <Award size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-amber-500/70 font-bold mb-0.5">Padrão-Ouro</span>
                                    <span className="text-sm font-medium text-slate-300 break-words leading-snug">
                                        {protocolAction || "..."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CHEVRON (Right) */}
                <div className={`hidden sm:flex text-slate-600 transition-transform duration-300 ml-6 shrink-0 self-center ${isOpen ? 'rotate-180 text-slate-400' : ''}`}>
                    <ChevronDown size={24} />
                </div>
            </button>

            {/* EXPANDABLE BODY (Details) */}
            <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="p-6 rounded-3xl bg-[#131c31] border border-slate-700/50 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 p-32 bg-slate-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 flex gap-4">
                        <div className="p-2 h-fit rounded-lg bg-slate-800/50 text-slate-400">
                            <BookOpen size={18} />
                        </div>
                        <div className="space-y-4 flex-1">
                            <div>
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Explicação Clínica</h5>
                                <p className="text-slate-300 leading-relaxed text-base">
                                    {detailedExplanation}
                                </p>
                            </div>

                            {/* Analysis Box */}
                            <div className={`p-4 rounded-xl border-l-4 ${status === 'success' || status === 'gold' || status === 'info' ? 'bg-teal-950/20 border-teal-500/50' : 'bg-rose-950/20 border-rose-500/50'}`}>
                                <h5 className={`text-sm font-bold mb-1 ${status === 'success' || status === 'gold' || status === 'info' ? 'text-teal-400' : 'text-rose-400'}`}>
                                    {status === 'success' || status === 'gold' || status === 'info' ? "Por que está correto?" : "Onde houve o erro?"}
                                </h5>
                                <p className="text-sm text-slate-400">
                                    {status === 'success' || status === 'gold' || status === 'info' ? whyCorrect : whyWrong}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ClinicalChecklist({ categories = [] }) {
    return (
        <div className="bg-slate-950/50 rounded-2xl border border-slate-800 overflow-hidden shadow-xl backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Análise Clínica Detalhada
                </h3>
            </div>

            <div className="divide-y divide-slate-800">
                {categories.map((cat) => (
                    <div key={cat.id} className="p-4">
                        {/* Category Header */}
                        <div className="flex items-center justify-between mb-4 pl-2">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{cat.label}</h4>
                            {/* Score Mini-Badge */}
                            {cat.maxScore > 0 && (
                                <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded text-xs font-mono border border-slate-800">
                                    <span className={`${(cat.score / cat.maxScore) > 0.7 ? 'text-[#00cba9]' : 'text-slate-500'}`}>
                                        {Math.round(cat.score)}
                                    </span>
                                    <span className="text-slate-600">/</span>
                                    <span className="text-slate-600">{cat.maxScore}</span>
                                </div>
                            )}
                        </div>

                        {/* Items Loop */}
                        <div className="space-y-3">
                            {cat.items.length === 0 ? (
                                <p className="text-slate-600 text-sm italic pl-2">Nenhum evento registrado.</p>
                            ) : (
                                cat.items.map((item, idx) => (
                                    <div key={idx} className="mb-4 last:mb-0">
                                        <ChecklistItem
                                            id={idx}
                                            status={item.status}
                                            label={item.title}
                                            userAction={item.message}
                                            // New Props Mapping
                                            protocolAction={item.protocol || feedbackContent[idx]?.protocol}
                                            detailedExplanation={item.explanation || feedbackContent[idx]?.explanation}
                                            whyCorrect={item.why_correct || feedbackContent[idx]?.why_correct}
                                            whyWrong={item.why_wrong || feedbackContent[idx]?.why_wrong}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
