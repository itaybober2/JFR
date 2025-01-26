"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./thirdScreen.css";


export default function ThirdScreen() {
  const searchParams = useSearchParams();

  // Get the query parameters
  const pointA = searchParams.get("pointA") || "להר הצופים"; // Extract pointA
  const pointB = searchParams.get("pointB") || "מהר הצופים"; // Extract pointB

  const linesNumber = ["517", "19", "71", "77", "74","75", "17", "19א", "11"]
  const agencies = ["קווים","אגד","דן","קווים", "אגד", "דן", "קווים", "אגד", "דן"]
  
   // State to track clicked circles
   const [selectedCircles, setSelectedCircles] = useState<number[]>([]);

   const handleCircleClick = (index: number) => {
     // Toggle the selected circle (add/remove index)
     setSelectedCircles((prev) =>
       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
     );
   };

  const router = useRouter();
  const handleContinue = () =>{
    router.push(`/screens/OnBoarding/FourthScreen?pointA=${encodeURIComponent(pointA)}&pointB=${encodeURIComponent(pointB)}`)}

  return (
    <div className="third-container">
        <div className="main-circle">A</div>
        <div className="locations">
          <div>
            <text className="locationsText">{pointA}</text>
            <text className="arrow"> {"->"} </text>
            <text className="locationsText">{pointB}</text>
          </div>
          <text className="chooseLinesMessege">{"בחר את הקווים הרלוונטים עבורך:"}</text>
        </div>
        <div className="circle-container">
        {linesNumber.map((line, index) => (
          <button
            key={index}
            className="circle-button"
            style={{
              backgroundColor: selectedCircles.includes(index) ? "yellow" : "white",
            }}
            onClick={() => handleCircleClick(index)}
          >
            <div className="lineNumber">{line}</div>
            <div className="agency">{agencies[index]}</div>
          </button>
        ))}
      </div>
    <text className="continue" onClick={handleContinue}>{"המשך"}</text>
    </div>
  );
}


