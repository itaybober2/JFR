"use client";
import React, { useState, useEffect } from 'react'; // Import useState
import HomeScreen from "@/app/screens/HomeScreen/page";
import Navbar from "@/lib/components/Navbar";


export default function App() {
  const [toMountScoupe, setToMountScoupe] = useState(true); // Define the state here

  // Retrieve state from localStorage on mount (for persistence across reloads)
  useEffect(() => {
      const savedState = localStorage.getItem("navbarButtonState");
      if (savedState !== null) {
          setToMountScoupe(JSON.parse(savedState));
      }
  }, []);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
      localStorage.setItem("navbarButtonState", JSON.stringify(toMountScoupe));
  }, [toMountScoupe]);


  return (
    <div>
      <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
      <HomeScreen toMountScoupe={toMountScoupe} /> {/* Pass the state to HomeScreen */}
    </div> 
  );
}
