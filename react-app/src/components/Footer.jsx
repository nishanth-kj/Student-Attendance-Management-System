const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-bold text-gray-900">Attendance Management System</span>
                        <p className="text-sm text-gray-500 mt-1">
                            &copy; {new Date().getFullYear()} All rights reserved.  @ Neuro Kode's
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
