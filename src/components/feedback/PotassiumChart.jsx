import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const PotassiumChart = ({ telemetry }) => {
    // 1. Data Construction
    const startK = 7.2;
    // Fallback to startK if kLevelFinal is missing, to show a flat line instead of error
    const endK = telemetry.kLevelFinal !== undefined ? telemetry.kLevelFinal : startK;

    // PSEUDO CASE LOGIC:
    // If scenarioId is pseudo, we show the REAL K (which is low/normal) as a flat line?
    // OR we show the High K dropping to Low K?
    // User requested: "O gráfico deve sempre mostrar o potássio real".
    // For Pseudo, Real K was ALWAYS 4.2. So the chart should be a flat line at 4.2.
    // The "StartK" in telemetry might be the reported one (7.2), but we know the truth.

    const isPseudo = telemetry.scenarioId && telemetry.scenarioId.includes('pseudo');

    let points = [];

    if (isPseudo) {
        // FLAT LINE AT REAL K (e.g. 4.2 or 4.4)
        // If endK is the revealed value (e.g. 4.4), use it.
        const realVal = endK;
        points = [
            { name: "0'", k: realVal },
            { name: "15'", k: realVal },
            { name: "30'", k: realVal },
            { name: "45'", k: realVal },
            { name: "60'", k: realVal }
        ];
    } else {
        // NORMAL INTERPOLATION
        points = [
            { name: "0'", k: startK },
            { name: "15'", k: startK }, // Initial delay
            // Interpolate the drop
            { name: "30'", k: startK - ((startK - endK) * 0.3) },
            { name: "45'", k: startK - ((startK - endK) * 0.8) },
            { name: "60'", k: endK }
        ];
    }

    // Determine color based on success
    const isSafe = endK <= 6.0;
    // User Feedback: The red chart "distorts" the look. 
    // Fix: We'll use the Monitor Cyan/Teal color for the TRACING itself (like a medical monitor),
    // and only use red for the LIMIT line or the VALUE text if critical.
    const chartColor = "#2dd4bf"; // Always Teal-400 for the line to match aesthetic

    return (
        <div className="w-full bg-slate-900/50 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            {/* Header */}
            <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Evolução do Potássio
                </h3>
                <span className="text-xs text-slate-600 font-mono">(MMOL/L)</span>
            </div>


            {/* Big Number */}
            <div className="absolute top-16 left-6 z-10">
                <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold tracking-tight ${isSafe ? 'text-teal-400' : 'text-rose-400'}`}>
                        {endK.toFixed(1)}
                    </span>
                    <span className="text-xl text-slate-500 font-medium">Final</span>
                    {/* Trend Icon */}
                    {endK < startK ? (
                        <span className="text-teal-500/50 ml-1 text-2xl">⚡</span> // Simple bolt for now
                    ) : (
                        <span className="text-rose-500/50 ml-1 text-2xl">⚠</span>
                    )}
                </div>
            </div>

            <div className="h-[240px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={points}
                        margin={{
                            top: 60, // Space for the big number
                            right: 0,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorK" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        {/* Grid - Very Subtle */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            domain={[3.5, 8.5]}
                            hide={true} // Clean look
                        />

                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            formatter={(value) => [value.toFixed(1), 'K+']}
                        />

                        <Area
                            type="monotone"
                            dataKey="k"
                            stroke={chartColor}
                            strokeWidth={4}
                            fill="url(#colorK)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div >
    );
};

export default PotassiumChart;
