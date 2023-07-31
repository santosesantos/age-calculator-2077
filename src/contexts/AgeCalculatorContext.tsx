"use client";

import { useState, useEffect, createContext } from 'react';

export const AgeCalculatorContext = createContext({
  inputDate: new Date(),
  setInputDate: (value: Date) => { },
  day: 0,
  setDay: (value: number) => { },
  month: 0,
  setMonth: (value: number) => { },
  year: 0,
  setYear: (value: number) => { },
  error: ""
});

interface IProps {
  children?: React.ReactNode;
}

export const AgeCalculatorProvider = ({ children }: IProps) => {
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [inputDate, setInputDate] = useState(new Date());
  const [error, setError] = useState("");

  useEffect(() => {
    const newInputDate = new Date();
    newInputDate.setFullYear(year ?? NaN, ((month ?? NaN) - 1), day ?? NaN);
    setInputDate(newInputDate);

    // Making sure the date isn't in the future
    if ((Date.now().valueOf() - newInputDate.valueOf()) < 0)
      setError("Must be in the past.");
    else
      setError("");
  }, [day, month, year]);

  return (
    <AgeCalculatorContext.Provider
      value={{
        inputDate, setInputDate, day: (day ?? NaN), setDay,
        month: (month ?? NaN), setMonth, year: (year ?? NaN), setYear,
        error
      }}
    >
      {children}
    </AgeCalculatorContext.Provider>
  );
};