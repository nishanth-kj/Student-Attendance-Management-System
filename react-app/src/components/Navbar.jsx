import { Link } from 'react-router-dom';
import { Camera, LayoutDashboard, Users, LogIn } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="glass sticky top-0 z-50 border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center">
                            Student <span className="text-primary-600 ml-2">Management</span> <span className="ml-2">System</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/attendance" className="flex items-center text-slate-600 hover:text-primary-600 transition-colors font-medium">
                            <Camera className="w-4 h-4 mr-2" />
                            Mark Attendance
                        </Link>
                        <Link to="/dashboard" className="flex items-center text-slate-600 hover:text-primary-600 transition-colors font-medium">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                        </Link>
                        <Link to="/students" className="flex items-center text-slate-600 hover:text-primary-600 transition-colors font-medium">
                            <Users className="w-4 h-4 mr-2" />
                            Students
                        </Link>
                        <Link
                            to="/login"
                            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-all flex items-center font-medium shadow-sm active:scale-95"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                        </Link>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button could go here */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
