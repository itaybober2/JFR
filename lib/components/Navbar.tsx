"use client";
import Logo from "./Logo";
import NavbarButton from "./NavbarButton";
import { useEffect, useState } from "react";

interface NavbarProps {
  toMountScoupe: boolean;
  setToMountScoupe: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ toMountScoupe, setToMountScoupe }: NavbarProps) {

  return (
    <header className="navbar">
      <h1>
        <NavbarButton toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
      </h1>
      <nav>
        {/* <Logo /> */}
      </nav>
    </header>
  );
}
