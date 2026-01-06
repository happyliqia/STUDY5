
import React, { useState } from 'react';
import { Question } from '../types';
import { CHARACTERS } from '../constants';
import { getEncouragement } from '../services/geminiService';

interface QuizProps {
  studentName: string;
  questions: Question[];
  onFinish: (score: number, feedback: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ studentName, questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinishing, setIsFinishing] = useState(false);

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleSelect = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    
    // Auto-advance after a brief moment
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        handleFinish();
      }
    }, 400);
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const feedback = await getEncouragement(studentName, score, questions.length);
    onFinish(score, feedback);
  };

  const currentChar = CHARACTERS[currentQuestion.character];

  if (isFinishing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center text-4xl animate-spin mb-6">
          ✨
        </div>
        <h2 className="text-3xl font-bold text-sky-800">Marie is checking your answers...</h2>
        <p className="text-slate-500 mt-2">Almost done!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-sky-600 font-bold mb-2 uppercase tracking-wide">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-4 bg-sky-200 rounded-full overflow-hidden border-2 border-sky-300">
          <div 
            className="h-full bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Character Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-sky-100 flex flex-col md:flex-row">
        <div className={`${currentChar.color} md:w-1/3 flex flex-col items-center justify-center p-8 text-white`}>
          <div className="text-7xl mb-4 bg-white/20 p-6 rounded-full">{currentChar.icon}</div>
          <h3 className="text-2xl font-bold">{currentChar.name}</h3>
          <p className="text-sm opacity-90">{currentChar.role}</p>
        </div>
        
        <div className="md:w-2/3 p-8 flex flex-col">
          <div className="flex-grow">
            <h4 className="text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
              "{currentQuestion.questionText}"
            </h4>
            
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full py-4 px-6 text-left rounded-2xl border-2 font-medium text-lg transition-all transform active:scale-[0.98]
                    ${answers[currentQuestion.id] === option 
                      ? 'bg-sky-500 text-white border-sky-600 shadow-md' 
                      : 'bg-white text-slate-700 border-slate-100 hover:border-sky-300 hover:bg-sky-50'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
          disabled={currentIdx === 0}
          className="px-6 py-2 bg-white border border-slate-200 text-slate-500 rounded-full hover:bg-slate-50 disabled:opacity-30"
        >
          Previous
        </button>
        <span className="text-slate-400 font-medium self-center">
          {studentName}'s Test
        </span>
      </div>
    </div>
  );
};

export default Quiz;
