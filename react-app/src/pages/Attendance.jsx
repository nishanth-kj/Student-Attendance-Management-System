import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import { Camera, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import { API_STATUS } from '@/constants';

const Attendance = () => {
    const webcamRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [result, setResult] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    const capture = useCallback(async () => {
        if (webcamRef.current) {
            setIsCapturing(true);
            setResult(null);
            setUserInfo(null);
            setError('');

            const imageSrc = webcamRef.current.getScreenshot();

            try {
                const data = await api.post('/attendance/mark/', { image: imageSrc });
                setResult(API_STATUS.SUCCESS);
                setUserInfo(data);
            } catch (err) {
                setResult(API_STATUS.ERROR);
                setError(err || 'No face detected or match found');
            } finally {
                setIsCapturing(false);
            }
        }
    }, [webcamRef]);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-6 gap-1"
                >
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-200 text-center">
                    <h1 className="text-3xl font-light text-gray-900 mb-6">
                        Mark Attendance
                    </h1>

                    <div className="my-8 w-full max-w-2xl mx-auto overflow-hidden rounded bg-black">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-auto block"
                            videoConstraints={{ facingMode: "user" }}
                        />
                    </div>

                    {result && (
                        <div className={`mb-6 p-4 rounded border flex items-center justify-center gap-2 ${result === API_STATUS.SUCCESS
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-red-50 border-red-200 text-red-700'
                            }`}>
                            {result === API_STATUS.SUCCESS ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                            <span>
                                {result === API_STATUS.SUCCESS
                                    ? `Success! Attendance marked for ${userInfo?.name}`
                                    : error}
                            </span>
                        </div>
                    )}

                    <button
                        onClick={capture}
                        disabled={isCapturing}
                        className="min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors mx-auto"
                    >
                        {isCapturing ? 'Processing...' : <><Camera size={20} /> Scan Face</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
