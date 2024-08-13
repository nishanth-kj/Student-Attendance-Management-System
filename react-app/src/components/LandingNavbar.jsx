import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const LandingNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
                            <span className="font-bold text-xl text-gray-900 tracking-tight">Attendance System</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Features</a>
                        <a href="#about" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">About</a>
                        <Link
                            to="/admin-login"
                            className="text-gray-500 hover:text-red-600 font-medium transition-colors"
                        >
                            Admin
                        </Link>
                        <Link
                            to="/login"
                            className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a
                            href="#features"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </a>
                        <Link
                            to="/admin-login"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin Portal
                        </Link>
                        <div className="pt-4 mt-2 border-t border-gray-100">
                            <Link
                                to="/login"
                                className="block w-full text-center px-4 py-2 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default LandingNavbar;
