import React, { createContext, useContext, useState, useEffect } from 'react';

const GameConfigContext = createContext(null);

export function GameConfigProvider({ children }) {
    const [persona, setPersona] = useState(() => localStorage.getItem('plantao_os_persona') || 'interno');
    const [hasAcceptedPenaltyWarning, setHasAcceptedPenaltyWarning] = useState(false);

    // Sync persona state if it changes in localStorage from other tabs or directly
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'plantao_os_persona') {
                setPersona(e.newValue || 'interno');
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // A method to manually trigger sync right after LandingPage updates it
    const syncPersona = () => {
        setPersona(localStorage.getItem('plantao_os_persona') || 'interno');
    };

    const value = {
        persona,
        isResidentMode: persona === 'residente',
        hasAcceptedPenaltyWarning,
        setHasAcceptedPenaltyWarning,
        syncPersona
    };

    return (
        <GameConfigContext.Provider value={value}>
            {children}
        </GameConfigContext.Provider>
    );
}

export function useGameConfig() {
    const context = useContext(GameConfigContext);
    if (!context) {
        throw new Error('useGameConfig must be used within a GameConfigProvider');
    }
    return context;
}
