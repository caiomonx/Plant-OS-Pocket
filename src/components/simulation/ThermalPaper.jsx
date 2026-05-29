import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function ThermalPaper({ labs = {}, patientName = "Paciente" }) {
  const date = new Date().toLocaleDateString('pt-BR');
  const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-md mx-auto my-6 relative animate-slide-up"
    >
      {/* Serrilha Superior */}
      <div className="absolute -top-2 left-0 w-full h-4 z-10 flex overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="flex-1 h-4 bg-[#fff9db] rotate-45 -translate-y-2 translate-x-1 border-b border-amber-200/20" />
        ))}
      </div>

      <div className={cn(
        "bg-[#fff9db] p-8 shadow-2xl border-x border-amber-200/30 text-slate-800 font-mono text-sm relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] before:opacity-5 before:pointer-events-none"
      )}>
        {/* Header */}
        <div className="text-center border-b border-slate-400 pb-4 mb-6 space-y-1">
            <h2 className="font-black text-base tracking-tighter uppercase text-slate-900">Laboratório Central Plant.OS</h2>
            <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase px-1">
                 <span>DATA: {date}</span>
                 <span>HORA: {time}</span>
            </div>
        </div>

        {/* Patient Data (No Balloon, Printed Style) */}
        <div className="mb-6 pb-4 border-b border-dotted border-slate-400 space-y-1 text-[11px] font-bold">
            <div className="flex justify-between">
                <span>PACIENTE:</span>
                <span className="text-right uppercase truncate max-w-[200px]">{patientName || "---"}</span>
            </div>
            <div className="flex justify-between">
                <span>ALA/ORIGEM:</span>
                <span className="text-right uppercase">EMERGÊNCIA</span>
            </div>
        </div>

        {/* Results Body */}
        <div className="space-y-6">
            {/* Gasometry Group */}
            <div className="space-y-2">
                <div className="flex justify-between items-baseline group">
                    <span className="border-b border-dotted border-slate-400 flex-1 mr-2 group-hover:border-slate-500 transition-colors">pH Arterial</span>
                    <span className="font-black text-base">{labs.ph?.toFixed(2) || '--'}</span>
                </div>
                <div className="flex justify-between items-baseline group">
                    <span className="border-b border-dotted border-slate-400 flex-1 mr-2">pCO2 (mmHg)</span>
                    <span className="font-black text-base">{labs.pco2 || '--'}</span>
                </div>
                <div className="flex justify-between items-baseline group">
                    <span className="border-b border-dotted border-slate-400 flex-1 mr-2">pO2 (mmHg)</span>
                    <span className="font-black text-base">{labs.po2 || '--'}</span>
                </div>
                <div className="flex justify-between items-baseline group">
                    <span className="border-b border-dotted border-slate-400 flex-1 mr-2">HCO3 (mEq/L)</span>
                    <span className="font-black text-base">{labs.hco3 || '--'}</span>
                </div>
                <div className="flex justify-between items-baseline group">
                    <span className="border-b border-dotted border-slate-400 flex-1 mr-2">Base Excess (mEq/L)</span>
                    <span className="font-black text-base">{labs.be || '--'}</span>
                </div>
                <div className="flex justify-between items-baseline group">
                    <span className="border-b border-dotted border-slate-400 flex-1 mr-2">SatO2 (%)</span>
                    <span className="font-black text-base">{labs.sat || '--'}%</span>
                </div>
            </div>

            {/* Biochemistry / Electrolytes */}
            <div className="pt-4 border-t border-slate-400 space-y-2 border-dashed">
                <div className="text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Eletrólitos e Metabólitos</div>
                
                {labs.na && (
                    <div className="flex justify-between items-baseline group">
                        <span className="border-b border-dotted border-slate-400 flex-1 mr-2 opacity-80">Sódio (Na+)</span>
                        <span className="font-black">{labs.na} mEq/L</span>
                    </div>
                )}
                {labs.k && (
                    <div className="flex justify-between items-baseline group">
                        <span className="border-b border-dotted border-slate-400 flex-1 mr-2 opacity-80">Potássio (K+)</span>
                        <span className="font-black">{labs.k} mEq/L</span>
                    </div>
                )}
                {labs.cl && (
                    <div className="flex justify-between items-baseline group">
                        <span className="border-b border-dotted border-slate-400 flex-1 mr-2 opacity-80">Cloro (Cl-)</span>
                        <span className="font-black">{labs.cl} mEq/L</span>
                    </div>
                )}
                {labs.ca && (
                    <div className="flex justify-between items-baseline group">
                        <span className="border-b border-dotted border-slate-400 flex-1 mr-2 opacity-80">Cálcio (Ca++)</span>
                        <span className="font-black">{labs.ca} mg/dL</span>
                    </div>
                )}
                {labs.albumin && (
                    <div className="flex justify-between items-baseline group">
                        <span className="border-b border-dotted border-slate-400 flex-1 mr-2 opacity-80">Albumina Sérica</span>
                        <span className="font-black">{labs.albumin} g/dL</span>
                    </div>
                )}
                {labs.glu && (
                    <div className="flex justify-between items-baseline group mt-2 pt-2 border-t border-slate-300">
                        <span className="border-b border-dotted border-slate-400 flex-1 mr-2 font-bold italic">Glicemia (HGT)</span>
                        <span className="font-black">{labs.glu} mg/dL</span>
                    </div>
                )}
                {labs.lactate && (
                    <div className="flex justify-between items-baseline group">
                        <span className="border-b border-dotted border-slate-400 flex-1 mr-2 font-bold italic">Lactato Sérico</span>
                        <span className="font-black">{labs.lactate} mmol/L</span>
                    </div>
                )}
            </div>
        </div>

        {/* Footer Serrilha */}
        <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-400 text-center opacity-30 select-none">
             <span className="text-[10px] font-black tracking-[0.5em] uppercase">IMPRESSO PELO SISTEMA PLANT.OS</span>
        </div>
      </div>

       {/* Serrilha Inferior */}
       <div className="absolute -bottom-2 left-0 w-full h-4 z-10 flex overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="flex-1 h-4 bg-[#fff9db] rotate-45 translate-y-[-8px] translate-x-[-1px] border-b border-amber-200/20" />
        ))}
      </div>
    </motion.div>
  );
}
