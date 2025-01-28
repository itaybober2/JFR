import React from 'react';
import './ReportFloatingBox.css';
import {Icons} from "@/public/constants/constants";

type FloatingBoxProps = {
    position: { top: number, left: number };
    description: string;
    title?: string;
    time?: string;
    color?: string;
}

const ReportFloatingBox = (props: FloatingBoxProps) => {
    const { position, description, title, time, color } = props;

    return (
        <div className="floating-box" style={{ top: position.top, left: position.left }}>
            <div className={`floating-box-header ${title === "חסימה" ? "yellow" : ""}`} style={{ backgroundColor: color }}>
                <h1>{title}</h1>
                <img src={Icons.backButton} alt={'yes'} className="arrow"/>
            </div>
            
            <div className={`floating-box-content ${title === "חסימה" ? "yellow" : ""}`}>
                <div className={'floating-box-content-time'}>
                    {time}
                </div>
                <div className={'floating-box-content-description'}>
                    {description}
                </div>
            </div>
        </div>
    );
}

export default ReportFloatingBox;