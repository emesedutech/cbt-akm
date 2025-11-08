// Fix: Use more specific type `Student` for `STUDENTS_DATA` and import all necessary types.
import type { Exam, Student } from './types';
import { QuestionType } from './types';

export const STUDENTS_DATA: Student[] = [
  { id: 'S001', name: 'Ahmad Dahlan', username: 'ahmad', password: 'password123' },
  { id: 'S002', name: 'Budi Santoso', username: 'budi', password: 'password123' },
  { id: 'S003', name: 'Citra Lestari', username: 'citra', password: 'password123' },
  { id: 'S004', name: 'Dewi Anggraini', username: 'dewi', password: 'password123' },
];

export const EXAM_DATA: Exam = {
  id: 'EXAM01',
  title: 'Ujian Akhir Semester - Teknologi Informasi dan Komunikasi',
  durationMinutes: 60,
  questions: [
    {
      id: 'Q1',
      type: QuestionType.SINGLE_CHOICE,
      questionText: 'Apa kepanjangan dari CPU?',
      options: [
        { id: 'Q1A1', text: 'Computer Personal Unit' },
        { id: 'Q1A2', text: 'Central Processing Unit' },
        { id: 'Q1A3', text: 'Central Process Unit' },
        { id: 'Q1A4', text: 'Central Personal Unit' },
      ],
      correctAnswer: 'Q1A2',
    },
    {
      id: 'Q2',
      type: QuestionType.MULTIPLE_CHOICE,
      questionText: 'Pilih perangkat keras (hardware) di bawah ini.',
      options: [
        { id: 'Q2A1', text: 'Mouse' },
        { id: 'Q2A2', text: 'Microsoft Word' },
        { id: 'Q2A3', text: 'Keyboard' },
        { id: 'Q2A4', text: 'Operating System' },
      ],
      correctAnswer: ['Q2A1', 'Q2A3'],
    },
    {
      id: 'Q3',
      type: QuestionType.MATCHING,
      questionText: 'Jodohkan perangkat dengan fungsinya.',
      prompts: [
        { id: 'Q3P1', text: 'Printer' },
        { id: 'Q3P2', text: 'Scanner' },
        { id: 'Q3P3', text: 'Monitor' },
        { id: 'Q3P4', text: 'Speaker' },
      ],
      matches: [
        { id: 'Q3M1', text: 'Menampilkan output visual' },
        { id: 'Q3M2', text: 'Mengeluarkan output suara' },
        { id: 'Q3M3', text: 'Mencetak dokumen ke kertas' },
        { id: 'Q3M4', text: 'Memindai dokumen fisik menjadi digital' },
      ],
      correctAnswer: { 'Q3P1': 'Q3M3', 'Q3P2': 'Q3M4', 'Q3P3': 'Q3M1', 'Q3P4': 'Q3M2' },
    },
    {
      id: 'Q4',
      type: QuestionType.SHORT_ANSWER,
      questionText: 'Ibukota negara Indonesia adalah...',
      correctAnswer: 'jakarta',
    },
    {
      id: 'Q5',
      type: QuestionType.SINGLE_CHOICE,
      questionText: 'Siapakah penemu bola lampu?',
      options: [
        { id: 'Q5A1', text: 'Albert Einstein' },
        { id: 'Q5A2', text: 'Thomas Edison' },
        { id: 'Q5A3', text: 'Isaac Newton' },
        { id: 'Q5A4', text: 'Nikola Tesla' },
      ],
      correctAnswer: 'Q5A2',
    },
    {
      id: 'Q6',
      type: QuestionType.SHORT_ANSWER,
      questionText: 'Otak dari komputer disebut...',
      stimulus: 'Isilah dengan singkatan yang umum digunakan.',
      correctAnswer: 'cpu',
    },
    {
      id: 'Q7',
      type: QuestionType.MULTIPLE_CHOICE,
      questionText: 'Manakah di bawah ini yang merupakan sistem operasi?',
      options: [
        { id: 'Q7A1', text: 'Adobe Photoshop' },
        { id: 'Q7A2', text: 'Windows' },
        { id: 'Q7A3', text: 'Google Chrome' },
        { id: 'Q7A4', text: 'Linux' },
      ],
      correctAnswer: ['Q7A2', 'Q7A4'],
    },
  ],
};
