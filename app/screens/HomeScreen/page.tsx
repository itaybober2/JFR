"use client"
import BusInfoListItem from "@/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import StationHeader from "@/src/components/Home/components/StationHeader/StationHeader";
import React, {useEffect, useState} from 'react';

export default function HomeScreen() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
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
                <BusInfoListItem lineNumber={78}/>
                <BusInfoListItem lineNumber={12}/>
                <BusInfoListItem lineNumber={14}/>
            </div>
        </main>
    );
}
