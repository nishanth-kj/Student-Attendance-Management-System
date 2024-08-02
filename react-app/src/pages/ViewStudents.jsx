import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Users,
    Search,
    UserPlus,
    Trash2,
    Eye,
    Filter,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../api/client';

const ViewStudents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await apiClient.get('/attendance/students/');
                setStudents(response.data);
            } catch (err) {
                console.error("Failed to fetch students", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.usn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Active Students</h1>
                        <p className="text-slate-500 font-medium mt-1">Manage and view all registered students</p>
                    </div>

                    <Link
                        to="/students/add"
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center shadow-lg hover:bg-slate-800 transition-all active:scale-95"
                    >
                        <UserPlus className="w-5 h-5 mr-3" />
                        Register Student
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="relative flex-grow">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by Name or USN..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 pl-16 pr-6 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all shadow-sm"
                        />
                    </div>
                    <button className="bg-white border border-slate-200 p-5 rounded-[1.5rem] text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center font-bold">
                        <Filter className="w-6 h-6 mr-2" />
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredStudents.map((student) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 group hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="relative mb-6">
                                <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100">
                                    <img src={student.student_image} alt={student.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-black text-slate-900 mb-1">{student.name}</h3>
                                <p className="text-slate-500 font-bold font-mono text-sm tracking-wider uppercase">{student.usn}</p>
                            </div>

                            <Link
                                to={`/students/${student.usn}`}
                                className="w-full bg-slate-50 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"
                            >
                                View Profile
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewStudents;
