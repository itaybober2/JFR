"use client";
import Logo from "./Logo";
import NavbarButton from "./NavbarButton";
import {usePathname} from "next/navigation";


export default function Navbar() {

  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/screens/OnBoarding");

  if (hideNavbar) return null;

  return (
    <header className="navbar">
        <NavbarButton />
    </header>
  );
}
