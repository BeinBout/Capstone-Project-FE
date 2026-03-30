export default function ProgressBar({ step, total }) {
  const percent = (step / total) * 100;

  return (
    <div className="w-full bg-gray-200 h-2 rounded mb-8">
      <div
        className="bg-[#5B8DEF] h-2 rounded"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}