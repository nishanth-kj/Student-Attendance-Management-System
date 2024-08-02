import { Link } from 'react-router-dom';
import { Camera, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative bg-mesh min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
                        filter: 'brightness(0.7) saturate(1.2)'
                    }}
                />

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] text-white">
                            Student <span className="text-gradient">Management</span> System
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto font-bold leading-relaxed">
                            Automated facial recognition attendance for modern educational institutions.
                            <br className="hidden md:block" /> Safe, secure, and incredibly fast.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                to="/attendance"
                                className="group w-full sm:w-auto bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20 active:scale-95"
                            >
                                <Camera className="w-6 h-6 mr-3" />
                                Mark Attendance
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95"
                            >
                                Administrator Login
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative background blobs */}
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-600/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            </section>

            {/* Features Section */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900">Powerful <span className="text-gradient">System Capabilities</span></h2>
                        <div className="w-24 h-2 bg-primary-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<ShieldCheck className="w-10 h-10 text-primary-600" />}
                            title="Biometric Intelligence"
                            description="Advanced facial recognition algorithms ensuring secondary-grade accuracy for student verification."
                        />
                        <FeatureCard
                            icon={<Zap className="w-10 h-10 text-primary-600" />}
                            title="Analytical Insights"
                            description="Real-time data visualization and attendance reporting for comprehensive academic tracking."
                        />
                        <FeatureCard
                            icon={<Users className="w-10 h-10 text-primary-600" />}
                            title="Unified Directory"
                            description="Centralized student database for seamless profile management and biometric enrollment."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="premium-card group">
        <div className="mb-8 bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary-50 transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900">{title}</h3>
        <p className="leading-relaxed font-medium text-slate-600">
            {description}
        </p>
    </div>
);

export default Home;
