'use client';
import React from 'react';
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import './BusInfoListItem.css';
import ListItemIcon from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIcon";
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import {BusArrivalMock} from "@/public/constants/constants";
import { useRouter } from 'next/navigation';
import {useBusLineRef} from "@/app/src/hooks/useBusLineRef";
import {useRealTimeBusLocation} from "@/app/src/hooks/useRealTimeBusLocation";
import ListItemIconContainer
    from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";

type BusInfoProps = {
    lineNumber: string;
    direction: number;
}
const BusInfoListItem = (props: BusInfoProps) => {
    const {lineNumber, direction} = props
    const router = useRouter();
    const handleClick = () => {
        router.push(`/screens/BuslineScreen?lineNumber=${lineNumber}`);
    };

    const busLineRefs = useBusLineRef(lineNumber, direction);
    console.log('lineRefs of ' + lineNumber.toString() + ':', JSON.stringify(busLineRefs, null, 2));
    const busLocation = useRealTimeBusLocation(busLineRefs, lineNumber);
    console.log('line ' + lineNumber.toString() + ':', JSON.stringify(busLocation, null, 2));

    return (
        <div className="list-item-container" onClick={handleClick}>
            <LineNumberCircle lineNumber={lineNumber}/>
            <div className='time-and-icons-container'>
                <ListItemIconContainer lineNumber={lineNumber}/>
                <BusArrivals arrivals={BusArrivalMock}/>
            </div>
        </div>
    );
}

export default BusInfoListItem;