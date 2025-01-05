'use client';
import React from 'react';
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import './BusInfoListItem.css';
import ListItemIcon from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIcon";
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import {BusArrivalMock} from "@/public/constants/constants";
import { useRouter } from 'next/navigation';

type BusInfoProps = {
    lineNumber: number;
}
const BusInfoListItem = (props: BusInfoProps) => {
    const {lineNumber} = props
    const router = useRouter();
    const handleClick = () => {
        router.push(`/screens/BuslineScreen?lineNumber=${lineNumber}`);

    };
    return (
        <div className="list-item-container" onClick={handleClick}>
            <LineNumberCircle lineNumber={lineNumber}/>
            <div className='time-and-icons-container'>
                <div className="icons-container">
                    <ListItemIcon type={'crowded'} crowdedLevel={1} lineNumber={lineNumber}/>
                    <ListItemIcon type={'roadBlock'}/>
                </div>
                <BusArrivals arrivals={BusArrivalMock}/>
            </div>
        </div>
    );
}

export default BusInfoListItem;