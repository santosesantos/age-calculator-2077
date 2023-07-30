import useAgeCalculator from "@/hooks/useAgeCalculator";
import { useState, useEffect } from 'react';


export default function Display() {
  const { inputDate } = useAgeCalculator();
  const [ageYears, setAgeYears] = useState<number>();
  const [ageMonths, setAgeMonths] = useState<number>();
  const [ageDays, setAgeDays] = useState<number>();

  useEffect(() => {
    // Logic to calculate age
    const ageInMs = Date.now().valueOf() - inputDate.valueOf();
    // Division to calculate the integer number of YEARS from milliseconds
    setAgeYears(Math.floor(ageInMs / 31556926000));
    // Division to calculate the integer number of MONTHS from the rest in milliseconds of years operation
    setAgeMonths(Math.floor((ageInMs % 31556926000) / 2629743833.3));
    // Division to calculate the integer number of DAYS from the rest in milliseconds of months operation
    setAgeDays(Math.floor(((ageInMs % 31556926000) % 2629743833.3) / 86400000));
  }, [inputDate]);

  return (
    <div className="display">
      <h1><span>{isNaN(ageYears ?? NaN) ? "--" : ageYears}</span> years</h1>
      <h1><span>{isNaN(ageMonths ?? NaN) ? "--" : ageMonths}</span> months</h1>
      <h1><span>{isNaN(ageDays ?? NaN) ? "--" : ageDays}</span> days</h1>
    </div>
  );
}