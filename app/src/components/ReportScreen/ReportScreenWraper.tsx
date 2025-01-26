"use client";
import * as React from "react";
import '../../../../app/screens/ReportScreen/ReportScreen.css';
import {circelLines, Icons} from "@/public/constants/constants";
import {screensToRender} from "@/app/screens/ReportScreen/ReportScreen";
import Footer from "@/lib/components/FooterNavbar";
import { useState } from "react";
import Navbar from "@/lib/components/Navbar";

type ReportScreenWrapperProps = {
    children: React.ReactElement;
    screenHeaderText: string;
    setScreenToRender: (screen: screensToRender) => void;
    getPreviousScreen: (screen: screensToRender) => screensToRender;
    currentScreen: screensToRender;
    disableBackButton?: boolean;
};

const ReportScreenWrapper = (props: ReportScreenWrapperProps) => {
    const {children, screenHeaderText, setScreenToRender, getPreviousScreen, currentScreen, disableBackButton} = props;
    let imageUrl: string = Icons.backButton;
    const [toMountScoupe, setToMountScoupe] = useState(true); 
    

    const handleBackClick = () => {
        setScreenToRender(getPreviousScreen(currentScreen));
    }
    return (
        <div className="report-screen">
            <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
            <div className="report-screen-modal-content">
                <div className="report-screen-modal-header">
                    {!disableBackButton && <img src={imageUrl} alt='back button' onClick={handleBackClick}/>}
                    <tspan>
                        {screenHeaderText}
                    </tspan>
                </div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default ReportScreenWrapper;