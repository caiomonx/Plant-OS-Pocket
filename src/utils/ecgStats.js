export const ECG_HISTORY_KEY = 'antigravity_ecg_history';

export function getEcgHistory() {
  try {
    const stored = localStorage.getItem(ECG_HISTORY_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    return [];
  }
  return [];
}

function getPlayedRecords() {
  return getEcgHistory().filter(
    (record) => record.status === 'won' || record.status === 'lost'
  );
}

export function computeEcgStats() {
  const history = getEcgHistory();
  const played = getPlayedRecords();

  const totalPlayed = played.length;
  const totalWins = played.filter((r) => r.status === 'won').length;
  const totalLosses = totalPlayed - totalWins;
  const winRate = totalPlayed > 0 ? Math.round((totalWins / totalPlayed) * 100) : 0;

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

  // Distribution for max 2 attempts (index 0 = 1st attempt, index 1 = 2nd attempt)
  const guessDistribution = [0, 0];
  played
    .filter((r) => r.status === 'won')
    .forEach((record) => {
      const guessNumber = (record.attempts?.length || 0) + 1;
      const clampedIndex = Math.min(guessNumber, 2) - 1;
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
