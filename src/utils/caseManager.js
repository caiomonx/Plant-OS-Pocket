/**
 * Smart Playlist Logic (Generic Service)
 * 1. Load played IDs from LocalStorage via specific module key
 * 2. Filter Registry for unplayed cases
 * 3. If empty, RESET (clear history) and restart loop
 * 4. Pick random from unplayed
 * 5. Save new ID to history
 */
export const getNextCase = (registry, storageKey) => {
    if (!registry || !Array.isArray(registry) || registry.length === 0) {
        console.error("CaseManager CRITICAL: Invalid or empty registry provided.");
        return null;
    }

    // 1. Load History
    let playedIds = [];
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            playedIds = JSON.parse(stored);
        }
    } catch (e) {
        console.warn(`CaseManager: Failed to load history for key ${storageKey}`, e);
    }

    // 2. Filter
    const validRegistry = registry.filter(c => c && c.id);
    if (validRegistry.length !== registry.length) {
        console.error("CaseManager CRITICAL: Registry contains undefined items or items without an ID!", registry);
    }

    const unplayed = validRegistry.filter(c => !playedIds.includes(c.id));

    let nextCase = null;

    // 3. Reset Loop if needed
    if (unplayed.length === 0) {
        // Reset History
        playedIds = [];
        // Pick any random from the full valid registry to start new loop
        const fallbackIdx = Math.floor(Math.random() * validRegistry.length);
        nextCase = validRegistry[fallbackIdx];
    } else {
        // 4. Pick Random from Unplayed (Fisher-Yates style selection)
        const idx = Math.floor(Math.random() * unplayed.length);
        nextCase = unplayed[idx];
    }

    // 5. Save History
    if (nextCase) {
        playedIds.push(nextCase.id);
        localStorage.setItem(storageKey, JSON.stringify(playedIds));
    }

    return nextCase;
};

export const resetCaseHistory = (storageKey) => {
    localStorage.removeItem(storageKey);
};
