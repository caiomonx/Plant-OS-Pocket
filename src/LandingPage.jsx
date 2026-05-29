import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Pill, FileImage, ShieldCheck, Trophy, Sparkles, Radiation } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = useState(0);
  const [challenges, setChallenges] = useState({
    ecg: {
      id: 'ecg',
      title: 'Desafio Diário de ECG',
      desc: 'Analise o traçado eletrocardiográfico e identifique a patologia cardiovascular correta hoje.',
      path: '/modulos/desafioecg',
      color: 'emerald',
      icon: Activity,
      status: 'pending',
      colorClasses: {
        glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
        border: 'group-hover:border-emerald-500/50',
        text: 'text-emerald-400',
        bgIcon: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
      }
    },
    diagnostico: {
      id: 'diagnostico',
      title: 'Desafio de Diagnóstico',
      desc: 'Investigue o caso clínico do dia através de pistas e feche o diagnóstico correto com precisão médica.',
      path: '/modulos/desafio-diagnostico',
      color: 'cyan',
      icon: BrainCircuit,
      status: 'pending',
      colorClasses: {
        glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
        border: 'group-hover:border-cyan-500/50',
        text: 'text-cyan-400',
        bgIcon: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20',
        badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
      }
    },
    antibiotico: {
      id: 'antibiotico',
      title: 'Antibioticoterapia',
      desc: 'Prescreva a melhor estratégia terapêutica antimicrobiana baseada na clínica e germe do dia.',
      path: '/modulos/antibioticoterapia',
      color: 'purple',
      icon: Pill,
      status: 'pending',
      colorClasses: {
        glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]',
        border: 'group-hover:border-purple-500/50',
        text: 'text-purple-400',
        bgIcon: 'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20',
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
      }
    },
    imaginologia: {
      id: 'imaginologia',
      title: 'Desafio de Imaginologia',
      desc: 'Avalie o exame de imagem (Raio-X, TC), mapeie a alteração patológica e defina a conduta ideal.',
      path: '/modulos/imaginologia',
      color: 'amber',
      icon: Radiation,
      status: 'pending',
      colorClasses: {
        glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
        border: 'group-hover:border-amber-500/50',
        text: 'text-amber-400',
        bgIcon: 'bg-amber-500/10 border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      }
    }
  });

  useEffect(() => {
    const todayStr = new Date().toDateString();
    let completed = 0;

    const checkStatus = (key, storageKey) => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const history = JSON.parse(stored);
          if (Array.isArray(history)) {
            const todayRun = history.find(h => 
              (h.dayNumber === 3 || h.date === todayStr) && 
              (h.status === 'won' || h.status === 'lost')
            ) || history.find(h => h.dayNumber === 3 || h.date === todayStr);
            if (todayRun && (todayRun.status === 'won' || todayRun.status === 'lost')) {
              completed++;
              return todayRun.status;
            }
          }
        }
      } catch (err) {
        console.error(`Erro ao ler status do ${key}:`, err);
      }
      return 'pending';
    };

    const ecgStatus = checkStatus('ecg', 'antigravity_ecg_history');
    const diagStatus = checkStatus('diagnostico', 'antigravity_diagnostic_history');
    const antibioStatus = checkStatus('antibiotico', 'antigravity_antibio_history');
    const imagioStatus = checkStatus('imaginologia', 'imagiology_challenge_history');

    setChallenges(prev => ({
      ...prev,
      ecg: { ...prev.ecg, status: ecgStatus },
      diagnostico: { ...prev.diagnostico, status: diagStatus },
      antibiotico: { ...prev.antibiotico, status: antibioStatus },
      imaginologia: { ...prev.imaginologia, status: imagioStatus }
    }));

    setCompletedCount(completed);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } }
  };

  return (
    <div className="w-full h-screen bg-slate-950 overflow-y-auto no-scrollbar flex flex-col justify-between font-['Plus_Jakarta_Sans'] relative select-none">
      
      {/* ── BACKGROUND GLOWS ── */}
      <div className="absolute right-[-10%] top-[10%] w-[60%] h-[75%] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] filter blur-[80px] pointer-events-none z-0" />
      <div className="absolute left-[-15%] bottom-[5%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.04)_0%,transparent_70%)] filter blur-[80px] pointer-events-none z-0" />

      {/* ── HEADER ── */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 z-10 relative">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-['Outfit'] select-none">
              <span className="text-white">Plantão</span>
              <span className="text-cyan-400">.OS</span>
            </h1>
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 select-none shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
              <Sparkles size={10} /> Pocket Beta
            </span>
          </div>
          <p className="text-slate-400 text-sm md:text-base font-medium select-none max-w-md">
            Sua dose diária de raciocínio clínico prático e rigoroso em quatro especialidades fundamentais.
          </p>
        </div>

        {/* PROGRESS TRACKER */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl px-6 py-4 flex items-center gap-5 shadow-2xl relative select-none">
          <div className="relative flex items-center justify-center">
            {/* Círculo de progresso SVG */}
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                className="stroke-slate-800"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                className="stroke-cyan-500 transition-all duration-1000 ease-out"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={2 * Math.PI * 24 * (1 - completedCount / 4)}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0px 0px 6px rgba(6, 182, 212, 0.5))' }}
              />
            </svg>
            <span className="absolute text-sm font-black text-white">{completedCount}/4</span>
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-0.5">Progresso de Hoje</div>
            <div className="text-sm font-bold text-white flex items-center gap-1">
              {completedCount === 4 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Trophy size={16} className="animate-bounce" /> Todos Concluídos!
                </span>
              ) : (
                <span>{4 - completedCount} Desafios Restantes</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── GRID OF DAILY CHALLENGES ── */}
      <main className="w-full max-w-6xl mx-auto px-6 py-10 md:py-16 z-10 relative flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.values(challenges).map((item) => {
            const IconComponent = typeof item.icon === 'string' ? null : item.icon;
            const isCompleted = item.status === 'won' || item.status === 'lost';
            
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => navigate(item.path)}
                className={`group relative rounded-3xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-500 border border-slate-800/80 bg-slate-900/30 backdrop-blur-xl flex flex-col justify-between h-[200px] md:h-[220px] select-none hover:bg-slate-900/60 hover:-translate-y-1 hover:scale-[1.015] ${item.colorClasses.glow} ${item.colorClasses.border}`}
              >
                {/* Visual Glass highlights inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                {/* Top Section */}
                <div className="flex justify-between items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl border transition-all duration-500 flex items-center justify-center ${item.colorClasses.bgIcon}`}>
                    {typeof item.icon === 'string' ? (
                      <img src={item.icon} alt={item.title} className="w-7 h-7 object-contain" />
                    ) : (
                      <IconComponent size={28} strokeWidth={2.2} />
                    )}
                  </div>

                  {/* Status Badge */}
                  {isCompleted ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)] bg-emerald-500/10 text-emerald-400 border-emerald-500/30`}>
                      <ShieldCheck size={14} /> Concluído
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-slate-700 bg-slate-800/40 text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      Pendente
                    </span>
                  )}
                </div>

                {/* Bottom Section */}
                <div className="mt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-slate-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-900/60 z-10 relative select-none">
        <span className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
          Plantão.OS Pocket © 2026
        </span>
        <span className="text-xs font-medium text-slate-500 bg-slate-900/60 border border-slate-900 px-3 py-1.5 rounded-xl">
          Versão demonstrativa exclusiva para testadores convidados.
        </span>
      </footer>

    </div>
  );
}
