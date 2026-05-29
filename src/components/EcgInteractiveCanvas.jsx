import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Hand, MousePointer2, Pencil, Eraser, Ruler, Undo2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { cn } from '../lib/utils';

export default function EcgInteractiveCanvas({ imageUrl }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [activeTool, setActiveTool] = useState('pan'); // 'pan', 'draw', 'ruler', 'eraser'
  
  // Drawing state
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);

  // Ruler state
  const [rulers, setRulers] = useState([]);
  const [currentRuler, setCurrentRuler] = useState(null);

  // Global History for Undo
  const [history, setHistory] = useState([]);

  // Pinch-to-zoom tracking refs (refs to avoid stale closures in touch handlers)
  const pinchRef = useRef({ active: false, initialDist: 0, initialScale: 1, initialPos: { x: 0, y: 0 }, midpoint: { x: 0, y: 0 } });
  const scaleRef = useRef(scale);
  const positionRef = useRef(position);

  const containerRef = useRef(null);

  // Keep refs in sync with state
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { positionRef.current = position; }, [position]);

  // --- COORDINATE HELPERS ---
  const getRelativeCoordinates = (clientX, clientY) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    const x = (mouseX - positionRef.current.x) / scaleRef.current;
    const y = (mouseY - positionRef.current.y) / scaleRef.current;
    return { x, y };
  };

  const getClientCoords = (e) => {
    // Works for both MouseEvent/PointerEvent and TouchEvent
    if (e.touches && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  };

  // --- DESKTOP ZOOM (Mouse Wheel) ---
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let newScale = scaleRef.current * Math.exp(delta);
      newScale = Math.min(Math.max(newScale, 0.5), 10);

      const scaleRatio = newScale / scaleRef.current;
      const newX = mouseX - (mouseX - positionRef.current.x) * scaleRatio;
      const newY = mouseY - (mouseY - positionRef.current.y) * scaleRatio;

      setScale(newScale);
      setPosition({ x: newX, y: newY });
    }
  }, []);

  // --- MOBILE PINCH-TO-ZOOM (Touch Events) ---
  const getTouchDistance = (t1, t2) => {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  };

  const getTouchMidpoint = (t1, t2) => {
    return {
      clientX: (t1.clientX + t2.clientX) / 2,
      clientY: (t1.clientY + t2.clientY) / 2,
    };
  };

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      // Start pinch — cancel any single-touch tool action in progress
      e.preventDefault();
      const dist = getTouchDistance(e.touches[0], e.touches[1]);
      const mid = getTouchMidpoint(e.touches[0], e.touches[1]);
      const rect = containerRef.current?.getBoundingClientRect();
      
      pinchRef.current = {
        active: true,
        initialDist: dist,
        initialScale: scaleRef.current,
        initialPos: { ...positionRef.current },
        midpoint: {
          x: mid.clientX - (rect?.left || 0),
          y: mid.clientY - (rect?.top || 0),
        },
      };
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && pinchRef.current.active) {
      e.preventDefault();
      const dist = getTouchDistance(e.touches[0], e.touches[1]);
      const pinch = pinchRef.current;

      let newScale = pinch.initialScale * (dist / pinch.initialDist);
      newScale = Math.min(Math.max(newScale, 0.5), 10);

      const scaleRatio = newScale / pinch.initialScale;
      const newX = pinch.midpoint.x - (pinch.midpoint.x - pinch.initialPos.x) * scaleRatio;
      const newY = pinch.midpoint.y - (pinch.midpoint.y - pinch.initialPos.y) * scaleRatio;

      setScale(newScale);
      setPosition({ x: newX, y: newY });
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length < 2) {
      pinchRef.current.active = false;
    }
  }, []);

  // --- ATTACH NATIVE LISTENERS (wheel + touch for pinch) ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Wheel zoom (desktop)
    el.addEventListener('wheel', handleWheel, { passive: false });

    // Pinch zoom (mobile) — must be native for preventDefault to work
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // --- POINTER EVENTS (work for mouse AND single-touch) ---
  const handlePointerDown = (e) => {
    // Ignore if a pinch is active
    if (pinchRef.current.active) return;

    const { clientX, clientY } = e;

    if (activeTool === 'pan') {
      setIsDragging(true);
      setDragStart({ x: clientX - positionRef.current.x, y: clientY - positionRef.current.y });
    } else if (activeTool === 'draw') {
      const coords = getRelativeCoordinates(clientX, clientY);
      setCurrentLine({ points: [coords] });
    } else if (activeTool === 'ruler') {
      const coords = getRelativeCoordinates(clientX, clientY);
      setCurrentRuler({ start: coords, end: coords });
    }
  };

  const handlePointerMove = (e) => {
    if (pinchRef.current.active) return;

    const { clientX, clientY } = e;

    if (isDragging && activeTool === 'pan') {
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y
      });
    } else if (activeTool === 'draw' && currentLine) {
      const coords = getRelativeCoordinates(clientX, clientY);
      setCurrentLine(prev => ({
        ...prev,
        points: [...prev.points, coords]
      }));
    } else if (activeTool === 'ruler' && currentRuler) {
      const coords = getRelativeCoordinates(clientX, clientY);
      setCurrentRuler(prev => ({ ...prev, end: coords }));
    }
  };

  const handlePointerUp = () => {
    if (activeTool === 'pan') {
      setIsDragging(false);
    } else if (activeTool === 'draw' && currentLine) {
      if (currentLine.points.length > 1) {
        const id = Date.now();
        setLines(prev => [...prev, { id, ...currentLine }]);
        setHistory(prev => [...prev, { id, type: 'line' }]);
      }
      setCurrentLine(null);
    } else if (activeTool === 'ruler' && currentRuler) {
      if (currentRuler.start.x !== currentRuler.end.x || currentRuler.start.y !== currentRuler.end.y) {
        const id = Date.now();
        setRulers(prev => [...prev, { id, ...currentRuler }]);
        setHistory(prev => [...prev, { id, type: 'ruler' }]);
      }
      setCurrentRuler(null);
    }
  };

  const handleUndo = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const lastAction = newHistory.pop();
      
      if (lastAction.type === 'line') {
        setLines(lines => lines.filter(l => l.id !== lastAction.id));
      } else if (lastAction.type === 'ruler') {
        setRulers(rulers => rulers.filter(r => r.id !== lastAction.id));
      }
      
      return newHistory;
    });
  }, []);

  const eraseItem = (id, type) => {
    if (activeTool !== 'eraser') return;
    if (type === 'line') {
      setLines(prev => prev.filter(l => l.id !== id));
    } else if (type === 'ruler') {
      setRulers(prev => prev.filter(r => r.id !== id));
    }
  };

  // Helper to generate SVG path
  const getPathData = (points) => {
    if (points.length === 0) return '';
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  };

  const clearAll = () => {
    setLines([]);
    setRulers([]);
    setHistory([]);
  };

  // Detect if touch device for hint text
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-3">
      
      {/* CANVAS CONTAINER */}
      <div 
        ref={containerRef}
        className={cn(
          "flex-1 min-h-0 relative bg-[#0B0E14] overflow-hidden flex items-center justify-center rounded-3xl border border-slate-800 shadow-xl select-none outline-none",
          activeTool === 'pan' ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : '',
          activeTool === 'draw' ? 'cursor-crosshair' : '',
          activeTool === 'ruler' ? 'cursor-crosshair' : '',
          activeTool === 'eraser' ? 'cursor-not-allowed' : ''
        )}
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div 
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            width: '100%',
            height: '100%',
            transition: isDragging || pinchRef.current.active ? 'none' : 'transform 0.1s ease-out'
          }}
          className="relative flex items-center justify-center will-change-transform"
        >
          <img 
            src={imageUrl} 
            alt="ECG Analisável" 
            draggable={false}
            className="max-w-none max-h-none pointer-events-none select-none user-select-none" 
            style={{ 
              width: '1800px',
              objectFit: 'contain' 
            }}
          />

          {/* SVG OVERLAY FOR DRAWING */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            {/* Rulers */}
            {rulers.map(ruler => {
              const dist = Math.round(Math.hypot(ruler.end.x - ruler.start.x, ruler.end.y - ruler.start.y));
              const midX = (ruler.start.x + ruler.end.x) / 2;
              const midY = (ruler.start.y + ruler.end.y) / 2;

              return (
                <g key={ruler.id} className={activeTool === 'eraser' ? 'pointer-events-auto cursor-pointer hover:opacity-50' : ''} onClick={() => eraseItem(ruler.id, 'ruler')}>
                  <line 
                    x1={ruler.start.x} y1={ruler.start.y} 
                    x2={ruler.end.x} y2={ruler.end.y} 
                    stroke="#14B8A6" strokeWidth={3 / scale} strokeDasharray={`${5/scale},${5/scale}`}
                  />
                  <circle cx={ruler.start.x} cy={ruler.start.y} r={4 / scale} fill="#14B8A6" />
                  <circle cx={ruler.end.x} cy={ruler.end.y} r={4 / scale} fill="#14B8A6" />
                  
                  {dist > 0 && (
                    <g>
                      <rect 
                        x={midX - (25 / scale)} y={midY - (12 / scale)} 
                        width={50 / scale} height={24 / scale} 
                        rx={6 / scale} 
                        fill="#0B0E14" 
                        stroke="#14B8A6" strokeWidth={1 / scale}
                      />
                      <text 
                        x={midX} y={midY + (4 / scale)} 
                        fontSize={12 / scale} 
                        fill="#14B8A6" 
                        textAnchor="middle" 
                        fontFamily="sans-serif"
                        fontWeight="bold"
                        className="pointer-events-none select-none"
                      >
                        {dist}u
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            
            {currentRuler && (() => {
              const dist = Math.round(Math.hypot(currentRuler.end.x - currentRuler.start.x, currentRuler.end.y - currentRuler.start.y));
              const midX = (currentRuler.start.x + currentRuler.end.x) / 2;
              const midY = (currentRuler.start.y + currentRuler.end.y) / 2;
              
              return (
               <g>
                <line 
                  x1={currentRuler.start.x} y1={currentRuler.start.y} 
                  x2={currentRuler.end.x} y2={currentRuler.end.y} 
                  stroke="#14B8A6" strokeWidth={3 / scale} strokeDasharray={`${5/scale},${5/scale}`}
                />
                <circle cx={currentRuler.start.x} cy={currentRuler.start.y} r={4 / scale} fill="#14B8A6" />
                <circle cx={currentRuler.end.x} cy={currentRuler.end.y} r={4 / scale} fill="#14B8A6" />
                
                {dist > 0 && (
                  <g>
                    <rect 
                      x={midX - (25 / scale)} y={midY - (12 / scale)} 
                      width={50 / scale} height={24 / scale} 
                      rx={6 / scale} 
                      fill="#0B0E14" 
                      stroke="#14B8A6" strokeWidth={1 / scale}
                    />
                    <text 
                      x={midX} y={midY + (4 / scale)} 
                      fontSize={12 / scale} 
                      fill="#14B8A6" 
                      textAnchor="middle" 
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {dist}u
                    </text>
                  </g>
                )}
              </g>
              );
            })()}

            {/* Pencil Lines */}
            {lines.map(line => (
              <path 
                key={line.id} 
                d={getPathData(line.points)} 
                fill="none" 
                stroke="#F43F5E" 
                strokeWidth={3 / scale} 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={activeTool === 'eraser' ? 'pointer-events-auto cursor-pointer hover:opacity-50' : ''}
                onClick={() => eraseItem(line.id, 'line')}
              />
            ))}
            {currentLine && (
              <path 
                d={getPathData(currentLine.points)} 
                fill="none" 
                stroke="#F43F5E" 
                strokeWidth={3 / scale} 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </div>
      
      {/* Zoom hint — adapts text for touch vs mouse */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur text-slate-400 text-xs px-3 py-1.5 rounded-lg border border-slate-700/50 pointer-events-none">
        {isTouchDevice 
          ? <>Use <b>dois dedos</b> para ampliar (Zoom: {Math.round(scale * 100)}%)</>
          : <>Use o <b>scroll do mouse</b> para ampliar (Zoom: {Math.round(scale * 100)}%)</>
        }
      </div>
      
      {/* TOOLBAR (Horizontal on mobile, Vertical on md+) */}
      <div className="md:w-[60px] md:h-full w-full h-auto flex-shrink-0 flex flex-row md:flex-col gap-2 md:gap-3 bg-slate-900/40 backdrop-blur-md px-4 py-2 md:py-4 md:px-0 items-center justify-center md:justify-start rounded-2xl md:rounded-3xl border border-slate-800 shadow-xl overflow-x-auto">
        <ToolButton icon={<Hand size={20} />} label="Mover (Pan/Zoom)" active={activeTool === 'pan'} onClick={() => setActiveTool('pan')} />
        <ToolButton icon={<Pencil size={20} />} label="Lápis" active={activeTool === 'draw'} onClick={() => setActiveTool('draw')} />
        <ToolButton icon={<Ruler size={20} />} label="Régua" active={activeTool === 'ruler'} onClick={() => setActiveTool('ruler')} />
        <ToolButton icon={<Eraser size={20} />} label="Borracha" active={activeTool === 'eraser'} onClick={() => setActiveTool('eraser')} />
        
        <div className="h-6 w-px md:w-8 md:h-px bg-slate-700 mx-2 md:mx-1 self-center md:my-2 flex-shrink-0"></div>
        
        <button 
          onClick={handleUndo}
          disabled={history.length === 0}
          className="p-2.5 md:p-3 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-xl hover:bg-slate-800 flex-shrink-0"
          title="Desfazer"
        >
          <Undo2 size={20} />
        </button>

        <button 
          onClick={clearAll}
          className="p-2.5 md:p-3 md:mt-auto flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors rounded-xl flex-shrink-0"
          title="Limpar Tudo"
        >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

    </div>
  );
}

function ToolButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "p-2 rounded-xl transition-all flex items-center justify-center group flex-shrink-0",
        active 
          ? "bg-teal-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.4)]" 
          : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800"
      )}
    >
      {icon}
    </button>
  );
}
