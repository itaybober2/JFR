import {addHours, addMinutes} from "date-fns";
import axios from "axios";
import {useEffect, useState} from "react";

export const useBusLineRef = (lineNumber: string) => {
    const agencyName = lineNumber === "517" ? "סופרבוס" : "אגד";
    const params = {
        route_short_name: lineNumber,
        agency_name: agencyName,
        route_long_name_contains: "הר הצופים",
        date_from: addMinutes(Date.now(), -10).toISOString().substring(0, 10), // output: "YYYY-MM-DD"
        date_to: addHours(Date.now(), 1).toISOString().substring(0, 10),
    };
    const url = "https://open-bus-stride-api.hasadna.org.il/gtfs_routes/list";
    const [lineRefs, setLineRefs] = useState<string[]>([]);
    useEffect(() => {
        const fetchLineRefs = async () => {
            const response = await axios.get(url, {params});
            const data = response.data;
            const lineRefs =  data.map((entry: any) => entry.line_ref);
            if (lineRefs > 0) {
                setLineRefs(lineRefs);
            }
        };
        fetchLineRefs();
    }, []);
    return lineRefs;
}