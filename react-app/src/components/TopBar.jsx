import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

const TopBar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <img src="/favicon.png" alt="Logo" className="h-8 w-8 md:hidden" />
                    <h1 className="text-lg md:text-xl font-semibold text-gray-800 hidden sm:block">
                        Attendance Management System
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {user && (
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">{user.username}</p>
                            <p className="text-xs text-gray-500 uppercase">{user.role}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                            <User size={16} />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
