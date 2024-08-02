import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { API_STATUS } from '@/constants';

const Attendance = () => {
    const webcamRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [result, setResult] = useState(null); // API_STATUS.SUCCESS | API_STATUS.ERROR
    const [studentInfo, setStudentInfo] = useState(null);
    const [error, setError] = useState('');

    const capture = useCallback(async () => {
        if (webcamRef.current) {
            setIsCapturing(true);
            setResult(null);
            setStudentInfo(null);
            setError('');

            const imageSrc = webcamRef.current.getScreenshot();

            try {
                // Using generic POST for marking attendance
                const data = await api.post('/attendance/mark/', { image: imageSrc });
                setResult(API_STATUS.SUCCESS);
                setStudentInfo(data);
            } catch (err) {
                setResult(API_STATUS.ERROR);
                setError(err || 'No face detected or match found');
            } finally {
                setIsCapturing(false);
            }
        }
    }, [webcamRef]);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="text-white/60 hover:text-white flex items-center transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-2xl font-black text-white tracking-tight">AI Attendance</h1>
                    <div className="w-20" /> {/* Spacer */}
                </div>

                <div className="relative bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
                    {/* Webcam Container */}
                    <div className="aspect-video relative bg-black">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover"
                            videoConstraints={{
                                width: 1280,
                                height: 720,
                                facingMode: "user"
                            }}
                        />

                        {/* Scan Overlay */}
                        <div className="absolute inset-0 border-[60px] border-slate-900/40 pointer-events-none">
                            <div className="w-full h-full border-2 border-primary-500/50 rounded-2xl relative">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-xl" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-xl" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-xl" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-xl" />

                                {isCapturing && (
                                    <motion.div
                                        initial={{ top: '0%' }}
                                        animate={{ top: '100%' }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Results Overlay */}
                        <AnimatePresence>
                            {result === API_STATUS.SUCCESS && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-x-0 bottom-8 px-8"
                                >
                                    <div className="bg-emerald-500/90 backdrop-blur-md p-6 rounded-[2rem] text-white flex items-center shadow-xl">
                                        <CheckCircle2 className="w-12 h-12 mr-4 shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Attendance Marked</p>
                                            <h3 className="text-2xl font-black">{studentInfo?.name}</h3>
                                            <p className="font-mono text-emerald-100">{studentInfo?.usn}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {result === API_STATUS.ERROR && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-x-0 bottom-8 px-8"
                                >
                                    <div className="bg-red-500/90 backdrop-blur-md p-6 rounded-[2rem] text-white flex items-center shadow-xl">
                                        <AlertCircle className="w-12 h-12 mr-4 shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Scan Failed</p>
                                            <h3 className="text-xl font-black">{error}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-10 flex flex-col items-center">
                        <button
                            onClick={capture}
                            disabled={isCapturing}
                            className={`
                group relative px-12 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 flex items-center
                ${isCapturing
                                    ? 'bg-slate-700 text-slate-400'
                                    : 'bg-primary-600 text-white hover:bg-primary-500 shadow-xl shadow-primary-600/20'}
              `}
                        >
                            {isCapturing ? (
                                <>
                                    <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                                    Analyzing Face...
                                </>
                            ) : (
                                <>
                                    <Camera className="w-6 h-6 mr-3" />
                                    Mark Attendance
                                </>
                            )}
                        </button>

                        <p className="mt-6 text-slate-500 text-sm font-medium">
                            Keep your face within the frame and ensure good lighting
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
