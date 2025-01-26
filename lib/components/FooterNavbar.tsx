"use client";
import React, { useEffect, useState } from "react";
import "../../styles/footer.css";
import { FooterIcons } from "@/public/constants/constants";
import {useRouter} from "next/navigation";
import ReportsModal from "@/app/src/components/reportModal/ReportsModal";
import {busLocationStore} from "@/backend/stores/busLocationStore";


const Footer = () => {
  // State to track the selected button
  const [selectedButton, setSelectedButton] = useState("home");

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


        const [open, setOpen] = useState(false);

        const handleClose = () => {
          setOpen(false);
          setSelectedButton("home");
        }

  return (
    <>
    <footer className="footer">
      <div className="footer-container">
      {/* Home Button */}
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
      {/* Add Report Button */}
      {/* Middle Circle with "+" Button */}
      <div className="footer-middle">
            <button className="footer-button" onClick={handleAddReportClick}            >
              <img src={FooterIcons.Report} alt="Add" className="footer-icon-Middle" />
              <span className="footer-text">הוספת דיווח</span>
            </button>
          </div>
      {/* Profile Button */}
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
     <div className="popup">
     <div className="popup-inner">
         <ReportsModal open={open} onClose={handleClose}/>
     </div>
 </div>
 </>
  );
};

export default Footer;