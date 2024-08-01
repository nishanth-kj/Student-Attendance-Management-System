import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Users,
    Clock,
    Search,
    UserPlus,
    TrendingUp,
    Calendar,
    MoreVertical,
    ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../api/client';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ totalStudents: 0, presentToday: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logsRes, studentsRes] = await Promise.all([
                    apiClient.get('/attendance/logs/'),
                    apiClient.get('/attendance/students/')
                ]);
                setLogs(logsRes.data);
                setStats({
                    totalStudents: studentsRes.data.length,
                    presentToday: logsRes.data.filter(log => {
                        const today = new Date().toISOString().split('T')[0];
                        return log.timestamp?.split('T')[0] === today;
                    }).length
                });
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Dashboard</h1>
                        <p className="text-slate-500 font-medium mt-1">Real-time attendance tracking and analytics</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/students/add"
                            className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-lg shadow-primary-600/20 hover:bg-primary-500 transition-all active:scale-95"
                        >
                            <UserPlus className="w-5 h-5 mr-2" />
                            Add New Student
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard title="Total Students" value={stats.totalStudents} icon={<Users />} color="bg-blue-600" trend="+0" />
                    <StatCard title="Present Today" value={stats.presentToday} icon={<Clock />} color="bg-emerald-600" trend="+0" />
                    <StatCard title="System Accuracy" value="99.8%" icon={<TrendingUp />} color="bg-violet-600" trend="+0.1" />
                    <StatCard title="Total Logs" value={logs.length} icon={<Calendar />} color="bg-orange-600" trend="+0" />
                </div>

                {/* Search and Main Content */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>

                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search USN or Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">USN</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Login Time</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {logs.map((log) => (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 mr-3 flex items-center justify-center font-bold text-slate-500">
                                                    {log.student_name?.charAt(0)}
                                                </div>
                                                <span className="font-bold text-slate-900">{log.student_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-medium text-slate-600">{log.usn}</td>
                                        <td className="px-8 py-6 font-medium text-slate-600">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                Present
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 bg-slate-50/30 border-t border-slate-100 text-center">
                        <button className="text-primary-600 font-bold hover:text-primary-700 transition-colors flex items-center mx-auto">
                            View Full History
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`${color} p-3 rounded-2xl text-white shadow-lg shadow-current/20`}>
                {icon}
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                }`}>
                {trend}%
            </span>
        </div>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
    </div>
);

export default Dashboard;
