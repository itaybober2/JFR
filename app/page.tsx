"use client";
import React, { useState, useEffect } from "react";
import HomeScreen from "@/app/screens/HomeScreen/HomeScreen";
import Navbar from "@/lib/components/Navbar";
import FirstScreen from "./screens/OnBoarding/FirstScreen/firstScreen";
import {reportsStore} from "@/backend/stores/reportsStore";


export default function App() {
    const [toMountScoupe, setToMountScoupe] = useState(true);

    useEffect(() => {
        reportsStore.initReports();
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
            <FirstScreen />
            {/* <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} /> */}
            {/* <HomeScreen toMountScoupe={toMountScoupe} /> */}
        </div>
    );
}
