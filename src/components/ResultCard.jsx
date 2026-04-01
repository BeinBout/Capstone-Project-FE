export default function ResultCard({ result }) {
  return (
    <div>
      <h2>Hasil Analisis</h2>
      <p>Risk Level: {result.risk_level}</p>
      <p>{result.summary}</p>
    </div>
  );
}