
export type QuestionType = 'choice' | 'matching' | 'counting';

export interface Question {
  id: string;
  type: QuestionType;
  character: 'Marie' | 'Trevor' | 'Maskman' | 'Monty' | 'Suzy';
  questionText: string;
  options?: string[];
  correctAnswer: string;
  imageUrl?: string;
}

export interface ExamResult {
  id: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  date: string;
  feedback?: string;
}

export interface CharacterInfo {
  name: string;
  color: string;
  icon: string;
  role: string;
}
