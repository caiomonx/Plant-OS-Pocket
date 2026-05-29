import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useGameConfig } from '../../contexts/GameConfigContext';
import PenaltyWarningModal from './PenaltyWarningModal';

export default function FormulaHelpButton({ formulaKey, title, formula, isRevealed, onReveal }) {
    const { isResidentMode, hasAcceptedPenaltyWarning, setHasAcceptedPenaltyWarning } = useGameConfig();
    const [justRevealed, setJustRevealed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleRevealClick = () => {
        if (!isRevealed) {
            if (!hasAcceptedPenaltyWarning) {
                setShowModal(true);
            } else {
                executeReveal();
            }
        }
    };

    const executeReveal = () => {
        setShowModal(false);
        // The parent might accept an optional multiplier, passing the actual multiplier directly or let the parent deal with it. We pass the multiplier explicitly so the parent knows how much to penalize.
        onReveal(formulaKey, isResidentMode ? 3 : 1); 
        
        if (!hasAcceptedPenaltyWarning) {
            setHasAcceptedPenaltyWarning(true);
        }
        
        setJustRevealed(true);
        setTimeout(() => setJustRevealed(false), 2500);
    };

    // Calculate visual penalty (base 5 points assumed, will adjust if needed based on the engine)
    const visualPenalty = isResidentMode ? '-15 pts' : '-5 pts';

    if (!isRevealed) {
        return (
            <>
                <div className="flex justify-center mt-3 relative">
                    <button 
                        onClick={handleRevealClick}
                        className={`text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors group ${
                            isResidentMode ? 'text-red-500/70 hover:text-red-400' : 'text-slate-500 hover:text-amber-400'
                        }`}
                    >
                        <BookOpen size={14} className="group-hover:scale-110 transition-transform" />
                        Esqueci a fórmula
                    </button>
                    <AnimatePresence>
                        {justRevealed && (
                            <motion.div 
                                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                                animate={{ opacity: 0, y: -30, scale: 1.2 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={`absolute -top-4 font-black text-xs z-50 ${isResidentMode ? 'text-red-500' : 'text-amber-500'}`}
                            >
                                {visualPenalty}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {showModal && (
                    <PenaltyWarningModal 
                        isOpen={showModal} 
                        onClose={() => setShowModal(false)} 
                        onConfirm={executeReveal} 
                        isResidentMode={isResidentMode} 
                    />
                )}
            </>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-4 bg-[#11131F]/50 border rounded-xl p-4 relative overflow-hidden ${
                isResidentMode ? 'border-red-900/40' : 'border-slate-800'
            }`}
        >
            <div className={`absolute top-0 left-0 w-1 h-full ${isResidentMode ? 'bg-red-900/60' : 'bg-slate-600'}`}></div>
            <div className="flex gap-3 items-center">
                <div className={`p-2 rounded-lg ${isResidentMode ? 'bg-red-900/20 text-red-500/60' : 'bg-slate-800 text-slate-400'}`}>
                    <BookOpen size={18} />
                </div>
                <div>
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
                    <div className="text-white font-mono text-sm tracking-wide bg-black/20 px-2 py-1 rounded inline-block border border-white/5">
                        {formula}
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {justRevealed && (
                    <motion.div 
                        initial={{ opacity: 1, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -30, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`absolute top-2 right-4 font-black text-lg z-50 ${isResidentMode ? 'text-red-500' : 'text-amber-500'}`}
                    >
                        {visualPenalty}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
