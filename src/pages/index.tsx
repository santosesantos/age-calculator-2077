import Display from "@/components/Display";
import Divider from "@/components/Divider";
import Input from "@/components/Input";
import { Poppins } from "next/font/google";
import { AgeCalculatorProvider } from "@/contexts/AgeCalculatorContext";
import Head from "next/head";
import ErrorDisplay from "@/components/ErrorDisplay";

const poppins = Poppins({
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"]
});

export default function Home() {
  return (
    <AgeCalculatorProvider>
      <Head>
        <title>Age Calculator 2077</title>
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      </Head>
      <div className="main-container">
        <div className={`calculator-container ${poppins.className}`}>
          <div className="inputs-container">
            <Input title="DAY" type="day" digits={2} />
            <Input title="MONTH" type="month" digits={2} />
            <Input title="YEAR" type="year" />
          </div>
          <ErrorDisplay />
          <Divider />
          <Display />
        </div>
      </div>
      <footer>
        <div className={`${poppins.className}`}>
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
          Coded by <a href="https://santosesantos.github.io/my-website/" target="_blank">Santos e Santos</a>.
        </div>
      </footer>
    </AgeCalculatorProvider>
  );
}
