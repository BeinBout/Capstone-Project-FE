import React, { useState, useEffect } from 'react';
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { createJournal, getAllJournals } from '../../services/dashboard/JournalServices';
import useAuth from '../../hooks/useAuth'

// Sleep quality calculation based on age
const getSleepQuality = (age, sleepHours) => {
  // Age categories and their sleep recommendations
  if (age >= 14 && age <= 17) {
    // Teenagers: Bad = <7 or >11, Good = 7-11, Excellent = 8-10
    if (sleepHours < 7 || sleepHours > 11) return 'poor';
    if (sleepHours >= 8 && sleepHours <= 10) return 'excellent';
    return 'good';
  } else if (age >= 18 && age <= 25) {
    // Young Adults: Bad = <6 or >11, Good = 6-11, Excellent = 7-9
    if (sleepHours < 6 || sleepHours > 11) return 'poor';
    if (sleepHours >= 7 && sleepHours <= 9) return 'excellent';
    return 'good';
  } else if (age >= 26 && age <= 64) {
    // Adults: Bad = <6 or >10, Good = 6-10, Excellent = 7-9
    if (sleepHours < 6 || sleepHours > 10) return 'poor';
    if (sleepHours >= 7 && sleepHours <= 9) return 'excellent';
    return 'good';
  } else if (age >= 65) {
    // Older Adults: Bad = <5 or >9, Good = 5-9, Excellent = 7-8
    if (sleepHours < 5 || sleepHours > 9) return 'poor';
    if (sleepHours >= 7 && sleepHours <= 8) return 'excellent';
    return 'good';
  }
  return 'good'; // Default
};

// Word counter function
const countWords = (text) => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

// Calculate sleep duration from sleep time and wake time
const calculateSleepDuration = (sleepTime, wakeTime) => {
  const [sleepHour, sleepMin] = sleepTime.split(':').map(Number);
  const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);
  
  let sleepMinutes = sleepHour * 60 + sleepMin;
  let wakeMinutes = wakeHour * 60 + wakeMin;
  
  // If wake time is earlier than sleep time, assume next day
  if (wakeMinutes < sleepMinutes) {
    wakeMinutes += 24 * 60;
  }
  
  const durationMinutes = wakeMinutes - sleepMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return { hours, minutes, totalHours: durationMinutes / 60 };
};

