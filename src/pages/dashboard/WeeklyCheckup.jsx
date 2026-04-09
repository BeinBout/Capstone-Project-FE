import React, { useState, useEffect, useCallback } from 'react'; 
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getWeeklyQuestions, submitWeeklyCheckup } from '../../services/dashboard/WeeklyCheckupServices';
import DashboardService from '../../services/dashboard/DashboardServices';
import { ChevronLeft, ChevronRight, ShieldCheck, Loader2, Clock } from 'lucide-react';

export default function WeeklyCheckup() {
  const navigate = useNavigate();
  
  // State for quiz data
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); 
  const [answers, setAnswers] = useState([]);
  
  // State for availability
  const [isAvailable, setIsAvailable] = useState(true);

  // State for loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  
  // State for result
  const [checkupResult, setCheckupResult] = useState(null);

  // Load questions from API
  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setApiError("");
    try {
      // 1. Cek Ketersediaan
      const [statsJson, mainJson, chartJson, wcJson] = await DashboardService.getAllDashboardData();
      
      if (wcJson?.data?.is_available === false) {
        setIsAvailable(false);
        setIsLoading(false);
        return; 
      }

      // 2. Load Kuis
      const res = await getWeeklyQuestions();
      const data = Array.isArray(res?.data?.data) ? res.data.data : (Array.isArray(res?.data) ? res.data : []);

      if (data.length === 0) {
        setIsAvailable(false);
        setIsLoading(false);
        return;
      }

      setQuizQuestions(data);
      setAnswers(new Array(data.length).fill(null));
    } catch (err) {
      setApiError(err?.response?.data?.message || "Gagal memuat data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const totalQuestions = quizQuestions.length;

  const handleAnswer = (questionId, optionId) => {
    const questionIndex = currentStep - 1;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      question_id: questionId,
      selected_option_id: optionId
    };
    setAnswers(newAnswers);

    if (currentStep < totalQuestions) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setApiError("");
    try {
      const res = await submitWeeklyCheckup(answers);
      setCheckupResult(res.data);
      setCurrentStep(totalQuestions + 2);
    } catch (err) {
      setApiError(err?.response?.data?.message || "Gagal mengirim jawaban.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = totalQuestions > 0 ? ((currentStep) / totalQuestions) * 100 : 0;
  const isLastQuestion = currentStep === totalQuestions;
  const isAllAnswered = answers.every(ans => ans !== null);

  let content;

  // --- 1. LOADING STATE ---
  if (isLoading) {
    content = (
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#8FD6B4]" />
          <p className="text-[#64748B] font-medium">Memuat Data...</p>
        </div>
      </div>
    );
  }

  // --- 2. JIKA BELUM TERSEDIA ---
  else if (!isAvailable) {
    content = (
      <div className="w-full min-h-[70vh] flex justify-center items-center py-8">
        <div className="bg-[#FFFFFF] w-full max-w-[600px] p-8 md:p-12 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-[#64748B]" />
          </div>
          <h2 className="text-[24px] font-semibold text-[#1E293B] mb-4">Weekly Checkup Belum Tersedia</h2>
          <p className="text-[#64748B] mb-8 leading-relaxed text-[16px]">
            Kamu sudah mengisi Weekly Checkup untuk minggu ini. Silakan kembali lagi minggu depan untuk melihat ketersediaan checkup berikutnya.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#8FD6B4] hover:bg-[#62957c] text-[#FFFFFF] py-3.5 px-8 rounded-[10px] font-semibold text-[15px] transition-colors border-none cursor-pointer w-full max-w-[300px]"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- 3. ERROR STATE ---
  else if (apiError && currentStep !== totalQuestions + 2) {
    content = (
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <div className="bg-[#FFFFFF] w-full max-w-[800px] p-8 md:p-12 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] text-center">
          <h2 className="text-[28px] font-semibold text-[#1E293B] mb-4">Terjadi Kesalahan</h2>
          <p className="text-[#EF4444] mb-8 leading-relaxed text-[16px] bg-red-50 px-4 py-3 rounded-lg">
            {apiError}
          </p>
          <button 
            onClick={loadQuestions}
            className="bg-[#8FD6B4] hover:bg-[#62957c] text-[#FFFFFF] py-4 px-8 rounded-[10px] font-semibold text-[16px] transition-colors border-none cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // --- 4. RESULT PAGE ---
  else if (currentStep === totalQuestions + 2 && checkupResult) {
    const data = checkupResult.data;
    const insights = data?.ai_insights;
    
    const getRiskColor = (level) => {
      switch(level?.toLowerCase()) {
        case 'low': return 'text-green-600 bg-green-50';
        case 'medium': return 'text-yellow-600 bg-yellow-50';
        case 'high': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    const getProgressColor = (status) => {
      switch(status?.toLowerCase()) {
        case 'improvement': return 'text-green-600';
        case 'stable': return 'text-blue-600';
        case 'significant_deterioration':
        case 'deterioration': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };

    content = (
      <div className="w-full min-h-[70vh] flex justify-center items-start py-8">
        <div className="w-full max-w-[900px] space-y-6">
          <div className="bg-[#FFFFFF] p-8 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#8FD6B4]/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#8FD6B4]" />
              </div>
              <div>
                <h2 className="text-[24px] font-semibold text-[#1E293B]">Weekly Checkup Selesai!</h2>
                <p className="text-[#64748B] text-sm">Berikut adalah hasil analisis kondisi mentalmu minggu ini</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-4">Ringkasan AI</h3>
            <p className="text-[#64748B] leading-relaxed">{data?.ai_summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Tingkat Risiko</h3>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full font-medium capitalize ${getRiskColor(insights?.risk_level)}`}>
                  {insights?.risk_level || 'N/A'}
                </span>
                <span className="text-[#64748B]">Skor: <strong className="text-[#1E293B]">{insights?.risk_score || 0}</strong></span>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Status Progres</h3>
              <p className={`font-medium capitalize ${getProgressColor(insights?.progress_status)}`}>
                {insights?.progress_status?.replace(/_/g, ' ') || 'N/A'}
              </p>
            </div>
          </div>

          {insights?.dominant_stressor?.length > 0 && (
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Sumber Stres Utama</h3>
              <div className="flex flex-wrap gap-2">
                {insights.dominant_stressor.map((stressor, idx) => (
                  <span key={idx} className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium capitalize">
                    {stressor.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {insights?.weekly_insight && (
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Insight Mingguan</h3>
              <p className="text-[#64748B] leading-relaxed">{insights.weekly_insight}</p>
            </div>
          )}

          {insights?.recommendations?.length > 0 && (
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Rekomendasi</h3>
              <div className="space-y-4">
                {insights.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-semibold text-[#1E293B] mb-2">{rec.focus}</h4>
                    <p className="text-[#64748B] text-sm">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {insights?.personality_summary && (
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Ringkasan Kepribadian</h3>
              <p className="text-[#64748B] leading-relaxed">{insights.personality_summary}</p>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#8FD6B4] hover:bg-[#62957c] text-[#FFFFFF] py-4 px-8 rounded-[10px] font-semibold text-[16px] transition-colors border-none cursor-pointer"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 5. INTRO PAGE ---
  else if (currentStep === 0) {
    content = (
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <div className="bg-[#FFFFFF] w-full max-w-[800px] p-8 md:p-12 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] text-center">
          <h2 className="text-[28px] font-semibold text-[#1E293B] mb-4">Weekly Mental Checkup</h2>
          <p className="text-[#64748B] mb-4 leading-relaxed text-[16px]">
            Evaluasi kondisi kesehatan mentalmu dalam 1 minggu terakhir dengan {totalQuestions} pertanyaan singkat.
          </p>
          <p className="text-[#94A3B8] mb-8 text-sm">
            Jawab dengan jujur untuk mendapatkan hasil analisis yang akurat.
          </p>
          <button 
            className="bg-[#8FD6B4] hover:bg-[#70ac8f] text-[#FFFFFF] py-4 px-8 rounded-[10px] font-semibold border-none cursor-pointer text-[16px] transition-colors"
            onClick={() => setCurrentStep(1)}
          >
            Mulai Checkup
          </button>
        </div>
      </div>
    );
  }

  // --- 6. CONFIRMATION PAGE ---
  else if (currentStep === totalQuestions + 1) {
    content = (
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <div className="bg-[#FFFFFF] w-full max-w-[800px] p-8 md:p-12 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] text-center">
          <div className="mb-8">
            <div className="flex justify-between text-[#8FD6B4] text-[14px] font-medium mb-2">
              <span>Status: Selesai</span>
              <span>100%</span>
            </div>
            <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-[#4CAF50] transition-all duration-300" style={{ width: '100%' }}></div>
            </div>
          </div>

          <h2 className="text-[28px] font-semibold text-[#1E293B] mb-4">Kirim Jawaban?</h2>
          <p className="text-[#64748B] mb-8 leading-relaxed text-[16px]">
            Apakah Anda yakin ingin mengirim jawaban? <br/> 
            Anda tidak dapat mengulangi checkup untuk minggu ini.
          </p>
          
          {apiError && (
            <p className="text-[#EF4444] mb-6 bg-red-50 px-4 py-3 rounded-lg text-sm">
              {apiError}
            </p>
          )}

          <div className="flex flex-col gap-4 items-center">
            <button 
              className="bg-[#4CAF50] hover:bg-[#439d47] text-[#FFFFFF] py-4 px-8 rounded-[10px] font-semibold border-none cursor-pointer text-[16px] w-full max-w-[300px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Mengirim...
                </>
              ) : (
                'Ya, Kirim Sekarang'
              )}
            </button>
            <button 
              className="bg-transparent border-none text-[#64748B] cursor-pointer font-medium hover:text-[#1E293B] text-[16px] disabled:opacity-50" 
              onClick={() => setCurrentStep(totalQuestions)}
              disabled={isSubmitting}
            >
              Periksa Kembali Jawaban
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 7. QUESTION PAGES ---
  else {
    const questionIndex = currentStep - 1;
    const currentQuestion = quizQuestions[questionIndex];

    content = (
      <div className="w-full flex justify-center items-start pt-8">
        <div className="bg-[#FFFFFF] w-full max-w-[900px] p-8 md:p-10 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
          <div className="mb-8">
            <div className="flex justify-between text-[#64748B] text-[14px] font-medium mb-2">
              <span>Pertanyaan {currentStep} dari {totalQuestions}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#8FD6B4] transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <span className="text-[#8FD6B4] font-bold text-sm block mb-2">
              {currentQuestion?.category || 'Pertanyaan'}
            </span>
            <h2 className="text-[22px] font-semibold text-[#1E293B] mb-6 leading-[1.5]">
              {currentQuestion?.question_text}
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion?.options?.map((opt) => {
                const isActive = answers[questionIndex]?.selected_option_id === opt.id;
                return (
                  <button 
                    key={opt.id} 
                    className={`w-full flex items-center justify-between p-5 border-2 rounded-xl text-left font-medium cursor-pointer transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#8FD6B4] border-[#8FD6B4] text-white shadow-lg' 
                        : 'border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B] hover:border-[#8FD6B4] hover:bg-green-50'
                    }`}
                    onClick={() => handleAnswer(currentQuestion.id, opt.id)}
                  >
                    <span className="text-[16px]">{opt.option_text}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'border-white bg-white' : 'border-gray-200'
                    }`}>
                      {isActive && <div className="w-3 h-3 bg-[#8FD6B4] rounded-full" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <button 
              className="flex items-center gap-2 text-[#64748B] font-medium cursor-pointer hover:text-[#1E293B] text-[16px] disabled:opacity-0" 
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft size={20} /> Kembali
            </button>

            {isLastQuestion && isAllAnswered && (
              <button 
                className="bg-[#8FD6B4] text-white border-none py-3 px-8 rounded-[10px] font-semibold text-[16px] cursor-pointer transition-colors hover:bg-[#70ac8f] flex items-center gap-2" 
                onClick={() => setCurrentStep(totalQuestions + 1)}
              >
                Selesai <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
}