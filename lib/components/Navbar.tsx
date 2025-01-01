"use client";
import Logo from "./Logo"
import NavbarButton from "./NavbarButton";
import {useEffect, useState} from "react";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 3000);
    }, []);
    if (!isVisible) return null;
  return (
    <header className="navbar">
      <h1>
        <NavbarButton/>
      </h1>
      <nav>
        <Logo/>
  
      </nav>
    </header>
  );
}
