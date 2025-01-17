"use client";
import { useEffect } from 'react';
import { getNearstsStops } from "./getClosestStops";
import { userLocationStore } from "@/backend/stores/userLocationStore";

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

        const fetchLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    userLocationStore.setUserLocation({ lat: latitude, lon: longitude });
                    console.log(latitude, longitude);
                    const stops = getNearstsStops([latitude, longitude]);
                    console.log(stops);
                    handleStopsFetch(stops);
                },
                (err) => {
                    console.error('Error fetching location:', err.message);
                },
                { enableHighAccuracy: true }
            );
        };

        fetchLocation();
        const intervalId = setInterval(fetchLocation, 10000);

        return () => clearInterval(intervalId);
    }, []);
};

export default useUserLocation;