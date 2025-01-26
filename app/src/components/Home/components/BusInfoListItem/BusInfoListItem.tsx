'use client';
import React from 'react';
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import './BusInfoListItem.css';
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import {BusArrivalMock} from "@/public/constants/constants";
import { useRouter } from 'next/navigation';
import {useBusLineRef} from "@/app/src/hooks/useBusLineRef";
import {useRealTimeBusLocation} from "@/app/src/hooks/useRealTimeBusLocation";
import ListItemIconContainer
    from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import {busLocationStore} from "@/backend/stores/busLocationStore";
import {Stop} from "@/app/screens/HomeScreen/HomeScreen";
import {BusLocation} from "@/app/src/hooks/useRealTimeBusLocation";
import { haversineDistance } from '@/app/src/hooks/getClosestStops';

type BusInfoProps = {
    lineNumber: string;
    station: Stop ;
}

export const calculateArrival = (busLocation: BusLocation | null, stop: Stop | null) => {
    if (!busLocation || !stop) {
        return -1;
    }

    // Convert coordinates to radians
    const toRad = (value: number) => (value * Math.PI) / 180;
    


    // Euclidean distance formula
    const dLat = (busLocation.lat - stop.lat) * 111;
    const dLon = (busLocation.lon - stop.lon) * 111;
    const distance = haversineDistance(busLocation.lat, busLocation.lon, stop.lat, stop.lon);

    // const distance = Math.sqrt(dLat * dLat + dLon * dLon); 


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
    const lineIdA = locations && 'A' in locations ? locations.A?.siriRideId.toString() : locations?.siriRideId.toString();
    const lineIdB = locations && 'B' in locations ? locations.B?.siriRideId.toString() : undefined;
    
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


    return (
        <>
        {arrivalTimeA === -1 ? (
            <div></div>
        ) : (
            <div className="list-item-container" onClick={handleClick}>
                <LineNumberCircle lineNumber={lineNumber}/>
                <div className='time-and-icons-container'>
                    <ListItemIconContainer lineNumber={lineNumber} lineId={lineIdA}/>
                    <BusArrivals arrivals={[busArrivalA, busArrivalB]}/>
                </div>
            </div>
        )}
        </>
    );
}

export default BusInfoListItem;