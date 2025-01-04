import React from 'react';
import './BusArrivals.css';

type BusArrivalsProps = {
    arrivals: {
        id: number;
        route: string;
        time: number;
    }[];
}

const BusArrivals = ( props : BusArrivalsProps) => {
    const { arrivals } = props;

    return (
        <div className="bus-arrivals">
            <div className="first-bus-arrival-time">
                <span>{arrivals[0].time}</span>
                <span className='minutes'>דק</span>
            </div>
            <div className="second-bus-arrival-time">
                <span>{arrivals[1].time}</span>
                <span className='minutes'>דק</span>

            </div>
        </div>
    );
}

export default BusArrivals;