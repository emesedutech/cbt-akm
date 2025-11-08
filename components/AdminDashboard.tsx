import React, { useState } from 'react';
import type { User, Question, Student, Exam } from '../types';
import AdminLayout from './admin/AdminLayout';
import DashboardHome from './admin/DashboardHome';
import ManageQuestions from './admin/ManageQuestions';
import ManageStudents from './admin/ManageStudents';
import ManageExams from './admin/ManageExams';
import { EXAM_DATA } from '../constants';
import { QuestionType } from '../types';

// NOTE: In a real app, this data would come from a backend API.
// We are mocking it here for demonstration purposes.

// Add correct answers to the initial question data
const correctAnswers: { [key: string]: any } = {
    'Q1': 'Q1A2',
    'Q2': ['Q2A1', 'Q2A3'],
    'Q3': { 'Q3P1': 'Q3M3', 'Q3P2': 'Q3M4', 'Q3P3': 'Q3M1', 'Q3P4': 'Q3M2' },
    'Q4': 'jakarta',
    'Q5': 'Q5A2',
    'Q6': 'cpu',
    'Q7': ['Q7A2', 'Q7A4'],
};

const initialQuestions = EXAM_DATA.questions.map(q => ({
    ...q,
    correctAnswer: correctAnswers[q.id],
}));

const initialStudents: Student[] = [
    { id: 'STD001', name: 'Ahmad Dahlan', username: 'ahmad_d', password: 'password123' },
    { id: 'STD002', name: 'Siti Walidah', username: 'siti_w', password: 'password123' },
    { id: 'STD003', name: 'Budi Santoso', username: 'budi_s', password: 'password123' },
];

const initialExams: Exam[] = [
    EXAM_DATA
];


interface AdminDashboardProps {
  admin: User;
  onLogout: () => void;
}

type AdminView = 'home' | 'questions' | 'students' | 'exams';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, onLogout }) => {
    const [view, setView] = useState<AdminView>('home');
    const [questions, setQuestions] = useState<(Question & { correctAnswer?: any; })[]>(initialQuestions);
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [exams, setExams] = useState<Exam[]>(initialExams);

    // Question Management
    // Fix: Correctly handle adding a new question by using a switch on the discriminated union `type` property.
    // This ensures TypeScript correctly infers the specific question type and avoids errors when updating the state.
    const handleAddQuestion = (questionData: Omit<Question, 'id'> & { correctAnswer?: any }) => {
        const newQuestion: Question & { correctAnswer?: any } = (() => {
            const id = `Q${Date.now()}`;
            // The `Omit<Question, 'id'>` type is not a discriminated union, which breaks the switch statement's
            // type narrowing. Casting to `Question` allows the switch to work correctly for type inference.
            // This is safe because we immediately create a new object with a valid `id`.
            const data = questionData as Question;
            switch (data.type) {
                case QuestionType.SINGLE_CHOICE:
                    return { ...data, id };
                case QuestionType.MULTIPLE_CHOICE:
                    return { ...data, id };
                case QuestionType.MATCHING:
                    return { ...data, id };
                case QuestionType.SHORT_ANSWER:
                    return { ...data, id };
                default:
                    const _exhaustiveCheck: never = data;
                    throw new Error(`Invalid question type: ${(_exhaustiveCheck as any).type}`);
            }
        })();
        setQuestions(prev => [...prev, newQuestion]);
    };
    const handleUpdateQuestion = (updatedQuestion: Question & { correctAnswer?: any }) => {
        setQuestions(prev => prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    };
    const handleDeleteQuestion = (questionId: string) => {
        setQuestions(prev => prev.filter(q => q.id !== questionId));
    };

    // Student Management
    const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
        const newStudent = { ...studentData, id: `STD${Date.now()}` };
        setStudents(prev => [...prev, newStudent]);
    };
    const handleUpdateStudent = (updatedStudent: Student) => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    };
    const handleDeleteStudent = (studentId: string) => {
        setStudents(prev => prev.filter(s => s.id !== studentId));
    };

    // Exam Management
    const handleAddExam = (examData: Omit<Exam, 'id'>) => {
        const newExam = { ...examData, id: `EXAM${Date.now()}` };
        setExams(prev => [...prev, newExam]);
    };
    const handleUpdateExam = (updatedExam: Exam) => {
        setExams(prev => prev.map(e => e.id === updatedExam.id ? updatedExam : e));
    };
    const handleDeleteExam = (examId: string) => {
        setExams(prev => prev.filter(e => e.id !== examId));
    };

    const renderView = () => {
        switch (view) {
            case 'questions':
                return <ManageQuestions questions={questions} onAdd={handleAddQuestion} onUpdate={handleUpdateQuestion} onDelete={handleDeleteQuestion} />;
            case 'students':
                return <ManageStudents students={students} onAdd={handleAddStudent} onUpdate={handleUpdateStudent} onDelete={handleDeleteStudent} />;
            case 'exams':
                return <ManageExams exams={exams} questions={questions} onAdd={handleAddExam} onUpdate={handleUpdateExam} onDelete={handleDeleteExam} />;
            case 'home':
            default:
                return <DashboardHome />;
        }
    };
    
    const NavLink: React.FC<{ targetView: AdminView; icon: string; label: string }> = ({ targetView, icon, label }) => {
        const isActive = view === targetView;
        const classes = `flex items-center px-4 py-3 transition-colors duration-200 transform ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`;
        return (
            <button onClick={() => setView(targetView)} className={classes}>
                <i className={`fas ${icon} w-5 h-5`}></i>
                <span className="mx-4 font-medium">{label}</span>
            </button>
        );
    };

    const sidebar = (
        <>
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="mt-4">
                <NavLink targetView="home" icon="fa-home" label="Dashboard" />
                <NavLink targetView="questions" icon="fa-database" label="Bank Soal" />
                <NavLink targetView="students" icon="fa-users" label="Data Siswa" />
                <NavLink targetView="exams" icon="fa-calendar-alt" label="Kelola Ujian" />
            </nav>
        </>
    );

    const header = (
        <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-2xl font-semibold text-black">
                {view.charAt(0).toUpperCase() + view.slice(1)}
            </h2>
            <div className="flex items-center">
                <span className="mr-4 text-black">Welcome, {admin.name}</span>
                <button onClick={onLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Logout <i className="fas fa-sign-out-alt ml-2"></i>
                </button>
            </div>
        </div>
    );

    return (
        <AdminLayout sidebar={sidebar} header={header}>
            {renderView()}
        </AdminLayout>
    );
};

export default AdminDashboard;
