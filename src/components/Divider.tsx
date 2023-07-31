import useAgeCalculator from "@/hooks/useAgeCalculator";

export default function Divider() {
  const { error } = useAgeCalculator();
  
  return (
    <div className="divider">
      <img src="/icon-arrow.svg" alt="Arrow" />
      <hr />
    </div>
  );
}