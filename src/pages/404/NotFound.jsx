import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#A8C4E9] via-[#BBD3F2] to-[#DCE8F9] flex items-center justify-center px-4 py-10">
      <section
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl border border-white/70 shadow-[0_12px_36px_rgba(30,41,59,0.12)] p-8 sm:p-10 text-center"
        aria-labelledby="not-found-title"
      >
        <p className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#8FD6B4]/20 text-[#2f6f58] mb-5">
          Error 404
        </p>

        <h1 id="not-found-title" className="text-4xl sm:text-5xl font-bold text-[#1E293B] mb-3">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-[#64748B] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Maaf, halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.
          Coba kembali ke beranda atau kembali ke halaman sebelumnya.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#8FD6B4] text-white font-semibold hover:bg-[#78be9c] transition-colors"
          >
            Kembali ke Home
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#B8C8D8] text-[#334155] font-semibold hover:bg-[#F1F5F9] transition-colors"
          >
            Halaman Sebelumnya
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;