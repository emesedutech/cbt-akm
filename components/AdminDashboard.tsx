import React, { useState, useCallback } from 'react';
// Fix: Import types from the types module.
import type { User, Question, Student, AdminView } from '../types';
import { EXAM_DATA, STUDENTS_DATA } from '../constants';
import AdminLayout from './admin/AdminLayout';
import DashboardHome from './admin/DashboardHome';
import ManageStudents from './admin/ManageStudents';
import ManageQuestions from './admin/ManageQuestions';

interface AdminDashboardProps {
  admin: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, onLogout }) => {
  const [view, setView] = useState<AdminView>('home');
  
  // State management for admin data
  const [questions, setQuestions] = useState<Question[]>(EXAM_DATA.questions);
  const [students, setStudents] = useState<Student[]>(STUDENTS_DATA);

  // --- CRUD for Students ---
  const addStudent = useCallback((student: Omit<Student, 'id'>) => {
    setStudents(prev => [...prev, { ...student, id: `S${Date.now()}` }]);
  }, []);

  const updateStudent = useCallback((updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  }, []);

  const deleteStudent = useCallback((studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  }, []);

  // --- CRUD for Questions ---
  const addQuestion = useCallback((question: Omit<Question, 'id'>) => {
    setQuestions(prev => [...prev, { ...question, id: `Q${Date.now()}` } as Question]);
  }, []);

  const updateQuestion = useCallback((updatedQuestion: Question) => {
    setQuestions(prev => prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  }, []);

  const deleteQuestion = useCallback((questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  }, []);


  const renderView = () => {
    switch (view) {
      case 'students':
        return (
            <ManageStudents 
                students={students}
                onAdd={addStudent}
                onUpdate={updateStudent}
                onDelete={deleteStudent}
            />
        );
      case 'questions':
        return (
            <ManageQuestions
                questions={questions}
                onAdd={addQuestion}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
            />
        );
      case 'home':
      default:
        return (
            <DashboardHome 
                studentCount={students.length}
                questionCount={questions.length}
                examCount={1} // Mock exam count
            />
        );
    }
  };

  return (
    // Fix: Pass `setView` via a lambda to match the prop type in AdminLayout.
    <AdminLayout admin={admin} onLogout={onLogout} setView={(v) => setView(v)} currentView={view}>
      {renderView()}
    </AdminLayout>
  );
};

export default AdminDashboard;
