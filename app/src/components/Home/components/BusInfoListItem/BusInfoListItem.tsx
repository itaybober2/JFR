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

type BusInfoProps = {
    lineNumber: string;
}
const BusInfoListItem = (props: BusInfoProps) => {
    const {lineNumber} = props
    const router = useRouter();
    const handleClick = () => {
        router.push(`/screens/BuslineScreen?lineNumber=${lineNumber}`);
    };

    const direction = busLocationStore.getLineDirection();

    const busLineRefs = useBusLineRef(lineNumber, direction);
    console.log('lineRefs of ' + lineNumber.toString() + ':', JSON.stringify(busLineRefs, null, 2));
    const busLocation = useRealTimeBusLocation(busLineRefs, lineNumber);
    console.log('line ' + lineNumber.toString() + ':', JSON.stringify(busLocation, null, 2));
    const lineId = busLocation?.siriRideId.toString();

    return (
        <>
        <div className="list-item-container" onClick={handleClick}>
            <LineNumberCircle lineNumber={lineNumber}/>
            <div className='time-and-icons-container'>
                <ListItemIconContainer lineNumber={lineNumber} lineId={lineId}/>
                <BusArrivals arrivals={BusArrivalMock}/>
            </div>
        </div>
        </>
    );
}

export default BusInfoListItem;