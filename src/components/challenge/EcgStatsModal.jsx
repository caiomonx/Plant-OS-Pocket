import React, { useMemo } from 'react';
import { computeEcgStats } from '../../utils/ecgStats';

export default function EcgStatsModal({ isOpen, onClose }) {
  const stats = useMemo(() => computeEcgStats(), [isOpen]);

  if (!isOpen) return null;

  const statCards = [
    { label: 'Jogos', value: stats.totalPlayed, accent: 'text-slate-100' },
    { label: 'Win Rate', value: `${stats.winRate}%`, accent: 'text-rose-400' },
    { label: 'Streak Atual', value: stats.currentStreak, accent: 'text-rose-500' },
    { label: 'Maior Streak', value: stats.longestStreak, accent: 'text-amber-400' },
  ];

  const maxDistribution = Math.max(...stats.guessDistribution, 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Gradient accent bar (Rose/Red theme) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-rose-500 to-orange-500" />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Estatísticas
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Fechar estatísticas"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-4 gap-3">
            {statCards.map((card) => (
              <div key={card.label} className="text-center">
                <p className={`text-2xl font-black ${card.accent}`}>{card.value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Win/Loss breakdown */}
          <div className="flex items-center gap-3 bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
            <div className="flex-1 text-center">
              <span className="text-lg font-bold text-rose-400">{stats.totalWins}</span>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Vitórias</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="flex-1 text-center">
              <span className="text-lg font-bold text-red-500">{stats.totalLosses}</span>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Derrotas</p>
            </div>
          </div>

          {/* Guess Distribution */}
          <div>
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
              Distribuição de Acertos
            </h3>
            <div className="space-y-2">
              {stats.guessDistribution.map((count, index) => {
                const barWidth = maxDistribution > 0 ? Math.max((count / maxDistribution) * 100, 8) : 8;
                const hasValue = count > 0;
                const label = index === 0 ? "1ª Tentativa" : "2ª Tentativa";

                return (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-20 text-right shrink-0">
                      {label}
                    </span>
                    <div className="flex-1 relative h-7">
                      <div
                        className={`h-full rounded-md flex items-center justify-end pr-2 transition-all duration-500 ${
                          hasValue
                            ? 'bg-gradient-to-r from-rose-600/80 to-rose-500/90'
                            : 'bg-slate-800'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      >
                        <span className={`text-xs font-bold ${hasValue ? 'text-white' : 'text-slate-600'}`}>
                          {count}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
