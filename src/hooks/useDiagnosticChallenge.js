import { useState, useEffect } from 'react';
import { CHALLENGE_CASES } from '../data/challenges/cases';
import { DIAGNOSES } from '../data/challenges/diagnoses';
import { computeStats } from '../utils/challengeStats';

// Chave para salvar diário
const HISTORY_STORAGE_KEY = 'antigravity_diagnostic_history';
const ARCADE_BAG_KEY = 'antigravity_arcade_bag';

// Data Gênesis (Dia 1) retroativa para o usuário ter 8 casos liberados hoje
const START_DATE = new Date('2026-04-10T00:00:00').getTime();

export function useDiagnosticChallenge(mode = 'daily', historyReplayCaseId = null) {
  const [caseData, setCaseData] = useState(null);
  const [attempts, setAttempts] = useState([]); // Array de IDs tentados
  const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
  
  // Controle de initial load para hidratação
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState(() => computeStats());

  // Calcula quantos dias se passaram a partir do dia 1
  const getCurrentDayNumber = () => {
    const today = new Date().getTime();
    const dif = today - START_DATE;
    let days = Math.floor(dif / (1000 * 3600 * 24)) + 1;
    if (days < 1) days = 1;
    return days;
  };

  const getHistory = () => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      return [];
    }
    return [];
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
       localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch(err) {
       console.error("Erro salvando histórico", err);
    }
  };

  const getNextArcadeIndex = (maxPassadoIndex) => {
      let bag = [];
      try {
          const stored = localStorage.getItem(ARCADE_BAG_KEY);
          if (stored) {
              const parsed = JSON.parse(stored);
              // Bag tem que ter algo, e todos elementos precisam ser válidos (<= maxPassadoIndex)
              if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(val => val <= maxPassadoIndex)) {
                  bag = parsed;
              }
          }
      } catch {}

      if (bag.length === 0) {
          for(let i = 0; i <= maxPassadoIndex; i++) {
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

  const initGame = () => {
    setIsLoaded(false);
    const dayNumber = getCurrentDayNumber();
    const maxGlobalIndex = CHALLENGE_CASES.length - 1;
    const safeDayIndex = Math.min(dayNumber - 1, maxGlobalIndex);

    if (mode === 'daily') {
      const loadCase = CHALLENGE_CASES[safeDayIndex];
      setCaseData(loadCase);
      
      const history = getHistory();
      const run = history.find(h => h.caseId === loadCase.id && h.dayNumber === dayNumber);
      if (run) {
          setAttempts(run.attempts || []);
          setStatus(run.status || 'playing');
      } else {
          setAttempts([]);
          setStatus('playing');
      }
    } else if (mode === 'arcade') {
      // Arcade Mode: usa shuffle bag nos casos que já passaram
      const rnd = getNextArcadeIndex(safeDayIndex);
      setCaseData(CHALLENGE_CASES[rnd]);
      setAttempts([]);
      setStatus('playing');
    } else if (mode === 'history_replay' && historyReplayCaseId) {
      // Carrega um ID específico passivamente sem gravar log
      const loadCase = CHALLENGE_CASES.find(c => c.id === historyReplayCaseId) || CHALLENGE_CASES[0];
      setCaseData(loadCase);
      setAttempts([]);
      setStatus('playing');
    }
    
    setIsLoaded(true);
  };

  useEffect(() => {
    initGame();
  }, [mode, historyReplayCaseId]);

  // Sincroniza estado diario no local storage  
  useEffect(() => {
      if (!isLoaded || mode !== 'daily' || !caseData) return;
      saveToHistory({
        dayNumber: getCurrentDayNumber(),
        date: new Date().toDateString(),
        caseId: caseData.id,
        attempts,
        status
      });
      setStats(computeStats());
  }, [attempts, status, mode, isLoaded, caseData]);

  const submitGuess = (diagnosisId) => {
    if (status !== 'playing' || !caseData) return false;
    
    if (attempts.includes(diagnosisId)) return false; 

    if (diagnosisId === caseData.correctDiagnosisId) {
      setStatus('won');
      return true; // Retorna true pro componente de UI saber que terminou bem
    } else {
      const newAttempts = [...attempts, diagnosisId];
      setAttempts(newAttempts);
      
      if (newAttempts.length >= 5) {
        setStatus('lost');
      }
      return false; // Errou
    }
  };

  const getRevealedCluesCount = () => {
    if (!caseData) return 1;
    if (status !== 'playing') {
       // Ver TODAS as dicas do caso no final
       return caseData.clues.length;
    }
    return Math.min((attempts.length + 1), caseData.clues.length);
  };

  const getAttemptedDiagnoses = () => {
    return attempts.map(id => DIAGNOSES.find(d => d.id === id)).filter(Boolean);
  };

  const getFullHistoryPreview = () => {
    const dayNumber = getCurrentDayNumber();
    const maxIndex = Math.min(dayNumber - 1, CHALLENGE_CASES.length - 1);
    const history = getHistory();
    
    const preview = [];
    for(let i=0; i <= maxIndex; i++) {
       const dNum = i + 1;
       const cData = CHALLENGE_CASES[i];
       const record = history.find(h => h.caseId === cData.id && h.dayNumber === dNum);
       preview.push({
           dayNumber: dNum,
           caseId: cData.id,
           status: record ? record.status : 'unplayed',
       });
    }
    return preview.reverse(); // Do dia atual para trás
  };

  return {
    isLoaded,
    caseData,
    attempts,
    attemptedDiagnoses: getAttemptedDiagnoses(),
    revealedCluesCount: getRevealedCluesCount(),
    status,
    submitGuess,
    resetArcade: initGame,
    historyPreview: getFullHistoryPreview(),
    currentDayNumber: getCurrentDayNumber(),
    currentCaseIndex: caseData ? CHALLENGE_CASES.findIndex(c => c.id === caseData.id) + 1 : 1,
    stats
  };
}
