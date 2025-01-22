import { Report } from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import { fetchReports } from "@/backend/utils/api";

const setFetchedReport = (data: any, lineNumber: string): Report | undefined => {
    let report: Report | undefined;
    data.data.forEach((fetchedReport: Report) => {
        if (fetchedReport.lineNumber === lineNumber) {
            report = fetchedReport;
        }
    });
    return report;
}

const fetchReport = async (lineNumber: string) => {
    try {
        const data = await fetchReports();
        return setFetchedReport(data, lineNumber);
    } catch (error) {
        console.error("Error fetching reports:", error);
    }
};

export const getReport = (lineNumber: string): Promise<Report | undefined> => {
    return fetchReport(lineNumber);
}