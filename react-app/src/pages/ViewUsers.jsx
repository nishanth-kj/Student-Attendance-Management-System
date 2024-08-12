import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Search, Trash2, User } from 'lucide-react';
import api from '@/lib/api';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.get('/attendance/users/');
                setUsers(data || []);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (usn) => {
        if (!window.confirm('Are you sure you want to remove this user?')) return;
        try {
            await api.delete(`/attendance/users/${usn}/`);
            setUsers(users.filter(u => u.usn !== usn));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const filteredUsers = (users || []).filter(u =>
        u?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u?.usn?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="text-xl text-gray-500 font-medium animate-pulse">Loading Users...</div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-light text-gray-900 leading-tight">Users</h2>
                    <p className="text-sm text-gray-600 mt-1 font-medium">
                        Total Registered: {users.length}
                    </p>
                </div>
                <Link
                    to="/users/add"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded text-sm font-medium transition-colors shadow-sm"
                >
                    <UserPlus size={16} />
                    Enrol User
                </Link>
            </div>

            <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                    <div key={u.usn} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                                    {u.student_image ? (
                                        <img src={u.student_image} alt={u.username} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={24} />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                        {u.username}
                                    </h3>
                                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                        {u.usn}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <Link
                                    to={`/users/${u.usn}`}
                                    className="flex-1 py-1.5 text-center text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                                >
                                    Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(u.usn)}
                                    className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
                                >
                                    <Trash2 size={14} /> Del
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-12 text-center bg-transparent border-2 border-dashed border-gray-200 rounded text-gray-400 font-medium">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewUsers;
