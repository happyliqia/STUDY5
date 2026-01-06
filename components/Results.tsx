
import React from 'react';
import { ExamResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultsProps {
  result: ExamResult;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const percentage = (result.score / result.totalQuestions) * 100;
  
  const chartData = [
    { name: 'Correct', value: result.score },
    { name: 'Incorrect', value: result.totalQuestions - result.score },
  ];

  const COLORS = ['#22c55e', '#f1f5f9'];

  const getStarRating = () => {
    if (percentage >= 90) return '⭐⭐⭐⭐⭐';
    if (percentage >= 75) return '⭐⭐⭐⭐';
    if (percentage >= 50) return '⭐⭐⭐';
    if (percentage >= 25) return '⭐⭐';
    return '⭐';
  };

  return (
    <div className="flex flex-col items-center animate-in zoom-in duration-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-yellow-200 max-w-lg w-full text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Awesome, {result.studentName}!</h2>
        <div className="text-3xl mb-6 star-animation">{getStarRating()}</div>

        <div className="flex flex-col md:flex-row items-center justify-around mb-8 gap-4">
          <div className="h-48 w-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-bold text-sky-600">{result.score}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Correct</span>
            </div>
          </div>

          <div className="text-left bg-sky-50 p-6 rounded-2xl flex-grow border-2 border-sky-100">
            <p className="text-sky-800 font-bold text-lg mb-1 italic">"Marie says:"</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {result.feedback}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-500">Score:</span>
                <span className="font-bold text-slate-800">{result.score} / {result.totalQuestions}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-500">Percentage:</span>
                <span className="font-bold text-slate-800">{Math.round(percentage)}%</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-500">Date:</span>
                <span className="font-bold text-slate-800">{result.date}</span>
            </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-xl"
        >
          Try Again! 🔄
        </button>
      </div>
    </div>
  );
};

export default Results;
