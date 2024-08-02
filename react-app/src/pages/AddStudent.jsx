import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, IdCard, Upload, Camera, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const AddStudent = () => {
    const [formData, setFormData] = useState({ name: '', usn: '', image: null });
    const [preview, setPreview] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!preview) {
            setError('Student photo is required');
            return;
        }

        const payload = {
            username: formData.usn, // Using USN as username for students
            password: 'password123', // Default password
            name: formData.name,
            usn: formData.usn,
            image_input: preview
        };

        try {
            await api.addStudent(payload);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/students');
            }, 2000);
        } catch (err) {
            setError(err || 'Failed to register student');
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <Link to="/students" className="text-slate-500 hover:text-slate-900 flex items-center mb-8 font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Students
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200/60 border border-slate-100"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Register Student</h1>
                        <p className="text-slate-500 font-medium">Create a new biometric student profile</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Image Upload Area */}
                        <div className="flex flex-col items-center">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                  w-48 h-48 rounded-[2.5rem] border-4 border-dashed cursor-pointer relative overflow-hidden transition-all duration-500
                  ${preview ? 'border-primary-500 shadow-xl' : 'border-slate-200 hover:border-primary-400 hover:bg-primary-50'}
                `}
                            >
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                        <Camera className="w-12 h-12 mb-3" />
                                        <span className="text-sm font-bold">Upload Photo</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-primary-600/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Upload className="text-white w-10 h-10" />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Training Image Required</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="e.g. Johnathan Doe"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-4 transition-all focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 font-bold"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 ml-1">University Serial Number (USN)</label>
                                <div className="relative">
                                    <IdCard className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="e.g. 1RV18CS001"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-4 transition-all focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 font-bold uppercase"
                                        value={formData.usn}
                                        onChange={(e) => setFormData({ ...formData, usn: e.target.value.toUpperCase() })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all flex items-center justify-center shadow-2xl shadow-slate-900/10 active:scale-95"
                        >
                            <UserPlus className="w-6 h-6 mr-3" />
                            Complete Registration
                        </button>
                    </form>
                </motion.div>
            </div>

            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
                    >
                        <div className="bg-white p-12 rounded-[3.5rem] text-center shadow-2xl max-w-sm">
                            <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Registration Successful!</h2>
                            <p className="text-slate-500 font-medium">Redirecting you to the student list...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddStudent;
