"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "./BuslineRoute.css";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import ListItemIconContainer, { Report } from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import {reportsStore} from "@/backend/stores/reportsStore";
import {busLines} from "@/public/constants/constants";
import LoadingScreen from "@/app/src/components/LoadingScreen";


export interface BusStopProps {
    name: string;
    status: string;
}

interface BuslineRouteProps {
    currentStop: number;
    lineNumber: string;
    stopCode: number;
}


const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

export default function BuslineRoute(props: BuslineRouteProps) {
    const { currentStop, lineNumber, stopCode } = props;
    const [report, setReport] = useState<Report | undefined>();
    const [loading, setLoading] = useState(true);
    const [distanceFromBus] = useState(0); // Default value, adjust as needed
    const lineId = busLocationStore.getBusLocation(lineNumber)?.siriRideId;
    const stops = busLines[lineNumber];
    const currentStopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setReport(reportsStore.getAllReportsByLineId(lineId)[0]);
        setLoading(false);
    }, [lineId]);

    useEffect(() => {
        if (currentStopRef.current) {
            currentStopRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [currentStop]);

    
    if (loading) {
        return (
            <LoadingScreen marginTop={4}/>
        );
    }
    console.log(((currentStop) / (stops.length - 1)) * 100)


    return (
        <div className="route">
            <div className="timeline-container">
                <div className="bus-icon-container" style={{
                    top: `${((currentStop) / (stops.length - 1)) * 500}%`,
                    transition: 'top 0.5s ease-in-out'
                }}>
                    <Image 
                        src="/icons/BusIcon.svg"
                        alt="Bus"
                        width={24}
                        height={24}
                        className="bus-icon"
                    />
                </div>
                {stops.map((stop, index) => (
                    <div 
                        key={index} 
                        className={`station-container ${index === currentStop ? "current" : ""}`}
                        ref={index === currentStop ? currentStopRef : undefined}
                    >
                        <div className="station-container-graphic">

                            <div className={`connection-line top ${index <= currentStop ? "active" : ""}`}></div>
                            <div className={`connection-line bottom ${index < currentStop ? "active" : ""}`}></div>
                            <div
                                className={`station ${index === currentStop ? "current" : ""} ${
                                    index <= currentStop ? "active" : ""
                                }`}
                            ></div>

                        </div>
                        <div
                            className={`station-info ${
                                index < currentStop ? "active" : index === currentStop ? "current" : ""
                            }`}
                        >
                            {stop.name}
                        </div>
                        {index === currentStop && <div className="blue-box" id="blue-box">
                            {stopCode}
                        </div>}
                        {stop.name === report?.closestStop && (
                            <ListItemIconContainer lineNumber={lineNumber} lineId={lineId} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

