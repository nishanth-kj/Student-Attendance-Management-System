import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(formData.username, formData.password);
            if (user?.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (user?.role === 'STUDENT') {
                navigate('/student-dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (username, password) => {
        setFormData({ username, password });
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded shadow-sm border border-gray-200">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mt-1">Please sign in to continue</p>
                </div>

                {error && (
                    <div className="mb-6 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                                Password
                            </label>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-70 text-sm"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/signup" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            First time here? <span className="underline decoration-gray-300 hover:decoration-blue-600">Create an account</span>
                        </Link>
                    </div>

                    {/* Demo Accounts */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-wider mb-3">
                            Click to Auto-Fill Demo
                        </p>
                        <div className="flex justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fillDemo('admin', 'admin')}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors"
                            >
                                Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemo('staff_user', 'staff123')}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors"
                            >
                                Staff
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemo('student_user', 'student123')}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors"
                            >
                                User
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
