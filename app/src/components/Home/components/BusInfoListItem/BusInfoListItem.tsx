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
    const distance = Math.sqrt(dLat * dLat + dLon * dLon); // Distance in meters
    // Assume average bus speed of 20 km/h in urban areas
    const averageSpeed = 20;
    const timeInHours = distance / averageSpeed;
    const timeInMinutes = Math.round(timeInHours * 60);

    return timeInMinutes;
}

const BusInfoListItem = (props: BusInfoProps) => {
    const {lineNumber, station} = props
    const [arrivalTime, setArrivalTime] = React.useState<number>(-1);
    
    const router = useRouter();
    const handleClick = () => {
        const encodedStation = encodeURIComponent(JSON.stringify(station));
        router.push(`/screens/BuslineScreen?lineNumber=${lineNumber}&station=${encodedStation}`);
    };

    const direction = busLocationStore.getLineDirection();

    const busLineRefs = useBusLineRef(lineNumber, direction);
    const busLocation = useRealTimeBusLocation(busLineRefs, lineNumber);
    const lineId = busLocation?.siriRideId.toString();

    React.useEffect(() => {
        const calculatedTime = calculateArrival(busLocation, station);
        setArrivalTime(calculatedTime);
    }, [busLocation, station]);

    const busArrival = {
        id: Number(lineId),
        route: lineNumber,
        time: arrivalTime,
    }

    return (
        <>
        <div className="list-item-container" onClick={handleClick}>
            <LineNumberCircle lineNumber={lineNumber}/>
            <div className='time-and-icons-container'>
                <ListItemIconContainer lineNumber={lineNumber} lineId={lineId}/>
                <BusArrivals arrivals={busArrival}/>
            </div>
        </div>
        </>
    );
}

export default BusInfoListItem;