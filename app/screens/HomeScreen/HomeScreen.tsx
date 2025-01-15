"use client"
import React, { useEffect, useState } from "react";
import BusInfoListItem from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import StationHeader from "@/app/src/components/Home/components/StationHeader/StationHeader";
import { fetchBusRoutes } from "@/backend/utils/api";
import useUserLocation from "@/app/src/hooks/useUserLocation";
import {requestLocationPermission} from "@/backend/utils/locationService";

type Stop = {
    id: number;
    stop_name: string;
    lat: number;
    lon: number;
    stop_code: number;
    line_num: string[];
    line_ref: number[];
    direction: number;
};

type HomeScreenProps = {
    toMountScoupe: boolean;
};

const HomeScreen = (props: HomeScreenProps) => {
    const { toMountScoupe } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [stops, setStops] = useState<Stop[]>([]);

    useEffect(() => {
        fetchBusRoutes();
        setTimeout(() => {
            setIsVisible(true);
        }, 3000);
    }, []);

    const handleStopsFetch = (fetchedStops: Stop[]) => {
        setStops(fetchedStops);
        console.log("Fetched stops:", fetchedStops); // Optional: For debugging
    };

    useUserLocation({ handleStopsFetch });

    const filteredStops = stops.filter((stop) => stop.direction === (toMountScoupe ? 1 : 2));

    if (!isVisible) return null;

    return (
        <main>
            <div>
                {filteredStops.length > 0 &&
                    filteredStops.map((stop, index) => (
                        <div key={index}>
                            <StationHeader stationName={stop.stop_name} stationNumber={stop.stop_code} />
                            {stop.line_num.map((line, lineIndex) => (
                                <BusInfoListItem key={lineIndex} lineNumber={line} direction={toMountScoupe ? 1 : 2} />
                            ))}
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default HomeScreen;