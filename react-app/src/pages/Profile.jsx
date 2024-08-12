import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { User, Mail, Shield, CreditCard, Building, Phone, MapPin, QrCode } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('details');

    if (!user) return <div className="p-8 text-center">Loading Profile...</div>;

    // Determine ID Label and Value based on role
    const idLabel = user.role === 'STUDENT' ? 'USN' : 'Employee ID';
    const idValue = user.usn || user.username.toUpperCase(); // Fallback to username if no USN/ID

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-light text-gray-900">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ID Card Column */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 relative">
                        {/* ID Card Header */}
                        <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-800 relative">
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {user.student_image ? (
                                        <img src={user.student_image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} className="text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ID Card Body */}
                        <div className="pt-12 pb-6 px-4 text-center">
                            <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">{user.role}</p>

                            <div className="grid grid-cols-2 gap-2 text-left text-xs bg-gray-50 p-3 rounded mb-4">
                                <div>
                                    <p className="text-gray-400 font-bold uppercase">Department</p>
                                    <p className="font-semibold text-gray-700">Computer Sc.</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-bold uppercase">{idLabel}</p>
                                    <p className="font-semibold text-gray-700">{idValue}</p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <QrCode size={64} className="text-gray-800" />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 font-mono">{idValue}</p>
                        </div>

                        {/* ID Card Footer */}
                        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 text-center">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                Official Digital ID
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded shadow-sm border border-gray-200 min-h-[400px]">
                        <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-6">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'details' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Personal Details
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Account Settings
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === 'details' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
                                                <User size={16} className="text-gray-400" />
                                                {user.username}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
                                                <Mail size={16} className="text-gray-400" />
                                                {user.email || 'No email registered'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role & Permissions</label>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
                                                <Shield size={16} className="text-gray-400" />
                                                {user.role}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{idLabel}</label>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
                                                <CreditCard size={16} className="text-gray-400" />
                                                {idValue}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
                                                <Building size={16} className="text-gray-400" />
                                                Computer Science
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact</label>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
                                                <Phone size={16} className="text-gray-400" />
                                                +91 98765 43210
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Address</label>
                                        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
                                            <MapPin size={16} className="text-gray-400 mt-0.5" />
                                            <span>
                                                #123, User Hostels Block A,<br />
                                                Engineering College Campus,<br />
                                                Bangalore - 560001
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="text-center py-12 text-gray-500">
                                    <Shield size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p>Account Security Settings are managed by Administrator.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
