import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from '../hooks/useAuth'
import { Skeleton } from "./Loading";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { authenticated, loadings } = useAuth();

  return (
    <div className="flex justify-center pt-6 px-4">
      <nav className="bg-white w-full max-w-[1200px] px-6 py-3 rounded-full flex justify-between items-center shadow relative z-50">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-[20px] md:text-[24px] font-semibold cursor-pointer">
            <span className="text-[#1E293B]">Bein</span>
            <span className="text-[#8FD6B4]">Bout</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4 text-[14px] text-[#64748B]">

          <Link to="/">
            <li className="px-4 py-1 rounded-[10px] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="px-4 py-1 rounded-[10px] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition">
              About
            </li>
          </Link>

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
          <div className="absolute top-16 right-0 bg-white w-[220px] rounded-xl shadow-lg p-4 flex flex-col gap-3 md:hidden">

            <Link to="/">
              <span className="px-3 py-2 rounded-[10px] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition">
                Home
              </span>
            </Link>

            <Link to="/about">
              <span className="px-3 py-2 rounded-[10px] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition">
                About
              </span>
            </Link>

            <Link to="/signup">
              <span className="px-3 py-2 rounded-[10px] hover:bg-[#8FD6B4] hover:text-white cursor-pointer transition">
                Sign Up
              </span>
            </Link>

            <Link to="/login">
              <span className="px-3 py-2 rounded-[10px] bg-[#8FD6B4] text-white text-center">
                Login
              </span>
            </Link>

          </div>
        )}

      </nav>
    </div>
  );
}