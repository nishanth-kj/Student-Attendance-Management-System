import { Link } from 'react-router-dom';
import { Camera, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
                        filter: 'brightness(0.95) saturate(1.2)'
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-uniform">
                            Student <span className="text-uniform">Management</span> System
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-700 mb-12 max-w-2xl mx-auto font-bold leading-relaxed">
                            Automated facial recognition attendance for modern educational institutions.
                            <br className="hidden md:block" /> Safe, secure, and incredibly fast.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/attendance"
                                className="group w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-primary-500 transition-all shadow-lg hover:shadow-primary-600/20 active:scale-95"
                            >
                                <Camera className="w-5 h-5 mr-3" />
                                Mark Attendance
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto bg-slate-100 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all active:scale-95"
                            >
                                Administrator Login
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating background blobs */}
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-600/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            </section>

            {/* Features Section */}
            <section className="py-24 bg-transparent relative z-10 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-uniform uppercase">Powerful <span className="text-uniform">System Capabilities</span></h2>
                        <div className="w-20 h-2 bg-slate-900 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
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
    <div className="glass p-10 rounded-[2.5rem] border border-slate-200/50 hover:shadow-premium transition-all duration-500 hover:-translate-y-2 group">
        <div className="mb-6 bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-2xl font-black mb-4 tracking-tight text-uniform">{title}</h3>
        <p className="leading-relaxed font-bold opacity-80 text-uniform">
            {description}
        </p>
    </div>
);

export default Home;
