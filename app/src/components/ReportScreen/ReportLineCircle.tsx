import React from 'react';
import { circelLines } from "@/public/constants/constants";
import './ReportLineCircle.css';

type LineNumberCircleProps = {
    lineNumber: string;
    isSelected: boolean;
    onClick: () => void;
};

const ReportLineCircle = (props: LineNumberCircleProps) => {
    const { lineNumber, isSelected, onClick } = props;
    let imageUrl: string = isSelected ? circelLines.line19AWhite : circelLines.line19ASelected;

    switch (lineNumber) {
        case "517":
            imageUrl = isSelected ? circelLines.line517White : circelLines.line517Selected;
            break;
        case "19":
            imageUrl = isSelected ? circelLines.line19White : circelLines.line19Selected;
            break;
        case "17":
            imageUrl = isSelected ? circelLines.line17White : circelLines.line17Selected;
            break;
    }

    return (
        <div onClick={onClick}>
            <img src={imageUrl} alt={`Line number ${lineNumber}`} />
        </div>
    );
};

export default ReportLineCircle;