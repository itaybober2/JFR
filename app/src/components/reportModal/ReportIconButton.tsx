import React from 'react';
import './ReportIconButton.css';

type ReportIconButtonProps = {
    type: string;
    isSelected?: boolean;
    onClick?: () => void;
    text?: string;
};

const ReportIconButton = (props: ReportIconButtonProps) => {
    const { type, isSelected, onClick, text } = props;

    return (
        <div
            className={`report-icon-button ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <img src={`/icons/${type}.svg`} alt={type} />
            <span className="report-icon-text">{text}</span>
        </div>
    );
};

export default ReportIconButton;