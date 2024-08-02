import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, LayoutDashboard, Users, LogIn, LogOut, UserCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="glass sticky top-0 z-50 border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center" onClick={closeMenu}>
                            Student <span className="text-primary-600 ml-2">Management</span> <span className="ml-2">System</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/attendance" className="flex items-center text-slate-600 hover:text-primary-600 transition-colors font-medium">
                            <Camera className="w-4 h-4 mr-2" />
                            Mark Attendance
                        </Link>

                        {user && (
                            <Link to="/dashboard" className="flex items-center text-slate-600 hover:text-primary-600 transition-colors font-medium">
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Dashboard
                            </Link>
                        )}

                        {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
                            <Link to="/students" className="flex items-center text-slate-600 hover:text-primary-600 transition-colors font-medium">
                                <Users className="w-4 h-4 mr-2" />
                                Students
                            </Link>
                        )}

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                                    <UserCircle className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm font-bold text-slate-700">{user.username}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded-md font-black uppercase tracking-tighter">
                                        {user.role}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all flex items-center font-bold text-sm shadow-sm active:scale-95"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-all flex items-center font-medium shadow-sm active:scale-95"
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-slate-600 hover:text-primary-600 transition-colors p-2"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            <Link
                                to="/attendance"
                                onClick={closeMenu}
                                className="flex items-center p-3 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-primary-50 hover:text-primary-600 transition-all"
                            >
                                <Camera className="w-5 h-5 mr-3" />
                                Mark Attendance
                            </Link>

                            {user && (
                                <Link
                                    to="/dashboard"
                                    onClick={closeMenu}
                                    className="flex items-center p-3 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-primary-50 hover:text-primary-600 transition-all"
                                >
                                    <LayoutDashboard className="w-5 h-5 mr-3" />
                                    Dashboard
                                </Link>
                            )}

                            {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
                                <Link
                                    to="/students"
                                    onClick={closeMenu}
                                    className="flex items-center p-3 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-primary-50 hover:text-primary-600 transition-all"
                                >
                                    <Users className="w-5 h-5 mr-3" />
                                    Students
                                </Link>
                            )}

                            {user ? (
                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-3 mb-4 px-2">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                            <UserCircle className="w-6 h-6 text-slate-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{user.username}</p>
                                            <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">{user.role}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center font-bold shadow-sm"
                                    >
                                        <LogOut className="w-5 h-5 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center w-full bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-all font-bold shadow-lg"
                                >
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
