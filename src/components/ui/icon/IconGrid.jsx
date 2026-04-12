export default function IconGrid({ size = 20, color = "#5aB990", strokeWidth = 2 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3"  y="3"  width="7" height="7" rx="1" />
            <rect x="14" y="3"  width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3"  y="14" width="7" height="7" rx="1" />
        </svg>
    );
}