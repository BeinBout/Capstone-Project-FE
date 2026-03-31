const colors = ["#c8dff5", "#b0cce8", "#8fb8d8", "#8FD6B4", "#a8d8c0", "#d4e8f0"];

export default function DonutChart({ categories }) {
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const r = 78;
    const gap = 0.03;

    const total = categories.reduce((sum, c) => sum + c.value, 0) || 1;
    const data = categories.map((c, i) => ({
        label: c.label,
        value: parseFloat(((c.value / total) * 100).toFixed(1)),
        color: colors[i % colors.length],
    }));

    let currentAngle = -Math.PI / 2;

    const segments = data.map((d) => {
        const fraction = d.value / 100;
        const angle = fraction * 2 * Math.PI - gap;
        const startA = currentAngle + gap / 2;
        const endA = startA + angle;
        currentAngle += fraction * 2 * Math.PI;

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

    const left = data.slice(0, Math.ceil(data.length / 2));
    const right = data.slice(Math.ceil(data.length / 2));

    const Legend = ({ items }) => (
        <div className="flex flex-col gap-3 text-xs" style={{ color: "#5a7a9c" }}>
            {items.map((d) => (
                <div key={d.label}>
                    <div className="font-semibold text-sm" style={{ color: "#2d3748" }}>
                        {d.value}%
                    </div>
                    <div className="capitalize">{d.label.replace(/_/g, " ")}</div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex items-center gap-6 mt-4">
            <Legend items={left} />
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {segments.map((s) => (
                    <path key={s.label} d={s.path} fill={s.color} />
                ))}
            </svg>
            <Legend items={right} />
        </div>
    );
}