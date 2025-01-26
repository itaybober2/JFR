"use client";
import React, { useEffect, useState } from "react";
import "@/styles/splash-screen.css";

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const splashScreen = document.querySelector('.splash-screen') as HTMLElement;
        if (splashScreen) {
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                setTimeout(() => {
                    setIsVisible(false);
                }, 1000);
            }, 1500);
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