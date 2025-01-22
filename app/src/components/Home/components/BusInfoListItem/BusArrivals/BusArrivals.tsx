import React from 'react';
import './BusArrivals.css';

type BusArrivalsProps = {
    arrivals: {
        id: number;
        route: string;
        time: number | null;
    };
}

const BusArrivals = ( props : BusArrivalsProps) => {
    const { arrivals } = props;
    return (
        <div className="bus-arrivals">
            <div className="first-bus-arrival-time">
                <span>{arrivals.time}</span>
                <span className='minutes_bold'>דקות</span>
            </div>
            <div className="second-bus-arrival-time">
                <span>{arrivals.time}</span>
                <span className='minutes_gray'>דקות</span>
            </div>
        </div>
    );
}

export default BusArrivals;