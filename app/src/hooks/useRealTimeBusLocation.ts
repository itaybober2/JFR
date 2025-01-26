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

export type BusLocations = {
    A: BusLocation | null;
    B: BusLocation | null;
};



// TODO make this function return the top 2 bus locations
export function useRealTimeBusLocation(lineRef: number[], lineNumber: string, double: boolean = false, interval = 60000): BusLocations | BusLocation | null {
    const [busLocationA, setBusLocationA] = useState<BusLocation | null>(null);
    const [busLocationB, setBusLocationB] = useState<BusLocation | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            let DataA: BusLocation | null = null;
            let DataB: BusLocation | null = null;
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

                    // console.log("ResponseA: ", response.data[0])
                    // console.log("ResponseB: ", response.data[1])

                    if (response.data.length > 0) {
                        const dataA = response.data[0];
                        const dataB = response.data[1];
                        const busLocationA = {lat: dataA.lat, lon: dataA.lon};
                        const userLocation = userLocationStore.getUserLocation();
                        const distanceA = haversineDistance(busLocationA.lat, busLocationA.lon, userLocation.lat, userLocation.lon);
                        if (minDistance === undefined || distanceA < minDistance) {
                            minDistance = distanceA;

                            DataA = {
                                recordedAtTime: dataA.recorded_at_time,
                                lon: dataA.lon,
                                lat: dataA.lat,
                                siriRideId: dataA.siri_ride__id,
                            };
                            DataB = {
                                recordedAtTime: dataB.recorded_at_time,
                                lon: dataB.lon,
                                lat: dataB.lat,
                                siriRideId: dataB.siri_ride__id,
                            };

                            setBusLocationA(DataB);
                            setBusLocationB(DataA)
                            
                        }
                    }
                }

                if (DataA) {
                    busLocationStore.setBusLocation(DataA, lineNumber);
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

    if (double) {
        return { A: busLocationA, B: busLocationB }
    } else {
        return busLocationA;
    }
}