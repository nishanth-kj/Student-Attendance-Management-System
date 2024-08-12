const RecentActivity = ({ logs, searchTerm, setSearchTerm }) => {
    return (
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900">Activity Feed</h3>
                <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex-grow overflow-y-auto pr-2 max-h-[600px]">
                {logs.length > 0 ? (
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="p-3 bg-gray-50 rounded border border-gray-100 hover:bg-white hover:border-gray-200 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-white font-bold text-sm">
                                            {log.student_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-gray-900">{log.student_name}</span>
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 uppercase">
                                                    Verified
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium">
                                                {log.usn || 'FACULTY_AUTH'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-400 flex gap-3 pl-[52px]">
                                    <span>
                                        {new Date(log.timestamp).toLocaleDateString()}
                                    </span>
                                    <span>
                                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400 text-sm font-medium tracking-wide">
                        NO RECENT LOGS
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
