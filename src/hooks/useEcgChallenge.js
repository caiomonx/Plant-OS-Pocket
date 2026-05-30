import { useState, useEffect, useCallback } from 'react';
import { DAILY_ECG_CASES } from '../data/challenges/dailyEcgCases';
import { DIAGNOSES } from '../data/challenges/diagnoses';
import { ECG_HISTORY_KEY, getEcgHistory } from '../utils/ecgStats';

const ARCADE_BAG_KEY = 'antigravity_ecg_arcade_bag';

// Data Gênesis (Dia 1) - 10 de Maio de 2026 (hoje, 12/05, será o Dia 3)
const START_DATE = new Date('2026-05-10T00:00:00').getTime();

export function useEcgChallenge() {
  const [caseData, setCaseData] = useState(null);
  const [attempts, setAttempts] = useState([]); // Array de IDs tentados errados
  const [foundDiagnoses, setFoundDiagnoses] = useState([]); // Array de IDs corretos encontrados
  const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMode, setActiveMode] = useState('daily');
  const [replayCaseId, setReplayCaseId] = useState(null);
  const [pendingRefinement, setPendingRefinement] = useState(null);

  const getCurrentDayNumber = () => {
    const today = new Date().getTime();
    const dif = today - START_DATE;
    let days = Math.floor(dif / (1000 * 3600 * 24)) + 1;
    if (days < 1) days = 1;
    return days;
  };

  const saveToHistory = (payload) => {
    try {
       const history = getEcgHistory();
       const existingIndex = history.findIndex(h => h.caseId === payload.caseId && h.dayNumber === payload.dayNumber);
       if (existingIndex >= 0) {
           history[existingIndex] = payload;
       } else {
           history.push(payload);
       }
       localStorage.setItem(ECG_HISTORY_KEY, JSON.stringify(history));
    } catch(err) {
       console.error("Erro salvando histórico do ECG", err);
    }
  };

  const getNextArcadeIndex = (currentDayIndex) => {
      // Arcade should only include PAST cases (indices 0 to currentDayIndex - 1)
      // Never include the current day's case
      const maxPastIndex = currentDayIndex - 1;
      if (maxPastIndex < 0) return 0; // Fallback: if day 1, no past cases, show day 1

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
          // Fisher-Yates Shuffle
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
    const maxGlobalIndex = DAILY_ECG_CASES.length - 1;
    const safeDayIndex = Math.min(dayNumber - 1, maxGlobalIndex);

    if (mode === 'daily') {
      const c = { ...DAILY_ECG_CASES[safeDayIndex] };
      c.correctDiagnoses = c.correctDiagnosisIds.map(id => DIAGNOSES.find(d => d.id === id));
      setCaseData(c);
      
      const history = getEcgHistory();
      const run = history.find(h => h.caseId === c.id && h.dayNumber === dayNumber);
      if (run) {
          setAttempts(run.attempts || []);
          setFoundDiagnoses(run.foundDiagnoses || []);
          setStatus(run.status || 'playing');
      } else {
          setAttempts([]);
          setFoundDiagnoses([]);
          setStatus('playing');
          setPendingRefinement(null);
      }
    } else if (mode === 'arcade') {
      const rnd = getNextArcadeIndex(safeDayIndex);
      const c = { ...DAILY_ECG_CASES[rnd] };
      c.correctDiagnoses = c.correctDiagnosisIds.map(id => DIAGNOSES.find(d => d.id === id));
      setCaseData(c);
      setAttempts([]);
      setFoundDiagnoses([]);
      setStatus('playing');
      setPendingRefinement(null);
    } else if (mode === 'history_replay' && historyCaseId) {
      let c = DAILY_ECG_CASES.find(cs => cs.id === historyCaseId) || DAILY_ECG_CASES[0];
      c = { ...c };
      c.correctDiagnoses = c.correctDiagnosisIds.map(id => DIAGNOSES.find(d => d.id === id));
      setCaseData(c);
      setAttempts([]);
      setFoundDiagnoses([]);
      setStatus('playing');
      setPendingRefinement(null);
    }
    
    setIsLoaded(true);
  }, []);

  // Load daily on mount
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
        attempts,
        foundDiagnoses,
        status
      });
  }, [attempts, foundDiagnoses, status, activeMode, isLoaded, caseData]);

  const submitGuess = (diagnosisId) => {
    if (status !== 'playing' || !caseData) return false;
    if (attempts.includes(diagnosisId) || foundDiagnoses.includes(diagnosisId)) return false; 

    if (caseData.correctDiagnosisIds.includes(diagnosisId)) {
      if (diagnosisId === 'scacsst' || diagnosisId === 'scasst') {
        setPendingRefinement({ diagnosisId });
        return true; 
      }

      const newFound = [...foundDiagnoses, diagnosisId];
      setFoundDiagnoses(newFound);
      if (newFound.length === caseData.correctDiagnosisIds.length) {
        setStatus('won');
      }
      return true; // Acerto
    } else {
      const newAttempts = [...attempts, diagnosisId];
      setAttempts(newAttempts);
      
      // Se errou 3 vezes, perde
      if (newAttempts.length >= 3) {
        setStatus('lost');
      }
      return false; // Erro
    }
  };

  const submitRefinement = (subId) => {
    if (!pendingRefinement || !caseData) return;

    const correctSub = caseData.subDiagnosis || 'padrao_comum';

    // Aceitar isquemia_comum ou padrao_comum como fallback (ou match exato)
    const isCorrect = (subId === caseData.subDiagnosis) || (!caseData.subDiagnosis && (subId === 'padrao_comum' || subId === 'isquemia_comum'));

    if (isCorrect) {
      const newFound = [...foundDiagnoses, pendingRefinement.diagnosisId];
      setFoundDiagnoses(newFound);
      setPendingRefinement(null);
      if (newFound.length === caseData.correctDiagnosisIds.length) {
        setStatus('won');
      }
    } else {
      setPendingRefinement(null);
      const newAttempts = [...attempts, pendingRefinement.diagnosisId];
      setAttempts(newAttempts);
      setStatus('lost');
    }
  };

  const getAttemptedDiagnoses = () => {
    return attempts.map(id => DIAGNOSES.find(d => d.id === id)).filter(Boolean);
  };

  const getFullHistoryPreview = () => {
    const dayNumber = getCurrentDayNumber();
    const maxIndex = Math.min(dayNumber - 1, DAILY_ECG_CASES.length - 1);
    const history = getEcgHistory();
    
    const preview = [];
    for(let i=0; i <= maxIndex; i++) {
       const dNum = i + 1;
       const cData = DAILY_ECG_CASES[i];
       const record = history.find(h => h.caseId === cData.id && h.dayNumber === dNum);
       preview.push({
           dayNumber: dNum,
           caseId: cData.id,
           status: record ? record.status : 'unplayed',
       });
    }
    return preview.reverse();
  };

  return {
    isLoaded,
    caseData,
    attempts: attempts.length, // return number of attempts for compatibility with the view
    attemptedDiagnoses: getAttemptedDiagnoses(),
    foundDiagnoses,
    status,
    pendingRefinement,
    activeMode,
    currentCaseIndex: caseData ? DAILY_ECG_CASES.findIndex(c => c.id === caseData.id) + 1 : 1,
    currentDayNumber: getCurrentDayNumber(),
    submitGuess,
    submitRefinement,
    // Exposed methods for mode switching
    loadDaily: () => loadCase('daily', null),
    loadArcade: () => loadCase('arcade', null),
    loadHistoryReplay: (caseId) => loadCase('history_replay', caseId),
    resetArcade: () => loadCase('arcade', null),
    historyPreview: getFullHistoryPreview(),
    stats: {} // Will be loaded by modal instead
  };
}
