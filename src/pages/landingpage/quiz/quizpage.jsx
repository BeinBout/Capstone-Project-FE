"use client";
import { useState } from "react";
import { questions, options } from "../../data/questions";
import { 
  ChevronRight, ChevronLeft, RotateCcw, CheckCircle2, 
  ShieldCheck, Heart, Lock, UserPlus, Sparkles, 
  Wind, Stars, CloudSun
} from "lucide-react";

export default function GAD7Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;

 const handleAnswer = (value) => {
  const newAnswers = [...answers];
  newAnswers[currentStep] = value;
  setAnswers(newAnswers);
  if (currentStep < questions.length - 1) {
    setTimeout(() => setCurrentStep(currentStep + 1), 400);
  }
};

  const totalScore = answers.reduce((acc, curr) => (curr !== -1 ? acc + curr : acc), 0);

 const getSeverity = (score) => {
  if (score <= 4) return { label: "Minimal", color: "text-[#4CAF50]", bg: "bg-[#4CAF50]/10" };
  if (score <= 9) return { label: "Ringan", color: "text-[#E6A23C]", bg: "bg-[#E6A23C]/10" };
  if (score <= 14) return { label: "Sedang", color: "text-[#E57373]", bg: "bg-[#E57373]/10" };
  return { label: "Berat", color: "text-[#E57373] font-bold", bg: "bg-[#E57373]/20" };
};
  const isLastStep = currentStep === questions.length - 1;
  const isAllAnswered = !answers.includes(-1);

  return (
    // Background Dasar
    <main className="min-h-screen bg-[#A8C4E9] p-8 md:p-12 flex flex-col items-center justify-center font-['Inter',sans-serif] relative overflow-hidden">
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#8FD6B4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-[480px] h-[480px] bg-[#5B8DEF] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      
      {/* Ornamen Garis & Ikon */}
      <div className="absolute top-16 right-16 text-white/40 hidden lg:block rotate-12">
        <Stars size={80} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-16 left-16 text-white/40 hidden lg:block -rotate-12">
        <Wind size={64} strokeWidth={1.5} />
      </div>

      <div className="w-full max-w-[1200px] z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-[10px] text-[14px] text-[#1E293B] font-medium mb-4">
              <ShieldCheck size={18} strokeWidth={1.5} /> Terenkripsi & Aman
           </div>

           <h1 className="text-[36px] font-semibold text-[#1E293B] leading-tight mb-4">
             Mood Assessment <span className="text-black">Bein</span><span className="text-[#8FD6B4]">Bout</span>
           </h1>

           <p className="text-[16px] text-[#64748B] max-w-md mx-auto">
             Mari kita mulai langkah kecil untuk mengenal dirimu lebih dalam hari ini.
           </p>
        </div>

        <div className="bg-white rounded-[16px] shadow-[0px_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] p-8 md:p-12 relative">
          
          {!showResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Kolom Kiri: Pertanyaan & Progress */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div>
               
                   <span className="text-[#8FD6B4] font-medium text-[22px] block mb-2">Pertanyaan {currentStep + 1}</span>
                  
                   <h2 className="text-[28px] font-semibold text-[#1E293B] leading-[40px]">
                     {questions[currentStep]}
                   </h2>
                </div>

           
                <div className="bg-[#A8C4E9]/10 rounded-[16px] p-6 border border-[#E2E8F0] flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-[10px] flex items-center justify-center text-[#5B8DEF] shadow-sm">
                      <CloudSun size={24} strokeWidth={1.5} />
                   </div>
                   <p className="text-[14px] text-[#64748B] italic">"Pilih jawaban yang paling mendekati perasaanmu 2 minggu terakhir."</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] text-[#64748B]">Sesi Berlangsung</span>
                    <span className="text-[14px] font-semibold text-[#8FD6B4]">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#8FD6B4] transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Pilihan Jawaban (Button Radius 10px) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`group w-full flex items-center justify-between p-6 rounded-[10px] border transition-all duration-200 ${
                      answers[currentStep] === opt.value
                        ? "bg-[#8FD6B4] border-[#5B8DEF] text-white shadow-lg shadow-[#5B8DEF]/20"
                        : "bg-white border-[#E2E8F0] hover:border-[#8FD6B4] hover:bg-[#8FD6B4]/5"
                    }`}
                  >
                    <span className={`text-[16px] font-medium ${answers[currentStep] === opt.value ? "text-white" : "text-[#1E293B]"}`}>
                      {opt.label}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentStep] === opt.value ? "border-white bg-white" : "border-[#E2E8F0]"
                    }`}>
                      {answers[currentStep] === opt.value && <div className="w-2.5 h-2.5 bg-[#8FD6B4] rounded-full" />}
                    </div>
                  </button>
                ))}

         
                <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-0 items-center sm:items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-[#64748B] hover:text-[#1E293B] disabled:opacity-0 font-medium text-[14px]"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} /> SEBELUMNYA
                  </button>
                  {isLastStep && isAllAnswered && (
                    <button
                      onClick={() => setShowResult(true)}
                      className="bg-[#8FD6B4] text-[#1E293B] w-full sm:w-auto justify-center px-8 py-3 rounded-[10px] font-semibold flex items-center gap-2 hover:bg-[#8FD6B4]/90 transition-all shadow-md"
                    >
                      LIHAT HASIL <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* --- LAYAR HASIL --- */
            <div className="relative">
               {/* Registration Overlay dengan Blur */}
               {!isRegistered && (
                 <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[16px] border border-[#E2E8F0] shadow-2xl text-center max-w-[400px] animate-in zoom-in duration-300">
                       <div className="w-16 h-16 bg-[#5B8DEF]/10 text-[#5B8DEF] rounded-full flex items-center justify-center mx-auto mb-6">
                          <Lock size={32} strokeWidth={1.5} />
                       </div>
                       <h3 className="text-[22px] font-medium text-[#1E293B] mb-2">Simpan Hasil Kamu</h3>
                       <p className="text-[14px] text-[#64748B] mb-8">Daftar sekarang untuk mendapatkan panduan pemulihan khusus dan melacak mood harianmu.</p>
                       <button 
                         onClick={() => setIsRegistered(true)}
                        className="w-full sm:w-auto mx-auto px-8 py-4 bg-[#8FD6B4] text-white rounded-[10px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#5B8DEF]/20"
                       >
                         <UserPlus size={22} strokeWidth={1.5} className="shrink-0" />BUAT AKUN GRATIS
                       </button>
                    </div>
                 </div>
               )}

               {/* Result Content */}
               <div className={`text-center py-8 transition-all duration-1000 ${!isRegistered ? "blur-md pointer-events-none opacity-40" : "blur-0"}`}>
                  <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${getSeverity(totalScore).bg}`}>
                    <CheckCircle2 size={48} className={getSeverity(totalScore).color} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[36px] font-semibold text-[#1E293B] mb-2">Skor Total: {totalScore}</h2>
                  <div className={`inline-block px-6 py-2 rounded-full border ${getSeverity(totalScore).color} border-current font-medium mb-12`}>
                    Kecemasan {getSeverity(totalScore).label}
                  </div>

                  <div className="max-w-2xl mx-auto p-8 bg-[#A8C4E9]/5 rounded-[16px] border border-[#E2E8F0] text-left mb-8">
                     <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="text-[#5B8DEF]" size={24} />
                        <h4 className="text-[22px] font-medium text-[#1E293B]">Apa arti skor ini?</h4>
                     </div>
                     <p className="text-[16px] text-[#1E293B] leading-relaxed">
                        Skor kamu menunjukkan tingkat kecemasan <strong>{getSeverity(totalScore).label.toLowerCase()}</strong>. Ini adalah informasi awal yang berharga untuk membantumu mengambil langkah berikutnya.
                     </p>
                  </div>

                  <button 
                    onClick={() => {setAnswers(new Array(questions.length).fill(-1)); setShowResult(false); setCurrentStep(0); setIsRegistered(false);}}
                    className="flex items-center gap-2 mx-auto text-[#64748B] hover:text-[#5B8DEF] font-medium text-[14px] transition-colors"
                  >
                    <RotateCcw size={18} strokeWidth={1.5} /> ULANGI PENILAIAN
                  </button>
               </div>
            </div>
          )}
        </div>


        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 opacity-70">
           <div className="flex items-start gap-4 p-6 bg-white/20 rounded-[16px]">
              <ShieldCheck className="text-[#1E293B] shrink-0" size={20} strokeWidth={1.5} />
              <div>
                 <p className="text-[14px] font-semibold text-[#1E293B]">Privasi Data</p>
                 <p className="text-[14px] text-[#64748B]">Jawaban kamu disimpan secara lokal dan aman.</p>
              </div>
           </div>
           <div className="flex items-start gap-4 p-6 bg-white/20 rounded-[16px]">
              <Heart className="text-[#E57373] shrink-0" size={20} strokeWidth={1.5} />
              <div>
                 <p className="text-[14px] font-semibold text-[#1E293B]">Layanan Support</p>
                 <p className="text-[14px] text-[#64748B]">Bukan pengganti diagnosis profesional medis.</p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}