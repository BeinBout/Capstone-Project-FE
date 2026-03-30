export default function QuizCard({ question, options, onAnswer }) {
  return (
    <div className="bg-white p-8 rounded-[16px] shadow">

      <p className="text-lg mb-6">{question}</p>

      <div className="flex flex-col gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            className="border p-4 rounded-[10px] hover:bg-blue-50 transition text-left"
            onClick={() => onAnswer(opt.score)}
          >
            {opt.text}
          </button>
        ))}
      </div>

    </div>
  );
}