import React from 'react';
// Fix: Import types from the types module.
import type { Question, UserAnswers, Answer } from '../types';

interface QuestionNavigatorProps {
  questions: Question[];
  answers: UserAnswers;
  currentQuestionIndex: number;
  onNavigate: (index: number) => void;
}

export const isAnsweredEffectively = (answer: Answer): boolean => {
    if (answer === null || answer === undefined) return false;
    if (typeof answer === 'string') return answer.trim() !== '';
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === 'object') return Object.keys(answer).length > 0;
    return false;
};

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({ questions, answers, currentQuestionIndex, onNavigate }) => {
  return (
    <div className="flex flex-col h-full">
        <h2 className="text-center font-bold text-lg mb-4 border-b pb-2 text-black">Navigasi Soal</h2>
        <div className="grid grid-cols-5 gap-2 overflow-y-auto">
        {questions.map((question, index) => {
            const isAnswered = isAnsweredEffectively(answers[question.id]);
            const isCurrent = index === currentQuestionIndex;

            let buttonClass = 'border-2 border-blue-200 bg-white text-black hover:bg-blue-50';
            if (isAnswered) {
            buttonClass = 'border-2 border-blue-500 bg-blue-100 text-blue-700 hover:bg-blue-200';
            }
            if (isCurrent) {
            buttonClass = 'border-2 border-blue-700 bg-blue-500 text-white ring-2 ring-offset-1 ring-blue-500';
            }

            return (
            <button
                key={question.id}
                onClick={() => onNavigate(index)}
                className={`flex items-center justify-center w-12 h-12 rounded-md font-bold text-lg transition-all duration-150 ${buttonClass}`}
            >
                {index + 1}
            </button>
            );
        })}
        </div>
    </div>
  );
};

export default QuestionNavigator;
