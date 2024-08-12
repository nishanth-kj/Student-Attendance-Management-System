import { Link } from 'react-router-dom';
import { LogOut, UserPlus, FileDown, User } from 'lucide-react';

const DashboardHeader = ({ user, onExport }) => {
    return (
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-2xl font-light text-gray-900 leading-tight">Dashboard</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <User size={16} />
                    <span>Welcome, <span className="font-semibold text-gray-800">{user?.username}</span></span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                        {user?.role}
                    </span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
                    <>
                        <button
                            onClick={onExport}
                            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded text-sm font-medium transition-colors"
                        >
                            <FileDown size={16} />
                            Export Data
                        </button>
                        <Link
                            to="/users/add"
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded text-sm font-medium text-center transition-colors"
                        >
                            <UserPlus size={16} />
                            Enrol User
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;
