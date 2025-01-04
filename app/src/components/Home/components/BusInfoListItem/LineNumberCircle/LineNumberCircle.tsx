import React from 'react';
import './LineNumberCircle.css';

type LineNumberCircleProps = {
    lineNumber: number;
}
const LineNumberCircle = (props: LineNumberCircleProps) => {
    const { lineNumber } = props;
    return (
        <div className="line-number-circle">
            <span className="line-number-font">{lineNumber}</span>
        </div>
    );
}

export default LineNumberCircle;