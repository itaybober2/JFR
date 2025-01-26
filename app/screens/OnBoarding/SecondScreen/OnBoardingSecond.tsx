"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./OnBoarding.css";

const OnBoardingSecond: React.FC = () => {
    const [isCompleted, setIsCompleted] = useState(false); // Track whether the "Continue" button was clicked
    const [pointA, setPointA] = useState<string>(""); // Save the user's first input
    const [pointB, setPointB] = useState<string>(""); // Save the user's second input
    const router = useRouter(); // Initialize router

  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPointA(event.target.value); // Update the value for Point A
    };
  
    const handleBottomInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPointB(event.target.value); // Update the value for Point B
    };

    const handleContinueClick = () => {
        if (pointA.trim() !== "") {
          setIsCompleted(true); // Enable the bottom text box
        }
      };

    const handleFinalContinueClick = () => {
        // Navigate to another page with query parameters
        router.push(
          `/screens/OnBoarding/ThirdScreen?pointA=${encodeURIComponent(pointA)}&pointB=${encodeURIComponent(pointB)}`
        );
      };

  return (
    <div className="on-boarding">
        <div className={`up-screen ${isCompleted ? "completed" : ""}`}>
            <div className="circle-and-text">
                <div className={`circle ${isCompleted ? "" : "circle-active"}`}>
                    <span>A</span>
                </div>
                {!isCompleted && <p className="circle-subtitle">מוצא</p>}
            </div>
            {!isCompleted && (
            <div className="input-and-button">
                <p className="input-title">מהי תחנת המוצא שלך?</p>
                <input
                    className="input-box"
                    type="text"
                    value={pointA}
                    onChange={handleInputChange} // Save input for Point A
                />
                <button className="continue-button" onClick={handleContinueClick}>
                    המשך
                </button>
            </div>
            )}
        </div>
        <div className={`bottom-screen ${isCompleted ? "completed" : ""}`}>
            <div className="circle-and-text">
                <div className={`circle ${!isCompleted ? "" : "circle-active"}`}>
                <span>B</span>
                </div>
                <p className="circle-subtitle">יעד</p>
            </div>
            <div className="input-and-button">
                {isCompleted && <p className="input-title">מהי תחנת היעד שלך?</p>}
                <input
                    className={isCompleted ? "input-box" : "input-box-disabled"}
                    type="text"
                    disabled={!isCompleted}
                    value={pointB}
                    onChange={handleBottomInputChange} // Save input for Point B
                />
                {isCompleted &&                 
                    <button className="continue-button" onClick={handleFinalContinueClick}>
                    המשך
                    </button> }
            </div>
        </div>
    </div>
  );
};

export default OnBoardingSecond;
