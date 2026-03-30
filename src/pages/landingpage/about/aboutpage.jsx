import React from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#A8C4E9] flex justify-center px-4 py-16">
        <div className="max-w-[1200px] w-full">

          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-[30px] md:text-[40px] font-semibold text-[#1E293B] mb-4">
              Tentang <span className="text-black">Bein</span>
              <span className="text-[#8FD6B4]">Bout</span>
            </h1>

            <p className="text-[#64748B] text-[16px] max-w-2xl mx-auto">
              BeinBout adalah platform sederhana yang membantu kamu mengenali
              kondisi kesehatan mental melalui tes psikologis berbasis pertanyaan
              yang mudah dipahami dan aman digunakan.
            </p>
          </div>

          {/* About Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[16px] shadow-[0px_6px_20px_rgba(30,41,59,0.06)]">

            <div>
              <h2 className="text-[22px] font-semibold text-[#1E293B] mb-4">
                Apa itu BeinBout?
              </h2>

              <p className="text-[#64748B] text-[16px] leading-relaxed">
                BeinBout adalah sebuah website yang dirancang untuk membantu
                pengguna memahami kondisi kesehatan mental mereka secara awal
                melalui tes online yang sederhana. Tes ini berisi serangkaian
                pertanyaan yang dapat membantu mengidentifikasi tingkat kecemasan
                atau kondisi emosional seseorang.
              </p>
            </div>

            <div>
              <h2 className="text-[22px] font-semibold text-[#1E293B] mb-4">
                Tujuan Kami
              </h2>

              <p className="text-[#64748B] text-[16px] leading-relaxed">
                Tujuan utama dari BeinBout adalah memberikan akses awal bagi
                pengguna untuk mengenali kondisi mental mereka. Dengan mengetahui
                kondisi tersebut, diharapkan pengguna dapat lebih sadar akan
                pentingnya menjaga kesehatan mental serta mencari bantuan
                profesional jika diperlukan.
              </p>
            </div>

          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-[24px] font-semibold text-center text-[#1E293B] mb-12">
              Cara Kerja Tes di BeinBout
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="bg-white p-6 rounded-[16px] shadow text-center">
                <h3 className="font-semibold text-[#1E293B] mb-2">
                  1. Jawab Pertanyaan
                </h3>
                <p className="text-[#64748B] text-[14px]">
                  Kamu akan menjawab beberapa pertanyaan mengenai kondisi
                  perasaanmu dalam dua minggu terakhir.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[16px] shadow text-center">
                <h3 className="font-semibold text-[#1E293B] mb-2">
                  2. Analisis Skor
                </h3>
                <p className="text-[#64748B] text-[14px]">
                  Sistem akan menghitung skor berdasarkan jawaban yang kamu
                  berikan untuk melihat tingkat kecemasan.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[16px] shadow text-center">
                <h3 className="font-semibold text-[#1E293B] mb-2">
                  3. Lihat Hasil
                </h3>
                <p className="text-[#64748B] text-[14px]">
                  Kamu akan mendapatkan hasil yang dapat menjadi gambaran awal
                  kondisi kesehatan mentalmu.
                </p>
              </div>

            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-16 bg-white p-8 rounded-[16px] shadow text-center">
            <h3 className="text-[20px] font-semibold text-[#1E293B] mb-3">
              Penting untuk Diketahui
            </h3>

            <p className="text-[#64748B] text-[14px] max-w-xl mx-auto">
              Hasil tes di BeinBout bukan merupakan diagnosis medis. Tes ini hanya
              bertujuan sebagai skrining awal untuk membantu pengguna mengenali
              kondisi mental mereka. Jika kamu merasa membutuhkan bantuan lebih
              lanjut, sangat disarankan untuk berkonsultasi dengan tenaga
              profesional seperti psikolog atau psikiater.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}