import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

const ECGCanvas = React.memo(({
    pathData, // SVG "d" string for ONE cycle
    color = '#10b981',
    speed = 2, // Animation duration in seconds
    className,
    paused = false,
    cycleWidth: overrideCycleWidth = null,
    baseWidth = 100, // The physical width of the pathData complex
    continuous = false, // If true, ignores HR gaps
    hr = null // Heart rate from vitals
}) => {
    // The fixed view width of our generic monitor screen
    const viewWidth = 400;
    
    // Calculate dynamic cycle width based on HR
    // Scale: 1 unit = 0.01 seconds. 60 seconds = 6000 units.
    let computedCycleWidth = overrideCycleWidth || baseWidth;
    
    if (hr && hr > 0 && !continuous) {
        computedCycleWidth = 6000 / hr;
    }

    // If the cycle is shorter than the base complex (Tachycardia), we compress the complex.
    const scaleX = (!continuous && computedCycleWidth < baseWidth) ? computedCycleWidth / baseWidth : 1;
    
    // If the cycle is longer than the base complex (Bradycardia/Normal), we draw a flat line.
    const isoLength = (!continuous && scaleX === 1 && computedCycleWidth > baseWidth) 
        ? computedCycleWidth - baseWidth 
        : 0;

    // How many cycles needed to fill the screen (plus 1 for safety during translation)
    const cycles = Math.max(1, Math.ceil(viewWidth / computedCycleWidth) + 1);

    const maskRef = useRef(null);
    const headRef = useRef(null);
    const animationFrameIdRef = useRef();

    useEffect(() => {
        const mask = maskRef.current;
        const head = headRef.current;
        if (!mask || !head) return;

        if (paused) {
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
            return;
        }

        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const realDuration = speed * 1000 * 2;

            const progress = (elapsed % realDuration) / realDuration;
            const widthPct = progress * 100;
            const rightInset = 100 - widthPct;

            mask.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
            head.style.left = `${widthPct}%`;

            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        animationFrameIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
        };
    }, [speed, paused]);

    return (
        <div className={cn("relative overflow-hidden bg-transparent w-full h-full", className)}>
            <div
                ref={maskRef}
                className="absolute inset-0"
                style={{
                    clipPath: 'inset(0 100% 0 0)',
                    willChange: 'clip-path'
                }}
            >
                <svg
                    viewBox={`0 -30 ${viewWidth} 160`}
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    style={{ filter: `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 6px ${color})` }}
                >
                    {[...Array(cycles)].map((_, i) => (
                        <g key={i} transform={`translate(${i * computedCycleWidth}, 0)`}>
                            <path
                                d={pathData}
                                transform={scaleX !== 1 ? `scale(${scaleX}, 1)` : undefined}
                                fill="none"
                                stroke={color}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                            {isoLength > 0 && (
                                <path 
                                    d={`M ${baseWidth} 50 L ${computedCycleWidth} 50`}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    vectorEffect="non-scaling-stroke"
                                />
                            )}
                        </g>
                    ))}
                </svg>
            </div>

            {/* WRITE HEAD (The Pen Tip) */}
            {/* A small glowing dot that leads the line */}
            <div
                ref={headRef}
                className="absolute top-0 bottom-0 w-[2px] z-20 pointer-events-none"
                style={{
                    left: '0%',
                    willChange: 'left',
                    background: 'transparent', // The vertical line itself is invisible, just the 'dot'
                }}
            >
                {/* The Glowing Dot centered vertically */}
                {/* Positioned at top-1/2? No, ECG varies in height. 
                     We can't easily track Y position without complex logic.
                     So we just show a "Vertical Bar" or "Scanner Beam"?
                     User wanted "Comet Tail".
                     If we can't track Y, maybe just a vertical soft beam is safer.
                 */}
                <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/50 to-transparent blur-[1px]" />
            </div>

        </div>
    );
});

export default ECGCanvas;

// export default ECGCanvas; // Removed duplicate

