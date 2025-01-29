import React, { useEffect, useState } from 'react';
import './BusArrivals.css';
import { reportsStore } from "@/backend/stores/reportsStore";
import { useConnect } from "remx";
import BusArrivalTime from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivalTime";

type BusArrivalsProps = {
    arrivals: {
        id: number;
        route: string;
        time: number | null;
    }[];
    isHomeScreen: boolean;
    selectedIndex: number | null;
    setSelectedIndex: (index: number) => void;
}

const BusArrivals = (props: BusArrivalsProps) => {
    const { arrivals, isHomeScreen, selectedIndex, setSelectedIndex} = props;
    const showInfoIcon0 = useConnect(reportsStore.isLineIdInStore, [arrivals[0].id]);
    const showInfoIcon1 = useConnect(reportsStore.isLineIdInStore, [arrivals[1].id]);

    const sortedArrivals = [...arrivals].sort((a, b) => {
        if (a.time === null) return 1;
        if (b.time === null) return -1;
        return a.time - b.time;
    });

    const handleSelection = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div className="bus-arrivals">
            <BusArrivalTime
                time={sortedArrivals[0].time}
                isHomeScreen={isHomeScreen}
                showInfoIcon={showInfoIcon0}
                isSelected={selectedIndex === 0}
                setIsSelected={() => handleSelection(0)}
            />
            <BusArrivalTime
                time={sortedArrivals[1].time}
                isHomeScreen={isHomeScreen}
                showInfoIcon={showInfoIcon1}
                isSelected={selectedIndex === 1}
                setIsSelected={() => handleSelection(1)}
            />
        </div>
    );
}

export default BusArrivals;