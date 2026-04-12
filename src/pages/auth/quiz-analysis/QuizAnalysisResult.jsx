import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonutChart from "../../../components/ui/chart/DonutChartQuizAnalysis";
import IconLayers from "../../../components/ui/icon/IconLayers";
import IconStar from "../../../components/ui/icon/IconStar";
import IconGrid from "../../../components/ui/icon/IconGrid";
import IconClock from "../../../components/ui/icon/IconClock";

const IconBlob = ({ children }) => (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#c6e8d8" }}>
        {children}
    </div>
);

const Card = ({ children, className = "" }) => (
    <div className={`rounded-2xl p-5 sm:p-6 lg:p-7 ${className}`}
        style={{ backgroundColor: "rgba(240,245,250,0.85)", border: "1px solid rgba(200,220,240,0.6)" }}>
        {children}
    </div>
);

const CardHeader = ({ icon, title }) => (
    <div className="flex items-center gap-3 mb-5">
        <IconBlob>{icon}</IconBlob>
        <h2 className="text-sm sm:text-base font-semibold" style={{ color: "#2d3748" }}>{title}</h2>
    </div>
);

const riskLevelLabel = {
    low:      "Tingkat Stress Rendah",
    moderate: "Tingkat Stress Sedang",
    high:     "Tingkat Stress Tinggi",
};

/* Main Component */
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

    /* Error */
    if (error) return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#A8C4E9" }}>
            <div className="text-center px-8 py-10 rounded-3xl w-full max-w-sm"
                style={{ backgroundColor: "rgba(240,245,250,0.85)" }}>
                <p className="text-sm mb-5" style={{ color: "#c0392b" }}>{error}</p>
                <button onClick={() => navigate("/quiz")}
                    className="rounded-full py-3 px-10 text-white text-sm font-medium w-full"
                    style={{ backgroundColor: "#8FD6B4", border: "1.5px solid #1a1a1a" }}>
                    Kembali ke Kuis
                </button>
            </div>
        </div>
    );

    /* Loading */
    if (!result) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#A8C4E9" }}>
            <p className="text-sm" style={{ color: "#5a7a9c" }}>Memuat hasil analisis...</p>
        </div>
    );

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

    return (
        <div className="min-h-screen px-4 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-10"
            style={{ backgroundColor: "#A8C4E9" }}>

            {/* Header */}
            <h1 className="font-bold mb-2 leading-tight text-2xl sm:text-3xl lg:text-4xl">
                <span style={{ color: "#FFFFFF" }}>Hasil Analisis </span>
                <span style={{ color: "#1a1a1a" }}>Kondisi Mental Anda</span>
            </h1>
            <p className="text-xs sm:text-sm mb-8 sm:mb-10 max-w-xl leading-relaxed"
                style={{ color: "#4a6285" }}>
                Terima kasih telah menyelesaikan kuis kesehatan mental. Berdasarkan jawaban Anda,
                berikut adalah hasil analisis kondisi emosional Anda saat ini.
            </p>

            {/* Wrapper card */}
            <div className="rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10"
                style={{ backgroundColor: "rgba(210,225,240,0.6)", backdropFilter: "blur(8px)" }}>

                {/* 1 col di mobile, 2 col di sm ke atas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                    {/* Card 1 – Score & Status */}
                    <Card>
                        <CardHeader icon={<IconGrid />} title="Score & Status" />
                        <div className="text-center py-2">
                            <div className="font-light mb-2 leading-none text-6xl sm:text-7xl lg:text-8xl"
                                style={{ color: "#8FD6B4" }}>
                                {riskScore}%
                            </div>
                            <div className="text-xs sm:text-sm mt-2" style={{ color: "#5a7a9c" }}>
                                {riskLevelLabel[riskLevel] || "Tingkat Stress Sedang"}
                            </div>
                            {stressors.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    {stressors.map((s) => (
                                        <span key={s}
                                            className="text-xs px-3 py-1 rounded-full capitalize"
                                            style={{ backgroundColor: "#c6e8d8", color: "#276749" }}>
                                            {s.replace(/_/g, " ")}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Card 2 – Penjelasan Kondisi */}
                    <Card>
                        <CardHeader icon={<IconLayers />} title="Penjelasan Kondisi" />
                        <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: "#4a6285" }}>
                            {aiSummary}
                        </p>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#4a6285" }}>
                            {personalitySummary}
                        </p>
                    </Card>

                    {/* Card 3 – Grafik Hasil */}
                    <Card>
                        <CardHeader icon={<IconStar />} title="Grafik Hasil" />
                        <DonutChart categories={donutCategories} />
                    </Card>

                    {/* Card 4 – Rekomendasi Tindakan */}
                    <Card>
                        <CardHeader icon={<IconClock />} title="Rekomendasi Tindakan" />
                        {recommendations.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {recommendations.map((rec, i) => (
                                    <div key={i}>
                                        <div className="text-xs sm:text-sm font-semibold mb-1"
                                            style={{ color: "#2d3748" }}>
                                            {rec.focus}
                                        </div>
                                        <p className="text-xs sm:text-sm leading-relaxed text-justify"
                                            style={{ color: "#4a6285" }}>
                                            {rec.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#4a6285" }}>
                                Tidak ada rekomendasi tersedia saat ini.
                            </p>
                        )}
                    </Card>

                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-col items-center gap-3">
                <button onClick={() => navigate("/dashboard")}
                    className="rounded-full py-3 text-sm font-medium text-white w-full max-w-xs sm:max-w-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#8FD6B4", border: "1.5px solid #1a1a1a" }}>
                    Masuk Ke Dashboard
                </button>
                <button onClick={() => navigate(-1)}
                    className="rounded-full py-3 text-sm font-medium w-full max-w-xs sm:max-w-sm transition-colors hover:bg-white/50"
                    style={{ backgroundColor: "rgba(255,255,255,0.75)", border: "1.5px solid #1a1a1a", color: "#4a6285" }}>
                    Kembali
                </button>
            </div>

        </div>
    );
}