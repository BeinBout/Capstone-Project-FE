import { Link } from "react-router-dom";
import HeroImg from "../assets/images/landing/hero.jpeg";

export default function Hero() {
  return (
    <section className="flex justify-center mt-10 px-4 relative overflow-hidden">

      {/* background decoration */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#8FD6B4]/30 rounded-full blur-3xl breathing"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#A8C4E9]/40 rounded-full blur-3xl breathing"></div>

      <div className="bg-white w-full max-w-[1200px] rounded-[16px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-[0px_6px_20px_rgba(30,41,59,0.06)] relative">

        {/* Image */}
        <div className="order-1 md:order-2 wind-right">
          <img
            src={HeroImg}
            alt="Mental Health"
            className="rounded-[16px] w-full h-[250px] md:h-[420px] object-cover breathing"
          />
        </div>

        {/* Text */}
        <div className="bg-[#F1F5F9] p-6 md:p-8 rounded-[16px] order-2 md:order-1 wind-left">

          {/* Badge */}
          <span className="inline-block bg-[#8FD6B4]/20 text-[#1E293B] text-[12px] px-3 py-1 rounded-full mb-3">
            Tes Kesehatan Mental
          </span>

          <h1 className="text-[26px] md:text-[36px] font-semibold text-[#1E293B] mb-4 leading-tight">
            Kamu Lagi Baik-Baik Aja... atau Cuma Terlihat Baik?
          </h1>

          <Link to="/quiz" className="inline-block mt-4">
            <div className="bg-[#8FD6B4] text-white px-6 py-3 rounded-[10px] w-full md:w-auto hover:scale-105 transition">
              Ayo cek kesehatan
            </div>
          </Link>

          <p className="text-[#64748B] text-[14px] mt-4 font-medium">
            Baca panduan pengisiannya, yuk!
          </p>

          <ul className="text-[14px] text-[#64748B] mt-4 space-y-2">
            <li>1. Gak ada jawaban yang benar atau salah. Isilah dengan jujur sesuai kepribadianmu.</li>
            <li>2. Santai aja, tes ini gak diberi waktu, kok.</li>
            <li>3. Cari tempat yang nyaman dan kondusif supaya kamu lebih fokus.</li>
            <li>4. Jika kamu keluar di tengah tes, maka seluruh proses tes dan jawaban akan hilang.</li>
            <li>5. Hasil tes bisa kamu dapatkan setelah mengisi semua pertanyaan dengan lengkap.</li>
            <li>Selamat mengisi ya! :-)</li>
          </ul>

        </div>

      </div>
    </section>
  );
}