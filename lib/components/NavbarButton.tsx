"use client";
import React, { useState } from "react";

export default function NavbarButton() {
  const [toMountScoupe, setToMountScoupe] = useState(true); // State to track the circle's position

  const handleCircleClick = () => {
    setToMountScoupe(!toMountScoupe); // Toggle the position
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
