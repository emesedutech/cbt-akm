import React from 'react';
// Fix: Import User and AdminView types from the types module.
import type { User, AdminView } from '../../types';

interface AdminLayoutProps {
  admin: User;
  onLogout: () => void;
  children: React.ReactNode;
  // Fix: Use a more specific type for the view state setter.
  setView: (view: AdminView) => void;
  currentView: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ admin, onLogout, children, setView, currentView }) => {
  const navItems: { id: AdminView; label: string; icon: string }[] = [
    { id: 'home', label: 'Dashboard', icon: 'fa-tachometer-alt' },
    { id: 'students', label: 'Kelola Siswa', icon: 'fa-users' },
    { id: 'questions', label: 'Kelola Soal', icon: 'fa-file-alt' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-4 border-b border-blue-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm">MIN SINGKAWANG</p>
        </div>
        <nav className="flex-grow p-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full text-left flex items-center p-3 my-1 rounded-md transition-colors ${
                currentView === item.id ? 'bg-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-center mr-3`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-700">
            <div className="mb-4">
                <p className="font-semibold">{admin.name}</p>
                <p className="text-xs">{admin.username}</p>
            </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center p-3 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
