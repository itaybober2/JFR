"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import the router
import "./OnBoarding.css";

// Import your constant
export const circelLines = {
  line517: "/icons/line517.png",
  line19: "/icons/line19.png",
  line19A: "/icons/line19A.png",
  line17: "/icons/line17.png",
};

type CircelLineKey = keyof typeof circelLines; // Get the keys of circelLines as a type


const OnBoardingLoad: React.FC = () => {
    const imageKeys: CircelLineKey[] = ["line517", "line19", "line19A", "line17"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const router = useRouter();


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageKeys.length // Loop through the images
      );
    }, 1000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [imageKeys.length]);

  useEffect(() => {
      localStorage.setItem("onboardingCompleted", "true");
    if (currentImageIndex === imageKeys.length - 1) {
      router.push(`/screens/HomeScreen`);
    }
  }, [currentImageIndex, imageKeys.length, router]);


  return (
    <div className="dynamic-image-page">
      <p className="loading-title">מסך הבית שלך בהכנה</p>
      <div className="image-container">
        <img
          src={circelLines[imageKeys[currentImageIndex]]}
          alt={`Line ${imageKeys[currentImageIndex]}`}
          className="dynamic-image"
        />
      </div>
    </div>
  );
};

export default OnBoardingLoad;
