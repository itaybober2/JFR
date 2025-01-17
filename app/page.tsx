"use client";
import React, { useState, useEffect } from "react";
import HomeScreen from "@/app/screens/HomeScreen/HomeScreen";
import Navbar from "@/lib/components/Navbar";

export default function App() {
    const [toMountScoupe, setToMountScoupe] = useState(true);

    useEffect(() => {
        const savedState = localStorage.getItem("navbarButtonState");
        if (savedState !== null) {
            setToMountScoupe(JSON.parse(savedState));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("navbarButtonState", JSON.stringify(toMountScoupe));
    }, [toMountScoupe]);

    return (
        <div>
            <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
            <HomeScreen toMountScoupe={toMountScoupe} />
        </div>
    );
}
