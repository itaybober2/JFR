"use client";
import React, { useState, useEffect } from "react";
import FirstScreen from "./screens/OnBoarding/FirstScreen/firstScreen";
import {reportsStore} from "@/backend/stores/reportsStore";
import {useRouter} from "next/navigation";


export default function App() {
    const [toMountScoupe, setToMountScoupe] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const isOnboardingCompleted = localStorage.getItem("onboardingCompleted");
        if (isOnboardingCompleted) {
            router.push("/screens/HomeScreen");
        } else {
            router.push("/screens/OnBoarding/FirstScreen");
        }
    }, [router]);


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
