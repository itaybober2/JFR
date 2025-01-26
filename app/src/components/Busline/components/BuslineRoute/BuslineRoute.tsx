"use client";
import React, { useEffect, useState } from "react";
import "./BuslineRoute.css";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import ListItemIconContainer, { Report } from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import { fetchReports } from "@/backend/utils/api";
import Image from "next/image";
import { userLocationStore } from "@/backend/stores/userLocationStore";

export interface BusStopProps {
    name: string;
    status: string;
}

interface BuslineRouteProps {
    currentStop: number;
    stops: BusStopProps[];
    lineNumber: string;
}

const getReport = async (lineNumber: string): Promise<Report | undefined> => {
    try {
        const data = await fetchReports();
        return data.data.find((fetchedReport: Report) => fetchedReport.lineNumber === lineNumber);
    } catch (error) {
        console.error("Error fetching reports:", error);
        return undefined;
    }
};

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
    var { currentStop, stops, lineNumber } = props;
    const [report, setReport] = useState<Report | undefined>();
    const [loading, setLoading] = useState(true);
    const currentStopRef = React.useRef<HTMLDivElement>(null);
    const lineId = busLocationStore.getBusLocation(lineNumber)?.siriRideId?.toString();
    const [busLocation, setBusLocation] = useState<number>(currentStop);
    const [distanceFromBus, setDistanceFromBus] = useState<number>(0);
    const direction = busLocationStore.getLineDirection();
    
    // Process stops based on direction
    // stops = direction !== 1 ? [...stops].reverse() : stops;

    useEffect(() => {
        const fetchData = async () => {
            const fetchedReport = await getReport(lineNumber);
            setReport(fetchedReport);
            setLoading(false);
        };
        fetchData();
    }, [lineNumber]);

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
        return <div>Loading...</div>;
    }
    console.log("distanc: ", distanceFromBus )
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
                            {index === currentStop ? (
                                <>
                                    <div className="connection-line connection-line-top active"></div>
                                    <div className="connection-line connection-line-bottom "></div>
                                </>
                            ) : (
                                <div className={`connection-line ${index <= currentStop ? "active" : ""}`}></div>
                            )}
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
                        {stop.name === report?.closestStop && (
                            <ListItemIconContainer lineNumber={lineNumber} lineId={lineId} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
