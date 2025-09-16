import React, { useContext } from 'react';
import { DevModeContext } from '../contexts/DevModeContext';

const DevTools: React.FC = () => {
    const { devMode, toggleDevMode, aiActive, toggleAiActive } = useContext(DevModeContext);

    return (
        <div className="fixed bottom-24 right-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl z-50 border border-gray-600 space-y-3">
            <div className="flex items-center justify-between space-x-3">
                <label htmlFor="devModeToggle" className="font-bold text-sm select-none flex items-center">
                    <span className="text-lg mr-2">⚡</span>
                    Auto-Fill & Skip
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="devModeToggle"
                        checked={devMode}
                        onChange={toggleDevMode}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-purple-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
            </div>
            <div className="flex items-center justify-between space-x-3">
                <label htmlFor="aiActiveToggle" className="font-bold text-sm select-none flex items-center">
                    <span className="text-lg mr-2">🧠</span>
                    AI Calls
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="aiActiveToggle"
                        checked={aiActive}
                        onChange={toggleAiActive}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
            </div>
        </div>
    );
};

export default DevTools;
