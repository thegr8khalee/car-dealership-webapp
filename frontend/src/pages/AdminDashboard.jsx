// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
// import { useUserAuthStore } from '../store/useUserAuthStore';
import AdminDashboardContent from '../components/admin/AdminDashboardContent';
import AdminSidebar from '../components/admin/AdminSidebar';
import { MenuIcon, PanelLeftOpen, Sidebar } from 'lucide-react';

const AdminDashboard = () => {
//   const { authUser } = useUserAuthStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle URL changes to update the active section
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboardContent setActiveSection={setActiveSection} />;
      //   case 'products':
      //     return <ProductManagement />;
      //   case 'recipe': // Corrected case to match the path from AdminDashboardContent
      //     return <RecipeManagement />;
      //   case 'users':
      //     return <Users />;
      // case 'orders':
      //     return <Orders />;
      // case 'newOrders':
      //     return <NewOrders />;
      default:
        return <AdminDashboardContent setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="pt-13 flex h-screen bg-base-300 rounded-none overflow-x-hidden font-[poppins]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        ></div>
      )}

      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="w-screen flex-1 sm:p-4 lg:p-8 rounded-none overflow-y-scroll">
        <button
          className="btn lg:hidden bg-transparent my-4 btn-circle"
          onClick={() => setIsSidebarOpen(true)}
        >
         <PanelLeftOpen />
        </button>
        {/* <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-8 mt-6 lg:mt-0 font-['inter']">
          Welcome, {authUser.username || authUser.email}!
        </h1> */}
        <div className="bg-base-200 p-4 lg:p-6 rounded-2xl shadow-xl overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
