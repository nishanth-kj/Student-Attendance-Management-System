import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Wrapper */}
            <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300`}>

                {/* Top Navigation Bar */}
                <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
