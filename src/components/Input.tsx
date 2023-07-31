import useAgeCalculator from '@/hooks/useAgeCalculator';
import { useState, useEffect } from 'react';
import ErrorDisplay from './ErrorDisplay';

interface IProps {
  title: string;
  digits?: number;
  type: "day" | "month" | "year";
  children?: React.ReactNode;
}

export default function Input(props: IProps) {
  const [inputValue, setInputValue] = useState<Number>();
  const { day, setDay, month, setMonth, year, setYear, error } = useAgeCalculator();
  const placeholders = new Map([
    ["day", "DD"],
    ["month", "MM"],
    ["year", "YYYY"]
  ]);

  useEffect(() => {
    switch (props.type) {
      case "day":
        setInputValue(day);
        break;
      case "month":
        setInputValue(month);
        break;
      case "year":
        setInputValue(year);
        break;
    }
  }, [day, month, year]);

  function handleInput(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    if (value.length <= (props.digits ?? 4)) {
      const parsedValue = parseInt(value);
      let realValue;
      let maximumDays;

      switch (props.type) {
        case "day":
          maximumDays = getMaximumDays();

          realValue = parsedValue > maximumDays ? maximumDays : parsedValue;
          setDay(realValue);
          break;
        case "month":
          realValue = parsedValue > 12 ? 12 : parsedValue;
          setMonth(realValue);
          maximumDays = getMaximumDays();
          if (day > maximumDays)
            setDay(maximumDays);
          break;
        case "year":
          setYear(parsedValue);
          maximumDays = getMaximumDays();
          if (day > maximumDays)
            setDay(maximumDays);
          break;
      }
    }
  }

  function getMaximumDays() {
    const monthsWith31 = [0, 2, 4, 6, 7, 9, 11];
    const monthsWith30 = [3, 5, 8, 10];
    let maximumDays;

    // Verification for the max value for day input according to the current month
    if (monthsWith31.includes(month - 1))
      maximumDays = 31;
    else if (monthsWith30.includes(month - 1))
      maximumDays = 30;
    else { /* Verification if it is a leap year */
      if (year % 4 === 0) {
        if (year % 100 === 0) {
          if (year % 400 === 0) {
            maximumDays = 29;
          } else
            maximumDays = 28;
        } else
          maximumDays = 29;
      } else
        maximumDays = 28;
    }

    return maximumDays;
  }

  return (
    <div className={`main-inputs ${!!error ? "error" : ""}`}>
      <label>{props.title}</label>
      <input type="number"
        value={inputValue?.toString() || ""}
        placeholder={placeholders.get(props.type)}
        onChange={evt => handleInput(evt)}
        onKeyDown={evt => {
          if (evt.key === '.')
            evt.preventDefault();
        }}
      />
    </div>
  );
}