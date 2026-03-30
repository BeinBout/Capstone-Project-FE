import { useState, useEffect } from "react";

export default function ResultPage() {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Ambil score dari query string URL, contoh: ?score=7
    const params = new URLSearchParams(window.location.search);
    const s = Number(params.get("score"));
    setScore(s);

    if (s <= 4) setResult("Minimal Anxiety");
    else if (s <= 9) setResult("Mild Anxiety");
    else if (s <= 14) setResult("Moderate Anxiety");
    else setResult("Severe Anxiety");
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-6">
        Hasil Tes Kamu
      </h1>

      <p className="text-xl mb-4">
        Skor: {score}
      </p>

      <p className="text-lg text-gray-600">
        {result}
      </p>
    </div>
  );
}