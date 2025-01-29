'use client';
import React, {useState} from 'react';
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import './BusInfoListItem.css';
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import { useRouter } from 'next/navigation';
import {useBusLineRef} from "@/app/src/hooks/useBusLineRef";
import {useRealTimeBusLocation} from "@/app/src/hooks/useRealTimeBusLocation";
import ListItemIconContainer from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import {busLocationStore} from "@/backend/stores/busLocationStore";
import {Stop} from "@/app/screens/HomeScreen/HomeScreen";
import {BusLocation} from "@/app/src/hooks/useRealTimeBusLocation";
import { haversineDistance } from '@/app/src/hooks/getClosestStops';
import LoadingScreen from "@/app/src/components/LoadingScreen";

type BusInfoProps = {
    lineNumber: string;
    station: Stop;
    stops: Stop[];
}

export const calculateArrival = (busLocation: BusLocation | undefined, stop: Stop | null) => {
    if (!busLocation || !stop) {
        return -2;
    }

    const distance = haversineDistance(busLocation.lat, busLocation.lon, stop.lat, stop.lon);

    // Assume average bus speed of 20 km/h in urban areas
    const averageSpeed = 1;
    const timeInHours = distance / averageSpeed;
    const timeInMinutes = Math.round(timeInHours * 60);

    return timeInMinutes;
}

const BusInfoListItem = (props: BusInfoProps) => {
    const {lineNumber, station, stops} = props
    const [arrivalTimeA, setArrivalTimeA] = React.useState<number>(-1);
    const [arrivalTimeB, setArrivalTimeB] = React.useState<number>(-1);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

    const router = useRouter();
    const handleClick = () => {
        const encodedStation = encodeURIComponent(JSON.stringify(station));
        const encodedStops = encodeURIComponent(JSON.stringify(stops));
        router.push(`/screens/BuslineScreen?lineNumber=${lineNumber}&station=${encodedStation}&stops=${encodedStops}`);
    };

    const direction = busLocationStore.getLineDirection();

    const busLineRefs = useBusLineRef(lineNumber, direction);
    const locations = useRealTimeBusLocation(busLineRefs, lineNumber, true);
    let lineA: BusLocation | undefined;
    let lineB: BusLocation | undefined;
    if (locations) {
        lineA = locations[0]
        lineB = locations[1]
    }

    React.useEffect(() => {
        const calculatedTimeA = calculateArrival(lineA, station);
        setArrivalTimeA(calculatedTimeA);
        let calculatedTimeB = calculateArrival(lineB, station);
        if (calculatedTimeA === calculatedTimeB) calculatedTimeB += 2;
        setArrivalTimeB(calculatedTimeB)
    }, [locations, station]);

    const busArrivalA = {
        id: lineA?.siriRideId || 0,
        route: lineNumber,
        time: arrivalTimeA,
    }

    const busArrivalB = {
        id: lineB?.siriRideId || 0,
        route: lineNumber,
        time: arrivalTimeB,
    }

    if (arrivalTimeA === -1) {
        return <LoadingScreen/>
    }

    return (
        <>
        {arrivalTimeA === -2 ?
            null
         : (
            <div className="list-item-container" onClick={handleClick}>
                <LineNumberCircle lineNumber={lineNumber}/>
                <div className='time-and-icons-container'>
                    <BusArrivals arrivals={[busArrivalA, busArrivalB]} isHomeScreen={true} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex}/>
                </div>
            </div>
        )}
        </>
    );
}

export default BusInfoListItem;