
import React from 'react';
import { Question, CharacterInfo } from './types';

export const CHARACTERS: Record<string, CharacterInfo> = {
  Marie: { name: 'Marie', color: 'bg-pink-400', icon: '🎨', role: 'The Art Teacher' },
  Trevor: { name: 'Trevor', color: 'bg-green-400', icon: '🦖', role: 'The Nature Expert' },
  Maskman: { name: 'Maskman', color: 'bg-blue-500', icon: '🦸‍♂️', role: 'The Hero' },
  Monty: { name: 'Monty', color: 'bg-yellow-400', icon: '🐭', role: 'The Music Mouse' },
  Suzy: { name: 'Suzy', color: 'bg-purple-400', icon: '🎒', role: 'Student' },
};

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: '1',
    type: 'choice',
    character: 'Monty',
    questionText: "Hello! What's your name?",
    options: ["I'm a mouse.", "I'm Monty.", "I'm fine, thank you."],
    correctAnswer: "I'm Monty.",
  },
  {
    id: '2',
    type: 'choice',
    character: 'Marie',
    questionText: "What color is this apple? 🍎",
    options: ["It's blue.", "It's yellow.", "It's red."],
    correctAnswer: "It's red.",
  },
  {
    id: '3',
    type: 'counting',
    character: 'Trevor',
    questionText: "How many pencils? ✏️✏️✏️",
    options: ["Two", "Three", "Four"],
    correctAnswer: "Three",
  },
  {
    id: '4',
    type: 'choice',
    character: 'Maskman',
    questionText: "Who is this? 👩",
    options: ["My father", "My sister", "My mother"],
    correctAnswer: "My mother",
  },
  {
    id: '5',
    type: 'choice',
    character: 'Suzy',
    questionText: "What's in my bag? 🖊️",
    options: ["A ball", "A pen", "A car"],
    correctAnswer: "A pen",
  },
  {
    id: '6',
    type: 'choice',
    character: 'Trevor',
    questionText: "Is it a dog? 🐶",
    options: ["Yes, it is.", "No, it isn't.", "It's a cat."],
    correctAnswer: "Yes, it is.",
  },
  {
    id: '7',
    type: 'choice',
    character: 'Marie',
    questionText: "Which one is a TOY? 🧸",
    options: ["Pencil", "Chair", "Doll"],
    correctAnswer: "Doll",
  },
  {
    id: '8',
    type: 'choice',
    character: 'Maskman',
    questionText: "How old are you? (I am 6)",
    options: ["I'm fine.", "I'm six.", "I'm seven."],
    correctAnswer: "I'm six.",
  }
];
