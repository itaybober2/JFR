"use client";
import React from 'react';
import './StationHeader.css';

type StationHeaderProps = {
    stationName: string;
    stationNumber: number;

}

const StationHeader = (props: StationHeaderProps) => {
    const {stationName, stationNumber} = props;
    return (
        <div className="station-header">
            <div className="station-name">
                <span>{stationName}</span>
            </div>
            <div className="station-number">
                <span>{stationNumber}</span>
            </div>
        </div>
    );
}

export default StationHeader;