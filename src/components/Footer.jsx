import { Link } from "react-router-dom";

const navLinks = [
  { label: "Beranda", id: "beranda" },
  { label: "Tentang", id: "tentang" },
  { label: "Our Values", id: "values" },
  { label: "Info", id: "info" },
];

const handleScrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="flex justify-center mt-16 mb-10 px-4">
      <div className="bg-white w-full max-w-[1200px] rounded-[16px] p-8 md:p-10 shadow-[0px_6px_20px_rgba(30,41,59,0.06)]">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-gray-100">

          {/* Brand */}
          <div>
            <h2 className="text-[20px] font-semibold mb-2">
              <span className="text-[#1E293B]">Bein</span>
              <span className="text-[#8FD6B4]">Bout</span>
            </h2>
            <p className="text-[14px] text-[#64748B] leading-relaxed max-w-[240px]">
              Platform kesehatan mental yang sederhana, aman, dan mudah digunakan.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <p className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-widest mb-4">
              Navigasi
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScrollTo(item.id)}
                    className="text-[14px] text-[#64748B] hover:text-[#1E293B] transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun */}
          <div>
            <p className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-widest mb-4">
              Akun
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/login" className="text-[14px] text-[#64748B] hover:text-[#1E293B] transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[14px] text-[#64748B] hover:text-[#1E293B] transition">
                  Daftar
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-[14px] text-[#64748B] hover:text-[#1E293B] transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-6">
          <p className="w-full text-center text-[13px] text-[#94A3B8]">
            © 2026 BeinBout.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;