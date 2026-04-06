import React, { useState, useEffect, useCallback } from 'react'; 
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getWeeklyQuestions, submitWeeklyCheckup } from '../../services/dashboard/WeeklyCheckupServices';
import { ChevronLeft, ChevronRight, ShieldCheck, Loader2 } from 'lucide-react';

export default function WeeklyCheckup() {
  const navigate = useNavigate();
  
  // State for quiz data
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-n = questions, n+1 = confirm, n+2 = result
  const [answers, setAnswers] = useState([]);
  
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
      const res = await getWeeklyQuestions();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setQuizQuestions(data);
      setAnswers(new Array(data.length).fill(null));
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Gagal memuat pertanyaan.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const totalQuestions = quizQuestions.length;

  // Handle answer selection with auto-next
  const handleAnswer = (questionId, optionId) => {
    const questionIndex = currentStep - 1;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      question_id: questionId,
      selected_option_id: optionId
    };
    setAnswers(newAnswers);

    // Auto-next if not the last question
    if (currentStep < totalQuestions) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    }
  };

  // Submit answers to API
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setApiError("");
    try {
      const res = await submitWeeklyCheckup(answers);
      setCheckupResult(res.data);
      setCurrentStep(totalQuestions + 2); // Go to result page
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Gagal mengirim jawaban.";
      setApiError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = totalQuestions > 0 ? ((currentStep) / totalQuestions) * 100 : 0;
  const isLastQuestion = currentStep === totalQuestions;
  const isAllAnswered = answers.every(ans => ans !== null);

  let content;

  // LOADING STATE
  if (isLoading) {
    content = (
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#8FD6B4]" />
          <p className="text-[#64748B] font-medium">Memuat Pertanyaan...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE 
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

  // RESULT PAGE (after submission)
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
          {/* Header Card */}
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

          {/* AI Summary Card */}
          <div className="bg-[#FFFFFF] p-8 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-4">Ringkasan AI</h3>
            <p className="text-[#64748B] leading-relaxed">{data?.ai_summary}</p>
          </div>

          {/* Risk & Progress Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk Level Card */}
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Tingkat Risiko</h3>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full font-medium capitalize ${getRiskColor(insights?.risk_level)}`}>
                  {insights?.risk_level || 'N/A'}
                </span>
                <span className="text-[#64748B]">Skor: <strong className="text-[#1E293B]">{insights?.risk_score || 0}</strong></span>
              </div>
            </div>

            {/* Progress Status Card */}
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Status Progres</h3>
              <p className={`font-medium capitalize ${getProgressColor(insights?.progress_status)}`}>
                {insights?.progress_status?.replace(/_/g, ' ') || 'N/A'}
              </p>
            </div>
          </div>

          {/* Dominant Stressors */}
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

          {/* Weekly Insight */}
          {insights?.weekly_insight && (
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Insight Mingguan</h3>
              <p className="text-[#64748B] leading-relaxed">{insights.weekly_insight}</p>
            </div>
          )}

          {/* Recommendations */}
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

          {/* Personality Summary */}
          {insights?.personality_summary && (
            <div className="bg-[#FFFFFF] p-6 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
              <h3 className="text-[16px] font-semibold text-[#1E293B] mb-4">Ringkasan Kepribadian</h3>
              <p className="text-[#64748B] leading-relaxed">{insights.personality_summary}</p>
            </div>
          )}

          {/* Back to Dashboard Button */}
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

  // INTRO PAGE
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

  // CONFIRMATION PAGE
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

  // QUESTION PAGES
  else {
    const questionIndex = currentStep - 1;
    const currentQuestion = quizQuestions[questionIndex];

    content = (
      <div className="w-full flex justify-center items-start pt-8">
        <div className="bg-[#FFFFFF] w-full max-w-[900px] p-8 md:p-10 rounded-[16px] shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0]">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between tex  t-[#64748B] text-[14px] font-medium mb-2">
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

          {/* Question */}
          <div className="mb-8">
            <span className="text-[#8FD6B4] font-bold text-sm block mb-2">
              {currentQuestion?.category || 'Pertanyaan'}
            </span>
            <h2 className="text-[22px] font-semibold text-[#1E293B] mb-6 leading-[1.5]">
              {currentQuestion?.question_text}
            </h2>
            
            {/* Options */}
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

          {/* Navigation Buttons */}
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
