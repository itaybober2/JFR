import { Icons } from "@/public/constants/constants";
import React from "react";
import './ReportIconButton.css';

type ReportIconButtonProps = {
    type: 'crowded' | 'roadBlock' | 'inspector' | 'pathChange';
    isSelected: boolean;
    onClick: () => void;
};

const ReportIconButton = (props: ReportIconButtonProps) => {
    const { type, isSelected, onClick } = props;
    let imageUrl: string;

    switch (type) {
        case "crowded":
            imageUrl = Icons.CrowdedIcon;
            break;
        case "roadBlock":
            imageUrl = Icons.RoadBlockIcon;
            break;
        case "inspector":
            imageUrl = Icons.InspectionIcon;
            break;
        case "pathChange":
            imageUrl = Icons.PathChangeIcon;
            break;
    }

    return (
        <button className={`report-icon-button ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <img src={imageUrl} alt="Report Icon" className="report-icon" />
        </button>
    );
};

export default ReportIconButton;