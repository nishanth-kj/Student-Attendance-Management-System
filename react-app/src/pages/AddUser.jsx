import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ArrowLeft, Camera, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';

const AddUser = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [formData, setFormData] = useState({ username: '', usn: '', email: '', password: '' });
    const [image, setImage] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setIsCapturing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return setError('Please capture a face scan');
        setError('');
        setIsSubmitting(true);

        try {
            await api.post('/attendance/users/', { ...formData, image_input: image });
            navigate('/users');
        } catch (err) {
            setError(err || 'Failed to enroll user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-4">
                <Link to="/users" className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <ArrowLeft size={16} /> BACK TO REGISTRY
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Biometric Capture */}
                <div className="md:col-span-4 bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Biometrics</h3>

                    <div className="relative w-full aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 overflow-hidden mb-4">
                        {isCapturing ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-cover"
                            />
                        ) : image ? (
                            <div className="relative w-full h-full">
                                <img src={image} className="w-full h-full object-cover" alt="User" />
                                <div className="absolute inset-0 bg-green-500 bg-opacity-10 flex items-center justify-center">
                                    <div className="bg-white rounded-full p-2">
                                        <CheckCircle size={32} className="text-green-500" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <Camera size={48} className="mb-2 opacity-50" />
                                <span className="font-semibold text-sm">CAMERA READY</span>
                            </div>
                        )}
                    </div>

                    {isCapturing ? (
                        <button
                            type="button"
                            onClick={capture}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors"
                        >
                            <Camera size={18} /> Take Snapshot
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsCapturing(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium transition-colors"
                        >
                            {image ? <RefreshCw size={18} /> : <Camera size={18} />}
                            {image ? 'Retake Photo' : 'Start Camera'}
                        </button>
                    )}
                </div>

                {/* User Details */}
                <div className="md:col-span-8 bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h2 className="text-xl font-medium text-gray-900 mb-6">Register User</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm flex items-center gap-2">
                            <AlertTriangle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID / USN</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ID Number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                    value={formData.usn}
                                    onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Enrolling User...' : 'Enroll User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
