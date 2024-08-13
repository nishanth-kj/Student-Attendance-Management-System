import { Link } from 'react-router-dom';
import { Camera, Shield, FileText, Smartphone, Cloud, Lock } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <LandingNavbar />

            <div className="pt-24 pb-12 w-full flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Jumbotron-style Hero */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
                        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                            Attendance Management System
                        </h1>
                        <p className="text-xl text-gray-600 font-light mb-8 max-w-3xl leading-relaxed">
                            A simple, reliable, and secure platform for managing university attendance through facial recognition.
                        </p>
                        <hr className="my-8 border-t border-gray-200" />
                        <p className="text-gray-600 mb-8">
                            Get started by marking your attendance or logging into the staff portal management area.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/attendance"
                                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                            >
                                Mark Attendance
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                            >
                                Staff Login
                            </Link>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div id="features" className="py-12 scroll-mt-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-light text-gray-900 mb-4">Powerful Features</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Discover what makes our system the best choice for your institution.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={Camera}
                                title="Face Recognition"
                                desc="State-of-the-art biological face detection technology ensures accurate and proxy-proof attendance marking."
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Secure & Private"
                                desc="All biometric data is encrypted and stored securely, complying with standard data protection regulations."
                            />
                            <FeatureCard
                                icon={FileText}
                                title="Automated Reports"
                                desc="Generate comprehensive PDF and CSV reports for daily, weekly, or monthly attendance with a single click."
                            />
                            <FeatureCard
                                icon={Smartphone}
                                title="Mobile Friendly"
                                desc="Responsive design allows staff and users to access the portal from any device, anywhere."
                            />
                            <FeatureCard
                                icon={Cloud}
                                title="Cloud Sync"
                                desc="Real-time synchronization ensures that attendance marked in the classroom is instantly available to admins."
                            />
                            <FeatureCard
                                icon={Lock}
                                title="Role-Based Access"
                                desc="Strict access controls for Admins, Staff, and Users to ensure data integrity and security."
                            />
                        </div>
                    </div>

                    {/* About Section */}
                    <div id="about" className="py-12 scroll-mt-24 border-t border-gray-100">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About the Project</h2>

                                <div className="prose prose-blue max-w-none text-gray-600">
                                    <p className="mb-4">
                                        The <strong>User Attendance System</strong> is a cutting-edge solution designed to modernize the traditional attendance tracking process in educational institutions.
                                    </p>
                                    <p className="mb-4">
                                        Developed by <strong>Neuro Kode's</strong>, this system leverages advanced computer vision and machine learning technologies to identify users via facial recognition, eliminating the need for manual roll calls or paper-based signatures.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                                            <p>
                                                To provide a seamless, efficient, and transparent attendance monitoring experience that saves time for faculty and provides real-time insights for administrators.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Technologies</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li><strong>Frontend:</strong> React.js, Tailwind CSS, Vite</li>
                                                <li><strong>Backend:</strong> Django REST Framework, Python</li>
                                                <li><strong>AI/ML:</strong> dlib, face_recognition, OpenCV</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
);

export default Home;
