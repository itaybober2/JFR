"use client";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

import "./firstScreen.css";
import {userLocationStore} from "@/backend/stores/userLocationStore";

export default function FirstScreen() {
  const [toMountScoupe, setToMountScoupe] = useState<boolean>(true);
  const router = useRouter();

    useEffect(() => {
        const fetchLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    userLocationStore.setUserLocation({ lat: latitude, lon: longitude });
                },
                (err) => {
                    console.error('Error fetching location:', err.message);
                },
                { enableHighAccuracy: true }
            );
        };
        fetchLocation();
        setTimeout(() => {setToMountScoupe(false)}, 1000);
        setTimeout(() => {setToMountScoupe(true)}, 2000);
        setTimeout(() => {setToMountScoupe(false)}, 3000);
        setTimeout(() => {router.push("/screens/OnBoarding/SecondScreen")},4000);
    }, []);

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
