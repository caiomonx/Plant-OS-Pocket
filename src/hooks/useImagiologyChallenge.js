import { useState, useEffect, useCallback } from 'react';
import { imagiologyCases } from '../data/challenge/imagiologyCases';

const ARCADE_BAG_KEY = 'antigravity_imagiology_arcade_bag';
const IMAGIOLOGY_HISTORY_KEY = 'imagiology_challenge_history';

// Data Gênesis (Dia 1) - 14 de Maio de 2026
const START_DATE = new Date('2026-05-14T00:00:00').getTime();

export function useImagiologyChallenge() {
  const [caseData, setCaseData] = useState(null);
  const [lives, setLives] = useState(3);
  const [foundIndices, setFoundIndices] = useState([]);
  const [failedAttempts, setFailedAttempts] = useState([]); // para desenhar o X vermelho onde errou
  const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMode, setActiveMode] = useState('daily'); // 'daily', 'arcade', 'history_replay'
  const [replayCaseId, setReplayCaseId] = useState(null);
  
  const getCurrentDayNumber = () => {
    const today = new Date().getTime();
    const dif = today - START_DATE;
    let days = Math.floor(dif / (1000 * 3600 * 24)) + 1;
    if (days < 1) days = 1;
    return days;
  };

  const getHistory = () => {
      try {
          const stored = localStorage.getItem(IMAGIOLOGY_HISTORY_KEY);
          return stored ? JSON.parse(stored) : [];
      } catch (err) {
          return [];
      }
  };

  const saveToHistory = (payload) => {
    try {
       const history = getHistory();
       const existingIndex = history.findIndex(h => h.caseId === payload.caseId && h.dayNumber === payload.dayNumber);
       if (existingIndex >= 0) {
           history[existingIndex] = payload;
       } else {
           history.push(payload);
       }
       localStorage.setItem(IMAGIOLOGY_HISTORY_KEY, JSON.stringify(history));
    } catch(err) {
       console.error("Erro salvando histórico de Imaginologia", err);
    }
  };

  const getNextArcadeIndex = (currentDayIndex) => {
      // Arcade should only include PAST cases
      const maxPastIndex = currentDayIndex - 1;
      if (maxPastIndex < 0) return 0; // Fallback

      let bag = [];
      try {
          const stored = localStorage.getItem(ARCADE_BAG_KEY);
          if (stored) {
              const parsed = JSON.parse(stored);
              if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(val => val <= maxPastIndex)) {
                  bag = parsed;
              }
          }
      } catch {}

      if (bag.length === 0) {
          for(let i = 0; i <= maxPastIndex; i++) {
              bag.push(i);
          }
          for (let i = bag.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [bag[i], bag[j]] = [bag[j], bag[i]];
          }
      }

      const nextItem = bag.pop();
      localStorage.setItem(ARCADE_BAG_KEY, JSON.stringify(bag));
      return nextItem;
  };

  const loadCase = useCallback((mode, historyCaseId) => {
    setIsLoaded(false);
    setActiveMode(mode);
    setReplayCaseId(historyCaseId || null);
    
    const dayNumber = getCurrentDayNumber();
    const maxGlobalIndex = imagiologyCases.length - 1;
    const safeDayIndex = Math.min(dayNumber - 1, maxGlobalIndex);

    if (mode === 'daily') {
      const c = { ...imagiologyCases[safeDayIndex] };
      setCaseData(c);
      
      const history = getHistory();
      const run = history.find(h => h.caseId === c.id && h.dayNumber === dayNumber);
      if (run) {
          setLives(run.lives !== undefined ? run.lives : 3);
          setFoundIndices(run.foundIndices || []);
          setFailedAttempts(run.failedAttempts || []);
          setStatus(run.status || 'playing');
      } else {
          setLives(3);
          setFoundIndices([]);
          setFailedAttempts([]);
          setStatus('playing');
      }
    } else if (mode === 'arcade') {
      const rnd = getNextArcadeIndex(safeDayIndex);
      const c = { ...imagiologyCases[rnd] };
      setCaseData(c);
      setLives(3);
      setFoundIndices([]);
      setFailedAttempts([]);
      setStatus('playing');
    } else if (mode === 'history_replay' && historyCaseId) {
      let c = imagiologyCases.find(cs => cs.id === historyCaseId) || imagiologyCases[0];
      c = { ...c };
      setCaseData(c);
      setLives(3);
      setFoundIndices([]);
      setFailedAttempts([]);
      setStatus('playing');
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadCase('daily', null);
  }, [loadCase]);

  // Save to history only in daily mode
  useEffect(() => {
      if (!isLoaded || activeMode !== 'daily' || !caseData) return;
      saveToHistory({
        dayNumber: getCurrentDayNumber(),
        date: new Date().toDateString(),
        caseId: caseData.id,
        lives,
        foundIndices,
        failedAttempts,
        status
      });
  }, [lives, foundIndices, failedAttempts, status, activeMode, isLoaded, caseData]);

  // Ray-casting point-in-polygon algorithm (coordinates in %)
  const pointInPolygon = (px, py, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      const intersect = ((yi > py) !== (yj > py)) &&
        (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const submitGuess = (selectedType, clickX, clickY, aspectRatio) => {
    if (status !== 'playing' || !caseData) return { success: false, message: 'Jogo já finalizado.' };

    let isHit = false;
    let hitIndex = -1;
    let typeMatched = false;

    // Check hit — supports polygon, multi-zone (zones array), and single-zone (flat x/y/radius)
    caseData.findings.forEach((finding, idx) => {
        if (foundIndices.includes(idx)) return; 

        // ── Polygon hit detection (single or multi) ──
        const polys = finding.polygons 
            ? finding.polygons 
            : finding.polygon 
                ? [finding.polygon] 
                : null;

        if (polys) {
            for (const poly of polys) {
                if (pointInPolygon(clickX, clickY, poly)) {
                    isHit = true;
                    hitIndex = idx;
                    if (finding.type === selectedType) {
                        typeMatched = true;
                    }
                    break;
                }
            }
            return; // Skip circle logic for polygon findings
        }

        // ── Circle/zone hit detection ──
        const zones = finding.zones 
            ? finding.zones 
            : [{ x: finding.x, y: finding.y, radius: finding.radius }];

        for (const zone of zones) {
            const rX = zone.radius;
            const rY = zone.radius * aspectRatio;

            const dist = Math.sqrt(
                Math.pow((clickX - zone.x) / rX, 2) + 
                Math.pow((clickY - zone.y) / rY, 2)
            );

            if (dist <= 1.5) {
                isHit = true;
                hitIndex = idx;
                if (finding.type === selectedType) {
                    typeMatched = true;
                }
                break;
            }
        }
    });

    if (isHit && typeMatched) {
        // Correct Hit!
        const newFound = [...foundIndices, hitIndex];
        setFoundIndices(newFound);
        if (newFound.length === caseData.findings.length) {
            setStatus('won');
        }
        return { success: true, message: 'Achado encontrado!' };
    } else {
        // Errou (missed the hitbox entirely OR hit the hitbox but wrong type)
        const reason = isHit && !typeMatched 
            ? 'Local correto, mas diagnóstico incorreto.'
            : 'Nenhum achado relevante neste local.';
        
        const newFailed = [...failedAttempts, { x: clickX, y: clickY, reason }];
        setFailedAttempts(newFailed);
        
        const newLives = lives - 1;
        setLives(newLives);

        if (newLives <= 0) {
            setStatus('lost');
        }
        return { success: false, message: reason };
    }
  };

  const getFullHistoryPreview = () => {
    const dayNumber = getCurrentDayNumber();
    const maxIndex = Math.min(dayNumber - 1, imagiologyCases.length - 1);
    const history = getHistory();
    
    const preview = [];
    for(let i=0; i <= maxIndex; i++) {
       const dNum = i + 1;
       const cData = imagiologyCases[i];
       const record = history.find(h => h.caseId === cData.id && h.dayNumber === dNum);
       preview.push({
           dayNumber: dNum,
           caseId: cData.id,
           status: record ? record.status : 'unplayed',
       });
    }
    return preview.reverse();
  };

  // Compute stats from history (cached single parse)
  const stats = (() => {
      const history = getHistory().filter(h => h.status === 'won' || h.status === 'lost');
      const totalPlayed = history.length;
      const totalWins = history.filter(h => h.status === 'won').length;
      const totalLosses = history.filter(h => h.status === 'lost').length;
      return {
          totalPlayed,
          winRate: Math.round((totalWins / Math.max(totalPlayed, 1)) * 100),
          currentStreak: 0,
          longestStreak: 0,
          totalWins,
          totalLosses,
          guessDistribution: [0, 0, 0]
      };
  })();

  return {
      isLoaded,
      caseData,
      lives,
      foundIndices,
      failedAttempts,
      status,
      activeMode,
      stats,
      historyPreview: getFullHistoryPreview(),
      currentCaseIndex: caseData ? imagiologyCases.findIndex(c => c.id === caseData.id) + 1 : 1,
      submitGuess,
      loadDaily: () => loadCase('daily', null),
      loadArcade: () => loadCase('arcade', null),
      loadHistoryReplay: (caseId) => loadCase('history_replay', caseId),
      resetArcade: () => loadCase('arcade', null),
  };
};
