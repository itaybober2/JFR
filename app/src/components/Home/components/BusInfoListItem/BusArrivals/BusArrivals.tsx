import React from 'react';
import './BusArrivals.css';
import { reportsStore } from "@/backend/stores/reportsStore";
import { Icons } from "@/public/constants/constants";

type BusArrivalsProps = {
    arrivals: {
        id: number;
        route: string;
        time: number | null;
    }[];
    isHomeScreen: boolean;
}

const BusArrivals = (props: BusArrivalsProps) => {
    const { arrivals, isHomeScreen } = props;
    let iconUrl = '';
    if (reportsStore.isLineIdInStore(arrivals[0].id)) {
        iconUrl = Icons.infoIcon;
    }

    // Sort arrivals by time (null values will be placed at the end)
    const sortedArrivals = [...arrivals].sort((a, b) => {
        if (a.time === null) return 1;
        if (b.time === null) return -1;
        return a.time - b.time;
    });

    return (
        <div className="bus-arrivals">
            <div className="first-bus-arrival-time">
                {iconUrl && isHomeScreen && <img src={iconUrl} alt="Info Icon" className="info-icon" />}
                <span>{sortedArrivals[0].time}</span>
                <span className='minutes_bold'>דקות</span>
            </div>
            <div className="second-bus-arrival-time">
                <span>{sortedArrivals[1].time}</span>
                <span className='minutes_gray'>דקות</span>
            </div>
        </div>
    );
}

export default BusArrivals;