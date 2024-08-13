import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import {
    Camera,
    LayoutDashboard,
    Users,
    FileText,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['AUTHENTICATED'] },
        { path: '/attendance', label: 'Attendance', icon: Camera, roles: ['ANY'] },
        { path: '/users', label: 'Users', icon: Users, roles: ['ADMIN', 'STAFF'] },
        { path: '/reports', label: 'Reports', icon: FileText, roles: ['ADMIN', 'STAFF'] },
        { path: '/profile', label: 'My Profile', icon: User, roles: ['AUTHENTICATED'] },
    ];

    const filteredLinks = navLinks.filter(link => {
        if (link.roles.includes('ANY')) return true;
        if (!user) return false;
        if (link.roles.includes('AUTHENTICATED')) return true;
        return link.roles.includes(user.role);
    });

    return (
        <>
            {/* Desktop Sidebar (Static / Collapsible) */}
            <aside className={`
                hidden md:flex h-screen
                bg-white border-r border-gray-200
                transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-20'}
                flex-col relative z-30
            `}>
                <div className={`h-16 flex items-center ${isOpen ? 'justify-start px-6' : 'justify-center'} border-b border-gray-200 relative`}>
                    {isOpen ? (
                        <div className="flex items-center gap-3">
                            <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
                            <span className="font-bold text-lg text-gray-900 truncate">Attendance System</span>
                        </div>
                    ) : (
                        <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
                    )}

                    <button
                        onClick={toggleSidebar}
                        className="absolute -bottom-3 -right-3 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-blue-600 hover:border-blue-300 shadow-sm z-50 transition-colors flex items-center justify-center cursor-pointer"
                        style={{ width: '24px', height: '24px' }}
                    >
                        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-1">
                    {filteredLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `
                                flex items-center px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-colors
                                ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                ${!isOpen && 'justify-center px-2'}
                            `}
                            title={!isOpen ? link.label : ''}
                        >
                            <link.icon size={20} className="shrink-0" />
                            {isOpen && <span className="ml-3 truncate">{link.label}</span>}
                        </NavLink>
                    ))}
                </div>

                <div className="border-t border-gray-200 p-4 bg-white">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center ${isOpen ? 'justify-start px-4' : 'justify-center'} py-2 text-red-600 rounded hover:bg-red-50 transition-colors`}
                            title="Logout"
                        >
                            <LogOut size={20} className="shrink-0" />
                            {isOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className={`block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium`}
                        >
                            {isOpen ? 'Login' : 'Log'}
                        </NavLink>
                    )}
                </div>

                {/* Toggle Button Removed from here - moved to TopBar */}
            </aside>


            {/* Mobile Sidebar (Drawer) */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={toggleSidebar}></div>

                    {/* Drawer Content */}
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transition-all transform duration-300">
                        {/* Wrapper for content */}

                        <div className="h-16 flex items-center px-4 border-b border-gray-200 gap-3 relative">
                            <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
                            <span className="font-bold text-lg text-gray-900">User Attendance System</span>

                            {/* Toggle Button for Mobile Drawer */}
                            <button
                                onClick={toggleSidebar}
                                className="absolute -bottom-3 -right-3 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-blue-600 hover:border-blue-300 shadow-sm z-50 transition-colors flex items-center justify-center cursor-pointer"
                                style={{ width: '24px', height: '24px' }}
                            >
                                <ChevronLeft size={14} />
                            </button>
                        </div>

                        <div className="flex-1 h-0 overflow-y-auto py-4">
                            <nav className="space-y-1 px-2">
                                {filteredLinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={toggleSidebar}
                                        className={({ isActive }) => `
                                            flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors
                                            ${isActive
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                        `}
                                    >
                                        <link.icon size={24} className="mr-4" />
                                        {link.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        <div className="border-t border-gray-200 p-4">
                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <LogOut size={24} className="mr-4" />
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="shrink-0 w-14">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
