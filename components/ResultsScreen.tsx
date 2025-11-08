import React from 'react';
// Fix: Import types from the types module.
import type { User, Exam, UserAnswers } from '../types';

interface ResultsScreenProps {
  user: User;
  answers: UserAnswers;
  exam: Exam;
  timeTaken: number;
  onLogout: () => void;
}

// NOTE: In a real app, scoring logic would be on the backend.
// This is a simplified mock for demonstration.
const calculateScore = (exam: Exam, answers: UserAnswers) => {
  // Mock correct answers for demo purposes
  const correctAnswers: { [key: string]: any } = {
    'Q1': 'Q1A2',
    'Q2': ['Q2A1', 'Q2A3'],
    'Q3': { 'Q3P1': 'Q3M3', 'Q3P2': 'Q3M4', 'Q3P3': 'Q3M1', 'Q3P4': 'Q3M2' },
    'Q4': 'jakarta',
    'Q5': 'Q5A2',
    'Q6': 'cpu',
    'Q7': ['Q7A2', 'Q7A4'],
  };

  let correctCount = 0;
  exam.questions.forEach(q => {
    const userAnswer = answers[q.id];
    const correctAnswer = correctAnswers[q.id];

    if (!userAnswer) return;

    if (Array.isArray(correctAnswer)) { // Multiple Choice
      const sortedUserAnswer = [...(userAnswer as string[])].sort();
      const sortedCorrectAnswer = [...correctAnswer].sort();
      if (JSON.stringify(sortedUserAnswer) === JSON.stringify(sortedCorrectAnswer)) {
        correctCount++;
      }
    } else if (typeof correctAnswer === 'object' && correctAnswer !== null) { // Matching
       if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
        correctCount++;
      }
    } else if (typeof userAnswer === 'string') { // Single Choice or Short Answer
      if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
        correctCount++;
      }
    }
  });

  return (correctCount / exam.questions.length) * 100;
};


const ResultsScreen: React.FC<ResultsScreenProps> = ({ user, answers, exam, timeTaken, onLogout }) => {
  const score = calculateScore(exam, answers);
  const totalQuestions = exam.questions.length;
  const answeredQuestions = Object.keys(answers).filter(key => {
    const answer = answers[key];
    if (answer === null || answer === undefined) return false;
    if (typeof answer === 'string') return answer.trim() !== '';
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === 'object') return Object.keys(answer).length > 0;
    return false;
  }).length;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} menit ${remainingSeconds} detik`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-black">Hasil Ujian</h1>
        <p className="text-xl font-semibold text-black mt-2">MIN SINGKAWANG</p>
        <p className="text-lg text-black">{exam.title}</p>
        <div className="border-t border-b border-gray-200 py-6 my-6">
          <p className="text-xl">Nama Peserta: <span className="font-semibold">{user.name}</span></p>
          <p className="text-xl">Username: <span className="font-semibold">{user.username}</span></p>
        </div>

        <div className="flex justify-around items-center text-center">
          <div>
            <p className="text-black">Skor Akhir</p>
            <p className="text-6xl font-bold text-blue-600">{score.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-black">Soal Dijawab</p>
            <p className="text-4xl font-bold text-blue-600">{answeredQuestions}/{totalQuestions}</p>
          </div>
           <div>
            <p className="text-black">Waktu Mengerjakan</p>
            <p className="text-4xl font-bold text-blue-600">{formatTime(timeTaken)}</p>
          </div>
        </div>
        
        <div className="pt-6">
          <button
            onClick={onLogout}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
