import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, login } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'ADMIN' // Default for this demo, or add a toggle
            });

            // Auto-login after signup
            await login(formData.username, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.details || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-white px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Sign Up</h2>
                    <p className="text-slate-500 font-medium">Create your administrative account</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center text-slate-500 font-medium">
                    Already have an account? {' '}
                    <Link to="/login" className="text-slate-900 font-black hover:underline">
                        Log In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
