import useAgeCalculator from '@/hooks/useAgeCalculator';
import { useState } from 'react';

interface IProps {
  title: string;
  digits?: number;
  type: "day" | "month" | "year";
  children?: React.ReactNode;
}

export default function Input(props: IProps) {
  const [inputValue, setInputValue] = useState<Number>();
  const { setDay, setMonth, setYear } = useAgeCalculator();
  const placeholders = new Map([
    ["day", "DD"],
    ["month", "MM"],
    ["year", "YYYY"]
  ]);

  function handleInput(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    if (value.length <= (props.digits ?? 4)) {
      const parsedValue = parseInt(value);
      let realValue;
      switch (props.type) {
        case "day":
          realValue = parsedValue > 31 ? 31 : parsedValue;
          setInputValue(realValue);
          setDay(realValue);
          break;
        case "month":
          realValue = parsedValue > 12 ? 12 : parsedValue;
          setInputValue(realValue);
          setMonth(realValue);
          break;
        case "year":
          setInputValue(parsedValue);
          setYear(parsedValue);
          break;
      }
    }
  }

  return (
    <div className="main-inputs">
      <label>{props.title}</label>
      <input type="number" value={inputValue?.toString() || ""} placeholder={placeholders.get(props.type)}
        onChange={evt => handleInput(evt)}
        onKeyDown={evt => {
          if (evt.key === '.')
            evt.preventDefault();
        }} />
    </div>
  );
}