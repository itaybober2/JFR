import { addHours, addMinutes } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";

export const useBusLineRef = (lineNumber: string, direction = 1) => {
    const agencyName = lineNumber === "517" ? "סופרבוס" : "אגד";
    const params = {
        route_short_name: lineNumber,
        agency_name: agencyName,
        route_long_name_contains: "הר הצופים",
        date_from: addMinutes(Date.now(), -10).toISOString().substring(0, 10), // output: "YYYY-MM-DD"
        date_to: addHours(Date.now(), 1).toISOString().substring(0, 10),
    };
    const url = "https://open-bus-stride-api.hasadna.org.il/gtfs_routes/list";
    const [lineRefs, setLineRefs] = useState<number[]>([]);

    useEffect(() => {
        const fetchLineRefs = async () => {
            try {
                const response = await axios.get(url, { params });
                const data = response.data;
                console.log("lineRefs raw data: ", JSON.stringify(data, null, 4)); // Optional: For debugging
                const filteredLineRefs = data
                    .filter((entry: any) => {
                        console.log(`entry.route_direction: ${entry.route_direction}, direction: ${direction.toString()}`);
                        return entry.route_direction === direction.toString();
                    })
                    .map((entry: any) => entry.line_ref);
                console.log("filteredLineRefs: ", filteredLineRefs); // Optional: For debugging
                if (filteredLineRefs.length > 0) {
                    setLineRefs(filteredLineRefs);
                }
            } catch (error) {
                console.error("Failed to fetch bus line refs:", error);
            }
        };
        fetchLineRefs();
    }, [lineNumber, direction]);

    return lineRefs;
};
