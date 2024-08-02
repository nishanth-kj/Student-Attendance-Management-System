import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    User,
    Calendar,
    Clock,
    Mail,
    Phone,
    MapPin,
    Award,
    BarChart3,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../api/client';

const StudentDetails = () => {
    const { usn } = useParams();
    const [student, setStudent] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentRes, logsRes] = await Promise.all([
                    apiClient.get(`/attendance/students/${usn}/`),
                    apiClient.get(`/attendance/logs/?usn=${usn}`)
                ]);
                setStudent(studentRes.data);
                setLogs(logsRes.data);
            } catch (err) {
                console.error("Failed to fetch student details", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [usn]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Student Not Found</h2>
                <Link to="/students" className="text-primary-600 font-bold hover:underline flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Students
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/students" className="text-slate-500 hover:text-slate-900 flex items-center mb-10 font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Students
                </Link>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Sidebar Info */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 text-center"
                        >
                            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden mx-auto mb-6 shadow-lg shadow-primary-600/10">
                                <img src={student.student_image} alt={student.name} className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 mb-1">{student.name}</h1>
                            <p className="text-primary-600 font-bold font-mono text-sm tracking-wider uppercase mb-6">{student.usn}</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-3xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-xl font-black text-slate-900">Active</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-3xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Logs</p>
                                    <p className="text-xl font-black text-slate-900">{logs.length}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-xl shadow-slate-900/20"
                        >
                            <h3 className="text-xl font-bold mb-8 flex items-center">
                                <User className="w-5 h-5 mr-3 text-primary-400" />
                                Details
                            </h3>
                            <div className="space-y-6">
                                <ContactItem icon={<Mail className="w-5 h-5" />} label="USN" value={student.usn} />
                                <ContactItem icon={<BarChart3 className="w-5 h-5" />} label="Last Seen" value={logs[0] ? new Date(logs[0].timestamp).toLocaleString() : 'Never'} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-black text-slate-900 flex items-center">
                                    <BarChart3 className="w-6 h-6 mr-3 text-primary-600" />
                                    Attendance History
                                </h3>
                                <Award className="w-8 h-8 text-amber-500" />
                            </div>

                            <div className="space-y-4">
                                {logs.map((log, index) => (
                                    <div key={index} className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100/50">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mr-6 shadow-sm">
                                                <Calendar className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{new Date(log.timestamp).toLocaleDateString()}</p>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {new Date(log.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">
                                            Present
                                        </span>
                                    </div>
                                ))}
                                {logs.length === 0 && (
                                    <p className="text-center text-slate-500 font-medium py-10">No attendance logs found for this student.</p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactItem = ({ icon, label, value }) => (
    <div className="flex items-start">
        <div className="bg-white/10 p-3 rounded-xl mr-4 text-primary-400">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</p>
            <p className="font-bold text-white/90">{value}</p>
        </div>
    </div>
);

export default StudentDetails;
