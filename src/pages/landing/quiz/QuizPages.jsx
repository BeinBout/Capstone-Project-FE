"use client";

import { useCallback, useEffect, useState } from "react";
import getQuestions from "../../../services/landing/Quizservices.js";
import useAuth from '../../../hooks/useAuth.jsx';
import { 
  ChevronRight, ChevronLeft, ShieldCheck, 
  Stars, Wind, CloudSun 
} from "lucide-react";

export default function GAD7Quiz() {
  const { authenticated } = useAuth();
  
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setApiError("");
    try {
      const res = await getQuestions("initial");
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setQuizQuestions(data);
      setAnswers(new Array(data.length).fill(null));
    } catch (err) {
      setApiError(err?.response?.data?.message || "Gagal memuat pertanyaan.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswer = (questionId, optionId) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = {
      question_id: questionId,
      selected_option_id: optionId
    };
    setAnswers(newAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 400);
    }
  };

  const saveToLocalStorage = () => {
    if (!authenticated) {
      localStorage.setItem("quiz_answers", JSON.stringify(answers));
      window.location.href = '/login';
      return;
    };
    
    localStorage.setItem("quiz_answers", JSON.stringify(answers));
    window.location.href = "/complete-data";
  };

  const currentQuestion = quizQuestions[currentStep];
  const totalQuestions = quizQuestions.length;
  const progress = totalQuestions > 0 ? ((currentStep + 1) / totalQuestions) * 100 : 0;
  const isLastStep = currentStep === totalQuestions - 1;
  const isAllAnswered = answers.every(ans => ans !== null);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#A8C4E9] flex items-center justify-center">
        <p className="text-white font-medium animate-pulse">Memuat Pertanyaan...</p>
      </main>
    );
  }

  if (apiError) {
    return (
      <main className="min-h-screen bg-[#A8C4E9] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 bg-white px-4 py-2 rounded-lg">{apiError}</p>
        <button onClick={loadQuestions} className="bg-[#8FD6B4] px-6 py-2 rounded-lg font-bold">Coba Lagi</button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#A8C4E9] p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#8FD6B4] rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-[480px] h-[480px] bg-[#5B8DEF] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      
      <div className="absolute top-16 right-16 text-white/40 hidden lg:block">
        <Stars size={80} />
      </div>
      <div className="absolute bottom-16 left-16 text-white/40 hidden lg:block">
        <Wind size={64} />
      </div>

      <div className="w-full max-w-275 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm text-[#1E293B] font-medium mb-4">
            <ShieldCheck size={18} /> Terenkripsi & Aman
          </div>
          <h1 className="text-4xl font-bold text-[#1E293B] mb-2">
            Mood Assessment <span className="text-black">Bein</span><span className="text-white">Bout</span>
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-[#8FD6B4] font-bold text-xl block mb-2">Pertanyaan {currentStep + 1}</span>
                <h2 className="text-3xl font-semibold text-[#1E293B] leading-tight">
                  {currentQuestion?.question_text}
                </h2>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-400 shadow-sm">
                  <CloudSun size={24} />
                </div>
                <p className="text-sm text-gray-500 italic">Pilih yang paling mendekati perasaanmu saat ini.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 text-sm font-medium">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-[#8FD6B4]">{Math.round(progress)}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#8FD6B4] transition-all duration-500" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              {currentQuestion?.options?.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(currentQuestion.id, opt.id)}
                  className={`w-full flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-200 ${
                    answers[currentStep]?.selected_option_id === opt.id
                      ? "bg-[#8FD6B4] border-[#8FD6B4] text-white shadow-lg"
                      : "bg-white border-gray-100 hover:border-[#8FD6B4] hover:bg-green-50"
                  }`}
                >
                  <span className="text-lg font-medium">{opt.option_text}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentStep]?.selected_option_id === opt.id ? "border-white bg-white" : "border-gray-200"
                  }`}>
                    {answers[currentStep]?.selected_option_id === opt.id && <div className="w-3 h-3 bg-[#8FD6B4] rounded-full" />}
                  </div>
                </button>
              ))}

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-600 disabled:opacity-0 font-bold"
                >
                  <ChevronLeft size={20} /> SEBELUMNYA
                </button>

                {isLastStep && isAllAnswered && (
                  <button
                    type="button"
                    onClick={saveToLocalStorage}
                    className="bg-[#8FD6B4] text-[#1E293B] px-10 py-4 rounded-[10px] font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
                  >
                    LIHAT HASIL <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}