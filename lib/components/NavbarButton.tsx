"use client";
import React, {useEffect, useState} from "react";
import {busLocationStore} from "@/backend/stores/busLocationStore";

export default function NavbarButton() {
    const [toMountScoupe, setToMountScoupe] = useState(true);
    const [target, setTarget] = useState('להר הצופים');
    const [destination, setDestination] = useState('להר הצופים');

  const handleCircleClick = () => {
    setToMountScoupe(!toMountScoupe);
    busLocationStore.setLineDirection(toMountScoupe ? 2 : 1);
  };

    useEffect(() => {
        setTarget(localStorage.getItem("target") || "להר הצופים");
        setDestination(localStorage.getItem("destination") || "מהר הצופים");
    }, []);

  return (
    <div className="navbarMainContainer">
          <div className="navbarText">
        <h1>{destination}</h1>
      </div>
      <div className="navbarButtonOutline" onClick={handleCircleClick}>
        <div className="navbarContainer">
          <div
            className={`black-circle ${toMountScoupe ? "top" : "bottom"}`}
          ></div>
        </div>
      </div>
      <div className="navbarText">
        <h1>{target}</h1>
      </div>
    </div>
  );
}
