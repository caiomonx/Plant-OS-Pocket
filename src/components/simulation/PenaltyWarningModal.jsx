import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Flame, ShieldAlert, X } from 'lucide-react';

export default function PenaltyWarningModal({ isOpen, onClose, onConfirm, isResidentMode }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#04080F]/80 backdrop-blur-sm"
                    onClick={onClose}
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={`relative w-full max-w-md p-6 overflow-hidden border-2 rounded-3xl shadow-2xl ${
                        isResidentMode 
                            ? 'bg-slate-900 border-red-500/50 shadow-red-500/20' 
                            : 'bg-slate-900 border-amber-500/50 shadow-amber-500/20'
                    }`}
                >
                    {/* Background Glow */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none ${
                        isResidentMode ? 'bg-red-500/30' : 'bg-amber-500/30'
                    }`} />

                    <div className="flex flex-col items-center text-center relative z-10">
                        <div className={`p-4 rounded-full mb-4 ${
                            isResidentMode ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                            {isResidentMode ? <Flame size={36} strokeWidth={2.5} /> : <ShieldAlert size={36} strokeWidth={2.5} />}
                        </div>
                        
                        <h2 className="text-xl font-black text-white mb-2 uppercase tracking-wide">
                            {isResidentMode ? 'Aviso Crítico' : 'Atenção na Pontuação'}
                        </h2>
                        
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            {isResidentMode ? (
                                <>
                                    Você está no <span className="text-red-400 font-bold">Modo Residente</span>. 
                                    Consultar essa dica acarretará em uma <span className="text-red-400 font-bold underline decoration-red-500/50">penalidade severa</span>. 
                                    Você perderá muitos pontos na avaliação final.
                                </>
                            ) : (
                                <>
                                    Consultar essa dica resultará em perda de alguns pontos no feedback OSCE. Continue apenas se tiver esquecido realmente da fórmula.
                                </>
                            )}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button 
                                onClick={onClose}
                                className="flex-1 py-3 px-4 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={onConfirm}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold text-slate-950 transition-colors ${
                                    isResidentMode 
                                        ? 'bg-red-500 hover:bg-red-400' 
                                        : 'bg-amber-500 hover:bg-amber-400'
                                }`}
                            >
                                Revelar Dica
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
