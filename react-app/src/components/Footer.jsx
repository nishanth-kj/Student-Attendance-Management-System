import { Facebook, Twitter, Instagram, Github, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass border-t border-slate-200/50 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm font-medium text-center md:text-left">
                        &copy; {new Date().getFullYear()} Student Attendance Management System. All rights reserved.  @ Neuro Kode's
                    </p>

                    <div className="flex space-x-6">
                        <SocialIcon icon={<Facebook className="w-5 h-5" />} label="Facebook" color="hover:text-blue-600" />
                        <SocialIcon icon={<Twitter className="w-5 h-5" />} label="Twitter" color="hover:text-primary-500" />
                        <SocialIcon icon={<Instagram className="w-5 h-5" />} label="Instagram" color="hover:text-pink-600" />
                        <SocialIcon icon={<Github className="w-5 h-5" />} label="Github" color="hover:text-slate-900" />
                        <SocialIcon icon={<Youtube className="w-5 h-5" />} label="Youtube" color="hover:text-red-600" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, label, color }) => (
    <a
        href="#"
        className={`text-slate-400 transition-all duration-300 transform hover:scale-110 ${color}`}
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;
