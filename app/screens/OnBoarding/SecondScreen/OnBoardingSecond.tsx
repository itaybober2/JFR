"use client";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import "./OnBoarding.css";
import {busLocationStore} from "@/backend/stores/busLocationStore";
import { AB } from "@/public/constants/constants";


const OnBoardingSecond: React.FC = () => {
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(false); // Track whether the "Continue" button was clicked
    const [pointA, setPointA] = useState<string>(""); // Save the user's first input
    const [pointB, setPointB] = useState<string>(""); // Save the user's second input

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("onboardingCompleted") === "true") {
                router.push("/screens/HomeScreen");
            }
        }
    }, [router]);

  
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
        busLocationStore.setTargetAndDestination(pointA, pointB);
        router.push(
          `/screens/OnBoarding/ThirdScreen?pointA=${encodeURIComponent(pointA)}&pointB=${encodeURIComponent(pointB)}`
        );
      };

    const handleBackClick = () => {
        if (isCompleted) setIsCompleted(false);
    }

    useEffect(() => {
        // Disable scrolling when the component mounts
        document.body.style.backgroundColor = '#d5d5d5';
        // Re-enable scrolling when the component unmounts
        return () => {
            document.body.style.backgroundColor = '';

        };
    }, []);

  return (
    <div className="on-boarding">
        <div className={`up-screen ${isCompleted ? "completed" : ""}`} onClick={handleBackClick}>
            <div className="circle-and-text">
                <div className={`circle ${isCompleted ? "" : "circle-active"}`}>
                    <span>A</span>
                </div>
                {/* <img src={AB.A} alt="A"/> */}
                {!isCompleted && <p className="circle-subtitle">מוצא</p>}
            </div>
            {!isCompleted && (
            <div className="input-and-button">
                <p className="input-title">מהי תחנת המוצא שלך?</p>
                <input
                    className="input-box"
                    type="text"
                    value={pointA}
                    onChange={handleInputChange}
                />
                <button  disabled={pointA.length < 1} className="continue-button" onClick={handleContinueClick} style={pointA ? {color: '#000'} : {color: '#b9b9b9'}}>
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
                {/* <img src={AB.B} alt="B"/> */}
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
                    <button disabled={pointB.length < 1} className="continue-button" onClick={handleFinalContinueClick} style={pointB ? {color: '#000'} : {color: '#b9b9b9'}}>
                    המשך
                    </button> }
            </div>
        </div>
    </div>
  );
};

export default OnBoardingSecond;
