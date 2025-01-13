"use client";
import BusInfoListItem from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import StationHeader from "@/app/src/components/Home/components/StationHeader/StationHeader";
import React, { useEffect, useState } from 'react';
import { fetchBusRoutes } from "@/backend/utils/api";
import LocationFetcher from "@/app/src/hooks/useUserLocation"; // Assuming LocationComponent fetches stops

interface Stop {
    id: number;
    stop_name: string;
    lat: number;
    lon: number;
    stop_code: number;
    line_num: string[];
    line_ref: number[];
    direction: number;
}

interface HomeScreenProps {
    toMountScoupe: boolean; // Accept this prop
  }

export default function HomeScreen({ toMountScoupe }: HomeScreenProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [stops, setStops] = useState<Stop[]>([]);

    useEffect(() => {
        fetchBusRoutes();
        setTimeout(() => {
            setIsVisible(true);
        }, 3000);
    }, []);

    const handleStopsFetch = (fetchedStops: Stop[]) => {
        setStops(fetchedStops);
        console.log('Fetched stops:', fetchedStops); // Optional: For debugging
    };

    // Filter stops based on the direction and button state
    const filteredStops = stops.filter(stop => stop.direction === (toMountScoupe ? 0 : 1));

    if (!isVisible) return null;

    return (
        <main>
          <div>
            {/* Rendering StationHeader for each stop */}
            {filteredStops.length > 0 && filteredStops.map((stop, index) => (
              <div key={index}>
                <StationHeader 
                  stationName={stop.stop_name} 
                  stationNumber={stop.stop_code} 
                />
                {/* Render BusInfoListItem for each line number */}
                {stop.line_num.map((line, lineIndex) => (
                  <BusInfoListItem key={lineIndex} lineNumber={line} />
                ))}
              </div>
            ))}
          </div>
    
          {/* Assuming LocationComponent fetches the stops */}
          <LocationFetcher onStopsFetch={handleStopsFetch} />
        </main>
      );
}
