"use client";
import React, { useEffect, useState } from "react";
import "@/styles/splash-screen.css";

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const splashScreen = document.querySelector('.splash-screen') as HTMLElement;
        if (splashScreen) {
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div className="splash-screen">
            <img src="/icons/JFR_logo.svg" alt="JFR Logo" />
        </div>
    );
};

export default SplashScreen;