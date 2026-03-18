<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>

// ── Donut Chart
const DonutChart = () => {
    const data = [
        { label: "Kualitas Tidur", value: 5.7,  color: "#c8dff5" },
        { label: "Energi",         value: 18.6, color: "#b0cce8" },
        { label: "Mood",           value: 31.4, color: "#8fb8d8" },
        { label: "Kecemasan",      value: 44.3, color: "#8FD6B4" },
    ];

    const size   = 200;
    const cx     = size / 2;
    const cy     = size / 2;
    const r      = 78;
    const gap    = 0.03; // radians gap between segments

    let currentAngle = -Math.PI / 2;

    const segments = data.map((d) => {
        const fraction  = d.value / 100;
        const angle     = fraction * 2 * Math.PI - gap;
        const startA    = currentAngle + gap / 2;
        const endA      = startA + angle;
        currentAngle   += fraction * 2 * Math.PI;

        const x1 = cx + r * Math.cos(startA);
        const y1 = cy + r * Math.sin(startA);
        const x2 = cx + r * Math.cos(endA);
        const y2 = cy + r * Math.sin(endA);
        const largeArc = angle > Math.PI ? 1 : 0;

        const innerR = 48;
        const ix1 = cx + innerR * Math.cos(startA);
        const iy1 = cy + innerR * Math.sin(startA);
        const ix2 = cx + innerR * Math.cos(endA);
        const iy2 = cy + innerR * Math.sin(endA);

        const path = [
        `M ${x1} ${y1}`,
        `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${ix2} ${iy2}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}`,
        "Z",
        ].join(" ");

        return { ...d, path };
    });

    return (
        <div className="flex items-center gap-6 mt-4">
        {/* Legend left */}
        <div className="flex flex-col gap-3 text-xs" style={{ color: "#5a7a9c" }}>
            {data.slice(0, 2).map((d) => (
            <div key={d.label}>
                <div className="font-semibold text-sm" style={{ color: "#2d3748" }}>{d.value}%</div>
                <div>{d.label}</div>
            </div>
            ))}
        </div>

        {/* SVG Donut */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {segments.map((s) => (
            <path key={s.label} d={s.path} fill={s.color} />
            ))}
        </svg>

        {/* Legend right */}
        <div className="flex flex-col gap-3 text-xs" style={{ color: "#5a7a9c" }}>
            {data.slice(2).map((d) => (
            <div key={d.label}>
                <div className="font-semibold text-sm" style={{ color: "#2d3748" }}>{d.value}%</div>
                <div>{d.label}</div>
            </div>
            ))}
        </div>
        </div>
    );
};

// Icon blobs
const IconBlob = ({ children }) => (
    <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
        style={{ backgroundColor: "#c6e8d8" }}
    >
        {children}
    </div>
);

// Card wrapper
const Card = ({ children, className = "" }) => (
    <div
        className={`rounded-2xl p-7 ${className}`}
        style={{ backgroundColor: "rgba(240,245,250,0.85)", border: "1px solid rgba(200,220,240,0.6)" }}
    >
        {children}
    </div>
);

// Main component
export default function QuizAnalysisResult() {
    return (
        <div className="min-h-screen px-14 py-10" style={{ backgroundColor: "#A8C4E9" }}>

        {/* ── Header ── */}
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span style={{ color: "#FFFFFF" }}>Hasil Analisis</span>{" "}
            <span style={{ color: "#1a1a1a" }}>Kondisi Mental Anda</span>
        </h1>
        <p className="text-sm mb-10" style={{ color: "#4a6285", maxWidth: 680 }}>
            Terima kasih telah menyelesaikan kuis kesehatan mental. Berdasarkan jawaban Anda, berikut adalah hasil analisis kondisi emosional Anda saat ini.
        </p>

        {/* ── Large container card ── */}
        <div
            className="rounded-3xl p-8 mb-10"
            style={{ backgroundColor: "rgba(210,225,240,0.6)", backdropFilter: "blur(8px)" }}
        >
            {/* ── 2x2 Grid ── */}
            <div className="grid grid-cols-2 gap-5">

            {/* Card 1 – Score & Status */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                <IconBlob>
                    {/* dashboard icon */}
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
                <div className="text-8xl font-light mb-3" style={{ color: "#8FD6B4" }}>50%</div>
                <div className="text-sm" style={{ color: "#5a7a9c" }}>Tingkat Stress Sedang</div>
                </div>
            </Card>

            {/* Card 2 – Penjelasan Kondisi */}
            <Card>
                <div className="flex items-center gap-3 mb-5">
                <IconBlob>
                    {/* layers icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aB990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                    </svg>
                </IconBlob>
                <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Penjelasan Kondisi</h2>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#4a6285" }}>
                Hasil analisis menunjukkan bahwa Anda mungkin sedang mengalami tekanan emosional yang dipengaruhi oleh berbagai faktor seperti aktivitas yang padat, kurangnya waktu istirahat, atau beban pikiran yang berlebihan.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6285" }}>
                Kondisi ini tidak selalu menunjukkan adanya gangguan kesehatan mental, namun penting untuk mulai memperhatikan keseimbangan antara aktivitas, istirahat, dan waktu untuk diri sendiri.
                </p>
            </Card>

            {/* Card 3 – Grafik Hasil */}
            <Card>
                <div className="flex items-center gap-3 mb-2">
                <IconBlob>
                    {/* sparkles icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aB990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                </IconBlob>
                <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Grafik Hasil</h2>
                </div>
                <DonutChart />
            </Card>

            {/* Card 4 – Rekomendasi Tindakan */}
            <Card>
                <div className="flex items-center gap-3 mb-5">
                <IconBlob>
                    {/* dollar/recommendation icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aB990" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                    </svg>
                </IconBlob>
                <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Rekomendasi Tindakan</h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6285", textAlign: "justify" }}>
                Berdasarkan hasil analisis yang diperoleh dari jawaban Anda, terdapat beberapa langkah sederhana yang dapat Anda lakukan untuk membantu menjaga dan meningkatkan kondisi kesehatan mental. Anda dapat mulai dengan meluangkan waktu untuk beristirahat yang cukup setiap hari serta mencoba aktivitas relaksasi seperti latihan pernapasan atau meditasi ringan. Mengurangi penggunaan gadget sebelum tidur juga dapat membantu meningkatkan kualitas istirahat Anda. Selain itu, melakukan aktivitas fisik ringan seperti berjalan kaki atau olahraga ringan dapat membantu meningkatkan energi dan suasana hati. Jika Anda merasa tekanan emosional masih berlangsung dalam waktu yang cukup lama, tidak ada salahnya untuk berbicara dengan orang yang Anda percayai atau mempertimbangkan untuk berkonsultasi dengan tenaga profesional di bidang kesehatan mental.
                </p>
            </Card>

            </div>
        </div>

        {/* ── Bottom Buttons ── */}
        <div className="flex flex-col items-center gap-3">
            <button
            className="rounded-full py-3 px-20 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#8FD6B4", minWidth: 280, border: "1.5px solid #1a1a1a" }}
            >
            Masuk Ke dashboard
            </button>
            <button
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