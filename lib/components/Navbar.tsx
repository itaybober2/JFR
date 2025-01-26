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
        <NavbarButton toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
      <nav>
        {/* <Logo /> */}
      </nav>
    </header>
  );
}
