import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setupProfileAndQuiz } from "../../../services/auth/CompleteDataServices";

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
    const navigate = useNavigate();

    const [namaLengkap, setNamaLengkap] = useState("");
    const [tinggiBadan, setTinggiBadan] = useState("");
    const [beratBadan, setBeratBadan] = useState("");
    const [umur, setUmur] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const inputStyle = {
        backgroundColor: "rgba(255,255,255,0.75)",
        color: "#4a6285",
        border: "1.5px solid #1a1a1a",
    };

    const handleSubmit = async () => {
        if (!namaLengkap || !tinggiBadan || !beratBadan || !umur) {
            setError("Semua field harus diisi.");
            return;
        }

        const quizAnswers = JSON.parse(localStorage.getItem("quiz_answers") || "[]");
        if (quizAnswers.length === 0) {
            setError("Jawaban kuis tidak ditemukan. Silakan ulangi kuis.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const data = await setupProfileAndQuiz({
                nama_lengkap: namaLengkap,
                umur: Number(umur),
                berat_badan: Number(beratBadan),
                tinggi_badan: Number(tinggiBadan),
                quiz_answers: quizAnswers,
            });

            // Simpan hasil AI ke localStorage agar bisa dibaca di halaman hasil
            localStorage.setItem("quiz_result", JSON.stringify(data));

            // Bersihkan quiz_answers yang sudah tidak diperlukan
            localStorage.removeItem("quiz_answers");

            navigate("/quiz-analysis");
        } catch (err) {
            const message =
                err.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#A8C4E9" }}
        >
        {/* Card */}
        <div
            className="relative w-165 rounded-3xl overflow-hidden shadow-2xl"
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

            {/* Error Message */}
            {error && (
                <div
                    className="mb-5 px-4 py-2 rounded-xl text-sm text-center"
                    style={{ backgroundColor: "rgba(255, 100, 100, 0.15)", color: "#c0392b" }}
                >
                    {error}
                </div>
            )}

            {/* Row 1: Nama Lengkap (full width) */}
            <div className="mb-3">
                <input
                type="text"
                placeholder="Masukan nama lengkap"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="w-full rounded-full px-5 py-3 text-sm outline-none"
                style={inputStyle}
                />
            </div>

            {/* Row 2: Tinggi Badan & Berat Badan */}
            <div className="flex gap-3 mb-3">
                <input
                type="number"
                placeholder="Masukan tinggi badan (cm)"
                value={tinggiBadan}
                onChange={(e) => setTinggiBadan(e.target.value)}
                className="w-0 flex-1 rounded-full px-5 py-3 text-sm outline-none"
                style={inputStyle}
                />
                <input
                type="number"
                placeholder="Masukan berat badan (kg)"
                value={beratBadan}
                onChange={(e) => setBeratBadan(e.target.value)}
                className="w-0 flex-1 rounded-full px-5 py-3 text-sm outline-none"
                style={inputStyle}
                />
            </div>

            {/* Row 3: Umur (full width) */}
            <div className="mb-8">
                <input
                type="number"
                placeholder="Masukan umur"
                value={umur}
                onChange={(e) => setUmur(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full rounded-full px-5 py-3 text-sm outline-none"
                style={inputStyle}
                />
            </div>

            {/* Lanjut Button */}
            <div className="flex justify-center">
                <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="rounded-full py-3 px-20 text-white font-medium text-sm transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#8FD6B4", border: "1.5px solid #1a1a1a", minWidth: "280px" }}
                >
                {isLoading ? "Memproses..." : "Lanjut"}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}