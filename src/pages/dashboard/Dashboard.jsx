import React from 'react';
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const isCheckupDone = localStorage.getItem('weeklyCheckupDone') === 'true';
  const daysLeft = 0; 

  let lastCheckupText = "";
  if (isCheckupDone) {
    lastCheckupText = "Baru saja selesai";
  } else if (daysLeft === 0) {
    lastCheckupText = "7 hari lalu"; 
  } else {
    lastCheckupText = `${7 - daysLeft} hari lalu`; 
  }

  return (
    <Layout> 
      
      {/* 1. TOP CARD: AI SUMMARY */}
      <section className="bg-[#FFFFFF] rounded-[16px] p-6 md:p-8 mb-6 flex flex-col md:flex-row gap-8 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
        <div className="flex-1">
          <h2 className="text-[28px] font-semibold mb-4 text-[#1E293B]">AI Analysis Summary</h2>
          <p className="text-[#64748B] text-[16px] leading-[1.6] mb-6">
            Anda mengalami hari-hari yang melelahkan akhir-akhir ini. Sistem mendeteksi stres ringan di malam hari. Ambil cuti dan beristirahatlah sejenak.
          </p>
          <small className="text-[#64748B] font-semibold tracking-[1px] text-[14px] uppercase block mb-2">Overall Mood Score</small>
          <h1 className="text-[48px] font-semibold text-[#1E293B]">8.0<span className="text-[28px] text-[#64748B] font-medium">/10</span></h1>
        </div>

        <div className="flex-[1.5] flex flex-col justify-end">
          <div className="flex items-end h-[160px] gap-2 border-b border-[#E2E8F0] pb-4">
            {['01', '02', '03', '04', '05', '06', '07'].map((hari, i) => (
              <div key={i} className="flex gap-1 flex-1 justify-center items-end h-full">
                <div className="w-[12px] bg-[#E2E8F0] rounded-t-[4px]" style={{ height: `${Math.floor(Math.random() * 60) + 40}%` }}></div>
                <div className="w-[12px] bg-[#8FD6B4] rounded-t-[4px]" style={{ height: `${Math.floor(Math.random() * 80) + 20}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <small className="text-[14px] text-[#64748B] font-medium"><span className="text-[#E2E8F0] mr-1">●</span> Durasi Tidur</small>
            <small className="text-[14px] text-[#64748B] font-medium"><span className="text-[#8FD6B4] mr-1">●</span> Skor Mood</small>
          </div>
        </div>
      </section>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* CARD 1: PERSONA */}
        <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
          <h3 className="text-[22px] font-medium mb-6 text-[#1E293B]">Persona Pengguna</h3>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E2E8F0]">
            <div className="w-[56px] h-[56px] rounded-[10px] bg-[#8FD6B4] flex justify-center items-center font-semibold text-[24px] text-[#1E293B]">A</div>
            <h2 className="text-[28px] font-semibold text-[#1E293B]">Andi</h2>
          </div>
          <div className="flex flex-col gap-4 text-[16px]">
            <div className="flex justify-between"><span className="text-[#64748B]">Umur</span><strong className="text-[#1E293B]">20</strong></div>
            <div className="flex justify-between"><span className="text-[#64748B]">Mood Dominan</span><strong className="text-[#1E293B]">Baik</strong></div>
            <div className="flex justify-between"><span className="text-[#64748B]">Stress Level</span><strong className="text-[#4CAF50]">Low</strong></div>
          </div>
        </div>

        {/* CARD 2: DAILY METRICS */}
        <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
          <h3 className="text-[22px] font-medium mb-6 text-[#1E293B]">Daily Metrics Overview</h3>
          
          <div className="bg-[#F1F5F9] p-4 rounded-[10px] mb-4 flex justify-between items-center border border-[#E2E8F0]">
            <div>
              <small className="text-[#64748B] text-[14px] block mb-1">Jurnal Hari Ini</small>
              <strong className="text-[16px] text-[#1E293B]">15 November 2023</strong>
            </div>
            <button onClick={() => navigate('/journal')} className="bg-[#8FD6B4] hover:bg-[#62957c] text-[#FFFFFF] border-none py-2 px-4 rounded-[10px] cursor-pointer transition-colors text-[14px] font-medium">Isi Jurnal</button>
          </div>

          <div className="bg-[#F1F5F9] p-4 rounded-[10px] mb-4 border border-[#E2E8F0]">
            <div className="flex justify-between mb-2 text-[14px]"><span className="text-[#1E293B] font-medium">Sleep Quality</span><strong className="text-[#5B8DEF]">80% (8h)</strong></div>
            <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden"><div className="w-[80%] h-full bg-[#5B8DEF] rounded-full"></div></div>
          </div>

          <div className="bg-[#F1F5F9] p-4 rounded-[10px] border border-[#E2E8F0]">
            <div className="flex justify-between mb-2 text-[14px]"><span className="text-[#1E293B] font-medium">Mood Average</span><strong className="text-[#8FD6B4]">75% (7.5)</strong></div>
            <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden"><div className="w-[75%] h-full bg-[#8FD6B4] rounded-full"></div></div>
          </div>
        </div>

        {/* CARD 3: WEEKLY CHECKUP */}
        <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] xl:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-[22px] font-medium text-[#1E293B]">Weekly Checkup</h3>
            
            {isCheckupDone ? (
              <span className="bg-[#4CAF50]/10 text-[#4CAF50] py-1 px-4 rounded-full text-[14px] font-medium border border-[#4CAF50]/20">Selesai Minggu Ini</span>
            ) : daysLeft > 0 ? (
              <span className="bg-[#E6A23C]/10 text-[#E6A23C] py-1 px-4 rounded-full text-[14px] font-medium border border-[#E6A23C]/20">Sisa {daysLeft} Hari Lagi</span>
            ) : (
              <span className="bg-[#E57373]/10 text-[#E57373] py-1 px-4 rounded-full text-[14px] font-medium border border-[#E57373]/20">Tersedia Hari Ini</span>
            )}
          </div>

          <div className="flex gap-6 items-center mb-8">
            <div>
              <div className="bg-[#F1F5F9] text-[#64748B] py-1 px-3 rounded-[10px] text-[14px] mb-2 inline-block font-medium border border-[#E2E8F0]">Terakhir: {lastCheckupText}</div>
              <p className="text-[#64748B] text-[16px] leading-relaxed">Kondisi minggu lalu terpantau <strong className="text-[#1E293B]">Normal (75%)</strong>.</p>
            </div>
          </div>

          {isCheckupDone ? (
            <button disabled className="w-full bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] py-4 rounded-[10px] font-semibold text-[16px] cursor-not-allowed">Sudah Diisi</button>
          ) : daysLeft > 0 ? (
            <button disabled className="w-full bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] py-4 rounded-[10px] font-semibold text-[16px] cursor-not-allowed">Belum Waktunya</button>
          ) : (
            <button onClick={() => navigate('/checkup')} className="w-full bg-[#8FD6B4] text-[#FFFFFF] border-none py-4 rounded-[10px] font-semibold text-[16px] cursor-pointer hover:bg-[#62957c] transition-colors shadow-sm">Mulai Kuis Mingguan</button>
          )}
        </div>

      </div>
    </Layout>
  );
}