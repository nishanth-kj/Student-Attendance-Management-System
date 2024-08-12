import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/lib/api';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'STAFF',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/accounts/register/', formData);
            navigate('/login');
        } catch (err) {
            setError(err || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white p-6 rounded shadow border border-gray-200">
                <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Create Account</h2>

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Select Role</label>
                        <div className="flex rounded shadow-sm">
                            {['ADMIN', 'STAFF'].map((role, idx) => {
                                const isSelected = formData.role === role;
                                return (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role })}
                                        className={`flex-1 py-1.5 text-xs font-medium border ${isSelected
                                                ? 'bg-blue-600 text-white border-blue-600 z-10'
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                            } ${idx === 0 ? 'rounded-l' : 'rounded-r'} focus:outline-none`}
                                    >
                                        {role}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Username</label>
                        <input
                            type="text"
                            required
                            placeholder="DataEnterr01"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="user@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                            Already have an account? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
