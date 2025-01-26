"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { circelLines } from "@/public/constants/constants";

import "./fiveScreen.css";


export default function FiveScreen() {
    const searchParams = useSearchParams();
  
    const pointA = searchParams.get("pointA") || "להר הצופים"; // Extract pointA
    const pointB = searchParams.get("pointB") || "מהר הצופים"; // Extract pointB

    

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
