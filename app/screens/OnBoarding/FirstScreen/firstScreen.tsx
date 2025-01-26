"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "./firstScreen.css";

export default function FirstScreen() {
  const [toMountScoupe, setToMountScoupe] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0); // Track click count
  const router = useRouter();

  const handleCircleClick = () => {
    setToMountScoupe(!toMountScoupe);
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        // Navigate to another page when clicked 3 times
        router.push("/screens/OnBoarding/SecondScreen");
      }
      return newCount;
    });
  };

  return (
    <div className="first-container">
      <div className="text-container">
        <text className="text">מוצא</text>
      </div>
      <div className="first-buttonn-outline" onClick={handleCircleClick}>
        <div className="first-inside-container">
          <div
            className={`first-black-circle ${toMountScoupe ? "top" : "bottom"}`}
          >
            <div className="letter">{toMountScoupe ? "A" : "B"}</div>
          </div>
        </div>
      </div>
      <div className="text-container">
        <text className="text">יעד</text>
      </div>
    </div>
  );
}
