import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Shield, GraduationCap, Users } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'STAFF', // Default to STAFF
        usn: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, login } = useAuth();

    const roles = [
        { id: 'ADMIN', label: 'Admin', icon: Shield, desc: 'Full System Access' },
        { id: 'STAFF', label: 'Faculty', icon: Users, desc: 'Manage Attendance' },
        { id: 'STUDENT', label: 'Student', icon: GraduationCap, desc: 'Personal Dashboard' },
    ];

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.role === 'STUDENT' && !formData.usn) {
            setError('USN is required for students');
            return;
        }

        setIsLoading(true);
        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                usn: formData.role === 'STUDENT' ? formData.usn : undefined
            });

            // Auto-login after signup
            await login(formData.username, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar / Info */}
                        <div className="w-full md:w-72 bg-slate-900 p-8 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-black mb-4">Join Us.</h2>
                                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                                    Create an account to access the advanced biometric attendance system.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="space-y-4">
                                    {roles.map((r) => (
                                        <div
                                            key={r.id}
                                            className={`p-3 rounded-xl border transition-all cursor-pointer ${formData.role === r.id
                                                    ? 'bg-white/10 border-white/20'
                                                    : 'border-transparent opacity-40 grayscale'
                                                }`}
                                            onClick={() => setFormData({ ...formData, role: r.id })}
                                        >
                                            <div className="flex items-center gap-3">
                                                <r.icon size={18} />
                                                <span className="font-bold text-xs uppercase tracking-wider">{r.label}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="flex-1 p-8 md:p-12">
                            <form onSubmit={handleSignup} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                                            required
                                        />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {formData.role === 'STUDENT' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="relative overflow-hidden"
                                        >
                                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="USN (e.g. 1RV19CS001)"
                                                value={formData.usn}
                                                onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                                                required
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            placeholder="Confirm"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-xl">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-900/20"
                                >
                                    {isLoading ? 'Creating Account...' : 'Get Started'}
                                </button>

                                <div className="text-center mt-6">
                                    <p className="text-slate-500 font-medium">
                                        Already have an account? {' '}
                                        <Link to="/login" className="text-slate-900 font-black hover:underline">
                                            Log In
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
