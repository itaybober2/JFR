"use client";
import React from "react";
import {busLocationStore} from "@/backend/stores/busLocationStore";

interface NavbarButtonProps {
  toMountScoupe: boolean;
  setToMountScoupe: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavbarButton({
  toMountScoupe,
  setToMountScoupe,
}: NavbarButtonProps) {
  const handleCircleClick = () => {
    setToMountScoupe(!toMountScoupe); // Toggle the position
    busLocationStore.setLineDirection(toMountScoupe ? 2 : 1);
  };

  return (
    <div className="mainContainer">
      <div className="buttonOutline" onClick={handleCircleClick}>
        <div className="container">
          <div
            className={`black-circle ${toMountScoupe ? "top" : "bottom"}`}
          ></div>
        </div>
      </div>
      <div className="navbarText">
        <h1>{toMountScoupe ? "להר הצופים" : "מהר הצופים"}</h1>
      </div>
    </div>
  );
}
