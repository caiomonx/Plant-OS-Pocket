import React from 'react';
import { User, Clock, Scale, RefreshCw, ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StickyBar = ({ currentCase, onRestart, onBack, onOpenProtocols, theme, extraMetrics = [], hideName = false, ageIcon: AgeIcon }) => {
    const navigate = useNavigate();
    if (!currentCase) return null;

    // Formatter to compress strings like "1 ano e 6 meses" into "1a 6m" for mobile
    const formatAgeAbbr = (ageStr) => {
        if (!ageStr) return "";
        let str = String(ageStr).toLowerCase().trim();
        
        let anosMatch = str.match(/(\d+)\s*ano/);
        let mesesMatch = str.match(/(\d+)\s*m[eê]s/);
        
        let out = [];
        if (anosMatch) out.push(`${anosMatch[1]}a`);
        if (mesesMatch) out.push(`${mesesMatch[1]}m`);
        
        if (out.length > 0) return out.join(' ');
        
        // Se for só número, assume anos
        return /^\d+$/.test(str) ? `${str}a` : ageStr;
    };

    const getThemeClasses = () => {
        switch(theme) {
            case 'purple':
                return {
                    text: 'text-purple-500',
                    borderBase: 'border-purple-500/20',
                    borderHover: 'hover:border-purple-500/50'
                };
            case 'emerald':
            default:
                return {
                    text: 'text-emerald-500',
                    borderBase: 'border-emerald-500/20',
                    borderHover: 'hover:border-emerald-500/50'
                };
        }
    };

    const tc = getThemeClasses();

    return (
        <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 animate-slide-up flex justify-center px-2 sm:px-4 pointer-events-none">
            <div className="pointer-events-auto glass-panel px-4 sm:px-8 py-2 sm:py-3 rounded-full flex justify-between items-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border-white/10 gap-2 sm:gap-8 w-[95%] sm:w-fit backdrop-blur-xl bg-[#18181b]/70 transition-all duration-500 border border-white/5">

                {/* Voltar / Exit Button */}
                <button
                    onClick={onBack || (() => navigate('/'))}
                    className="shrink-0 text-slate-400 hover:text-white p-2 rounded-full transition-all hover:bg-white/10 flex items-center justify-center"
                    title={onBack ? "Voltar" : "Voltar aos Módulos"}
                >
                    <ArrowLeft size={18} />
                </button>

                {/* Informações do Paciente */}
                <div className="flex items-center gap-2 sm:gap-6 flex-1 sm:flex-none justify-center overflow-hidden">
                    {/* Nome (opcional) */}
                    {!hideName && (
                        <>
                            <div className="flex items-center gap-1.5 text-gray-200 shrink-0" title="Nome">
                                <User size={14} className={`${tc.text} sm:w-4 sm:h-4`} />
                                <span className="font-sans font-bold text-xs sm:text-sm truncate max-w-[70px] sm:max-w-[150px]">
                                    {currentCase.patient.name}
                                </span>
                            </div>
                            <div className="w-px h-3 sm:h-4 bg-white/20 shrink-0"></div>
                        </>
                    )}

                    {/* Idade */}
                    <div className="flex items-center gap-1.5 text-gray-200 shrink-0" title="Idade">
                        {AgeIcon ? <AgeIcon size={14} className={`${tc.text} sm:w-4 sm:h-4`} /> : <Clock size={14} className={`${tc.text} sm:w-4 sm:h-4`} />}
                        <span className="font-mono text-xs sm:text-sm whitespace-nowrap hidden sm:inline">
                            {currentCase.patient.age}
                        </span>
                        <span className="font-mono text-xs sm:text-sm whitespace-nowrap sm:hidden">
                            {formatAgeAbbr(currentCase.patient.age)}
                        </span>
                    </div>

                    <div className="w-px h-3 sm:h-4 bg-white/20 shrink-0"></div>

                    {/* Peso */}
                    <div className="flex items-center gap-1.5 text-gray-200 shrink-0" title="Peso">
                        <Scale size={14} className={`${tc.text} sm:w-4 sm:h-4`} />
                        <span className="font-mono text-xs sm:text-sm whitespace-nowrap">
                            {currentCase.patient.weight}
                        </span>
                    </div>

                    {/* Extra Metrics */}
                    {extraMetrics.map((metric, index) => (
                        <React.Fragment key={index}>
                            <div className="w-px h-3 sm:h-4 bg-white/20 shrink-0 hidden sm:block"></div>
                            <div className="flex items-center gap-1.5 text-gray-200 shrink-0" title={metric.label}>
                                {metric.icon && <metric.icon size={14} className={`${tc.text} sm:w-4 sm:h-4`} />}
                                <span className="font-mono text-xs sm:text-sm whitespace-nowrap font-bold text-white">
                                    {metric.value}
                                </span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    {/* Consultar Protocolo */}
                    {onOpenProtocols && (
                        <button
                            onClick={onOpenProtocols}
                            className={`shrink-0 bg-transparent hover:bg-white/10 ${tc.text} p-2 sm:p-2.5 rounded-full transition-all border ${tc.borderBase} ${tc.borderHover} group flex items-center justify-center`}
                            title="Consultar Protocolos OMS"
                        >
                            <BookOpen size={18} className="group-hover:scale-110 transition-transform duration-300" />
                        </button>
                    )}

                    {/* Botão Novo Caso */}
                    <button
                        onClick={onRestart}
                        className={`shrink-0 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white p-2 sm:px-5 sm:py-2 rounded-full transition-all border border-white/10 ${tc.borderHover} group flex items-center gap-2`}
                        title="Carregar Novo Caso"
                    >
                        <RefreshCw
                            size={16}
                            className={`group-hover:rotate-180 transition-transform duration-500 ${tc.text}`}
                        />
                        <span className="hidden md:inline text-sm font-medium tracking-wide">
                            Novo Caso
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
