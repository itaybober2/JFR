"use client";
import React, { useEffect, useState } from "react";
import "../../styles/footer.css";
import { FooterIcons } from "@/public/constants/constants";
import {useRouter} from "next/navigation";
import ReportsModal from "@/app/src/components/reportModal/ReportsModal";


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
        router.push('/');
    }
    const handleAddReportClick = () => {
        console.log("add report clicked");
        setSelectedButton("add");
        router.push('/screens/ReportScreen');
    }

        const [open, setOpen] = useState(false);
        const handleOpen = () => {
            setSelectedButton("add");
            setOpen(true);
        };
        const handleClose = () => setOpen(false);
        const [isVisible, setIsVisible] = useState(false);
    
        useEffect(() => {
            setTimeout(() => {
                setIsVisible(true);
            }, 3000);
        }, []);
        if (!isVisible) return null;

  return (
    <>
    <footer className="footer">
      {/* Profile Button */}
      <button
        className={`footer-button ${selectedButton === "profile" ? "selected" : ""}`}
        onClick={() => setSelectedButton("profile")}
      >
        <img
          src={getIconSrc("profile")}
          alt="Profile"
          className="footer-icon"
        />
        <span className="footer-text">פרופיל</span>
      </button>

      {/* Add Report Button */}
      <button
        className={`footer-button ${selectedButton === "add" ? "selected" : ""}`}
        onClick={handleAddReportClick}
      >
        <img
          src={getIconSrc("add")}
          alt="Add"
          className="footer-icon"
        />
        <span className="footer-text">הוסף דיווח</span>
      </button>

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
        <span className="footer-text">מסך הבית</span>
      </button>
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
