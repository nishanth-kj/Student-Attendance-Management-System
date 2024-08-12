import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import api from '@/lib/api';

const UserDetails = () => {
    const { usn } = useParams();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await api.get(`/attendance/users/${usn}/`);
                setUserData(data);
            } catch (err) {
                console.error("Failed to fetch user details", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [usn]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-xl text-gray-400 font-medium">Loading details...</div>
        </div>
    );

    if (!userData) return <div className="p-20 text-center">User not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <Link
                    to="/users"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6"
                >
                    &larr; Back to Users
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Profile Card */}
                    <div className="lg:col-span-4 bg-white p-6 rounded shadow-sm border border-gray-200">
                        <div className="w-40 h-40 mx-auto rounded overflow-hidden border-4 border-white shadow-sm mb-6 bg-gray-100 flex items-center justify-center">
                            {userData.student_image ? (
                                <img src={userData.student_image} alt={userData.username} className="w-full h-full object-cover" />
                            ) : (
                                <User size={80} className="text-gray-300" />
                            )}
                        </div>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">{userData.username}</h2>
                            <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">{userData.usn}</p>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100">
                                <span className="text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </span>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                                    <p className="font-semibold text-gray-900 text-sm truncate">{userData.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100">
                                <span className="text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ID / USN</p>
                                    <p className="font-semibold text-gray-900 text-sm">{userData.usn}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attendance History */}
                    <div className="lg:col-span-8 bg-white p-6 rounded shadow-sm border border-gray-200 min-h-[500px]">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance History</h3>

                        <div className="space-y-3">
                            {userData.attendance_history?.length > 0 ? userData.attendance_history.map((record, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-gray-50 border border-gray-100 rounded transition-colors">
                                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                                        <div className="p-2 bg-green-50 rounded text-green-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">
                                                {new Date(record.timestamp).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Verified Scan</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded text-sm font-medium text-gray-700">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            )) : (
                                <div className="py-20 text-center">
                                    <p className="text-gray-400 font-medium">No attendance records found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
