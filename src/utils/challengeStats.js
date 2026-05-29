/**
 * Pure utility functions for computing Diagnostic Challenge statistics.
 * Reads from the persistent history array in localStorage.
 * 
 * All functions are stateless and side-effect-free (except getHistory which reads storage).
 */

const HISTORY_STORAGE_KEY = 'antigravity_diagnostic_history';
const MAX_CLUES = 5;

/**
 * Reads the full history array from localStorage.
 * @returns {Array<{dayNumber: number, caseId: string, status: string, attempts: string[]}>}
 */
export function getHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    return [];
  }
  return [];
}

/**
 * Returns only the records where the user actually played (won or lost).
 */
function getPlayedRecords() {
  return getHistory().filter(
    (record) => record.dayNumber <= 3 && (record.status === 'won' || record.status === 'lost')
  );
}

/**
 * Computes comprehensive gamification statistics.
 * @returns {{
 *   totalPlayed: number,
 *   totalWins: number,
 *   totalLosses: number,
 *   winRate: number,
 *   currentStreak: number,
 *   longestStreak: number,
 *   guessDistribution: number[]
 * }}
 */
export function computeStats() {
  const history = getHistory();
  const played = getPlayedRecords();

  const totalPlayed = played.length;
  const totalWins = played.filter((r) => r.status === 'won').length;
  const totalLosses = totalPlayed - totalWins;
  const winRate = totalPlayed > 0 ? Math.round((totalWins / totalPlayed) * 100) : 0;

  // Streak calculation: walk day numbers in ascending order.
  // A streak breaks when a day is lost, unplayed, or missing.
  const sortedByDay = [...history].sort((a, b) => a.dayNumber - b.dayNumber);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  if (sortedByDay.length > 0) {
    const maxDay = sortedByDay[sortedByDay.length - 1].dayNumber;
    const dayMap = new Map(sortedByDay.map((r) => [r.dayNumber, r.status]));

    for (let day = 1; day <= maxDay; day++) {
      const dayStatus = dayMap.get(day);
      if (dayStatus === 'won') {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
    currentStreak = tempStreak;
  }

  // Guess distribution: array of 5 slots (index 0 = acertou na 1ª dica, etc.)
  // Each slot counts how many times the user won with that many attempts used.
  const guessDistribution = new Array(MAX_CLUES).fill(0);
  played
    .filter((r) => r.status === 'won')
    .forEach((record) => {
      // attempts array stores WRONG guesses. The winning guess is not in it.
      // So total guesses used = attempts.length + 1 (the correct one).
      const guessNumber = (record.attempts?.length || 0) + 1;
      const clampedIndex = Math.min(guessNumber, MAX_CLUES) - 1;
      guessDistribution[clampedIndex]++;
    });

  return {
    totalPlayed,
    totalWins,
    totalLosses,
    winRate,
    currentStreak,
    longestStreak,
    guessDistribution,
  };
}
