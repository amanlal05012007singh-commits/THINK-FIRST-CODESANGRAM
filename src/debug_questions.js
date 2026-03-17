import { questions } from './data/questions.js';
console.log("Total Questions Loaded:", questions ? questions.length : 0);
if (questions && questions.length > 0) {
  console.log("First question topicId:", questions[0].topicId);
}
// Print loaded counts from files
import { physicsQuestions } from './data/physicsQuestions.js';
console.log("Physics Questions:", physicsQuestions ? physicsQuestions.length : 0);
