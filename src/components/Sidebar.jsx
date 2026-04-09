import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, BookOpen, Activity, ChevronDown, User, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth'; 

export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout, user } = useAuth(); 
  
  // Deteksi ukuran layar awal: Laptop (>=768px) otomatis true (terbuka), HP false (tertutup)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#A8C4E9] font-sans overflow-x-hidden">
      
      {/* OVERLAY MOBILE: Hanya muncul di HP (md:hidden) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#1E293B]/50 z-[40] md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      {/* Perubahan: Hapus 'md:translate-x-0' agar state React yang mengontrol penuh posisi sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[250px] bg-[#FFFFFF] z-[50] border-r border-[#E2E8F0] transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-[#1E293B] text-[22px] font-semibold">Bein<span className="text-[#8FD6B4]">Bout</span></h2>
          </div>
          {/* Perubahan: Hapus 'md:hidden' supaya tombol X juga muncul di laptop buat opsi tutup */}
          <button className="text-[#64748B] bg-transparent border-none cursor-pointer hover:text-[#1E293B] transition-colors" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="px-6 flex-1">
          <small className="block text-[#64748B] font-semibold tracking-[1px] text-[14px] uppercase mb-4">MENU</small>
          
          <nav className="flex flex-col gap-2">
            <Link 
              to="/dashboard"
              className={`flex items-center py-3 px-4 gap-4 rounded-[10px] transition-all duration-200 ${
                currentPath === '/dashboard' 
                  ? 'bg-[#5B8DEF]/10 text-[#8FD6B4] font-semibold' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9] font-normal'
              }`}
            >
              <LayoutDashboard size={24} strokeWidth={1.5} />
              <span className="text-[16px]">Dashboard</span>
            </Link>

            <Link 
              to="/journal"
              className={`flex items-center py-3 px-4 gap-4 rounded-[10px] transition-all duration-200 ${
                currentPath.startsWith('/journal') 
                  ? 'bg-[#5B8DEF]/10 text-[#8FD6B4] font-semibold' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9] font-normal'
              }`}
            >
              <BookOpen size={24} strokeWidth={1.5} />
              <span className="text-[16px]">Daily Journal</span>
            </Link>

            <Link 
              to="/checkup"
              className={`flex items-center py-3 px-4 gap-4 rounded-[10px] transition-all duration-200 ${
                currentPath === '/checkup' 
                  ? 'bg-[#5B8DEF]/10 text-[#8FD6B4] font-semibold' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9] font-normal'
              }`}
            >
              <Activity size={24} strokeWidth={1.5} />
              <span className="text-[16px]">Weekly Checkup</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      {/* Perubahan: Margin kiri md:ml-[250px] sekarang dinamis mengikuti state + ada efek transisi */}
      <main className={`flex-1 w-full px-4 md:px-8 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-[250px]' : 'md:ml-0'}`}>
        
        <div className="sticky top-0 z-[40] pt-6 pb-2 mb-4 bg-[#A8C4E9] -mx-4 px-4 md:-mx-8 md:px-8">
          <header className="flex justify-between items-center bg-[#FFFFFF] p-4 md:py-4 md:px-8 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] relative">
            
            <div className="flex items-center gap-4">
              {/* Perubahan: Hapus 'md:hidden' pada Hamburger Menu agar bisa diklik di laptop */}
              {/* Fungsi onClick diubah menjadi toggle (!isSidebarOpen) */}
              <button 
                className="text-[#1E293B] bg-transparent border-none cursor-pointer hover:bg-[#F1F5F9] p-1.5 rounded-lg transition-colors" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#1E293B] hidden sm:block">
                {currentPath === '/dashboard' && 'Dashboard'}
                {currentPath === '/journal' && 'Daily Journal'}
                {currentPath === '/journal/new' && 'Tulis Jurnal'}
                {currentPath.startsWith('/journal/') && currentPath !== '/journal/new' && 'Detail Jurnal'}
                {currentPath === '/checkup' && 'Weekly Checkup'}
              </h2>
            </div>

            {/* DROPDOWN PROFILE */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 cursor-pointer border-none bg-transparent"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#8FD6B4] flex justify-center items-center font-semibold text-[#1E293B] text-[16px] overflow-hidden shadow-sm">
                  {user?.user?.avatar_url ? (
                    <img 
                      src={user?.user?.avatar_url} 
                      alt={`Avatar ${user?.user?.nama_lengkap || 'User'}`} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    user?.user?.nama_lengkap 
                      ? user.user.nama_lengkap
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map(n => n[0])
                          .join("")
                          .toUpperCase() 
                      : "U" 
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <span className="block font-semibold text-[#1E293B] text-[14px]">{user?.user?.username}</span>
                </div>
                <ChevronDown size={16} className="text-[#64748B] hidden md:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-[56px] w-[240px] bg-[#FFFFFF] rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#E2E8F0]">
                    <p className="text-[16px] font-semibold text-[#1E293B] truncate">{user?.user?.nama_lengkap}</p>
                    <p className="text-[14px] text-[#64748B] truncate">{user?.user?.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#F1F5F9] text-[#1E293B] transition-colors border-none bg-transparent cursor-pointer">
                    <User size={16} strokeWidth={1.5} /> Profil Saya
                  </button>
                  <button 
                    onClick={logout} 
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#F1F5F9] text-[#E57373] transition-colors border-none bg-transparent cursor-pointer"
                  >
                    <LogOut size={16} strokeWidth={1.5} /> Keluar
                  </button>
                </div>
              )}
            </div>
          </header>
        </div>

        {/* AREA KONTEN DINAMIS */}
        <div className="flex-1 pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}