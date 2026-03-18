import { useState } from "react";

const DiagonalPattern = () => (
    <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
    >
        <defs>
        <pattern id="diag" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="80" height="80" fill="transparent" />
            <rect x="0" y="0" width="80" height="80" fill="rgba(255,255,255,0.08)" />
            <polygon points="0,0 80,0 0,80" fill="rgba(255,255,255,0.06)" />
        </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
    </svg>
);

export default function CompleteData() {
    const [tinggiBadan, setTinggiBadan] = useState("");
    const [beratBadan, setBeratBadan] = useState("");
    const [umur, setUmur] = useState("");

    const inputStyle = {
        backgroundColor: "rgba(255,255,255,0.75)",
        color: "#4a6285",
        border: "1.5px solid #1a1a1a",
    };

    return (
        <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#A8C4E9" }}
        >
        {/* Card */}
        <div
            className="relative w-[660px] rounded-3xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#B8D0EE" }}
        >
            {/* Diagonal background pattern */}
            <DiagonalPattern />

            {/* Content */}
            <div className="relative z-10 px-16 py-14">
            {/* Title */}
            <h1
                className="text-center text-3xl font-semibold mb-2"
                style={{ color: "#2d3748", fontFamily: "'Segoe UI', sans-serif" }}
            >
                Complete Data
            </h1>
            <p className="text-center text-sm mb-10" style={{ color: "#5a7a9c" }}>
                Lengkapi data terlebih dahulu untuk dapat masuk ke dalam dashboard
            </p>

            {/* Row 1: Tinggi Badan & Berat Badan */}
            <div className="flex gap-3 mb-3">
                <input
                type="number"
                placeholder="Masukan tinggi Badan"
                value={tinggiBadan}
                onChange={(e) => setTinggiBadan(e.target.value)}
                className="w-0 flex-1 rounded-full px-5 py-3 text-sm outline-none"
                style={inputStyle}
                />
                <input
                type="number"
                placeholder="Masukan berat badan"
                value={beratBadan}
                onChange={(e) => setBeratBadan(e.target.value)}
                className="w-0 flex-1 rounded-full px-5 py-3 text-sm outline-none"
                style={inputStyle}
                />
            </div>

            {/* Row 2: Umur (full width) */}
            <div className="mb-8">
                <input
                type="number"
                placeholder="Masukan umur"
                value={umur}
                onChange={(e) => setUmur(e.target.value)}
                className="w-full rounded-full px-5 py-3 text-sm outline-none"
                style={inputStyle}
                />
            </div>

            {/* Lanjut Button - centered, not full width */}
            <div className="flex justify-center">
                <button
                className="rounded-full py-3 px-20 text-white font-medium text-sm transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: "#8FD6B4", border: "1.5px solid #1a1a1a", minWidth: "280px" }}
                >
                Lanjut
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}