import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Users,
    Clock,
    Search,
    UserPlus,
    TrendingUp,
    Calendar,
    GraduationCap,
    Download,
    CheckCircle,
    LayoutDashboard,
    ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import api from '@/lib/api';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const Dashboard = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return;

                const [logsData, analyticsData] = await Promise.all([
                    api.get('/attendance/logs/'),
                    (user.role === 'ADMIN' || user.role === 'STAFF') ? api.get('/attendance/analytics/') : Promise.resolve(null)
                ]);

                setLogs(logsData);
                if (analyticsData) {
                    setAnalytics(analyticsData);
                }
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

    const filteredLogs = logs.filter(log =>
        log.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.usn?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mb-4"
            />
            <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Synchronizing Data...</p>
        </div>
    );

    return (
        <div className="bg-mesh min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="premium-card mb-10 flex flex-col md:flex-row md:items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl overflow-hidden relative group">
                            <motion.div
                                className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={false}
                            />
                            <GraduationCap size={40} className="relative z-10" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                    {user?.role === 'STUDENT' ? 'Student Portal' : 'Academic Dashboard'}
                                </h1>
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-black uppercase tracking-tighter">
                                    {user?.role}
                                </span>
                            </div>
                            <p className="text-slate-500 font-bold text-lg">
                                Welcome, {user?.username} <span className="mx-2 text-slate-300">|</span>
                                <span className="text-primary-600">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
                            <>
                                <button
                                    onClick={exportToCSV}
                                    className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold flex items-center hover:bg-slate-50 transition-all active:scale-95 text-base shadow-sm"
                                >
                                    <Download className="w-5 h-5 mr-3" />
                                    Export Records
                                </button>
                                <Link
                                    to="/students/add"
                                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center shadow-2xl hover:bg-slate-800 transition-all active:scale-95 text-base"
                                >
                                    <UserPlus className="w-5 h-5 mr-3" />
                                    New Enrollment
                                </Link>
                            </>
                        )}
                        {user?.role === 'STUDENT' && (
                            <Link
                                to="/attendance"
                                className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center shadow-xl shadow-primary-600/20 hover:bg-primary-500 transition-all active:scale-95 text-base"
                            >
                                <Clock className="w-5 h-5 mr-3" />
                                Instant Check-in
                            </Link>
                        )}
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Stats & Charts Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <StatCard
                                title="Enrolled Students"
                                value={analytics?.summary?.total_students || 0}
                                icon={<Users className="w-6 h-6" />}
                                color="bg-blue-600"
                                subtext="Active Profiles"
                            />
                            <StatCard
                                title="Today's Attendance"
                                value={analytics?.summary?.today_present || 0}
                                icon={<CheckCircle className="w-6 h-6" />}
                                color="bg-emerald-600"
                                subtext={`${analytics?.summary?.attendance_rate?.toFixed(1) || 0}% Engagement`}
                            />
                            <StatCard
                                title="System Uptime"
                                value="99.9%"
                                icon={<TrendingUp className="w-6 h-6" />}
                                color="bg-violet-600"
                                subtext="Biometric Node Active"
                            />
                        </div>

                        {/* Attendance Trend Chart */}
                        <div className="premium-card">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-primary-600" />
                                    Attendance Trends
                                </h3>
                                <div className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">LAST 30 DAYS</div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={analytics?.trends || []}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#0f172a',
                                                border: 'none',
                                                borderRadius: '16px',
                                                color: '#fff',
                                                fontWeight: 800
                                            }}
                                            itemStyle={{ color: '#38bdf8' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#0ea5e9"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorCount)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Side Column: Recent Activity */}
                    <div className="lg:col-span-1">
                        <div className="premium-card h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-slate-900">Recent Logs</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Find..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-slate-100 border-none rounded-xl py-2 pl-9 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary-600 transition-all w-32 focus:w-48"
                                    />
                                </div>
                            </div>

                            <div className="flex-grow space-y-4 overflow-y-auto pr-2 max-h-[600px] custom-scrollbar">
                                {filteredLogs.map((log, index) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary-200 hover:bg-white transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-lg group-hover:bg-primary-600 transition-colors">
                                                {log.student_name?.charAt(0)}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-black text-slate-900">{log.student_name}</p>
                                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md uppercase">Verified</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-400 mb-1">{log.usn || 'FACULTY'}</p>
                                                <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                                    <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                                                    <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">End of Stream</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, subtext }) => (
    <div className="premium-card p-6 !rounded-[2rem]">
        <div className="flex items-center gap-4 mb-4">
            <div className={`${color} p-3 rounded-xl text-white shadow-lg`}>
                {icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        </div>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{value}</h3>
        <p className="text-xs font-bold text-slate-500">{subtext}</p>
    </div>
);

const BarChart3 = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
);

export default Dashboard;
