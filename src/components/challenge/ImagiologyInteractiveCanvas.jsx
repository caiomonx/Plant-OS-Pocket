import React, { useRef, useState, useEffect, useCallback } from 'react';
import { XCircle, CheckCircle2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.3;

export default function ImagiologyInteractiveCanvas({ 
    imageUrl, 
    resetKey,
    onImageClick, 
    status,
    findings = [],
    foundIndices = [],
    failedAttempts = [],
    showPins = true
}) {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
    const [clickFeedback, setClickFeedback] = useState(null);

    // Track the image's actual rendered pixel dimensions via ResizeObserver
    useEffect(() => {
        const img = imageRef.current;
        if (!img) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0) {
                    setImgDims(prev => {
                        // Anti-cascade logic: Only update if the difference is > 1.5px
                        // This prevents the infinite shrinking loop caused by subpixel rendering
                        if (Math.abs(prev.w - width) > 1.5 || Math.abs(prev.h - height) > 1.5) {
                            return { w: width, h: height };
                        }
                        return prev;
                    });
                }
            }
        });

        observer.observe(img);

        // If already loaded, grab initial size
        if (img.complete && img.naturalWidth > 0) {
            const rect = img.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                setImgDims({ w: rect.width, h: rect.height });
            }
        }

        return () => observer.disconnect();
    }, [imageUrl]); // We still observe on imageUrl change to ensure the observer is tracking the current img

    const handleLoad = () => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                setImgDims({ w: rect.width, h: rect.height });
            }
        }
    };

    const aspectRatio = imgDims.h > 0 ? imgDims.w / imgDims.h : 1;

    // Zoom & Pan state
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const panStart = useRef({ x: 0, y: 0 });
    const dragMoved = useRef(false);

    // Reset zoom and wrapper dims ONLY when the clinical case changes (resetKey)
    useEffect(() => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setImgDims({ w: 0, h: 0 }); // reset to allow image to expand naturally before observer locks it
    }, [resetKey]);

    // Clamp pan so the image doesn't float away
    const clampPan = useCallback((newPan, currentZoom) => {
        if (currentZoom <= 1) return { x: 0, y: 0 };
        // Allow panning up to half the overflow in each direction
        const maxPanX = ((currentZoom - 1) / 2) * 100;
        const maxPanY = ((currentZoom - 1) / 2) * 100;
        return {
            x: Math.max(-maxPanX, Math.min(maxPanX, newPan.x)),
            y: Math.max(-maxPanY, Math.min(maxPanY, newPan.y)),
        };
    }, []);
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        setZoom(prev => {
            const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta));
            if (next <= 1) setPan({ x: 0, y: 0 });
            else setPan(p => clampPan(p, next));
            return next;
        });
    }, [clampPan]);

    // Attach wheel listener with { passive: false } so we can preventDefault
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    // ─── Drag to Pan ───
    const handlePointerDown = (e) => {
        if (zoom <= 1) return;
        setIsDragging(true);
        dragMoved.current = false;
        dragStart.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
        panStart.current = { ...pan };
    };

    const handlePointerMove = (e) => {
        if (!isDragging || zoom <= 1) return;
        const container = containerRef.current;
        if (!container) return;

        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            if (!dragMoved.current) {
                dragMoved.current = true;
                e.currentTarget.setPointerCapture(dragStart.current.pointerId);
            }
        }

        if (dragMoved.current) {
            const rect = container.getBoundingClientRect();
            // Convert pixel delta to percentage of container
            const percentX = (dx / rect.width) * 100;
            const percentY = (dy / rect.height) * 100;

            setPan(clampPan({
                x: panStart.current.x + percentX,
                y: panStart.current.y + percentY,
            }, zoom));
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    // ─── Zoom via scroll wheel ───
    const handleClick = (e) => {
        // If we were dragging, don't register a click
        if (dragMoved.current) return;
        if (status !== 'playing' || !imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        
        if (
            e.clientX < rect.left || 
            e.clientX > rect.right || 
            e.clientY < rect.top || 
            e.clientY > rect.bottom
        ) {
            return;
        }

        const clickX = ((e.clientX - rect.left) / rect.width) * 100;
        const clickY = ((e.clientY - rect.top) / rect.height) * 100;

        setClickFeedback({ x: clickX, y: clickY, id: Date.now() });
        setTimeout(() => setClickFeedback(null), 500);

        onImageClick(clickX, clickY, aspectRatio);
    };

    const [isZoomAnimating, setIsZoomAnimating] = useState(false);

    const triggerZoomAnimation = () => {
        setIsZoomAnimating(true);
        setTimeout(() => setIsZoomAnimating(false), 150);
    };

    // ─── Zoom button handlers ───
    const zoomIn = () => {
        triggerZoomAnimation();
        setZoom(prev => {
            const next = Math.min(MAX_ZOOM, prev + ZOOM_STEP);
            setPan(p => clampPan(p, next));
            return next;
        });
    };

    const zoomOut = () => {
        triggerZoomAnimation();
        setZoom(prev => {
            const next = Math.max(MIN_ZOOM, prev - ZOOM_STEP);
            if (next <= 1) setPan({ x: 0, y: 0 });
            else setPan(p => clampPan(p, next));
            return next;
        });
    };

    const resetZoom = () => {
        triggerZoomAnimation();
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    const isZoomed = zoom > 1;

    return (
        <div 
            ref={containerRef}
            className={`relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden select-none touch-none ${
                status === 'playing' 
                    ? (isZoomed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-crosshair')
                    : (isZoomed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default')
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            <div 
                className={`relative ${isZoomAnimating ? 'transition-transform duration-150 ease-out' : ''}`}
                style={{ 
                    width: imgDims.w > 0 ? `${imgDims.w}px` : 'auto',
                    height: imgDims.h > 0 ? `${imgDims.h}px` : 'auto',
                    transform: `scale(${zoom}) translate(${pan.x / zoom}%, ${pan.y / zoom}%)`,
                    transformOrigin: 'center center',
                }}
            >
                <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Clinical Case"
                    onLoad={handleLoad}
                    onClick={handleClick}
                    className="max-w-full max-h-full block pointer-events-auto transition-opacity duration-300"
                    draggable={false}
                />

                {/* Feedback Efémero do Clique */}
                {clickFeedback && status === 'playing' && (
                    <div 
                        className="absolute w-6 h-6 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping"
                        style={{ left: `${clickFeedback.x}%`, top: `${clickFeedback.y}%` }}
                    />
                )}

                {/* Achados Revelados (Sucesso ou Fim de Jogo) */}
                {showPins && findings.map((f, idx) => {
                    const isFound = foundIndices.includes(idx);
                    const isGameOver = status === 'won' || status === 'lost';
                    const show = isFound || isGameOver;

                    if (!show) return null;

                    // ── Polygon finding (single or multi) ──
                    const allPolys = f.polygons 
                        ? f.polygons 
                        : f.polygon 
                            ? [f.polygon] 
                            : null;

                    if (allPolys) {
                        const allPoints = allPolys.flat();
                        const cx = allPoints.reduce((s, p) => s + p.x, 0) / allPoints.length;
                        const cy = allPoints.reduce((s, p) => s + p.y, 0) / allPoints.length;

                        return (
                            <React.Fragment key={`finding-poly-${idx}`}>
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none animate-in zoom-in duration-300"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    style={{ zIndex: 5 }}
                                >
                                    {allPolys.map((poly, pIdx) => (
                                        <polygon
                                            key={pIdx}
                                            points={poly.map(p => `${p.x},${p.y}`).join(' ')}
                                            fill={isFound ? 'rgba(52,211,153,0.2)' : 'rgba(244,63,94,0.2)'}
                                            stroke={isFound ? 'rgba(52,211,153,0.8)' : 'rgba(244,63,94,0.8)'}
                                            strokeWidth="0.4"
                                            strokeLinejoin="round"
                                        />
                                    ))}
                                </svg>
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in duration-300"
                                    style={{ left: `${cx}%`, top: `${cy}%`, zIndex: 6 }}
                                >
                                    {isFound ? (
                                        <div className="bg-emerald-500 rounded-full text-white shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    }

                    // ── Circle / multi-zone finding ──
                    const zones = f.zones 
                        ? f.zones 
                        : [{ x: f.x, y: f.y, radius: f.radius }];

                    return zones.map((zone, zIdx) => (
                        <div
                            key={`finding-${idx}-z${zIdx}`}
                            className="absolute group -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in duration-300"
                            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                        >
                            <div className="relative flex flex-col items-center justify-center">
                                {/* Hitbox circle */}
                                <div 
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 
                                        ${isFound ? 'border-emerald-400/80 bg-emerald-400/20' : 'border-rose-400/80 bg-rose-400/20'}`}
                                    style={{
                                        width: `${zone.radius * 2}%`,
                                        height: `${zone.radius * 2}%`,
                                        minWidth: `${zone.radius * 20}px`,
                                        minHeight: `${zone.radius * 20}px`
                                    }}
                                />
                                
                                {isFound ? (
                                    <div className="relative z-10 bg-emerald-500 rounded-full text-white shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                ) : (
                                    <div className="relative z-10 w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                                )}
                            </div>
                        </div>
                    ));
                })}

                {/* Erros cometidos pelo usuário */}
                {showPins && failedAttempts.map((fail, idx) => (
                    <div
                        key={`fail-${idx}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in duration-300"
                        style={{ left: `${fail.x}%`, top: `${fail.y}%` }}
                    >
                        <XCircle className="w-6 h-6 text-rose-500 bg-rose-950/50 rounded-full shadow-lg" />
                    </div>
                ))}
            </div>

            {/* ─── Zoom Controls (Top-Right) ─── */}
            <div className="absolute top-3 right-3 z-40 flex flex-col gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
                <button
                    onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                    disabled={zoom >= MAX_ZOOM}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800/90 transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Zoom In"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                    disabled={zoom <= MIN_ZOOM}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800/90 transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Zoom Out"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
                {zoom !== 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-600 text-white hover:bg-slate-700/90 transition-all shadow-lg animate-in fade-in duration-200"
                        title="Resetar Zoom"
                    >
                        <Maximize className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Zoom Level Indicator */}
            {zoom !== 1 && (
                <div className="absolute top-3 left-3 z-40 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg shadow-lg pointer-events-none" onPointerDown={(e) => e.stopPropagation()}>
                    <span className="text-[10px] font-bold text-slate-300 tabular-nums tracking-wider">
                        {Math.round(zoom * 100)}%
                    </span>
                </div>
            )}
        </div>
    );
}
