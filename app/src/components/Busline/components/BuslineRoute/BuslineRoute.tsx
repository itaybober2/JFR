"use client";
import React, { useEffect, useState } from "react";
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


export default function BuslineRoute(props: BuslineRouteProps) {
    const { currentStop, lineNumber, stopCode } = props;
    const [report, setReport] = useState<Report | undefined>();
    const lineId = busLocationStore.getBusLocation(lineNumber)?.siriRideId;
    const stops = busLines[lineNumber];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setReport(reportsStore.getAllReportsByLineId(lineId)[0]);
            setLoading(false);
    }, [lineId]);

    if (loading) {
        return (
            <LoadingScreen marginTop={4}/>
        );
    }


    return (
        <div className="route">
            <div className="timeline-container">
                {stops.map((stop, index) => (
                    <div key={index} className={`station-container ${index === currentStop ? "current" : ""}`}>
                        <div className="station-container-graphic">
                            <div className={`connection-line ${index < currentStop ? "active" : ""}`}></div>
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

