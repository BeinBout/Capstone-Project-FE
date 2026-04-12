import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import { Skeleton } from "./Loading";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { authenticated, loadings } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Beranda", id: "beranda" },
    { label: "Tentang", id: "tentang" },
    { label: "Our Values", id: "values" },
    { label: "Info", id: "info" },
  ];

  const handleScrollTo = (id) => {
    setOpen(false);

    // Jika bukan di halaman utama, navigasi dulu ke "/" lalu scroll
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center pt-6 px-4 sticky top-0 z-50">
      <nav className="bg-white w-full max-w-[1200px] px-6 py-3 rounded-full flex justify-between items-center shadow relative">

        {/* Logo */}
        <button onClick={() => handleScrollTo("beranda")}>
          <h1 className="text-[20px] md:text-[24px] font-semibold cursor-pointer">
            <span className="text-[#1E293B]">Bein</span>
            <span className="text-[#8FD6B4]">Bout</span>
          </h1>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-1 text-[14px] text-[#64748B]">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="px-4 py-1 rounded-[10px] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition whitespace-nowrap"
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:flex gap-3 min-w-[150px] justify-end">
          {loadings ? (
            <Skeleton size="sm" color="mint" />
          ) : authenticated ? (
            <Link to="/dashboard">
              <button className="bg-[#8FD6B4] px-4 py-1 rounded-[10px] text-[14px] text-white hover:opacity-90">
                Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <button className="px-4 py-1 rounded-[10px] hover:bg-[#8FD6B4] hover:text-white transition text-[14px]">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-[#8FD6B4] px-4 py-1 rounded-[10px] text-[14px] text-white hover:opacity-90">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden bg-[#8FD6B4] p-3 rounded-full text-white"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-16 right-0 bg-white w-[220px] rounded-xl shadow-lg p-4 flex flex-col gap-2 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-left px-3 py-2 rounded-[10px] text-[#64748B] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition text-[14px]"
              >
                {item.label}
              </button>
            ))}

            <hr className="border-gray-100 my-1" />

            <Link to="/register" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-[10px] text-[#64748B] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition text-[14px]">
                Sign Up
              </span>
            </Link>
            <Link to="/login" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-[10px] bg-[#8FD6B4] text-white text-center text-[14px]">
                Login
              </span>
            </Link>
          </div>
        )}

      </nav>
    </div>
  );
}