"use client";
import React, { useEffect, useState } from "react";
import "./BuslineRoute.css";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import ListItemIconContainer, { Report } from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import { fetchReports } from "@/backend/utils/api";

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

export default function BuslineRoute(props: BuslineRouteProps) {
    const { currentStop, stops, lineNumber } = props;
    const [report, setReport] = useState<Report | undefined>();
    const [loading, setLoading] = useState(true);
    const lineId = busLocationStore.getBusLocation(lineNumber)?.siriRideId?.toString();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedReport = await getReport(lineNumber);
            setReport(fetchedReport);
            setLoading(false);
        };
        fetchData();
    }, [lineNumber]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="route">
            <div className="timeline-container">
                {stops.map((stop, index) => (
                    <div key={index} className={`station-container ${index === currentStop ? "current" : ""}`}>
                        <div className="station-container-graphic">
                            <div className={`connection-line ${index <= currentStop ? "active" : ""}`}></div>
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
