import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
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
            } else {
                setError('Access Denied: You do not have Admin privileges.');
            }
        } catch (err) {
            setError(err || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded shadow-sm border border-gray-200">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-red-50 rounded-full text-red-600">
                            <ShieldAlert size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Admin Portal</h2>
                    <p className="text-sm text-gray-500 mt-1">Authorized Personnel Only</p>
                </div>

                {error && (
                    <div className="mb-6 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                            Admin Username
                        </label>
                        <input
                            type="text"
                            placeholder="admin"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-gray-400"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-gray-400"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-black focus:ring-4 focus:ring-gray-500/20 transition-all disabled:opacity-70 text-sm"
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
                            &larr; Back to User Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
