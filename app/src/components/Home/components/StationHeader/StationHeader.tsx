"use client";
import React from 'react';
import './StationHeader.css';
import {useRouter} from "next/navigation";

type StationHeaderProps = {
    stationName: string;
    stationNumber: number;

}

const StationHeader = (props: StationHeaderProps) => {
    const {stationName, stationNumber} = props;
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    }
    return (
        <div className="station-header" onClick={handleClick}>
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