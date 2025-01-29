import React from "react";
import { Icons } from "@/public/constants/constants";

type BusArrivalTimeProps = {
    showInfoIcon: boolean;
    isHomeScreen: boolean;
    time: number | null;
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
}

const BusArrivalTime = (props: BusArrivalTimeProps) => {
    const { showInfoIcon, isHomeScreen, time, isSelected, setIsSelected } = props;
    let iconUrl = Icons.infoIcon;

    const handleTimeClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsSelected(!isSelected);
    }

    return (
        <div className="first-bus-arrival-time" onClick={handleTimeClick}>
            {showInfoIcon && isHomeScreen && <img src={iconUrl} alt="Info Icon" className="info-icon" />}
            <span style={isSelected ? { color: "black" } : { color: '#9F9F9F' }}>
                {time !== null && time < 10 ? `0${time}` : time}
            </span>
            <span className='minutes_bold' style={isSelected ? { color: "black" } : { color: '#9F9F9F' }}>
                דקות
            </span>
        </div>
    )
}

export default BusArrivalTime;