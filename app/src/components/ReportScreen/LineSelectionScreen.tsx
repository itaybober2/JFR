import React, { useState } from 'react';
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import './LineSelectionScreen.css';

const LineSelectionScreen = () => {
    const [selectedLine, setSelectedLine] = useState<string | null>(null);

    const handleCircleClick = (lineNumber: string) => {
        setSelectedLine(lineNumber);
    };

    const lineNumbers = ['19', '19א', '517', '17'];

    return (
        <div className="line-selection-screen">
            {lineNumbers.map((lineNumber) => (
                <div
                    key={lineNumber}
                    className={`line-number-circle ${selectedLine && selectedLine !== lineNumber ? 'unselected' : ''}`}
                    onClick={() => handleCircleClick(lineNumber)}
                >
                    <LineNumberCircle lineNumber={lineNumber} isShownFromReportModal={true} />
                </div>
            ))}
        </div>
    );
};

export default LineSelectionScreen;