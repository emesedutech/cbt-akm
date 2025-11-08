import React from 'react';

interface PortalScreenProps {
  onNavigate: (target: 'student' | 'admin') => void;
}

const PortalScreen: React.FC<PortalScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl text-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kementerian_Agama_new_logo.png/535px-Kementerian_Agama_new_logo.png" 
          alt="Logo Kemenag" 
          className="w-24 h-24 mx-auto mb-4" 
        />
        <h1 className="text-3xl font-bold text-black">CBT MIN SINGKAWANG</h1>
        <p className="mt-2 text-black">Silakan pilih portal masuk Anda.</p>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => onNavigate('student')}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <i className="fas fa-user-graduate mr-3"></i>
            Portal Siswa
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="w-full flex items-center justify-center py-3 px-4 border border-blue-600 text-blue-600 font-medium rounded-md bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <i className="fas fa-user-shield mr-3"></i>
            Portal Guru / Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalScreen;