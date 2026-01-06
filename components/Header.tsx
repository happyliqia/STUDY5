
import React from 'react';

interface HeaderProps {
  onViewHistory: () => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onViewHistory, onGoHome }) => {
  return (
    <header className="bg-white border-b border-sky-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onGoHome}
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
            📦
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Kids Box Explorer
          </h1>
        </div>
        
        <button 
          onClick={onViewHistory}
          className="px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-full font-medium transition-colors flex items-center gap-2"
        >
          <span>📜</span> My Stars
        </button>
      </div>
    </header>
  );
};

export default Header;
