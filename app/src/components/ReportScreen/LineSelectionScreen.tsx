import React, { useState } from 'react';
import './LineSelectionScreen.css';
import ReportLineCircle from "@/app/src/components/ReportScreen/ReportLineCircle";
import {screensToRender} from "@/app/screens/ReportScreen/ReportScreen";

export type LineSelectionProps = {
    setScreenToRender: (screensToRender: screensToRender) => void;
};

const LineSelectionScreen = (props: LineSelectionProps) => {
    const { setScreenToRender } = props;
    const lineNumbers = ['19', '19א', '517', '17'];
    const [stayTheSame, setStayTheSame] = useState(['19', '19א', '517', '17']);

    const handleLineClick = (lineNumber: string) => {
        setStayTheSame([lineNumber]);
        setTimeout(() => {
            setScreenToRender('reportSelection');
            setTimeout(() => {
                setStayTheSame(['19', '19א', '517', '17']);
            }, 500);
        }, 800);

    };

    return (
        <div className="line-selection-screen">
            {lineNumbers.map((lineNumber) => (
                <ReportLineCircle
                    lineNumber={lineNumber}
                    key={lineNumber}
                    isSelected={stayTheSame.includes(lineNumber)}
                    onClick={() => handleLineClick(lineNumber)}
                />
            ))}
        </div>
    );
};

export default LineSelectionScreen;