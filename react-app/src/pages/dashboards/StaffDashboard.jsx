import { useNavigate } from 'react-router-dom';
import { Camera, Users, FileText, Calendar, Clock, BookOpen, UserCheck, MessageSquare } from 'lucide-react';
import StatsGrid from '@/components/dashboard/StatsGrid';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const StaffDashboard = ({ user, analytics, logs, handleExport, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const filteredLogs = logs.filter(log =>
        log.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.usn?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <DashboardHeader user={user} onExport={handleExport} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Staff Functional Area */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-white to-blue-50/30">
                        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                                Ready to take <br />
                                <span className="text-blue-600">Attendance?</span>
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Use the face recognition camera to automatically mark and verify attendance for your ongoing sessions.
                            </p>
                            <button
                                onClick={() => navigate('/attendance')}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 group"
                            >
                                <Camera size={20} className="group-hover:rotate-12 transition-transform" />
                                Start Recognition
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                            <button
                                onClick={() => navigate('/users')}
                                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center gap-2 group"
                            >
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Users size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">User List</span>
                            </button>
                            <button
                                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-center gap-2 group"
                            >
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Calendar size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">Schedule</span>
                            </button>
                            <button
                                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-amber-500 hover:shadow-md transition-all flex flex-col items-center gap-2 group"
                            >
                                <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">Report</span>
                            </button>
                            <button
                                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center gap-2 group"
                            >
                                <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <MessageSquare size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">Notices</span>
                            </button>
                        </div>
                    </div>

                    <StatsGrid analytics={analytics} user={user} logsCount={logs.length} />

                    <AttendanceChart data={analytics?.trends || []} />
                </div>

                {/* Sidebar Info */}
                <div className="md:col-span-1 space-y-6">
                    {/* Class Status Card */}
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Current Session</span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full ring-1 ring-green-400/20">
                                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                                Active
                            </span>
                        </div>
                        <h4 className="text-lg font-bold mb-1">Advanced Computer Vision</h4>
                        <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
                            <Clock size={12} /> 10:00 AM - 11:30 AM
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-bold mb-1">Enrolled</p>
                                <p className="text-xl font-bold">48</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-bold mb-1">Present</p>
                                <p className="text-xl font-bold text-blue-400">32</p>
                            </div>
                        </div>
                    </div>

                    <RecentActivity logs={filteredLogs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-indigo-600 text-white rounded-lg">
                                <BookOpen size={18} />
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm">Exam Duty Notice</h4>
                        </div>
                        <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                            Mid-semester exams start next week. Please submit your questions by Friday afternoon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
