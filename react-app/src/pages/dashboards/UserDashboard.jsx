import { User, CheckCircle, Clock, BookOpen, UserCheck, Calendar, Trophy, Zap, ArrowUpRight } from 'lucide-react';

const UserDashboard = ({ user, logs }) => {
    // For user, logs are already filtered by backend typically
    // Assuming 'logs' contains only THIS user's logs.

    // Basic stats calculation
    const totalSessions = logs.length;
    const lastSeen = logs.length > 0 ? new Date(logs[0].timestamp).toLocaleDateString() : 'Never';
    const attendancePercentage = "88%";

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Profile Snapshot & Welcome */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Zap size={120} className="text-blue-600" />
                        </div>
                        <div className="flex items-center gap-6 z-10">
                            <div className="h-20 w-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-xl">
                                <User size={40} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                    Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.username}</span>!
                                </h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-widest">
                                        Verified Learner
                                    </span>
                                    <span className="text-sm text-gray-400 font-medium">B.Tech · 6th Semester</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 z-10">
                            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all active:scale-95">
                                My Portfolio
                            </button>
                        </div>
                    </div>

                    {/* Personal Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                            <div className="p-3 w-fit bg-blue-50 text-blue-600 rounded-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <UserCheck size={20} />
                            </div>
                            <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Attendance</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">{totalSessions}</span>
                                <span className="text-xs font-bold text-green-500 flex items-center gap-0.5">
                                    <ArrowUpRight size={12} /> +2
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">Valid session logs verified</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                            <div className="p-3 w-fit bg-indigo-50 text-indigo-600 rounded-xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <CheckCircle size={20} />
                            </div>
                            <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Percentage</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">{attendancePercentage}</span>
                            </div>
                            <div className="w-full h-1 bg-gray-50 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full w-[88%]"></div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">Above class average (82%)</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                            <div className="p-3 w-fit bg-orange-50 text-orange-600 rounded-xl mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <Trophy size={20} />
                            </div>
                            <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Rank</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">#4</span>
                                <span className="text-xs text-gray-400 font-bold">in class</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">Top 10% of consistent users</p>
                        </div>
                    </div>

                    {/* Attendance Feed */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Recent Attendance Records</h3>
                                <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-wider">Your verification history</p>
                            </div>
                            <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">View All History</button>
                        </div>

                        <div className="space-y-4">
                            {logs.slice(0, 5).map((log, i) => (
                                <div key={i} className="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white border hover:border-blue-100 rounded-2xl transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-800 block">
                                                {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">General Session</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-bold text-gray-600 bg-white px-3 py-1 rounded-lg border border-gray-100">
                                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                    </div>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="py-12 text-center">
                                    <div className="mb-4 inline-flex p-4 bg-gray-50 rounded-full text-gray-300">
                                        <Calendar size={40} />
                                    </div>
                                    <p className="text-gray-400 text-sm font-bold">No attendance records found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Activity Score */}
                    <div className="bg-gradient-to-br from-indigo-700 to-blue-800 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h4 className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-6 font-mono">My Activity Score</h4>
                            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="64" cy="64" r="58" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                                    <circle cx="64" cy="64" r="58" stroke="white" strokeWidth="12" fill="none" strokeDasharray="364.4" strokeDashoffset="43.7" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-4xl font-black">88</span>
                                    <span className="text-[10px] font-bold opacity-60">SCORE</span>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-blue-100 leading-relaxed max-w-[200px]">
                                Outstanding consistency! You're in the top 10% this month.
                            </p>
                        </div>
                    </div>

                    {/* Announcement Feed */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Notice Board</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="group cursor-pointer">
                                <span className="text-[10px] font-black text-blue-600 uppercase mb-2 block tracking-tighter">Academic · Today</span>
                                <h5 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Mid-Term Assessment Schedule Released</h5>
                                <p className="text-xs text-gray-400 mt-2 leading-relaxed">Check the assessments tab for your personalized exam timetable and room allocations.</p>
                            </div>
                            <hr className="border-gray-50" />
                            <div className="group cursor-pointer">
                                <span className="text-[10px] font-black text-orange-600 uppercase mb-2 block tracking-tighter">Event · 2 days ago</span>
                                <h5 className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors">Annual Tech Symposium Enrolment</h5>
                                <p className="text-xs text-gray-400 mt-2 leading-relaxed">Register for the upcoming symposium to earn additional recognition points.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
