import React, { useState, useEffect } from 'react';
import { X, FileText, Activity, Droplets, Stethoscope, FilePlus2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProtocolCheatSheetModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('sinais');

    // Prevent background scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'inset';
        }
        return () => {
            document.body.style.overflow = 'auto'; // Reset on unmount
        };
    }, [isOpen]);


    const TABS = [
        { id: 'sinais', label: 'Sinais Clínicos', icon: Stethoscope, image: '/imagens/oms/sinais_sintomas.png' },
        { id: 'plano_a', label: 'Plano A', icon: FileText, image: '/imagens/oms/plano_a.png' },
        { id: 'plano_b', label: 'Plano B', icon: Droplets, image: '/imagens/oms/plano_b.png' },
        { id: 'plano_c', label: 'Plano C', icon: Activity, image: '/imagens/oms/plano_c.png' },
    ];

    if (!isOpen) return null;

    const ActiveImageData = TABS.find(t => t.id === activeTab);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto" style={{ fontFamily: "'Urbanist', sans-serif" }}>

                {/* Backdrop Escuro com Blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#070e1b]/90 backdrop-blur-sm cursor-pointer"
                />

                {/* Conteiner Principal do Modal */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] m-4 flex flex-col bg-[#0b1426] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
                >
                    {/* Linha Fina Brilhosa de Adorno no Topo */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0" />

                    {/* HEADER */}
                    <div className="shrink-0 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0b1426]/80 backdrop-blur-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-900/50 flex items-center justify-center shrink-0">
                                <FilePlus2 size={20} className="text-emerald-500" />
                            </div>
                            <div>
                                <h2 className="text-white font-black text-lg leading-tight uppercase tracking-wide">
                                    Protocolo Ministério da Saúde
                                </h2>
                                <p className="text-emerald-500/80 text-xs font-bold uppercase tracking-widest mt-0.5">
                                    Diarreia Aguda
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors border border-transparent hover:border-rose-500/30"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* TABS DE NAVEGAÇÃO HORIZONTAL */}
                    <div className="shrink-0 w-full overflow-x-auto border-b border-white/5 bg-[#070e1b]/50 no-scrollbar">
                        <div className="flex px-4 py-3 gap-2 min-w-max">
                            {TABS.map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]'
                                            : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ÁREA DE IMAGEM COM SCROLL LIVRE */}
                    <div className="flex-1 relative overflow-auto bg-[#070e1b] flex flex-col no-scrollbar items-center justify-start p-4 md:p-8">
                        {/* Imagem é renderizada do topo, e tem tamanho livre para crescer de acordo com ela mesma */}
                        <motion.img
                            key={ActiveImageData.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            src={ActiveImageData.image}
                            alt={`Protocolo: ${ActiveImageData.label}`}
                            className="w-full max-w-4xl h-auto rounded-xl shadow-2xl border border-white/5 object-contain"
                            style={{
                                // Assegura que num desktop muito largo, a Imagem não estique horrivelmente preenchendo o aspect ratio
                                maxHeight: "none"
                            }}
                        />
                    </div>
                </motion.div>

            </div>
        </AnimatePresence>
    );
};
