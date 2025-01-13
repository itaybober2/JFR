"use client";
import React, { useEffect, useState } from 'react';
import { getNearstsStops } from "./getClosestStops";

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

interface Location {
    lat: number | null;
    lon: number | null;
}

interface Props {
    onStopsFetch: (stops: Stop[]) => void;
  }


const LocationFetcher: React.FC<Props> = ({ onStopsFetch  }) => {    
    useEffect(() => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude,longitude);
                const stops = getNearstsStops([latitude,longitude]);
                console.log(stops);
                onStopsFetch(stops);
            },
            (err) => {
                console.error('Error fetching location:', err.message);
            },
            {enableHighAccuracy: true}
        );
    }, [onStopsFetch]);

    return null; // Component renders nothing
};

export default LocationFetcher;
