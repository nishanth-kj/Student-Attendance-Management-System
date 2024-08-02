import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Login</h2>
                    <p className="text-slate-500 font-medium">Access your administration panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-bold text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="mt-8">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center mb-4">Quick Access Demo</p>
                        <div className="grid grid-cols-1 gap-3">
                            <DemoCredentialItem
                                role="Admin"
                                user="admin"
                                pass="admin123"
                                onClick={() => { setUsername('admin'); setPassword('admin123'); }}
                            />
                            <DemoCredentialItem
                                role="Faculty"
                                user="prof_jane"
                                pass="password123"
                                onClick={() => { setUsername('prof_jane'); setPassword('password123'); }}
                            />
                            <DemoCredentialItem
                                role="Student"
                                user="student_1"
                                pass="password123"
                                onClick={() => { setUsername('student_1'); setPassword('password123'); }}
                            />
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const DemoCredentialItem = ({ role, user, pass, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary-600 hover:bg-primary-50 transition-all group text-left"
    >
        <div>
            <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-primary-600 tracking-tighter">{role}</span>
            <p className="text-sm font-bold text-slate-700">{user}</p>
        </div>
        <div className="text-right">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Password</span>
            <p className="text-sm font-mono text-slate-500">{pass}</p>
        </div>
    </button>
);

export default Login;
