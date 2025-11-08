import React from 'react';

interface DashboardHomeProps {
    studentCount: number;
    questionCount: number;
    examCount: number;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ studentCount, questionCount, examCount }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">Total Siswa</h2>
            <i className="fas fa-users text-2xl text-blue-500"></i>
          </div>
          <p className="text-4xl font-bold text-blue-600 mt-2">{studentCount}</p>
          <p className="text-gray-500 mt-auto">Siswa terdaftar</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
           <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">Total Soal</h2>
            <i className="fas fa-file-alt text-2xl text-blue-500"></i>
          </div>
          <p className="text-4xl font-bold text-blue-600 mt-2">{questionCount}</p>
          <p className="text-gray-500 mt-auto">Dalam bank soal</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
           <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">Total Ujian</h2>
            <i className="fas fa-list-check text-2xl text-blue-500"></i>
          </div>
          <p className="text-4xl font-bold text-blue-600 mt-2">{examCount}</p>
          <p className="text-gray-500 mt-auto">Ujian telah dibuat</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
