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
    station: Stop ;
}

export const calculateArrival = (busLocation: BusLocation | null, stop: Stop | null) => {
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
    const {lineNumber, station} = props
    const [arrivalTimeA, setArrivalTimeA] = React.useState<number>(-1);
    const [arrivalTimeB, setArrivalTimeB] = React.useState<number>(-1);

    const router = useRouter();
    const handleClick = () => {
        const encodedStation = encodeURIComponent(JSON.stringify(station));
        router.push(`/screens/BuslineScreen?lineNumber=${lineNumber}&station=${encodedStation}`);
    };

    const direction = busLocationStore.getLineDirection();

    const busLineRefs = useBusLineRef(lineNumber, direction);
    const locations = useRealTimeBusLocation(busLineRefs, lineNumber, true);
    const lineIdA = locations && 'A' in locations ? locations.A?.siriRideId : locations?.siriRideId;
    const lineIdB = locations && 'B' in locations ? locations.B?.siriRideId : undefined;
    
    React.useEffect(() => {
        const calculatedTimeA = calculateArrival(locations && 'A' in locations ? locations.A : null, station);
        setArrivalTimeA(calculatedTimeA);
        const calculatedTimeB = calculateArrival(locations && 'B' in locations ? locations.B : null, station);
        setArrivalTimeB(calculatedTimeB)
    }, [locations, station]);

    const busArrivalA = {
        id: Number(lineIdA),
        route: lineNumber,
        time: arrivalTimeA,
    }

    const busArrivalB = {
        id: Number(lineIdB),
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
                    <BusArrivals arrivals={[busArrivalA, busArrivalB]} isHomeScreen={true}/>
                </div>
            </div>
        )}
        </>
    );
}

export default BusInfoListItem;