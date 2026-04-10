import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonutChart from "../../../components/ui/chart/DonutChartQuizAnalysis";

const IconBlob = ({ children }) => (
    <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
        style={{ backgroundColor: "#c6e8d8" }}
    >
        {children}
    </div>
);

const Card = ({ children, className = "" }) => (
    <div
        className={`rounded-2xl p-7 ${className}`}
        style={{ backgroundColor: "rgba(240,245,250,0.85)", border: "1px solid rgba(200,220,240,0.6)" }}
    >
        {children}
    </div>
);

const riskLevelLabel = {
    low:      "Tingkat Stress Rendah",
    moderate: "Tingkat Stress Sedang",
    high:     "Tingkat Stress Tinggi",
};

export default function QuizAnalysisResult() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [error, setError]   = useState("");

    useEffect(() => {
        try {
            const raw = localStorage.getItem("quiz_result");
            if (!raw) throw new Error("Data hasil tidak ditemukan.");
            setResult(JSON.parse(raw));
        } catch {
            setError("Gagal memuat hasil analisis. Silakan ulangi kuis.");
        }
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#A8C4E9" }}>
                <div className="text-center px-8 py-10 rounded-3xl" style={{ backgroundColor: "rgba(240,245,250,0.85)" }}>
                    <p className="text-sm mb-4" style={{ color: "#c0392b" }}>{error}</p>
                    <button
                        onClick={() => navigate("/quiz")}
                        className="rounded-full py-2 px-10 text-white text-sm font-medium"
                        style={{ backgroundColor: "#8FD6B4", border: "1.5px solid #1a1a1a" }}
                    >
                        Kembali ke Kuis
                    </button>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#A8C4E9" }}>
                <p className="text-sm" style={{ color: "#5a7a9c" }}>Memuat hasil analisis...</p>
            </div>
        );
    }

    const insights           = result?.data?.ai_insights || {};
    const aiSummary          = result?.data?.ai_summary || "-";
    const riskLevel          = insights?.risk_level || "moderate";
    const riskScore          = insights?.risk_score ?? 0;
    const stressors          = insights?.dominant_stressor || [];
    const recommendations    = insights?.recommendations || [];
    const personalitySummary = insights?.personality_summary || "-";

    const donutCategories = stressors.length > 0
        ? stressors.map((s) => ({ label: s, value: Math.round(100 / stressors.length) }))
        : [{ label: "general", value: 100 }];

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen px-14 py-10" style={{ backgroundColor: "#A8C4E9" }}>

            {/* Header */}
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span style={{ color: "#FFFFFF" }}>Hasil Analisis</span>{" "}
                <span style={{ color: "#1a1a1a" }}>Kondisi Mental Anda</span>
            </h1>
            <p className="text-sm mb-10" style={{ color: "#4a6285", maxWidth: 680 }}>
                Terima kasih telah menyelesaikan kuis kesehatan mental. Berdasarkan jawaban Anda, berikut adalah hasil analisis kondisi emosional Anda saat ini.
            </p>

            {/* Large container card */}
            <div
                className="rounded-3xl p-8 mb-10"
                style={{ backgroundColor: "rgba(210,225,240,0.6)", backdropFilter: "blur(8px)" }}
            >
                <div className="grid grid-cols-2 gap-5">

                    {/* Card 1 – Score & Status */}
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <IconBlob>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aB990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                                </svg>
                            </IconBlob>
                            <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Score &amp; Status</h2>
                        </div>

                        <div className="text-center py-4">
                            <div className="text-8xl font-light mb-3" style={{ color: "#8FD6B4" }}>
                                {riskScore}%
                            </div>
                            <div className="text-sm" style={{ color: "#5a7a9c" }}>
                                {riskLevelLabel[riskLevel] || "Tingkat Stress Sedang"}
                            </div>

                            {stressors.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    {stressors.map((s) => (
                                        <span
                                            key={s}
                                            className="text-xs px-3 py-1 rounded-full capitalize"
                                            style={{ backgroundColor: "#c6e8d8", color: "#276749" }}
                                        >
                                            {s.replace(/_/g, " ")}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Card 2 – Penjelasan Kondisi */}
                    <Card>
                        <div className="flex items-center gap-3 mb-5">
                            <IconBlob>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aB990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                    <polyline points="2 17 12 22 22 17"/>
                                    <polyline points="2 12 12 17 22 12"/>
                                </svg>
                            </IconBlob>
                            <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Penjelasan Kondisi</h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#4a6285" }}>
                            {aiSummary}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#4a6285" }}>
                            {personalitySummary}
                        </p>
                    </Card>

                    {/* Card 3 – Grafik Hasil */}
                    <Card>
                        <div className="flex items-center gap-3 mb-2">
                            <IconBlob>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aB990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                                </svg>
                            </IconBlob>
                            <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Grafik Hasil</h2>
                        </div>
                        <DonutChart categories={donutCategories} />
                    </Card>

                    {/* Card 4 – Rekomendasi Tindakan */}
                    <Card>
                        <div className="flex items-center gap-3 mb-5">
                            <IconBlob>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aB990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                            </IconBlob>
                            <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Rekomendasi Tindakan</h2>
                        </div>

                        {recommendations.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {recommendations.map((rec, i) => (
                                    <div key={i}>
                                        <div className="text-sm font-semibold mb-1" style={{ color: "#2d3748" }}>
                                            {rec.focus}
                                        </div>
                                        <p className="text-sm leading-relaxed" style={{ color: "#4a6285", textAlign: "justify" }}>
                                            {rec.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm leading-relaxed" style={{ color: "#4a6285" }}>
                                Tidak ada rekomendasi tersedia saat ini.
                            </p>
                        )}
                    </Card>

                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-col items-center gap-3">
                <button
                    onClick={handleDashboard}
                    className="rounded-full py-3 px-20 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#8FD6B4", minWidth: 280, border: "1.5px solid #1a1a1a" }}
                >
                    Masuk Ke Dashboard
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-full py-3 px-20 text-sm font-medium transition-colors hover:bg-white/50"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.75)",
                        minWidth: 280,
                        border: "1.5px solid #1a1a1a",
                        color: "#4a6285",
                    }}
                >
                    Kembali
                </button>
            </div>

        </div>
    );
}