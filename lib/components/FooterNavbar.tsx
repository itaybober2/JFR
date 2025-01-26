"use client";
import React, {useEffect, useState} from "react";
import "../../styles/footer.css";
import { FooterIcons } from "@/public/constants/constants";
import {useRouter} from "next/navigation";

type FooterProps = {
    selected: "home" | "add" | "profile";
}

const Footer = (props: FooterProps) => {
    const { selected } = props;
    const [selectedButton, setSelectedButton] = useState(selected);

  // Define a function to get the appropriate image URL based on the selected button
  const getIconSrc = (button: string) => {
    switch (button) {
      case "profile":
        return selectedButton === "profile" ? FooterIcons.ProfileSelected : FooterIcons.Profil;
      case "add":
        return selectedButton === "add" ? FooterIcons.ReportSelected : FooterIcons.Report;
      case "home":
        return selectedButton === "home" ? FooterIcons.HomeSelected : FooterIcons.Home;
      default:
        return FooterIcons.Home;
    }
  };

    const router = useRouter();
    const handleHomeClick = () => {
        setSelectedButton("home");
        router.push('/screens/HomeScreen');
    }
    const handleAddReportClick = () => {
        setSelectedButton("add");
        router.push('/screens/ReportScreen');
    }

    const handleProfileClick = () => {
      setSelectedButton("profile");
      router.push('/screens/ProfileScreen');
    }


  return (
    <>
    <footer className="footer">
      <div className="footer-container">
        <button
        className={`footer-button ${selectedButton === "home" ? "selected" : ""}`}
        onClick={handleHomeClick}
      >
        <img
          src={getIconSrc("home")}
          alt="Home"
          className="footer-icon"
        />
        <span className="footer-text">תחנה</span>
      </button>
      <div className="footer-middle">
            <button className="footer-button" onClick={handleAddReportClick}>
              <img src={getIconSrc('add')} alt="Add" className="footer-icon-Middle" />
              <span className="footer-text" style={selectedButton === 'add' ? {color: 'blue'}: {}}>הוספת דיווח</span>
            </button>
          </div>
      <button
          className={`footer-button ${selectedButton === "profile" ? "selected" : ""}`}
          onClick={handleProfileClick}
          >
              <img
                src={getIconSrc("profile")}
                alt="Profile"
                className="footer-icon"
              />
              <span className="footer-text">פרופיל</span>
            </button>
          </div>
    </footer>
 </>
  );
};

export default Footer;