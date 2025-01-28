"use client";
import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { circelLines } from "@/public/constants/constants";

import "./fiveScreen.css";


export default function FiveScreen() {
    let pointA = "להר הצופים";
    let pointB = "מהר הצופים";
    if (typeof window !== "undefined") {
      // This code will only run on the client
      pointA = localStorage.getItem("target") || "להר הצופים";
      pointB = localStorage.getItem("destination")|| "מהר הצופים";
    }

    useEffect(() => {
        // Disable scrolling when the component mounts
        document.body.style.overflow = 'hidden';
        document.body.style.backgroundColor = 'white';

        // Re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.backgroundColor = '';

        };
    }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

    const router = useRouter();
    const handleContinue = () =>{
      router.push(`/screens/OnBoarding/SixthScreen?pointA=${encodeURIComponent(pointA)}&pointB=${encodeURIComponent(pointB)}`); 

  }
  return (
    <div className="fifth-container">
        <text className="summaryText">{"לסיכום"}</text>
        <div className="infoContainer">
            <text className="direction">A</text>
            <div className="textContainer">
                <text className="fifth-text">{"קווים רלוונטים מ-"}</text>
                <text className="fifth-text">{pointA}</text>
            </div>
            <div className="linesIcons">
                <img className="icon" src={circelLines.line17} alt={"Line number"}/>
                <img className="icon" src={circelLines.line19} alt={"Line number"}/>
                <img className="icon" src={circelLines.line19A} alt={"Line number"}/>
                <img className="icon" src={circelLines.line517} alt={"Line number"}/>
            </div>
        </div>
        <div className="infoContainer">
            <text className="direction">B</text>
            <div className="textContainer">
                <text className="fifth-text">{"קווים רלוונטים מ-"}</text>
                <text className="fifth-text">{pointB}</text>
            </div>
            <div className="linesIcons">
                <img className="icon" src={circelLines.line17} alt={"Line number"}/>
                <img className="icon" src={circelLines.line19} alt={"Line number"}/>
                <img className="icon" src={circelLines.line19A} alt={"Line number"}/>
                <img className="icon" src={circelLines.line517} alt={"Line number"}/>
            </div>
        </div>
        <text className="fifth-continue" onClick={handleContinue}>{"המשך"}</text>
    </div>
  );
}
