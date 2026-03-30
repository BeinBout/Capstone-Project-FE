import React, { useState } from 'react';
import Layout from '../components/Sidebar';
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
      
      {/* 1. TOP CARD: AI SUMMARY DAN CHART */}
      <section className="bg-white rounded-2xl md:rounded-[16px] p-5 md:p-8 mb-6 flex flex-col md:flex-row gap-6 md:gap-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex-1">
          <h2 className="text-[22px] font-bold mb-4 text-gray-800">AI Analysis Summary</h2>
          <p className="text-[#475569] leading-[1.6] mb-6">
            Anda mengalami hari-hari yang melelahkan akhir-akhir ini. Sistem mendeteksi stres ringan di malam hari. Ambil cuti dan beristirahatlah sejenak.
          </p>
          <small className="text-[#64748B] font-semibold tracking-[1px] text-[12px] uppercase block mb-2">Overall Mood Score</small>
          <h1 className="text-[48px] font-bold text-[#1E293B]">8.0<span className="text-[24px] text-[#94A3B8] font-normal">/10</span></h1>
        </div>

        <div className="flex-[1.5] flex flex-col justify-end">
          <div className="flex items-end h-[150px] md:h-[180px] gap-3 border-b-2 border-[#F1F5F9] pb-4">
            {['01', '02', '03', '04', '05', '06', '07'].map((hari, i) => (
              <div key={i} className="flex gap-1 flex-1 justify-center items-end h-full">
                <div className="w-[8px] sm:w-[12px] bg-[#5B8DEF] rounded-t-[4px]" style={{ height: `${Math.floor(Math.random() * 60) + 40}%` }}></div>
                <div className="w-[8px] sm:w-[12px] bg-[#8FD6B4] rounded-t-[4px]" style={{ height: `${Math.floor(Math.random() * 80) + 20}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <small className="text-gray-600 font-medium"><span className="text-[#5B8DEF]">●</span> Durasi Tidur</small>
            <small className="text-gray-600 font-medium"><span className="text-[#8FD6B4]">●</span> Skor Mood</small>
          </div>
        </div>
      </section>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: PERSONA */}
        <div className="bg-white p-5 md:p-8 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Persona Pengguna</h3>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F1F5F9]">
            <div className="w-[56px] h-[56px] rounded-full bg-[#FDE68A] flex justify-center items-center font-bold text-[24px] text-gray-800">A</div>
            <h2 className="text-[24px] font-bold text-gray-800">Andi</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between"><span className="text-[#64748B]">Umur</span><strong className="text-gray-800">20</strong></div>
            <div className="flex justify-between"><span className="text-[#64748B]">Mood Dominan</span><strong className="text-gray-800">Baik</strong></div>
            <div className="flex justify-between"><span className="text-[#64748B]">Stress Level</span><strong className="text-[#4CAF50]">Low</strong></div>
          </div>
        </div>

        {/* CARD 2: DAILY METRICS */}
        <div className="bg-white p-5 md:p-8 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Daily Metrics Overview</h3>
          <div className="bg-[#F8FAFC] p-4 rounded-[16px] mb-4 flex justify-between items-center border border-[#E2E8F0]">
            <div>
              <small className="text-[#64748B] block mb-1">Jurnal Hari Ini</small>
              <strong className="text-[16px] text-gray-800">15 November 2023</strong>
            </div>
            <button onClick={() => navigate('/journal')} className="bg-[#5B8DEF] hover:bg-blue-600 text-white border-none py-2 px-4 rounded-lg cursor-pointer transition-colors font-medium">Isi Jurnal</button>
          </div>

          <div className="bg-[#5B8DEF] p-4 rounded-[16px] text-white mb-4">
            <div className="flex justify-between mb-2"><span>💤 Sleep Quality</span><strong>80% (8h)</strong></div>
            <div className="h-[8px] bg-white/30 rounded-[4px] overflow-hidden"><div className="w-[80%] h-full bg-white rounded-[4px]"></div></div>
          </div>

          <div className="bg-[#EAB308] p-4 rounded-[16px] text-white">
            <div className="flex justify-between mb-2"><span>😊 Mood Average</span><strong>75% (7.5)</strong></div>
            <div className="h-[8px] bg-white/30 rounded-[4px] overflow-hidden"><div className="w-[75%] h-full bg-white rounded-[4px]"></div></div>
          </div>
        </div>

        {/* CARD 3: WEEKLY CHECKUP*/}
        <div className="bg-white p-5 md:p-8 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-bold text-gray-800">Weekly Checkup</h3>
            
            {isCheckupDone ? (
              <span className="bg-[#D1FAE5] text-[#065F46] py-1 px-3 rounded-[20px] text-[12px] font-bold self-start sm:self-auto">✅ Selesai Minggu Ini</span>
            ) : daysLeft > 0 ? (
              <span className="bg-[#FEE2E2] text-[#EF4444] py-1 px-3 rounded-[20px] text-[12px] font-bold self-start sm:self-auto">⏳ Sisa {daysLeft} Hari Lagi</span>
            ) : (
              <span className="bg-[#EFF6FF] text-[#1E40AF] py-1 px-3 rounded-[20px] text-[12px] font-bold self-start sm:self-auto">🔴 Tersedia Hari Ini</span>
            )}
          </div>

          <div className="flex gap-6 items-center mb-6">
            <div className="text-[64px]">🩺</div>
            <div>
              <div className="bg-[#4CAF50] text-white py-1 px-3 rounded-lg text-[14px] mb-2 inline-block font-medium">Terakhir: {lastCheckupText}</div>
              <p className="text-[#64748B] text-[14px] leading-relaxed">Kondisi minggu lalu terpantau <strong className="text-gray-800">Normal (75%)</strong>.</p>
            </div>
          </div>

          {isCheckupDone ? (
            <button disabled className="w-full bg-[#E2E8F0] text-[#94A3B8] border-none py-[14px] rounded-[12px] font-bold text-[16px] cursor-not-allowed">Sudah Diisi</button>
          ) : daysLeft > 0 ? (
            <button disabled className="w-full bg-[#E2E8F0] text-[#94A3B8] border-none py-[14px] rounded-[12px] font-bold text-[16px] cursor-not-allowed">Belum Waktunya</button>
          ) : (
            <button onClick={() => navigate('/checkup')} className="w-full bg-[#5B8DEF] hover:bg-blue-600 text-white border-none py-[14px] rounded-[12px] font-bold text-[16px] cursor-pointer transition-colors shadow-sm">Mulai Kuis Mingguan</button>
          )}
        </div>

      </div>
    </Layout>
  );
}