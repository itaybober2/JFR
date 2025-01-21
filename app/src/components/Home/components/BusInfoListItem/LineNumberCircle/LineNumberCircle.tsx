import React from 'react';
import './LineNumberCircle.css';
import { circelLines } from "@/public/constants/constants";

type LineNumberCircleProps = {
    lineNumber: string;
};

const LineNumberCircle = (props: LineNumberCircleProps) => {
    const { lineNumber } = props;
    let imageUrl: string = circelLines.line19A;

    switch (lineNumber) {
        case "517":
            imageUrl = circelLines.line517;
            break;
        case "19":
            imageUrl = circelLines.line19;
            break;
        case "17":
            imageUrl = circelLines.line17;
            break;
    }

    return (
        <div className="line-number-circle">
            <img src={imageUrl} alt={`Line number ${lineNumber}`} />
        </div>
    );
};

export default LineNumberCircle;
