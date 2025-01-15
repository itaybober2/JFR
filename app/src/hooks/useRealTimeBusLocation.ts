import axios from "axios";
import { format, addHours, addMinutes } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useState, useEffect } from "react";

export type BusLocation = {
    recorded_at_time: string;
    lon: number;
    lat: number;
};

export function useRealTimeBusLocation(lineRef: number[], interval = 60000) {
    const [busLocation, setBusLocation] = useState<BusLocation | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            let latestData: BusLocation | null = null;

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
                        "https://open-bus-stride-api.hasadna.org.il/siri_vehicle_locations/list",
                        { params: params }
                    );

                    if (response.data.length > 0) {
                        const data = response.data[0];
                        if (!latestData || new Date(data.recorded_at_time) > new Date(latestData.recorded_at_time)) {
                            latestData = {
                                recorded_at_time: data.recorded_at_time,
                                lon: data.lon,
                                lat: data.lat,
                            };
                        }
                    }
                }

                if (latestData) {
                    setBusLocation(latestData);
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