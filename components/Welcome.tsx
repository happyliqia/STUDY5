
import React, { useState } from 'react';
import { CHARACTERS } from '../constants';

interface WelcomeProps {
  onStart: (name: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-700">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-sky-800 mb-2">Hello, Star!</h2>
        <p className="text-slate-500">Ready for your English adventure?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {Object.values(CHARACTERS).map((char) => (
          <div key={char.name} className="flex flex-col items-center">
            <div className={`w-20 h-20 ${char.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg transform hover:scale-110 transition-transform mb-2`}>
              {char.icon}
            </div>
            <span className="text-sm font-semibold text-slate-600">{char.name}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl border-4 border-sky-100">
        <label className="block text-slate-700 font-medium mb-3 text-center">
          What's your name?
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name here..."
          className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none text-lg text-center mb-6"
          autoFocus
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all text-xl"
        >
          Let's Go! 🚀
        </button>
      </form>
    </div>
  );
};

export default Welcome;
