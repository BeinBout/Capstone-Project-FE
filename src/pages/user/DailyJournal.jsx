import React, { useState } from 'react';
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function DailyJournal() {
  const [mood, setMood] = useState('Senang');
  const [sleep, setSleep] = useState(7);
  const [note, setNote] = useState('');
  const [useAI, setUseAI] = useState(false);

  const navigate = useNavigate();

  const moods = [
    { label: 'Sedih', emoji: '😞' },
    { label: 'Biasa saja', emoji: '😐' },
    { label: 'Senang', emoji: '🙂' },
    { label: 'Sangat senang', emoji: '😄' }
  ];

  return (
    <Layout>
      
      <div className="w-full flex justify-center">
        
        <div className="bg-white rounded-2xl p-6 md:p-10 max-w-[1000px] w-full shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            
            {/* KOLOM KIRI */}
            <div className="flex flex-col gap-8">
              
              {/* Form Input Mood */}
              <div>
                <h3 className="text-[22px] font-medium text-gray-800 m-0 mb-2">Expresikan mood anda</h3>
                <p className="text-[#64748B] text-base m-0 mb-4">Bagaimana perasaan anda hari ini?</p>
                <div className="flex flex-wrap md:flex-nowrap gap-4">
                  {moods.map((m) => {
                    const isActive = mood === m.label;
                    return (
                      <button 
                        key={m.label}
                        onClick={() => setMood(m.label)}
                        className={`flex-1 basis-[40%] md:basis-auto flex flex-col items-center p-3 rounded-lg border-none cursor-pointer transition-all duration-200 ${
                          isActive 
                            ? 'bg-[#5B8DEF] text-white shadow-[0_4px_6px_rgba(91,141,239,0.3)]' 
                            : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        <span className="text-[40px] mb-2">{m.emoji}</span>
                        <span className="text-[14px] font-medium">{m.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form Input Jam Tidur */}
              <div>
                <h3 className="text-[22px] font-medium text-gray-800 m-0 mb-2">Jam Tidur</h3>
                <p className="text-[#64748B] text-base m-0 mb-4">Berapa jam anda tidur tadi malam?</p>
                
                <div className="text-center font-semibold text-[22px] mb-4 text-gray-800">{sleep} jam</div>
                
                <div className="flex items-center gap-4">
                  <span className="text-[24px]">😫</span>
                  <input 
                    type="range" 
                    min="0" max="12" step="1"
                    value={sleep}
                    onChange={(e) => setSleep(e.target.value)}
                    className="flex-1 h-2 bg-[#E2E8F0] rounded-lg outline-none accent-[#5B8DEF] cursor-pointer"
                  />
                  <span className="text-[24px]">🤩</span>
                </div>
                <div className="flex justify-between text-[#64748B] text-[12px] mt-2 px-8">
                  {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                    <span key={num}>{num}</span>
                  ))}
                </div>
              </div>

            </div>

            {/* KOLOM KANAN */}
            <div className="flex flex-col gap-8 justify-between">
              
              <div className="flex flex-col gap-8">
                {/* Tanggal Check-in */}
                <div>
                  <h3 className="text-[22px] font-medium text-gray-800 m-0 mb-2">Tanggal check-in</h3>
                  <p className="text-[#64748B] text-base m-0 mb-4">Pilih tanggal berapa anda ingin mengisi check-in</p>
                  <input 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-auto min-w-[200px] p-3 border border-[#E2E8F0] rounded-lg text-base text-[#1E293B] outline-none focus:border-[#5B8DEF]"
                  />
                </div>

                {/* Curhatan */}
                <div>
                  <h3 className="text-[22px] font-medium text-gray-800 m-0 mb-2">Curhatan/Cerita</h3>
                  <p className="text-[#64748B] text-base m-0 mb-4">Ungkapkan cerita yang ingin anda ungkapkan?</p>
                  <textarea 
                    rows="4"
                    maxLength={200}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tuliskan perasaan, kejadian, dan pikiranmu di sini..."
                    className="w-full p-4 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg text-base text-[#1E293B] resize-none outline-none transition-all duration-200 focus:bg-white focus:border-[#5B8DEF]"
                  ></textarea>
                  <div className="text-right text-[#64748B] text-[12px] mt-1">
                    {note.length}/200
                  </div>
                </div>
              </div>

              {/* Toggle AI & Buttons */}
              <div className="flex flex-col gap-6 mt-auto">
                
                <label className="flex items-center gap-3 cursor-pointer font-medium text-gray-800">
                  <div className="relative w-[56px] h-[32px] shrink-0">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={useAI} 
                      onChange={() => setUseAI(!useAI)} 
                    />
                    <div className="absolute inset-0 bg-[#E2E8F0] peer-checked:bg-[#5B8DEF] rounded-full transition-colors duration-300"></div>
                    <div className="absolute left-1 bottom-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                  </div>
                  <span className="text-sm md:text-base text-gray-700">Apakah anda ingin AI menanggapi curhatan/cerita anda?</span>
                </label>

                <div className="flex gap-4 pt-4 border-t border-[#E2E8F0]">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 p-3.5 rounded-lg text-base font-semibold cursor-pointer transition-colors bg-transparent border border-[#5B8DEF] text-[#5B8DEF] hover:bg-[#F0F7FF]"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 p-3.5 rounded-lg text-base font-semibold cursor-pointer transition-colors bg-[#5B8DEF] border border-[#5B8DEF] text-white shadow-[0_4px_6px_rgba(91,141,239,0.2)] hover:bg-[#4a75c7]"
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}