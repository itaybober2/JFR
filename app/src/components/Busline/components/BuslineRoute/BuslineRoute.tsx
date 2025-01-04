import React from 'react';
import './BuslineRoute.css';
import {hardcodedStops} from "@/public/constants/constants";

// Define the types for the props
export interface BusStopProps {
  name: string;
  status: string;
}

interface BuslineRouteProps {
  currentStop: number;
  stops: BusStopProps[];
}

// Main component
export default function BuslineRoute(props: BuslineRouteProps) {

  const { currentStop, stops } = props;

  return (
    <div className="route">
      <div className="timeline-container">
        {stops.map((stop, index) => (
          <div key={index} className="station-container">
            <div className="station-container-graphic">
              <div className={`connection-line ${index <= currentStop ? 'active' : ''}`}></div>
              <div className={`station ${index === currentStop ? 'current' : ''} ${index <= currentStop ? 'active' : ''}`}>
                {index === currentStop && <div className="bus-icon">🚌</div>}
              </div>
            </div>
            <div className="station-info">{stop.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}