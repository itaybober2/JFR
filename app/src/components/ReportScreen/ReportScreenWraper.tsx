"use client";
import * as React from "react";
import { useEffect } from "react";
import '../../../../app/screens/ReportScreen/ReportScreen.css';
import {Icons} from "@/public/constants/constants";
import {screensToRender} from "@/app/screens/ReportScreen/ReportScreen";

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

useEffect(() => {
            // Disable scrolling when the component mounts
            document.body.style.overflow = 'hidden';
            // Re-enable scrolling when the component unmounts
            return () => {
                document.body.style.overflow = 'auto';
    
            };
        }, []);


    const handleBackClick = () => {
        setScreenToRender(getPreviousScreen(currentScreen));
    }
    return (
        <div className="report-screen">
            <div className="report-screen-modal-content">
                <div className="report-screen-modal-header">
                    {!disableBackButton && currentScreen != "lineSelection" && <img src={imageUrl} alt='back button' onClick={handleBackClick}/>}
                    <tspan>
                        {screenHeaderText}
                    </tspan>
                </div>
                {children}
            </div>
            {/*<Footer selected={'add'}/>*/}
        </div>
    );
}

export default ReportScreenWrapper;