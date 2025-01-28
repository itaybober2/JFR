"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "./BuslineRoute.css";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import ListItemIconContainer, { Report } from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import {reportsStore} from "@/backend/stores/reportsStore";
import {busLines, busLinesToB} from "@/public/constants/constants";
import LoadingScreen from "@/app/src/components/LoadingScreen";
import allStops from "@/backend/data/all_data_stops_with_dir.json"


export interface BusStopProps {
    name: string;
    status: string;
}

interface BuslineRouteProps {
    currentStop: number;
    lineNumber: string;
    stopCode: number;
    toMountScoupe: boolean;
    busArrivalA: {
        id: number;
        route: string;
        time: number;
    };
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
    const { currentStop, lineNumber, stopCode, toMountScoupe, busArrivalA } = props;
    const [report, setReport] = useState<Report | undefined>();
    const [loading, setLoading] = useState(true);
    const [distanceFromBus] = useState(0); // Default value, adjust as needed
    const lineId = busLocationStore.getBusLocation(lineNumber)?.siriRideId || 0;
    const stops = toMountScoupe ? busLines[lineNumber] : busLinesToB[lineNumber];
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

    function getStopCode(stopName: string) {
        // Find the stop based on stop name and direction
        const directionNumber = Number(toMountScoupe) + 1;  // Convert boolean to number
        const stop = allStops.find(stop => stop.stop_name === stopName && stop.direction === directionNumber);
        console.log("stop name", stopName);
        console.log("direction:", directionNumber);
        if(!stop){
            const newStop = allStops.find(stop => stop.stop_name === stopName);
            return newStop ? newStop.stop_code : undefined
        }
        // Return the stop code if the stop is found, otherwise return undefined or an error message
        return stop ? stop.stop_code : undefined;
    }
    


    return (
        <div className="route">
            <div className="timeline-container">
                <div className="bus-icon-container" style={{
                    // 0.2 so the bus is at the station at minutes = 0
                    top: `${((currentStop - (busArrivalA.time / 5) - 0.2 ) / (stops.length - 1)) * 100}%`,
                    transition: 'top 0.5s ease-in-out'
                }}>
                    <Image 
                        src="/icons/BusIcon.svg"
                        alt="Bus"
                        width={35}
                        height={35}
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
                            }${stop.name === report?.closestStop ? " report" : ""}`}
                        >
                            {stop.name}
                            {stop.name === report?.closestStop && (
                            <ListItemIconContainer lineNumber={lineNumber} lineId={lineId} />
                        )}
                        </div>

                        {index === currentStop && <div className="blue-box" id="blue-box">
                            {stopCode}
                        </div>}

                    </div>
                ))}
            </div>
        </div>
    );
}

