import axios from "axios";
import {format, addHours, addMinutes, addDays} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useState, useEffect } from "react";
import {URLS} from "@/public/constants/constants";
import {busLocationStore} from "@/backend/stores/busLocationStore";
import {userLocationStore} from "@/backend/stores/userLocationStore";
import {haversineDistance} from "@/app/src/hooks/getClosestStops";

export type BusLocation = {
    recordedAtTime: string;
    lon: number;
    lat: number;
    siriRideId: number;
};

export function useRealTimeBusLocation(lineRef: number[], lineNumber: string, interval = 60000) {
    const [busLocation, setBusLocation] = useState<BusLocation | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            let latestData: BusLocation | null = null;
            let minDistance = undefined as number | undefined;

            try {
                const israelTz = "Asia/Jerusalem";
                const startTime = toZonedTime(
                    addMinutes(Date.now(), -10).toISOString().substring(0, 19),
                    israelTz
                );
                const endTime = toZonedTime(
                    addHours(Date.now(), 1).toISOString().substring(0, 19),
                    israelTz
                );

                for (let i = 0; i < lineRef.length; i++) {
                    const params = {
                        siri_routes__line_ref: lineRef[i],
                        siri_rides__schedualed_start_time_from: format(startTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
                        siri_rides__schedualed_start_time_to: format(endTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
                        order_by: "recorded_at_time desc",
                    };

                    const response = await axios.get(
                        URLS.busLocationUrl,
                        { params: params }
                    );

                    if (response.data.length > 0) {
                        const data = response.data[0];
                        const busLocation = {lat: data.lat, lon: data.lon};
                        const userLocation = userLocationStore.getUserLocation();
                        const distance = haversineDistance(busLocation.lat, busLocation.lon, userLocation.lat, userLocation.lon);
                        if (minDistance === undefined || distance < minDistance) {
                            minDistance = distance;
                            latestData = {
                                recordedAtTime: data.recorded_at_time,
                                lon: data.lon,
                                lat: data.lat,
                                siriRideId: data.siri_ride__id,
                            };
                        }
                    }
                }

                if (latestData) {
                    setBusLocation(latestData);
                    busLocationStore.setBusLocation(latestData, lineNumber);
                }
            } catch (error) {
                console.error("Error fetching real-time bus location:", error);
            }
        };

        // Initial fetch
        fetchLocation();

        const intervalId = setInterval(fetchLocation, interval);

        return () => clearInterval(intervalId);
    }, [lineRef, interval]);

    return busLocation;
}