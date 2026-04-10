import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setupProfileAndQuiz } from "../../../services/auth/CompleteDataServices";
import DiagonalPattern from "../../../components/ui/pattern/DiagonalPattern";

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
        boxSizing: "border-box",
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

            localStorage.setItem("quiz_result", JSON.stringify(data));
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
            className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6"
            style={{ backgroundColor: "#A8C4E9" }}
        >
            {/* Card */}
            <div
                className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: "#B8D0EE" }}
            >
                {/* Diagonal background pattern */}
                <DiagonalPattern />

                {/* Content */}
                <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:px-16 md:py-14">
                    {/* Title */}
                    <h1
                        className="text-center font-semibold mb-2"
                        style={{
                            color: "#2d3748",
                            fontFamily: "'Segoe UI', sans-serif",
                            fontSize: "clamp(20px, 4vw, 28px)",
                        }}
                    >
                        Complete Data
                    </h1>
                    <p className="text-center text-sm mb-8 sm:mb-10" style={{ color: "#5a7a9c" }}>
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

                    {/* Row 1: Nama Lengkap */}
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

                    {/* Row 2: Tinggi & Berat */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-3">
                        <input
                            type="number"
                            placeholder="Tinggi badan (cm)"
                            value={tinggiBadan}
                            onChange={(e) => setTinggiBadan(e.target.value)}
                            className="w-full sm:flex-1 rounded-full px-5 py-3 text-sm outline-none"
                            style={inputStyle}
                        />
                        <input
                            type="number"
                            placeholder="Berat badan (kg)"
                            value={beratBadan}
                            onChange={(e) => setBeratBadan(e.target.value)}
                            className="w-full sm:flex-1 rounded-full px-5 py-3 text-sm outline-none"
                            style={inputStyle}
                        />
                    </div>

                    {/* Row 3: Umur */}
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

                    {/* Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full sm:w-auto rounded-full py-3 px-10 text-white font-medium text-sm transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: "#8FD6B4",
                                border: "1.5px solid #1a1a1a",
                                minWidth: "220px",
                            }}
                        >
                            {isLoading ? "Memproses..." : "Lanjut"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}