"use client"
import React, { useEffect, useState } from "react";
import BusInfoListItem from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import StationHeader from "@/app/src/components/Home/components/StationHeader/StationHeader";
import { fetchBusRoutes } from "@/backend/utils/api";
import useUserLocation from "@/app/src/hooks/useUserLocation";
import "./HomeScreen.css";
import {closestStopStore} from "@/backend/stores/closestStopStore";
import {useConnect} from "remx";
import {busLocationStore} from "@/backend/stores/busLocationStore";

export type Stop = {
    id: number
    stop_name: string;
    lat: number;
    lon: number;
    stop_code: number;
    line_num: string[];
    line_ref: number[];
    direction: number;
};


const HomeScreen = () => {
    const [stops, setStops] = useState<Stop[]>([]);
    const directionSubscription = useConnect(busLocationStore.getLineDirection) ?? 1;


    useEffect(() => {
        fetchBusRoutes();
    }, []);

    const handleStopsFetch = (fetchedStops: Stop[]) => {
        setStops(fetchedStops);
        closestStopStore.setClosestStopToUser(
            fetchedStops[0].stop_name,
            fetchedStops[0].stop_code,
            {
                lat: fetchedStops[0].lat,
                lon: fetchedStops[0].lon
            }
        );
    };

    useUserLocation({ handleStopsFetch });

    let filteredStops = stops.filter((stop) => stop.direction === (directionSubscription));

    filteredStops = filteredStops.filter(stop => stop.line_num.length > 0);


    return (
        <main>
            <div>
            {filteredStops.length > 0 &&
                filteredStops.map((stop, index) => (
                    <div key={index}>
                    <StationHeader stationName={stop.stop_name} stationNumber={stop.stop_code} />
                    {stop.line_num.map((line, lineIndex) => (

                        <React.Fragment key={lineIndex}>
                        <BusInfoListItem lineNumber={line} station={stop} stops={stops}/>
                        {lineIndex < stop.line_num.length - 1 && <div className="line" />}
                        </React.Fragment>
                    ))}
                    </div>
                ))}
            </div>
        </main>
    );
};

export default HomeScreen;