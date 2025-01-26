import React from 'react';
import './LineNumberCircle.css';
import { circelLines } from "@/public/constants/constants";

type LineNumberCircleProps = {
    lineNumber: string;
    isShownFromReportModal?: boolean;
    isWhite?: boolean;
};

const LineNumberCircle = (props: LineNumberCircleProps) => {
    const { lineNumber, isShownFromReportModal, isWhite } = props;
    let imageUrl: string = isWhite ? circelLines.line19White : circelLines.line19A;

    switch (lineNumber) {
        case "517":
            imageUrl = isWhite ? circelLines.line517White : circelLines.line517;
            break;
        case "19":
            imageUrl = isWhite ? circelLines.line19White : circelLines.line19;
            break;
        case "17":
            imageUrl = isWhite? circelLines.line517White : circelLines.line17;
            break;
    }

    return (
        <div className={`line-number-circle ${isShownFromReportModal ? 'modal' : ''}`}>
            <img src={imageUrl} alt={`Line number ${lineNumber}`} />
        </div>
    );
};

export default LineNumberCircle;