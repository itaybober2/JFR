"use client";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

import "./firstScreen.css";

export default function FirstScreen() {
  const [toMountScoupe, setToMountScoupe] = useState<boolean>(true);
  const router = useRouter();

    useEffect(() => {
        setTimeout(() => {setToMountScoupe(false)}, 1000);
        setTimeout(() => {setToMountScoupe(true)}, 2000);
        setTimeout(() => {setToMountScoupe(false)}, 3000);
        setTimeout(() => {router.push("/screens/OnBoarding/SecondScreen")},4000);
    }, []);

    useEffect(() => {
      // Disable scrolling when the component mounts
      document.body.style.overflow = 'hidden';

      // Re-enable scrolling when the component unmounts
      return () => {
          document.body.style.overflow = 'auto';
      };
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

  return (
    <div className="first-container">
      <div className="text-container">
        <text className="text">מוצא</text>
      </div>
      <div className="first-buttonn-outline">
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
