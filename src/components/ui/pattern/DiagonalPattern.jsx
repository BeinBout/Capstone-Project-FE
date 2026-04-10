const DiagonalPattern = () => (
    <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
    >
        <defs>
            <pattern id="diag" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="80" height="80" fill="rgba(255,255,255,0.08)" />
                <polygon points="0,0 80,0 0,80" fill="rgba(255,255,255,0.06)" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
    </svg>
);

export default DiagonalPattern;