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

type userLocationProps = {
    handleStopsFetch: (stops: Stop[]) => void;
  }


const useUserLocation = (props: userLocationProps) => {
    const { handleStopsFetch } = props;
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
                handleStopsFetch(stops);
            },
            (err) => {
                console.error('Error fetching location:', err.message);
            },
            {enableHighAccuracy: true}
        );
    }, []);

    return null; // Component renders nothing
};

export default useUserLocation;
