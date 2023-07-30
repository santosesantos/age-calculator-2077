"use client";

import { AgeCalculatorContext } from "@/contexts/AgeCalculatorContext";
import { useContext } from "react";

const useAgeCalculator = () => {
  return useContext(AgeCalculatorContext);
};

export default useAgeCalculator;