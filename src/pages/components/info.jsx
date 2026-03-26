import React from "react";

export default function Info() {
  return (
    <section className="flex justify-center mt-12 px-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        <div>
          <h3 className="text-[20px] md:text-[22px] font-medium text-[#1E293B] mb-3">
            Info penting
          </h3>

          <p className="text-[15px] md:text-[16px] text-[#64748B] leading-relaxed">
            Kesehatan mental adalah kondisi kesejahteraan psikologis, emosional, dan sosial yang memengaruhi cara seseorang berpikir,
            merasa, serta bertindak dalam menghadapi stres dan berinteraksi dengan orang lain.
            Ini bukan sekadar bebas dari gangguan jiwa, melainkan kemampuan untuk menyadari
            potensi diri, bekerja secara produktif, dan bangkit dari tekanan hidup (resilience).
            Karena kondisi mental bersifat dinamis dan dipengaruhi oleh faktor biologis serta lingkungan,
            menjaga kesehatan mental sama pentingnya dengan kesehatan fisik untuk mencapai kualitas hidup yang seimbang dan bahagia.
          </p>
        </div>

        <div>
          <h3 className="text-[20px] md:text-[22px] font-medium text-[#1E293B] mb-3">
            Apa itu tes online
          </h3>

          <p className="text-[15px] md:text-[16px] text-[#64748B] leading-relaxed">
            Serangkaian pertanyaan psikologis yang dirancang profesional.
            Hasil tes bukan diagnosis akhir, melainkan langkah awal (skrining) untuk mengenali kebutuhan Anda.
          </p>
        </div>

      </div>
    </section>
  );
}