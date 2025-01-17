const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import axios from "axios";
import {format, addDays, addHours} from "date-fns";
import { toZonedTime } from "date-fns-tz";

export type reportProps = {
    lineNumber: string;
    lineId?: number;
    crowded?: boolean;
    inspector?: boolean;
    roadBlock?: boolean;
    pathChange?: boolean;
    pathChangeDescription?: string;
}

export async function fetchReports() {
    const response = await fetch(`${backendUrl}/reports`);
    if (!response.ok) {
        throw new Error("Failed to fetch reports");
    }
    return response.json();
}

export async function createReport(
    {
        lineNumber,
        lineId,
        crowded,
        inspector,
        roadBlock,
        pathChange,
        pathChangeDescription,
    }: reportProps
) {
    const response = await fetch(`${backendUrl}/reports`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lineNumber,
            lineId,
            crowded,
            inspector,
            roadBlock,
            pathChange,
            pathChangeDescription
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to create report");
    }
    return response.json();
}

const url = "https://open-bus-stride-api.hasadna.org.il/gtfs_routes/list";

const params = {
    route_short_name: 19,
    agency_name: "אגד",
    route_long_name_contains: "הר הצופים",
    date_from: addDays(Date.now(), 0).toISOString().substring(0, 10), // 2025-01-08
    date_to: addDays(Date.now(), 1).toISOString().substring(0, 10),
};

export async function fetchBusRoutes() {
axios
    .get(url, { params })
    .then((response) => {
        const data = response.data;

        const lineRefs = data.map((entry: any) => entry.line_ref);

        const url2 =
            "https://open-bus-stride-api.hasadna.org.il/siri_vehicle_locations/list";

        const israelTz = "Asia/Jerusalem";
        const startTime = toZonedTime(
            addHours(Date.now(), -1).toISOString().substring(0, 19),
            israelTz
        );
        const endTime = toZonedTime(
            addDays(Date.now(), 2).toISOString().substring(0, 19),
            israelTz
        );

        const params2 = {
            siri_routes__line_ref: lineRefs[0],
            siri_rides__schedualed_start_time_from: format(startTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
            siri_rides__schedualed_start_time_to: format(endTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
            order_by: "recorded_at_time desc",
        };

        return axios.get(url2, { params: params2 });
    })
    .then((response2) => {
        const data2 = response2.data;

        console.log(JSON.stringify(data2, null, 4))
        console.log("Data2 saved successfully!");
    })
    .catch((error) => {
        console.error("An error occurred:", error.message);
    });
}

