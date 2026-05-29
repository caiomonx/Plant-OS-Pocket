import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
    X,
    ClipboardList,
    Clock,
    Activity,
    Droplet,
    FlaskConical,
    Zap,
    Wind,
    Scale,
    Atom,
    Hexagon,
    Filter,
    Shield,
    Candy
} from 'lucide-react';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Reusable Metric Component for the Sheet
const SheetMetric = ({ label, value, unit, icon: Icon, colorClass = "text-slate-300" }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/20 border border-slate-700/30 hover:bg-slate-800/40 transition-colors">
        <div className="flex items-center gap-3">
            {Icon && (
                <div className="p-2 rounded-md bg-slate-900 shadow-inner">
                    <Icon size={16} className={colorClass} />
                </div>
            )}
            <span className="text-sm font-medium text-slate-400 capitalize">{label}</span>
        </div>
        <div className="flex items-baseline gap-1.5">
            <span className={cn("font-mono text-lg font-bold", colorClass)}>{value}</span>
            {unit && <span className="text-xs text-slate-500 font-medium">{unit}</span>}
        </div>
    </div>
);

export default function LabResultsModal({ isOpen, onClose, labs, collectionTime }) {
    if (!isOpen) return null;

    // Helper
    const isRequested = (id) => {
        if (!labs) return false;
        if (labs.requested === undefined || labs.requested === null) return false;
        if (labs.requested === true) return true;
        if (Array.isArray(labs.requested)) return labs.requested.includes(id);
        return false;
    };

    // Safe formatter to prevent .toFixed() from crashing on null/strings
    const safeFix = (val, dec) => {
        if (val === undefined || val === null || val === '') return '—';
        const num = Number(val);
        if (isNaN(num)) return val;
        return num.toFixed(dec);
    };

    // Data Extraction
    const data = {
        // Eletrólitos
        k: isRequested('k') ? safeFix(labs?.k, 1) : '—',
        mg: isRequested('mg') ? safeFix(labs?.mg, 1) : '—',
        cl: isRequested('cl') ? (labs?.cl || '—') : '—',
        // Gasometria
        ph: isRequested('ph') ? safeFix(labs?.ph, 2) : '—',
        pco2: isRequested('pco2') ? (labs?.pco2 || '—') : '—',
        hco3: isRequested('hco3') ? (labs?.hco3 || '—') : '—',
        lac: isRequested('lac') ? (labs?.lac || '—') : '—', // future proofing
        // Bioquimica
        glucose: isRequested('glucose') ? (labs?.glucose || '—') : '—',
        ureia: isRequested('ur') ? (labs?.ureia || labs?.ur || '—') : '—',
        creatinine: isRequested('cr') ? (labs?.creatinina || labs?.creatinin || '—') : '—',
        cpk: isRequested('cpk') ? (labs?.cpk || '—') : '—',
        // Hemograma
        hb: isRequested('cbc') ? safeFix(labs?.hb, 1) : '—',
        leuco: isRequested('cbc') ? (labs?.leuco || '—') : '—',
        plaq: isRequested('cbc') ? (labs?.plaq || '—') : '—'
    };

    // Calculate times based on provided collection simulation time (in minutes)
    const baseTime = Number(collectionTime) || 0;
    const formatTime = (totalMinutes) => {
        const safeMinutes = Math.max(0, Number(totalMinutes) || 0);
        const h = Math.floor(safeMinutes / 60);
        const m = Math.floor(safeMinutes % 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    const collectionFormatted = formatTime(baseTime);
    const releaseFormatted = formatTime(baseTime + 40);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-800 bg-slate-950">
                    <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-900/50">
                        <ClipboardList className="text-cyan-400" size={24} />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold tracking-wide text-slate-100">Resultados Laboratoriais</h2>
                        <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                                <Clock size={12} />
                                <span>Coleta: <strong className="text-slate-400">{collectionFormatted}</strong></span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-500/80">
                                <Clock size={12} />
                                <span>Liberação (Laudo): <strong className="text-cyan-400">{releaseFormatted}</strong></span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body / Scrollable Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* ELETRÓLITOS */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Eletrólitos</h3>
                            <SheetMetric label="Potássio" value={data.k} unit="mEq/L" icon={Zap} colorClass="text-yellow-400" />
                            <SheetMetric label="Magnésio" value={data.mg} unit="mg/dL" icon={Atom} colorClass="text-purple-400" />
                            <SheetMetric label="Cloreto" value={data.cl} unit="mEq/L" icon={Hexagon} colorClass="text-slate-300" />
                        </div>

                        {/* BIOQUÍMICA */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Função Renal & Metabolismo</h3>
                            <SheetMetric label="Glicose" value={data.glucose} unit="mg/dL" icon={Candy} colorClass="text-cyan-400" />
                            <SheetMetric label="Ureia" value={data.ureia} unit="mg/dL" icon={Filter} colorClass="text-orange-200" />
                            <SheetMetric label="Creatinina" value={data.creatinine} unit="mg/dL" icon={FlaskConical} colorClass="text-orange-400" />
                        </div>

                        {/* HEMATOLOGIA */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Hemograma Completo</h3>
                            <SheetMetric label="Hemoglobina" value={data.hb} unit="g/dL" icon={Droplet} colorClass="text-red-400" />
                            <SheetMetric label="Leucócitos" value={data.leuco} unit="/µL" icon={Shield} colorClass="text-slate-200" />
                            <SheetMetric label="Plaquetas" value={data.plaq} unit="/µL" icon={Activity} colorClass="text-slate-400" />
                        </div>

                        {/* GASOMETRIA */}
                        <div className="space-y-3 lg:col-span-2">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Gasometria Arterial</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <SheetMetric label="pH" value={data.ph} icon={Scale} colorClass="text-teal-300" />
                                <SheetMetric label="pCO2" value={data.pco2} unit="mmHg" icon={Wind} colorClass="text-slate-300" />
                                <SheetMetric label="Bicarbonato (HCO3)" value={data.hco3} unit="mEq/L" icon={Hexagon} colorClass="text-slate-300" />
                                <SheetMetric label="Lactato" value={data.lac} unit="mmol/L" icon={Activity} colorClass="text-slate-500" />
                            </div>
                        </div>

                        {/* MARCADORES ESPECIAIS */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Biomarcadores</h3>
                            <SheetMetric label="CPK" value={data.cpk} unit="U/L" icon={Zap} colorClass="text-rose-400" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
