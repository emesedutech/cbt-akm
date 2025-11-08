export interface User {
  id?: string;
  name: string;
  username: string;
  password?: string;
}

export interface Student extends User {
  id: string;
}

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MATCHING = 'MATCHING',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

interface BaseQuestion {
    id: string;
    questionText: string;
    stimulus?: string;
}

interface Option {
    id: string;
    text: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
    type: QuestionType.SINGLE_CHOICE;
    options: Option[];
    correctAnswer: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: QuestionType.MULTIPLE_CHOICE;
    options: Option[];
    correctAnswer: string[];
}

interface Prompt {
    id: string;
    text: string;
}
interface Match {
    id: string;
    text: string;
}
export interface MatchingQuestion extends BaseQuestion {
    type: QuestionType.MATCHING;
    prompts: Prompt[];
    matches: Match[];
    correctAnswer: Record<string, string>;
}

export interface ShortAnswerQuestion extends BaseQuestion {
    type: QuestionType.SHORT_ANSWER;
    correctAnswer: string;
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | MatchingQuestion | ShortAnswerQuestion;

export interface Exam {
  id: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
}

export type Answer = string | string[] | Record<string, string> | null;

export interface UserAnswers {
  [questionId: string]: Answer;
}

export type AdminView = 'home' | 'students' | 'questions';
