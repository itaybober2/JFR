import axios from "axios";
import {addHours, addMinutes, format} from "date-fns";
import {toZonedTime} from "date-fns-tz";
import {useEffect, useState} from "react";
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

export function useRealTimeBusLocation(lineRef: number[], lineNumber: string, double: boolean = false, interval = 60000): BusLocation[] | undefined {
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
                        const userLocation = userLocationStore.getUserLocation();
                        
                        // Calculate distances for all buses and sort them
                        type BusWithDistance = {
                            bus: {
                                recorded_at_time: string;
                                lon: number;
                                lat: number;
                                siri_ride__id: number;
                            };
                            distance: number;
                        };
                        
                        const busesWithDistances = response.data.map((bus: BusWithDistance['bus']) => ({
                            bus,
                            distance: haversineDistance(bus.lat, bus.lon, userLocation.lat, userLocation.lon)
                        }));
                        
                        // Sort by distance to user
                        busesWithDistances.sort((a: BusWithDistance, b: BusWithDistance) => a.distance - b.distance);
                        
                        // Take the two closest buses if available
                        if (busesWithDistances.length >= 2) {
                            const closestBus = busesWithDistances[0].bus;
                            const secondClosestBus = busesWithDistances[1].bus;
                            
                            DataA = {
                                recordedAtTime: closestBus.recorded_at_time,
                                lon: closestBus.lon,
                                lat: closestBus.lat,
                                siriRideId: closestBus.siri_ride__id,
                            };
                            
                            DataB = {
                                recordedAtTime: secondClosestBus.recorded_at_time,
                                lon: secondClosestBus.lon,
                                lat: secondClosestBus.lat,
                                siriRideId: secondClosestBus.siri_ride__id,
                            };

                            setBusLocationA(DataA);
                            setBusLocationB(DataB);
                            
                            // Update the minimum distance for the current line
                            minDistance = busesWithDistances[0].distance;
                        } else if (busesWithDistances.length === 1) {
                            const closestBus = busesWithDistances[0].bus;
                            
                            DataA = {
                                recordedAtTime: closestBus.recorded_at_time,
                                lon: closestBus.lon,
                                lat: closestBus.lat,
                                siriRideId: closestBus.siri_ride__id,
                            };
                            
                            setBusLocationA(DataA);
                            setBusLocationB(null);
                            
                            minDistance = busesWithDistances[0].distance;
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

    if (double && busLocationA && busLocationB) {
        return [busLocationA, busLocationB];
    } else {
        if (busLocationA) return [busLocationA];
    }
}