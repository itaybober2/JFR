"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./thirdScreen.css";


export default function ThirdScreen() {
  // Get the query parameters
  let pointA = "להר הצופים";
  let pointB = "מהר הצופים";
  if (typeof window !== "undefined") {
    // This code will only run on the client
    pointA = localStorage.getItem("target") || "להר הצופים";
    pointB = localStorage.getItem("destination")|| "מהר הצופים";
  }


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
   useEffect(() => {
      // Disable scrolling when the component mounts
      document.body.style.backgroundColor = 'white';

      // Re-enable scrolling when the component unmounts
      return () => {
          document.body.style.backgroundColor = '';

      };
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount
  
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


