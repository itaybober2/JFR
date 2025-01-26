import Image from "next/image";
import React from "react";
import "./BusIcon.css";

interface BusIconProps {
    position: number; // Value between 0 and 100 for percentage
    className?: string;
    style?: React.CSSProperties;
}

export default function BusIcon({ position, className = "", style = {} }: BusIconProps) {
    return (
        <div 
            className={`bus-icon-wrapper ${className}`}
            style={{
                top: `${position}%`,
                ...style
            }}
        >
            <Image 
                src="/icons/BusIcon.svg"
                alt="Bus"
                width={24}
                height={24}
                className="bus-icon"
            />
        </div>
    );
} 