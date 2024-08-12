import { Users, UserCheck, ClipboardList, TrendingUp } from 'lucide-react';

const StatsGrid = ({ analytics, user, logsCount }) => {
    const isStaff = user?.role === 'ADMIN' || user?.role === 'STAFF';

    const stats = isStaff ? [
        {
            label: "Total Users",
            value: analytics?.summary?.total_students || 0,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50/50",
            trend: "+4% from last month"
        },
        {
            label: "Present Today",
            value: analytics?.summary?.today_present || 0,
            icon: UserCheck,
            color: "text-green-600",
            bg: "bg-green-50/50",
            trend: "92% Attendance Rate"
        },
        {
            label: "System Logs",
            value: logsCount || 0,
            icon: ClipboardList,
            color: "text-indigo-600",
            bg: "bg-indigo-50/50",
            trend: "All systems operational"
        }
    ] : [];

    if (!isStaff) return null; // User dashboard has its own stats grid

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <TrendingUp size={10} />
                            LIVE
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
                            {stat.value}
                        </div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {stat.label}
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-50 mt-1">
                        <p className="text-[10px] font-medium text-gray-400">
                            {stat.trend}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
