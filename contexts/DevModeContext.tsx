import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface IDevModeContext {
    devMode: boolean;
    toggleDevMode: () => void;
    aiActive: boolean;
    toggleAiActive: () => void;
}

export const DevModeContext = createContext<IDevModeContext>({
    devMode: false,
    toggleDevMode: () => {},
    aiActive: true, // AI is active by default
    toggleAiActive: () => {},
});

export const DevModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [devMode, setDevMode] = useState(false);
    const [aiActive, setAiActive] = useState(true);

    useEffect(() => {
        const storedDevMode = sessionStorage.getItem('devMode');
        if (storedDevMode) {
            setDevMode(JSON.parse(storedDevMode));
        }

        const storedAiActive = sessionStorage.getItem('aiActive');
        if (storedAiActive !== null) { // Can be 'false'
            setAiActive(JSON.parse(storedAiActive));
        }
    }, []);

    const toggleDevMode = () => {
        setDevMode(prev => {
            const newState = !prev;
            sessionStorage.setItem('devMode', JSON.stringify(newState));
            window.location.reload(); 
            return newState;
        });
    };
    
    const toggleAiActive = () => {
        setAiActive(prev => {
            const newState = !prev;
            sessionStorage.setItem('aiActive', JSON.stringify(newState));
            return newState;
        });
    };

    return (
        <DevModeContext.Provider value={{ devMode, toggleDevMode, aiActive, toggleAiActive }}>
            {children}
        </DevModeContext.Provider>
    );
};
