import React, { useState, useCallback } from 'react';
import PortalScreen from './components/PortalScreen';
import LoginScreen from './components/LoginScreen';
import ExamScreen from './components/ExamScreen';
import ResultsScreen from './components/ResultsScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminDashboard from './components/AdminDashboard';
import { EXAM_DATA } from './constants';
// Fix: Import User and UserAnswers types from the types module.
import type { User, UserAnswers } from './types';

type AppView = 'portal' | 'login' | 'exam' | 'results' | 'adminLogin' | 'adminDashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('portal');
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);
  const [finalAnswers, setFinalAnswers] = useState<UserAnswers | null>(null);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const handleNavigate = useCallback((target: 'student' | 'admin') => {
    if (target === 'student') {
      setCurrentView('login');
    } else {
      setCurrentView('adminLogin');
    }
  }, []);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('exam');
  }, []);

  const handleAdminLogin = useCallback((loggedInAdmin: User) => {
    setAdmin(loggedInAdmin);
    setCurrentView('adminDashboard');
  }, []);

  const handleFinishExam = useCallback((answers: UserAnswers, time: number) => {
    setFinalAnswers(answers);
    setTimeTaken(EXAM_DATA.durationMinutes * 60 - time);
    setCurrentView('results');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setFinalAnswers(null);
    setTimeTaken(0);
    setCurrentView('portal');
  }, []);

  const handleAdminLogout = useCallback(() => {
    setAdmin(null);
    setCurrentView('portal');
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'portal':
        return <PortalScreen onNavigate={handleNavigate} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'adminLogin':
        return <AdminLoginScreen onLogin={handleAdminLogin} />;
      case 'adminDashboard':
        return admin ? <AdminDashboard admin={admin} onLogout={handleAdminLogout} /> : <PortalScreen onNavigate={handleNavigate} />;
      case 'exam':
        return user ? <ExamScreen user={user} exam={EXAM_DATA} onFinish={handleFinishExam} /> : <LoginScreen onLogin={handleLogin} />;
      case 'results':
        return user && finalAnswers ? <ResultsScreen user={user} answers={finalAnswers} exam={EXAM_DATA} timeTaken={timeTaken} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />;
      default:
        return <PortalScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {renderView()}
    </div>
  );
};

export default App;
