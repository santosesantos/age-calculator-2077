import useAgeCalculator from "@/hooks/useAgeCalculator";

export default function ErrorDisplay() {
  const { error } = useAgeCalculator();

  return (
    <div className="error-display">
      <h2>{error}</h2>
    </div>
  )
}