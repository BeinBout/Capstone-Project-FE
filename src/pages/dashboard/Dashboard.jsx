import React, { useState, useEffect } from 'react';
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import DashboardService from '../../services/dashboard/DashboardServices';

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isWCAvailable, setIsWCAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsJson, mainJson, chartJson, wcJson] = await DashboardService.getAllDashboardData();

        if (statsJson.status === 'success') setStats(statsJson.data);
        if (mainJson.status === 'success') setMainData(mainJson.data);
        if (chartJson.status === 'success') setChartData(chartJson.data);
        if (wcJson.status === 'success') setIsWCAvailable(wcJson.data.is_available);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[80vh]">
          <div className="text-[#64748B] font-medium text-lg animate-pulse">Memuat Dashboard...</div>
        </div>
      </Layout>
    );
  }

  // Helper fungsi untuk warna Risk Level
  const getRiskColor = (level) => {
    if (level === 'low') return 'text-[#4CAF50] bg-[#4CAF50]/10 border-[#4CAF50]/20';
    if (level === 'high') return 'text-[#E57373] bg-[#E57373]/10 border-[#E57373]/20';
    return 'text-[#E6A23C] bg-[#E6A23C]/10 border-[#E6A23C]/20';
  };

  return (
    <Layout> 
      
      {/* 1. HEADER STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#FFFFFF] p-5 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0]">
          <small className="text-[#64748B] text-[13px] uppercase font-semibold tracking-wider">Risk Level</small>
          <div className="mt-2 flex items-center gap-2">
            <span className={`text-[13px] px-3 py-1 rounded-full font-semibold border capitalize ${getRiskColor(stats?.risk_level)}`}>
              {stats?.risk_level || 'Unknown'} Risk
            </span>
          </div>
        </div>
        
        <div className="bg-[#FFFFFF] p-5 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0]">
          <small className="text-[#64748B] text-[13px] uppercase font-semibold tracking-wider">Mood Saat Ini</small>
          <h2 className="mt-1 text-[22px] font-bold text-[#1E293B] capitalize">{stats?.mood || '-'}</h2>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0]">
          <small className="text-[#64748B] text-[13px] uppercase font-semibold tracking-wider">Kualitas Tidur</small>
          <h2 className="mt-1 text-[22px] font-bold text-[#5B8DEF] capitalize">{stats?.sleep_quality || '-'}</h2>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0]">
          <small className="text-[#64748B] text-[13px] uppercase font-semibold tracking-wider">Progress Jurnal</small>
          <h2 className="mt-1 text-[22px] font-bold text-[#8FD6B4] capitalize">{stats?.progress_status || '-'}</h2>
        </div>
      </div>

      {/* 2. MIDDLE CONTENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* KIRI: CHART (Update dengan Angka & Tanggal) */}
        <section className="xl:col-span-2 bg-[#FFFFFF] rounded-[16px] p-6 shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0] flex flex-col">
          <h3 className="text-[18px] font-semibold mb-6 text-[#1E293B]">Intensitas Mood & Durasi Tidur (7 Hari)</h3>
          
          <div className="flex-1 flex items-end gap-2 border-b border-[#E2E8F0] pb-2 min-h-[280px]">
            {chartData.length > 0 ? chartData.map((item, i) => {
              // Batas max diturunin jadi 85 supaya ada ruang buat teks angka di atasnya
              const sleepHeight = Math.min((item.sleep_duration_hours / 12) * 85, 85);
              const moodHeight = Math.min((item.mood_intensity / 10) * 85, 85);
              
              // Format tanggal (contoh: "1 Apr")
              const dateObj = new Date(item.date);
              const dateStr = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

              return (
                <div key={i} className="flex flex-col flex-1 items-center justify-end h-full group">
                  
                  {/* Container Bars */}
                  <div className="flex gap-1.5 w-full justify-center items-end h-full">
                    
                    {/* Bar Tidur */}
                    <div className="w-full max-w-[20px] flex flex-col items-center justify-end h-full">
                      <span className="text-[11px] text-[#94A3B8] font-bold mb-1.5 leading-none">
                        {item.sleep_duration_hours}
                      </span>
                      <div className="w-full bg-[#E2E8F0] rounded-t-[4px] transition-all hover:bg-[#cbd5e1]" style={{ height: `${sleepHeight}%` }} title={`Tidur: ${item.sleep_duration_hours} jam`}></div>
                    </div>
                    
                    {/* Bar Mood */}
                    <div className="w-full max-w-[20px] flex flex-col items-center justify-end h-full">
                      <span className="text-[11px] text-[#52b788] font-bold mb-1.5 leading-none">
                        {item.mood_intensity}
                      </span>
                      <div className="w-full bg-[#8FD6B4] rounded-t-[4px] transition-all hover:bg-[#62957c]" style={{ height: `${moodHeight}%` }} title={`Mood: ${item.mood_intensity}/10`}></div>
                    </div>
                  </div>
                  
                  {/* Label Sumbu X (Tanggal) */}
                  <span className="text-[11px] text-[#64748B] font-medium mt-3 whitespace-nowrap">
                    {dateStr}
                  </span>
                </div>
              );
            }) : (
              <p className="w-full text-center text-[#64748B] text-sm pb-8">Data grafik belum tersedia.</p>
            )}
          </div>

          <div className="flex gap-6 mt-6 justify-center">
            <small className="text-[14px] text-[#64748B] font-medium"><span className="text-[#E2E8F0] mr-1">●</span> Durasi Tidur (Jam)</small>
            <small className="text-[14px] text-[#64748B] font-medium"><span className="text-[#8FD6B4] mr-1">●</span> Intensitas Mood</small>
          </div>
        </section>

        {/* KANAN: ACTIONS */}
        <section className="flex flex-col gap-6">
          <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0]">
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-2">Jurnal Hari Ini</h3>
            <p className="text-[#64748B] text-[14px] mb-6 leading-relaxed">
              Catat perasaan dan kualitas tidurmu hari ini agar AI bisa menganalisis kesehatan mentalmu dengan lebih akurat.
            </p>
            <button 
              onClick={() => navigate('/journal')} 
              className="w-full bg-[#8FD6B4] hover:bg-[#62957c] text-white py-3 px-4 rounded-[10px] font-semibold text-[15px] transition-colors shadow-sm"
            >
              Isi Jurnal Sekarang
            </button>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0] flex-1">
            <h3 className="text-[18px] font-semibold mb-4 text-[#1E293B]">Faktor Stres Dominan</h3>
            <div className="flex flex-wrap gap-2.5">
              {stats?.dominant_stressor?.length > 0 ? (
                stats.dominant_stressor.map((stressor, index) => (
                  <span key={index} className="bg-[#F8FAFC] text-[#475569] px-3 py-1.5 rounded-lg text-[13px] font-medium capitalize border border-[#E2E8F0]">
                    {stressor.replace(/_/g, ' ')}
                  </span>
                ))
              ) : (
                <span className="text-[#64748B] text-[14px] italic">Tidak ada pemicu stres terdeteksi.</span>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* 3. BOTTOM SECTION: INSIGHT & RECC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0]">
          <h3 className="text-[18px] font-semibold mb-6 text-[#1E293B]">💡 AI Recommendations</h3>
          {mainData?.recommendations?.length > 0 ? (
            <div className="flex flex-col gap-5">
              {mainData.recommendations.slice(0, 3).map((rec, idx) => (
                <div key={idx} className={`${idx !== 0 ? 'border-t border-[#F1F5F9] pt-5' : ''}`}>
                  <strong className="block text-[#1E293B] text-[15px] mb-1.5">{rec.focus}</strong>
                  <p className="text-[#475569] text-[14px] leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#64748B] text-sm italic">Sering-sering isi jurnal ya agar AI bisa memberikan rekomendasi terbaik buat kamu.</p>
          )}
        </div>

        <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_4px_12px_rgba(30,41,59,0.03)] border border-[#E2E8F0] flex flex-col justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-4">Weekly Insight</h3>
            <div className="bg-[#F8FAFC] p-5 rounded-[12px] border border-[#E2E8F0] mb-8">
              <p className="text-[#475569] text-[14px] leading-relaxed italic text-center">
                "{mainData?.weekly_insight || "Cek kondisi mentalmu minggu ini untuk mendapatkan insight terbaru tentang perkembanganmu."}"
              </p>
            </div>
          </div>
          
          <div>
            {isWCAvailable ? (
              <button 
                onClick={() => navigate('/checkup')} 
                className="w-full bg-[#1E293B] hover:bg-[#334155] text-white py-3.5 px-6 rounded-[10px] font-semibold text-[15px] transition-colors shadow-sm"
              >
                Mulai Weekly Checkup
              </button>
            ) : (
              <button 
                disabled 
                className="w-full bg-[#F8FAFC] text-[#94A3B8] py-3.5 px-6 rounded-[10px] font-semibold text-[15px] border border-[#E2E8F0] cursor-not-allowed"
              >
                Weekly Checkup Belum Tersedia
              </button>
            )}
          </div>
        </div>

      </div>

    </Layout>
  );
}