"use client";

import { useState, useEffect, createContext } from 'react';

export const AgeCalculatorContext = createContext({
  inputDate: new Date(),
  setInputDate: (value: Date) => {},
  setDay: (value: number) => { },
  setMonth: (value: number) => { },
  setYear: (value: number) => { }
});

interface IProps {
  children?: React.ReactNode;
}

export const AgeCalculatorProvider = ({ children }: IProps) => {
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [inputDate, setInputDate] = useState(new Date());

  useEffect(() => {
    const newInputDate = new Date();
    newInputDate.setFullYear(year ?? NaN, ((month ?? NaN) - 1), day ?? NaN);
    setInputDate(newInputDate);
    console.log(inputDate);
  }, [day, month, year]);

  return (
    <AgeCalculatorContext.Provider value={{ inputDate, setInputDate, setDay, setMonth, setYear }}>
      {children}
    </AgeCalculatorContext.Provider>
  );
};