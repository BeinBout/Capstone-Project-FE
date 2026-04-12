import React from "react";
import { ShieldCheck, Info as InfoIcon } from "lucide-react";

export default function Info() {
    return (
        <section className="flex justify-center mt-12 px-4">
        <div className="w-full max-w-[1200px] flex flex-col gap-6">

            {/* Card 1 — Kesehatan Mental */}
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0px_4px_16px_rgba(30,41,59,0.05)] p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-11 h-11 rounded-[10px] bg-[#E1F5EE] flex items-center justify-center">
                <ShieldCheck size={22} strokeWidth={1.8} className="text-[#0F6E56]" />
            </div>
            <div>
                <p className="text-[11px] font-medium text-[#0F6E56] uppercase tracking-widest mb-1.5">
                Info penting
                </p>
                <h3 className="text-[17px] font-semibold text-[#1E293B] mb-3">
                Apa itu kesehatan mental?
                </h3>
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                Kesehatan mental adalah kondisi kesejahteraan psikologis, emosional, dan sosial
                yang memengaruhi cara seseorang berpikir, merasa, serta bertindak dalam menghadapi
                stres dan berinteraksi dengan orang lain. Ini bukan sekadar bebas dari gangguan
                jiwa, melainkan kemampuan untuk menyadari potensi diri, bekerja secara produktif,
                dan bangkit dari tekanan hidup. Menjaga kesehatan mental sama pentingnya dengan
                kesehatan fisik untuk mencapai kualitas hidup yang seimbang.
                </p>
            </div>
            </div>

            {/* Card 2 — Tes Online */}
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0px_4px_16px_rgba(30,41,59,0.05)] p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-11 h-11 rounded-[10px] bg-[#E6F1FB] flex items-center justify-center">
                <InfoIcon size={22} strokeWidth={1.8} className="text-[#185FA5]" />
            </div>
            <div>
                <p className="text-[11px] font-medium text-[#185FA5] uppercase tracking-widest mb-1.5">
                Tes online
                </p>
                <h3 className="text-[17px] font-semibold text-[#1E293B] mb-3">
                Apa itu tes online?
                </h3>
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                Serangkaian pertanyaan psikologis yang dirancang secara profesional untuk membantu
                kamu mengenali kondisi emosionalmu. Hasil tes bukan diagnosis akhir, melainkan
                langkah awal (skrining) untuk mengenali kebutuhan dan kondisi mentalmu saat ini.
                </p>
            </div>
            </div>

        </div>
        </section>
    );
}