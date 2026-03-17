// src/data/questions.js
// Combined Class 12 Questions: Physics, Mathematics, Physical Chemistry
// Total: 180 questions across 9 chapters

import { physicsQuestions } from './physicsQuestions';
import { mathQuestions } from './mathQuestions';
import { chemistryQuestions } from './chemistryQuestions';

export const questions = [
  ...physicsQuestions,
  ...mathQuestions,
  ...chemistryQuestions
];
