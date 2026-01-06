
import React from 'react';
import { ExamResult } from '../types';

interface HistoryProps {
  history: ExamResult[];
  onBack: () => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onBack, onClear }) => {
  return (
    <div className="animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-sky-800">My Study Journey</h2>
        <div className="flex gap-3">
          <button 
            onClick={onClear}
            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium"
          >
            Clear History
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-bold shadow-md hover:bg-sky-600"
          >
            Back
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm text-center border-2 border-dashed border-sky-200">
          <div className="text-6xl mb-4">🎒</div>
          <p className="text-slate-400 text-lg">No adventures yet! Go start your first test.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => {
            const percentage = (item.score / item.totalQuestions) * 100;
            return (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                  percentage >= 80 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {item.score}/{item.totalQuestions}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-800 text-lg">{item.studentName}'s Test</h3>
                  <p className="text-slate-400 text-sm">{item.date}</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-bold text-slate-700">{Math.round(percentage)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
