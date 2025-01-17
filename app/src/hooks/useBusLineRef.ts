import {addDays, addHours, addMinutes} from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";
import {URLS} from "@/public/constants/constants";

export const useBusLineRef = (lineNumber: string, direction = 1) => {
    const agencyName = lineNumber === "517" ? "סופרבוס" : "אגד";
    const params = {
        route_short_name: lineNumber,
        agency_name: agencyName,
        route_long_name_contains: "הר הצופים",
        date_from: addDays(Date.now(), -3).toISOString().substring(0, 10), // output: "YYYY-MM-DD"
        // date_from: addMinutes(Date.now(), -10).toISOString().substring(0, 10), // output: "YYYY-MM-DD"
        date_to: addHours(Date.now(), 1).toISOString().substring(0, 10),
    };
    const [lineRefs, setLineRefs] = useState<number[]>([]);

    useEffect(() => {
        const fetchLineRefs = async () => {
            try {
                const response = await axios.get(URLS.lineRefsUrl, { params });
                const data = response.data;
                const filteredLineRefs = data
                    .filter((entry: any) => {
                        return entry.route_direction === direction.toString();
                    })
                    .map((entry: any) => entry.line_ref);
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
