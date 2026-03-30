import React, { useState } from 'react'; 
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function WeeklyCheckup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); 
  const [answers, setAnswers] = useState({}); 
  const [isSubmitted, setIsSubmitted] = useState(
    localStorage.getItem('weeklyCheckupDone') === 'true'
  );
  
  const questions = [
    { id: 1, text: "Seberapa sering Anda merasa cemas atau gelisah minggu ini?" },
    { id: 2, text: "Apakah Anda merasa kesulitan untuk fokus pada pekerjaan atau tugas?" },
    { id: 3, text: "Seberapa sering Anda merasa kurang berenergi atau cepat lelah?" },
    { id: 4, text: "Apakah Anda merasa kesulitan untuk tidur nyenyak di malam hari?" },
    { id: 5, text: "Seberapa sering Anda merasa kehilangan minat pada hal yang disukai?" }
  ];

  const options = [
    { id: 'A', text: "Tidak Pernah" },
    { id: 'B', text: "Jarang" },
    { id: 'C', text: "Kadang-kadang" },
    { id: 'D', text: "Sering" }
  ];

  const totalSteps = questions.length;

  let content;

  // 1. HALAMAN SELESAI
  if (isSubmitted) {
    content = (
      <div className="w-full min-h-[80vh] flex justify-center items-start pt-4 md:pt-10">
        <div className="bg-white w-full max-w-[800px] p-10 md:p-[60px] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2E8F0] text-center">
          <div className="text-[80px] mb-5">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">Check Up Selesai!</h2>
          <p className="text-[#64748B] mb-10 leading-relaxed text-base md:text-lg">
            Hebat! Anda sudah menyelesaikan evaluasi kesehatan minggu ini. <br/>
            Hasil analisis akan segera diperbarui di Dashboard. Sampai jumpa minggu depan!
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#5B8DEF] hover:bg-blue-600 text-white py-4 px-10 rounded-xl font-bold text-lg transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // 2. HALAMAN INTRO 
  else if (currentStep === 0) {
    content = (
      <div className="w-full min-h-[80vh] flex justify-center items-start pt-4 md:pt-10">
        <div className="bg-white w-full max-w-[800px] p-10 md:p-[60px] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2E8F0] text-center">
          <div className="text-[80px] mb-5">🩺</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">Weekly Medical Checkup</h2>
          <p className="text-[#64748B] mb-10 leading-relaxed text-base md:text-lg">Ukur kondisi kesehatan mental Anda dalam 1 minggu terakhir.</p>
          <button 
            className="bg-[#5B8DEF] hover:bg-blue-600 text-white py-4 px-10 rounded-xl font-bold border-none cursor-pointer text-lg transition-colors"
            onClick={() => setCurrentStep(1)}
          >
            Mulai Quiz Sekarang
          </button>
        </div>
      </div>
    );
  }

  // 3. HALAMAN KONFIRMASI FINISH 
  else if (currentStep > totalSteps) {
    content = (
      <div className="w-full min-h-[80vh] flex justify-center items-start pt-4 md:pt-10">
        <div className="bg-white w-full max-w-[800px] p-10 md:p-[60px] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2E8F0] text-center">
          
          <div className="mb-10">
            <div className="flex justify-between text-[#64748B] text-sm font-medium mb-3">
              <span>Status: Selesai</span>
              <span>100% Selesai</span>
            </div>
            <div className="h-2 bg-[#F1F5F9] rounded-[10px] overflow-hidden">
              <div className="h-full bg-[#5B8DEF] transition-all duration-400 ease-in-out" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="text-[80px] mb-5">✅</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">Kirim Jawaban?</h2>
          <p className="text-[#64748B] mb-10 leading-relaxed text-base md:text-lg">Apakah anda yakin ingin mengsubmit jawaban anda? <br/> Anda tidak akan bisa mengulanginya lagi.</p>
          
          <div className="flex flex-col gap-4 items-center">
            <button 
              className="bg-[#4CAF50] hover:bg-[#439d47] hover:-translate-y-1 text-white py-4 px-10 rounded-xl font-bold border-none cursor-pointer text-lg w-full max-w-[300px] transition-all"
              onClick={() => {
                setIsSubmitted(true);
                localStorage.setItem('weeklyCheckupDone', 'true');
              }}
            >
              Ya, Kirim Sekarang
            </button>
            <button 
              className="bg-transparent border-none text-[#64748B] underline cursor-pointer font-medium hover:text-[#1E293B]" 
              onClick={() => setCurrentStep(totalSteps)}
            >
              Periksa Kembali Jawaban
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. HALAMAN ISI SOAL 
  else {
    content = (
      <div className="w-full min-h-[80vh] flex justify-center items-start pt-4 md:pt-10">
        <div className="bg-white w-full max-w-[800px] p-8 md:p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          
          <div className="mb-10">
            <div className="flex justify-between text-[#64748B] text-sm font-medium mb-3">
              <span>Pertanyaan {currentStep} dari {totalSteps}</span>
              <span>{Math.round(((currentStep - 1) / totalSteps) * 100)}% Selesai</span>
            </div>
            <div className="h-2 bg-[#F1F5F9] rounded-[10px] overflow-hidden">
              <div 
                className="h-full bg-[#5B8DEF] transition-all duration-400 ease-in-out" 
                style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-[22px] md:text-[26px] font-semibold text-[#1E293B] mb-3 leading-[1.4]">{questions[currentStep - 1].text}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {options.map((opt) => {
                const isActive = answers[currentStep] === opt.id;
                return (
                  <button 
                    key={opt.id} 
                    className={`p-[18px] border-2 rounded-xl text-left font-semibold cursor-pointer transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#5B8DEF] text-white border-[#5B8DEF]' 
                        : 'border-[#F1F5F9] bg-[#F8FAFC] text-[#475569] hover:border-[#5B8DEF] hover:bg-[#F0F7FF] hover:text-[#5B8DEF]'
                    }`}
                    onClick={() => setAnswers({...answers, [currentStep]: opt.id})}
                  >
                    <span className={`mr-2 ${isActive ? 'opacity-100' : 'opacity-70'}`}>{opt.id}.</span> {opt.text}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-[#F1F5F9]">
            <button 
              className="bg-transparent border-none text-[#64748B] font-semibold cursor-pointer text-base hover:text-[#1E293B]" 
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Kembali
            </button>
            <button 
              className="bg-[#5B8DEF] text-white border-none py-3.5 px-7 rounded-xl font-semibold text-base cursor-pointer transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!answers[currentStep]} 
            >
              {currentStep === totalSteps ? 'Selesai' : 'Selanjutnya'}
            </button>
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