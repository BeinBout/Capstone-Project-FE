import React, { useState, useEffect } from 'react';
import Layout from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { getJournalById } from '../../services/dashboard/JournalServices';

const moodEmojis = {
  sad: '😢',
  anxious: '😰',
  neutral: '😐',
  happy: '🙂',
  excited: '😄'
};

const moodLabels = {
  sad: 'Sedih',
  anxious: 'Cemas',
  neutral: 'Biasa',
  happy: 'Senang',
  excited: 'Sangat Senang'
};

const moodColors = {
  sad: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700' },
  anxious: { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700' },
  neutral: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-700' },
  happy: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700' },
  excited: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700' }
};

const sleepQualityLabels = {
  excellent: { label: 'Sangat Baik', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  good: { label: 'Baik', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  poor: { label: 'Kurang Baik', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
};

export default function JournalDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [journal, setJournal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        setIsLoading(true);
        const response = await getJournalById(id);
        if (response.status === 'success' && response.data) {
          setJournal(response.data);
        }
      } catch (err) {
        console.error('Error fetching journal:', err);
        setError('Jurnal tidak ditemukan atau terjadi kesalahan.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournal();
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  // Format time
  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString;
  };

  const getMoodStyle = () => {
    return moodColors[journal?.mood] || moodColors.neutral;
  };
  const getSleepQualityStyle = () => {
    return sleepQualityLabels[journal?.sleep_quality] || sleepQualityLabels.good;
  };

  // Loading State
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FFFFFF] rounded-[16px] p-12 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#5B8DEF] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#64748B]">Memuat jurnal...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error State
  if (error && !journal) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 rounded-[16px] p-6 border border-red-200 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/journal')}
              className="px-4 py-2 rounded-[8px] bg-red-100 text-red-600 border-none cursor-pointer hover:bg-red-200"
            >
              Kembali ke Daftar Jurnal
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/journal')}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#1E293B] mb-6 bg-transparent border-none cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Kembali ke Daftar Jurnal
        </button>

        {/* Main Card */}
        <div className="bg-[#FFFFFF] rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#A8C4E9]/20 p-6 border-b border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {/* Mood Emoji */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-[36px] ${getMoodStyle().bg} ${getMoodStyle().border} border-2`}>
                  {moodEmojis[journal?.mood] || '😐'}
                </div>
                
                <div>
                  <h1 className="text-[24px] font-semibold text-[#1E293B] mb-1">
                    {formatDate(journal?.entry_date)}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className={`text-[16px] font-medium ${getMoodStyle().text}`}>
                      {moodLabels[journal?.mood] || journal?.mood}
                    </span>
                    <span className="text-[#64748B]">-</span>
                    <span className="text-[#64748B]">Intensitas {journal?.mood_intensity}/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Intensity Bar */}
            <div className="bg-white rounded-[8px] p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[12px] text-[#64748B]">Intensitas Mood</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(level => (
                  <div 
                    key={level}
                    className={`flex-1 h-2 rounded-full ${
                      level <= journal?.mood_intensity 
                        ? 'bg-[#8FD6B4]' 
                        : 'bg-[#E2E8F0]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sleep Info */}
          <div className="p-6 border-b border-[#E2E8F0]">
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-4">Informasi Tidur</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Sleep Time */}
              <div className="bg-[#F8FAFC] p-4 rounded-[10px]">
                <span className="text-[12px] text-[#64748B] block mb-1">Jam Tidur</span>
                <span className="text-[18px] font-semibold text-[#1E293B]">
                  {formatTime(journal?.sleep_time)}
                </span>
              </div>

              {/* Wake Time */}
              <div className="bg-[#F8FAFC] p-4 rounded-[10px]">
                <span className="text-[12px] text-[#64748B] block mb-1">Jam Bangun</span>
                <span className="text-[18px] font-semibold text-[#1E293B]">
                  {formatTime(journal?.wake_time)}
                </span>
              </div>

              {/* Duration */}
              <div className="bg-[#F8FAFC] p-4 rounded-[10px]">
                <span className="text-[12px] text-[#64748B] block mb-1">Durasi</span>
                <span className="text-[18px] font-semibold text-[#5B8DEF]">
                  {journal?.sleep_duration_hours ? `${journal.sleep_duration_hours} jam` : '-'}
                </span>
              </div>

              {/* Quality */}
              <div className={`p-4 rounded-[10px] ${getSleepQualityStyle().bg} ${getSleepQualityStyle().border} border`}>
                <span className="text-[12px] text-[#64748B] block mb-1">Kualitas</span>
                <span className={`text-[18px] font-semibold ${getSleepQualityStyle().color}`}>
                  {getSleepQualityStyle().label}
                </span>
              </div>
            </div>
          </div>

          {/* Journal Content */}
          <div className="p-6 border-b border-[#E2E8F0]">
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-4">Jurnal</h3>
            <div className="bg-[#F8FAFC] p-5 rounded-[10px]">
              <p className="text-[16px] text-[#1E293B] leading-relaxed whitespace-pre-wrap">
                {journal?.content || 'Tidak ada konten.'}
              </p>
            </div>
          </div>

          {/* AI Reflection */}
          {!journal?.is_private && journal?.ai_reflection && (
            <div className="p-6 border-b border-[#E2E8F0] bg-[#A8C4E9]/10">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-[18px] font-semibold text-[#1E293B]">Tanggapan AI</h3>
              </div>
              <div className="bg-white p-5 rounded-[10px] border border-[#5B8DEF]/20">
                <p className="text-[16px] text-[#1E293B] leading-relaxed whitespace-pre-wrap">
                  {journal.ai_reflection}
                </p>
              </div>

              {/* AI Tags */}
              {journal.ai_tags && journal.ai_tags.length > 0 && (
                <div className="mt-4">
                  <span className="text-[14px] text-[#64748B] block mb-2">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {journal.ai_tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white rounded-full text-[13px] text-[#5B8DEF] border border-[#5B8DEF]/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Sentiment Score */}
              {journal.ai_sentiment_score !== undefined && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[14px] text-[#64748B]">Skor Sentimen:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#8FD6B4] rounded-full"
                        style={{ width: `${journal.ai_sentiment_score * 100}%` }}
                      />
                    </div>
                    <span className="text-[14px] font-medium text-[#1E293B]">
                      {(journal.ai_sentiment_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}

              {/* Anomaly Warning */}
              {journal.ai_anomaly_detected && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-[8px] flex items-center gap-2">
                  <span className="text-[18px]">⚠️</span>
                  <span className="text-[14px] text-orange-700">
                    AI mendeteksi pola yang tidak biasa dalam jurnal ini.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="p-6 bg-[#F8FAFC]">
            <div className="flex items-center justify-between text-[14px] text-[#64748B]">
              <span>
                Dibuat: {journal?.created_at ? new Date(journal.created_at).toLocaleString('id-ID') : '-'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}
