import React, { useState, useEffect } from 'react';
// Fix: Import Student type from the types module.
import type { Student } from '../../types';

interface StudentFormProps {
    initialData: Student | null;
    onSubmit: (studentData: Student | Omit<Student, 'id'>) => void;
    onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [student, setStudent] = useState({
        name: '',
        username: '',
        password: '',
    });

    useEffect(() => {
        if (initialData) {
            setStudent({
                name: initialData.name,
                username: initialData.username,
                password: initialData.password || '',
            });
        } else {
            setStudent({ name: '', username: '', password: '' });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSubmit({ ...initialData, ...student });
        } else {
            onSubmit(student);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">Nama Lengkap</label>
                <input type="text" id="name" name="name" value={student.name} onChange={handleChange} required className="w-full p-2 border rounded-md mt-1" />
            </div>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-black">Username</label>
                <input type="text" id="username" name="username" value={student.username} onChange={handleChange} required className="w-full p-2 border rounded-md mt-1" />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                <input type="password" id="password" name="password" value={student.password} onChange={handleChange} required={!initialData} className="w-full p-2 border rounded-md mt-1" placeholder={initialData ? "Kosongkan jika tidak ingin mengubah" : ""} />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Simpan</button>
            </div>
        </form>
    );
};

export default StudentForm;
