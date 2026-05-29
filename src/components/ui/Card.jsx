import React from 'react';

export const Card = ({
    children,
    title,
    icon: Icon,
    className = '',
    variant = 'default',
    paddingClass = 'p-6',
    headerClass = 'mb-6 pb-4 border-b border-white/5',
}) => {
    const borderColor =
        variant === 'alert' ? 'border-rose-500/50' : 'border-white/10';
    const glowClass =
        variant === 'alert'
            ? 'shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]'
            : 'shadow-2xl';

    const iconBg = variant === 'alert'
        ? 'bg-rose-500/10 text-rose-500'
        : 'bg-emerald-500/10 text-emerald-500';

    return (
        <div
            className={`glass-panel rounded-3xl ${paddingClass} ${borderColor} ${glowClass} relative overflow-hidden group transition-all duration-500 hover:border-white/20 bg-[#18181b] border ${className}`}
        >
            {title && (
                <div className={`flex items-center gap-3 ${headerClass}`}>
                    {Icon && (
                        <div className={`p-2 rounded-xl ${iconBg}`}>
                            <Icon size={20} />
                        </div>
                    )}
                    <h3 className="font-sans font-bold text-gray-100 uppercase tracking-widest text-sm flex-1">
                        {title}
                    </h3>
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                    </div>
                </div>
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
