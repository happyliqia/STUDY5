
import React, { useState, useEffect } from 'react';
import { INITIAL_QUESTIONS } from './constants';
import { ExamResult } from './types';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Results from './components/Results';
import History from './components/History';

const App: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'quiz' | 'results' | 'history'>('welcome');
  const [studentName, setStudentName] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('kidsbox_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveResult = (result: ExamResult) => {
    const newHistory = [result, ...history];
    setHistory(newHistory);
    localStorage.setItem('kidsbox_history', JSON.stringify(newHistory));
    setLastResult(result);
  };

  const startQuiz = (name: string) => {
    setStudentName(name);
    setView('quiz');
  };

  const finishQuiz = (score: number, feedback: string) => {
    const result: ExamResult = {
      id: Date.now().toString(),
      studentName,
      score,
      totalQuestions: INITIAL_QUESTIONS.length,
      date: new Date().toLocaleString(),
      feedback
    };
    saveResult(result);
    setView('results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Header onViewHistory={() => setView('history')} onGoHome={() => setView('welcome')} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {view === 'welcome' && (
          <Welcome onStart={startQuiz} />
        )}

        {view === 'quiz' && (
          <Quiz 
            studentName={studentName} 
            questions={INITIAL_QUESTIONS} 
            onFinish={finishQuiz} 
          />
        )}

        {view === 'results' && lastResult && (
          <Results 
            result={lastResult} 
            onRestart={() => setView('welcome')} 
          />
        )}

        {view === 'history' && (
          <History 
            history={history} 
            onBack={() => setView('welcome')} 
            onClear={() => {
              localStorage.removeItem('kidsbox_history');
              setHistory([]);
            }}
          />
        )}
      </main>

      <footer className="py-4 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Kids Box English Explorer - Grade 1 Level</p>
      </footer>
    </div>
  );
};

export default App;
