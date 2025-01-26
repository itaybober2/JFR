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
    <div className="navbarMainContainer">
          <div className="navbarText">
        <h1>מהר הצופים</h1>
      </div>
      <div className="navbarButtonOutline" onClick={handleCircleClick}>
        <div className="navbarContainer">
          <div
            className={`black-circle ${toMountScoupe ? "top" : "bottom"}`}
          ></div>
        </div>
      </div>
      <div className="navbarText">
        <h1>להר הצופים</h1>
      </div>
    </div>
  );
}
