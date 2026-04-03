import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#A8C4E9]">
      
      {/* SIDEBAR */}
      <aside className="fixed z-[100] bottom-0 left-0 w-full h-[70px] bg-white border-t border-[#E2E8F0] px-4 flex justify-center items-center shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:z-10 md:top-0 md:bottom-auto md:w-[250px] md:h-screen md:bg-[#F8FAFC] md:p-6 md:border-r md:border-t-0 md:block md:shadow-none">
        
        <div className="hidden md:flex items-center gap-2 mb-10">
          <span className="text-2xl">🧩</span>
          <h2 className="text-[#5B8DEF] text-[20px] font-bold">BeinBout</h2>
        </div>
        
        <small className="hidden md:block text-[#64748B] font-semibold tracking-[1px] text-[12px] uppercase mb-4">MENU</small>
        
        <nav className="flex flex-row w-full justify-around items-center gap-0 mt-0 md:flex-col md:mt-4 md:gap-2 md:w-full md:justify-start">
          
          {/* Menu Dashboard */}
          <Link 
            to="/dashboard"
            className={`flex flex-col md:flex-row items-center md:justify-start py-2 px-1 md:py-3 md:px-4 gap-1 md:gap-3 rounded-lg cursor-pointer w-full transition-all duration-200 ${
              currentPath === '/dashboard' 
                ? 'text-[#5B8DEF] font-bold md:bg-[#E0E7FF]' 
                : 'text-[#94A3B8] md:text-[#64748B] hover:bg-[#F1F5F9]'
            }`}
          >
            <span className="text-lg md:text-xl">📊</span> 
            <span className="text-[10px] sm:text-[11px] md:text-base">Dashboard</span>
          </Link>

          {/* Menu Daily Journal */}
          <Link 
            to="/journal"
            className={`flex flex-col md:flex-row items-center md:justify-start py-2 px-1 md:py-3 md:px-4 gap-1 md:gap-3 rounded-lg cursor-pointer w-full transition-all duration-200 ${
              currentPath === '/journal' 
                ? 'text-[#5B8DEF] font-bold md:bg-[#E0E7FF]' 
                : 'text-[#94A3B8] md:text-[#64748B] hover:bg-[#F1F5F9]'
            }`}
          >
            <span className="text-lg md:text-xl">📓</span> 
            <span className="text-[10px] sm:text-[11px] md:text-base">Daily Journal</span>
          </Link>

          {/* Menu Weekly Checkup */}
          <Link 
            to="/checkup"
            className={`flex flex-col md:flex-row items-center md:justify-start py-2 px-1 md:py-3 md:px-4 gap-1 md:gap-3 rounded-lg cursor-pointer w-full transition-all duration-200 ${
              currentPath === '/checkup' 
                ? 'text-[#5B8DEF] font-bold md:bg-[#E0E7FF]' 
                : 'text-[#94A3B8] md:text-[#64748B] hover:bg-[#F1F5F9]'
            }`}
          >
            <span className="text-lg md:text-xl">🩺</span> 
            <span className="text-[10px] sm:text-[11px] md:text-base">Weekly Checkup</span>
          </Link>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-0 p-4 pb-[90px] flex-1 w-full md:ml-[250px] md:p-8 md:pb-8">
        <header className="flex justify-between items-center mb-6 bg-white p-4 md:py-4 md:px-8 rounded-xl md:rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.02)]">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            {/* Judul berubah mengikuti URL */}
            {currentPath === '/dashboard' && 'Dashboard Summary'}
            {currentPath === '/journal' && 'Daily Journal'}
            {currentPath === '/checkup' && 'Weekly Checkup'}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FDE68A] flex justify-center items-center font-bold text-gray-800">A</div>
            <button className="font-medium text-gray-800 hidden md:block cursor-pointer" onClick={logout}>Logout</button>
          </div>
        </header>

        {/* AREA KONTEN DINAMIS */}
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}