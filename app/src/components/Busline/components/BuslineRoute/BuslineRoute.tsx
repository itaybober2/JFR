"use client";
import React, { useEffect, useState } from "react";
import "./BuslineRoute.css";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import ListItemIconContainer, { Report } from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
<<<<<<< HEAD
import { fetchReports } from "@/backend/utils/api";
import Image from "next/image";
import { userLocationStore } from "@/backend/stores/userLocationStore";
=======
import {reportsStore} from "@/backend/stores/reportsStore";
import {busLines} from "@/public/constants/constants";
import LoadingScreen from "@/app/src/components/LoadingScreen";

>>>>>>> main

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
<<<<<<< HEAD
    var { currentStop, stops, lineNumber } = props;
=======
    const { currentStop, lineNumber, stopCode } = props;
>>>>>>> main
    const [report, setReport] = useState<Report | undefined>();
    const lineId = busLocationStore.getBusLocation(lineNumber)?.siriRideId;
    const stops = busLines[lineNumber];
    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
    const currentStopRef = React.useRef<HTMLDivElement>(null);
    const lineId = busLocationStore.getBusLocation(lineNumber)?.siriRideId?.toString();
    const [busLocation, setBusLocation] = useState<number>(currentStop);
    const [distanceFromBus, setDistanceFromBus] = useState<number>(0);
    const direction = busLocationStore.getLineDirection();
    
    // Process stops based on direction
    // stops = direction !== 1 ? [...stops].reverse() : stops;
=======
>>>>>>> main

    useEffect(() => {
        setReport(reportsStore.getAllReportsByLineId(lineId)[0]);
            setLoading(false);
    }, [lineId]);

    useEffect(() => {
        if (!loading && currentStopRef.current) {
            currentStopRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const busLoc = busLocationStore.getBusLocation(lineNumber);
            const userLoc = userLocationStore.getUserLocation();
            
            if (busLoc?.lat && busLoc?.lon && userLoc?.lat && userLoc?.lon) {
                const distance = calculateDistance(
                    userLoc.lat,
                    userLoc.lon,
                    busLoc.lat,
                    busLoc.lon
                );
                setDistanceFromBus(distance*3);
            }
        }
    }, [loading, lineNumber]);

    if (loading) {
        return (
            <LoadingScreen marginTop={4}/>
        );
    }
<<<<<<< HEAD
    console.log("distanc: ", distanceFromBus )
=======


>>>>>>> main
    return (
        <div className="route">
            <div className="timeline-container">
                <div className="bus-icon-container" style={{
                    top: `${( (currentStop - distanceFromBus) / (stops.length - 1)) * 100}%`,
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
<<<<<<< HEAD
                            {index === currentStop ? (
                                <>
                                    <div className="connection-line connection-line-top active"></div>
                                    <div className="connection-line connection-line-bottom "></div>
                                </>
                            ) : (
                                <div className={`connection-line ${index <= currentStop ? "active" : ""}`}></div>
                            )}
=======
                            <div className={`connection-line ${index < currentStop ? "active" : ""}`}></div>
>>>>>>> main
                            <div
                                className={`station ${index === currentStop ? "current" : ""} ${
                                    index <= currentStop ? "active" : ""
                                }`}
                            ></div>
                            <div className={`connection-line ${index < currentStop - 1 ? "active" : ""}`}></div>
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

