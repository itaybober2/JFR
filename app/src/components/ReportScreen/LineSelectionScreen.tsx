import React, { useState } from 'react';
import './LineSelectionScreen.css';
import ReportLineCircle from "@/app/src/components/ReportScreen/ReportLineCircle";
import {screensToRender} from "@/app/screens/ReportScreen/ReportScreen";

export type ReportFlowScreenProps = {
    setScreenToRender: (screensToRender: screensToRender) => void;
};

interface LineSelectionScreenProps extends ReportFlowScreenProps {
    setLineToReport: (lineNumber: string) => void;
}

const LineSelectionScreen = (props: LineSelectionScreenProps) => {
    const { setScreenToRender, setLineToReport } = props;
    const lineNumbers = ['19', '19א', '517', '17'];
    const [stayTheSame, setStayTheSame] = useState(['19', '19א', '517', '17']);

    const handleLineClick = (lineNumber: string) => {
        setStayTheSame([lineNumber]);
        setLineToReport(lineNumber);
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