"use client"
import BusInfoListItem from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import StationHeader from "@/app/src/components/Home/components/StationHeader/StationHeader";
import React, {useEffect, useState} from 'react';
import {fetchBusRoutes} from "@/backend/utils/api";

export default function HomeScreen() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        fetchBusRoutes();
            setTimeout(() => {
                setIsVisible(true);
            }, 3000);
    }, []);
    if (!isVisible) return null;
    return (
        <main>
            <div>
                <StationHeader stationName="יפו מרכז" stationNumber={753675}/>
                <BusInfoListItem lineNumber={517}/>
                <BusInfoListItem lineNumber={19}/>
                <BusInfoListItem lineNumber={17}/>
                <StationHeader stationName="אגרון" stationNumber={753675}/>
                <BusInfoListItem lineNumber={9}/>
            </div>
        </main>
    );
}
