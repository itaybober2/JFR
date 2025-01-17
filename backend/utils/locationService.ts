import {userLocationStore} from "@/backend/stores/userLocationStore";
import {useEffect} from "react";
import {getNearstsStops} from "@/app/src/hooks/getClosestStops";

type Stop = {
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

export const useUserLocation = (props: userLocationProps) => {
    const { handleStopsFetch } = props;
    useEffect(() => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                userLocationStore.setUserLocation({lat: latitude, lon: longitude});
                const stops = getNearstsStops([latitude,longitude]);
                handleStopsFetch(stops);
            },
            (err) => {
                console.error('Error fetching location:', err.message);
            },
            {enableHighAccuracy: true}
        );
    }, []);
};