import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const base =
        'relative overflow-hidden font-sans font-bold text-sm tracking-wide py-4 px-6 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group border';

    const styles = {
        primary:
            'bg-emerald-500/10 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]',
        secondary:
            'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/30',
        danger:
            'bg-rose-500/10 border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white',
    };

    return (
        <button className={`${base} ${styles[variant]} ${className}`} {...props}>
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
};
