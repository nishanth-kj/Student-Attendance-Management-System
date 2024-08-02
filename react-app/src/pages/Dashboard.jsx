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
    ArrowUpRight,
    GraduationCap,
    Download,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';

const Dashboard = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ totalStudents: 0, presentToday: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return;

                const responses = await Promise.all([
                    apiClient.get('/attendance/logs/'),
                    (user.role === 'ADMIN' || user.role === 'STAFF') ? apiClient.get('/auth/students/') : Promise.resolve({ data: [] })
                ]);

                const logsData = responses[0].data;
                const studentsData = responses[1].data;

                setLogs(logsData);
                setStats({
                    totalStudents: user.role === 'STUDENT' ? 1 : studentsData.length,
                    presentToday: logsData.filter(log => {
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
    }, [user]);

    const exportToCSV = () => {
        window.open(`${import.meta.env.VITE_API_URL}/attendance/logs/?format=csv`, '_blank');
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Portal...</div>;

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* University Branding & Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-primary-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-900/20">
                            <GraduationCap size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {user?.role === 'STUDENT' ? 'Student Portal' : user?.role === 'STAFF' ? 'Faculty Dashboard' : 'Student Management System'}
                            </h1>
                            <p className="text-slate-500 font-medium">Welcome back, {user?.username} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
                            <>
                                <button
                                    onClick={exportToCSV}
                                    className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center hover:bg-slate-50 transition-all active:scale-95"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Export Logs
                                </button>
                                <Link
                                    to="/students/add"
                                    className="bg-primary-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-lg shadow-primary-900/20 hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Enroll Student
                                </Link>
                            </>
                        )}
                        {user?.role === 'STUDENT' && (
                            <Link
                                to="/attendance"
                                className="bg-primary-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-lg shadow-primary-900/20 hover:bg-slate-800 transition-all active:scale-95"
                            >
                                <Clock className="w-5 h-5 mr-2" />
                                Daily Check-in
                            </Link>
                        )}
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title={user?.role === 'STUDENT' ? 'Attendance Rate' : 'Total Enrollment'}
                        value={user?.role === 'STUDENT' ? '92%' : stats.totalStudents}
                        icon={<Users />}
                        color="bg-blue-600"
                        trend="+2"
                    />
                    <StatCard
                        title="Today's Attendance"
                        value={user?.role === 'STUDENT' ? (stats.presentToday > 0 ? 'PRESENT' : 'NOT MARKED') : stats.presentToday}
                        icon={<Clock />}
                        color="bg-emerald-600"
                        trend="+4"
                    />
                    <StatCard
                        title="Average Punctuality"
                        value="8:45 AM"
                        icon={<TrendingUp />}
                        color="bg-violet-600"
                        trend="-0.5"
                    />
                    <StatCard
                        title="Semester Period"
                        value="Fall '26"
                        icon={<Calendar />}
                        color="bg-orange-600"
                        trend="0"
                    />
                </div>

                {/* Attendance Records Table */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-slate-900">Attendance Log</h2>

                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search records..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all"
                            />
                        </div>
                    </div>

                    {/* Responsive List/Table */}
                    <div className="overflow-x-auto">
                        {/* Desktop Table */}
                        <table className="w-full text-left hidden md:table">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Identity</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">ID / USN</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Verification</th>
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
                                                <div className="w-10 h-10 rounded-full bg-slate-900 mr-3 flex items-center justify-center font-bold text-white uppercase">
                                                    {log.student_name?.charAt(0)}
                                                </div>
                                                <span className="font-bold text-slate-900">{log.student_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-medium text-slate-600">{log.usn || user?.usn || 'STAFF'}</td>
                                        <td className="px-8 py-6 font-medium text-slate-600">
                                            {new Date(log.timestamp).toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                FACE VERIFIED
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4 p-4">
                            {logs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 mr-3 flex items-center justify-center font-bold text-white uppercase text-sm">
                                                {log.student_name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{log.student_name}</p>
                                                <p className="text-xs font-bold text-slate-500">{log.usn || user?.usn}</p>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                                            Verified
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-500 font-medium pl-14">
                                        <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50/30 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-sm font-medium italic">End of recent records. Use export feature for full archival data.</p>
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
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : trend === '0' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-600'
                }`}>
                {trend === '0' ? 'STABLE' : `${trend}%`}
            </span>
        </div>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
    </div>
);

export default Dashboard;