export default function DailyJournal() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userAge = user?.user?.umur;

  // Mood state
  const [mood, setMood] = useState('');
  const [moodIntensity, setMoodIntensity] = useState(3);
  
  // Sleep state - now using time pickers
  const [sleepTime, setSleepTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('06:00');
  
  // Journal content
  const [note, setNote] = useState('');
  
  // AI toggle 
  const [useAI, setUseAI] = useState(true);
  
  // Calendar state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filledDates, setFilledDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const moods = [
    { label: 'sad', emoji: '😢', display: 'Sedih' },
    { label: 'anxious', emoji: '😰', display: 'Cemas' },
    { label: 'neutral', emoji: '😐', display: 'Biasa' },
    { label: 'happy', emoji: '🙂', display: 'Senang' },
    { label: 'excited', emoji: '😄', display: 'Sangat Senang' }
  ];

  // Fetch existing journals to mark filled dates
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournals();
        if (response.status === 'success' && response.data) {
          const dates = response.data.map(j => j.entry_date.split('T')[0]);
          setFilledDates(dates);
        }
      } catch (err) {
        console.error('Error fetching journals:', err);
      }
    };
    fetchJournals();
  }, []);

  // Calculate sleep duration and quality
  const sleepDuration = calculateSleepDuration(sleepTime, wakeTime);
  const sleepQuality = getSleepQuality(userAge, sleepDuration.totalHours);

  // Calculate daily metrics (average of mood intensity and sleep quality score)
  const getSleepQualityScore = () => {
    switch (sleepQuality) {
      case 'excellent': return 5;
      case 'good': return 3;
      case 'poor': return 1;
      default: return 3;
    }
  };

  // Word count
  const wordCount = countWords(note);
  const maxWords = 600;

  // Handle text change with word limit
  const handleNoteChange = (e) => {
    const text = e.target.value;
    const words = countWords(text);
    if (words <= maxWords) {
      setNote(text);
    }
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  // Format date for API
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  // Check if date is filled
  const isDateFilled = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = formatDateForAPI(checkDate);
    return filledDates.includes(formattedDate);
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  // Navigate months
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Month names
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Save journal
  const handleSaveJournal = async () => {
    if (!mood) {
      setError('Pilih mood Anda terlebih dahulu');
      return;
    }
    if (!note.trim()) {
      setError('Tulis jurnal Anda terlebih dahulu');
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const journalData = {
        journal_date: formatDateForAPI(selectedDate),
        mood: mood,
        mood_intensity: moodIntensity,
        sleep_time: sleepTime,
        wake_time: wakeTime,
        sleep_quality: sleepQuality,
        content: note,
        is_private: !useAI 
      };

      await createJournal(journalData);
      
      // Add date to filled dates
      const newFilledDate = formatDateForAPI(selectedDate);
      if (!filledDates.includes(newFilledDate)) {
        setFilledDates([...filledDates, newFilledDate]);
      }
      
      setSuccess('Jurnal berhasil disimpan!');
      
      // Reset form
      setNote('');
      setMood('');
      setMoodIntensity(3);
      
      // Redirect to journal list after 1.5 seconds
      setTimeout(() => {
        navigate('/journal');
      }, 1500);
      
    } catch (err) {
      const message = err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-[16px] p-6 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
          
          {/* DATE HEADER */}
          <div className="bg-[#A8C4E9]/20 p-4 rounded-[10px] mb-8 border border-[#5B8DEF]/20 flex items-center justify-between">
            <div>
              <span className="text-[14px] text-[#66a67b] block mb-1">Mencatat Jurnal Untuk:</span>
              <h2 className="text-[22px] font-semibold text-[#8FD6B4] m-0">{formatDateForDisplay(selectedDate)}</h2>
            </div>
            <div className="flex items-center gap-4">
              {isDateFilled(selectedDate.getDate()) && (
                <span className="bg-[#8FD6B4] text-white py-1 px-3 rounded-full text-[12px] font-semibold">Sudah Diisi</span>
              )}
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-[10px] bg-red-50 border border-red-200 text-red-600 text-[14px]">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-3 rounded-[10px] bg-green-50 border border-green-200 text-green-600 text-[14px]">
              {success}
            </div>
          )}

          <div className="flex flex-col gap-8">
            
            <div>
              <h3 className="text-[22px] font-medium text-[#1E293B] mb-2">Ekspresikan mood Anda</h3>
              <p className="text-[16px] text-[#64748B] mb-4">Bagaimana perasaan Anda hari ini?</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {moods.map((m) => {
                  const isActive = mood === m.label;
                  return (
                    <button 
                      key={m.label}
                      onClick={() => setMood(m.label)}
                      className={`flex flex-col items-center p-4 rounded-[10px] border cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? 'bg-[#8FD6B4] text-[#FFFFFF] border-[#8FD6B4] shadow-[0_4px_12px_rgba(91,141,239,0.3)]' 
                          : 'bg-[#FFFFFF] text-[#64748B] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      <span className="text-[36px] mb-2">{m.emoji}</span>
                      <span className="text-[14px] font-medium">{m.display}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Mood Intensity Slider */}
            <div>
              <h3 className="text-[22px] font-medium text-[#1E293B] mb-2">Intensitas Mood</h3>
              <p className="text-[16px] text-[#64748B] mb-4">Seberapa kuat perasaan ini? (1-5)</p>
              
              <div className="text-center font-semibold text-[22px] mb-4 text-[#1E293B]">
                Intensitas: {moodIntensity}
              </div>
              
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1" max="5" step="1"
                  value={moodIntensity}
                  onChange={(e) => setMoodIntensity(Number(e.target.value))}
                  className="flex-1 h-2 bg-[#F1F5F9] rounded-[10px] outline-none accent-[#8FD6B4] cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[#64748B] text-[14px] mt-2 px-4">
                {[1, 2, 3, 4, 5].map(num => (
                  <span 
                    key={num} 
                    className={moodIntensity === num ? 'text-[#8FD6B4] font-bold' : ''}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>

            {/* Sleep Time Pickers */}
            <div>
              <h3 className="text-[22px] font-medium text-[#1E293B] mb-2">Waktu Tidur</h3>
              <p className="text-[16px] text-[#64748B] mb-4">Jam berapa Anda tidur dan bangun?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Sleep Time */}
                <div className="bg-[#F1F5F9] p-4 rounded-[10px] border border-[#E2E8F0]">
                  <label className="text-[14px] text-[#64748B] block mb-2">Jam Tidur</label>
                  <input 
                    type="time"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    className="w-full p-3 bg-white border border-[#E2E8F0] rounded-[8px] text-[18px] text-[#1E293B] outline-none focus:border-[#5B8DEF] transition-colors"
                  />
                </div>
                
                {/* Wake Time */}
                <div className="bg-[#F1F5F9] p-4 rounded-[10px] border border-[#E2E8F0]">
                  <label className="text-[14px] text-[#64748B] block mb-2">Jam Bangun</label>
                  <input 
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full p-3 bg-white border border-[#E2E8F0] rounded-[8px] text-[18px] text-[#1E293B] outline-none focus:border-[#5B8DEF] transition-colors"
                  />
                </div>
              </div>

              {/* Sleep Duration & Quality Display */}
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px] bg-[#A8C4E9]/20 p-4 rounded-[10px] border border-[#5B8DEF]/20">
                  <span className="text-[14px] text-[#64748B] block mb-1">Durasi Tidur</span>
                  <span className="text-[20px] font-bold text-[#5B8DEF]">
                    {sleepDuration.hours} jam {sleepDuration.minutes} menit
                  </span>
                </div>
                <div className={`flex-1 min-w-[150px] p-4 rounded-[10px] border ${
                  sleepQuality === 'excellent' ? 'bg-green-50 border-green-200' :
                  sleepQuality === 'good' ? 'bg-blue-50 border-blue-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <span className="text-[14px] text-[#64748B] block mb-1">Kualitas Tidur</span>
                  <span className={`text-[20px] font-bold ${
                    sleepQuality === 'excellent' ? 'text-green-600' :
                    sleepQuality === 'good' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {sleepQuality === 'excellent' ? 'Sangat Baik' :
                     sleepQuality === 'good' ? 'Baik' : 'Kurang Baik'}
                  </span>
                </div>
              </div>

              {/* Sleep Recommendation Info */}
              <div className="mt-4 p-3 bg-[#F8FAFC] rounded-[8px] text-[13px] text-[#64748B]">
                <strong>Info:</strong> Berdasarkan usia Anda ({userAge} tahun), durasi tidur ideal adalah{' '}
                {userAge >= 14 && userAge <= 17 ? '8-10 jam' :
                 userAge >= 18 && userAge <= 25 ? '7-9 jam' :
                 userAge >= 26 && userAge <= 64 ? '7-9 jam' : '7-8 jam'}.
              </div>
            </div>

            {/* Journal Content */}
            <div>
              <h3 className="text-[22px] font-medium text-[#1E293B] mb-2">Jurnal Hari Ini</h3>
              <p className="text-[16px] text-[#64748B] mb-4">Tuliskan kejadian atau perasaanmu hari ini. (Maksimal {maxWords} kata)</p>
              <textarea 
                rows="6"
                value={note}
                onChange={handleNoteChange}
                placeholder="Hari ini aku merasa..."
                className="w-full p-4 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[10px] text-[16px] text-[#1E293B] resize-none outline-none focus:border-[#5B8DEF] transition-colors"
              ></textarea>
              <div className={`text-right text-[14px] mt-2 ${wordCount >= maxWords ? 'text-red-500' : 'text-[#64748B]'}`}>
                {wordCount}/{maxWords} kata
              </div>
            </div>

            {/* AI Toggle & Buttons */}
            <div className="flex flex-col gap-6 pt-4 border-t border-[#E2E8F0]">
              <label className="flex items-center gap-4 cursor-pointer">
                <div className="relative w-12 h-6 shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={useAI} 
                    onChange={() => setUseAI(!useAI)} 
                  />
                  <div className="absolute inset-0 bg-[#E2E8F0] peer-checked:bg-[#5B8DEF] rounded-full transition-colors duration-300"></div>
                  <div className="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                </div>
                <span className="text-[16px] text-[#1E293B] font-medium">Beri tanggapan AI untuk cerita ini</span>
              </label>
              
              {!useAI && (
                <p className="text-[14px] text-[#64748B] -mt-2 ml-16">
                  Jurnal akan bersifat privat dan tidak akan dianalisis oleh AI.
                </p>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/journal')} 
                  className="flex-1 py-4 rounded-[10px] text-[16px] font-semibold cursor-pointer border border-[#E2E8F0] text-[#64748B] bg-transparent hover:bg-[#F1F5F9]"
                >
                  Lihat Semua Jurnal
                </button>
                <button 
                  onClick={handleSaveJournal} 
                  disabled={isLoading}
                  className="flex-1 py-4 rounded-[10px] text-[16px] font-semibold cursor-pointer border-none bg-[#8FD6B4] text-[#FFFFFF] hover:bg-[#62957c] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Menyimpan...' : 'Simpan Jurnal'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CALENDAR */}
        <div className="bg-[#FFFFFF] rounded-[16px] p-6 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] h-fit sticky top-28">
          <h3 className="text-[22px] font-medium text-[#1E293B] mb-2">Pilih Tanggal</h3>
          <p className="text-[14px] text-[#64748B] mb-6">Klik tanggal pada kalender untuk mengisi jurnal.</p>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={prevMonth}
              className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <strong className="text-[16px] text-[#1E293B]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </strong>
            <button 
              onClick={nextMonth}
              className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((day, i) => (
              <div key={i} className="text-[#64748B] text-[14px] font-medium">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center">
            {/* Empty cells for days before the first of the month */}
            {Array.from({ length: startingDay }, (_, i) => (
              <div key={`empty-${i}`} className="w-9 h-9"></div>
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(date => {
              const isFilled = isDateFilled(date);
              const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
              const isSelected = selectedDate.toDateString() === checkDate.toDateString();
              const isToday = new Date().toDateString() === checkDate.toDateString();
              
              return (
                <button 
                  key={date} 
                  onClick={() => handleDateSelect(date)}
                  className={`w-9 h-9 mx-auto flex items-center justify-center rounded-full text-[14px] font-medium cursor-pointer transition-all border-none ${
                    isSelected 
                      ? isFilled 
                        ? 'bg-[#8FD6B4] text-white ring-2 ring-offset-2 ring-[#5B8DEF]'
                        : 'bg-[#5B8DEF] text-white shadow-md'
                      : isFilled
                        ? 'bg-[#8FD6B4] text-white hover:opacity-80'
                        : isToday
                          ? 'bg-[#F1F5F9] text-[#5B8DEF] font-bold ring-1 ring-[#5B8DEF]'
                          : 'bg-transparent text-[#64748B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  {date}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-col gap-3 border-t border-[#E2E8F0] pt-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#8FD6B4]"></div>
              <span className="text-[14px] text-[#64748B]">Jurnal Terisi</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#5B8DEF]"></div>
              <span className="text-[14px] text-[#64748B]">Tanggal Dipilih</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#F1F5F9] ring-1 ring-[#5B8DEF]"></div>
              <span className="text-[14px] text-[#64748B]">Hari Ini</span>
            </div>
          </div>

          {/* Quick Link to Journal List */}
          <button 
            onClick={() => navigate('/journal')}
            className="mt-6 w-full py-3 rounded-[10px] text-[14px] font-semibold cursor-pointer border border-[#5B8DEF] text-[#5B8DEF] bg-transparent hover:bg-[#5B8DEF]/10 transition-colors"
          >
            Lihat Semua Jurnal
          </button>
        </div>

      </div>
    </Layout>
  );
}
