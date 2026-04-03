const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

const colors = {
  mint:  "border-[#8FD6B4]/30 border-t-[#8FD6B4]",
  slate: "border-[#64748B]/20 border-t-[#64748B]",
  white: "border-white/30 border-t-white",
};

export const BeinLoader = ({ size = "md", color = "mint", className = "" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <div
      className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`}
      style={{ animationDuration: "0.7s" }}
      role="status"
      aria-label="Loading"
    />
  </div>
);


export const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-slate-200/70 rounded-lg ${className}`}
    aria-hidden="true"
  />
);

export const FullPageLoading = () => (
  <div
    className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999]
               flex flex-col gap-4 justify-center items-center"
    role="status"
    aria-live="polite"
    aria-label="Memuat halaman"
  >
    <span className="text-[32px] font-semibold select-none">
      <span className="text-[#1E293B]">Bein</span>
      <span className="text-[#8FD6B4]">Bout</span>
    </span>
    <BeinLoader size="lg" color="mint" />
  </div>
);