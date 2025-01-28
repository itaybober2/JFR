import * as remx from 'remx';
import {fetchReports} from "@/backend/utils/api";
import {Report} from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";

const state = remx.state({
    LineIdsWithReports: [] as number[],
    reports: [] as Report[],
});

const setters = remx.setters({
    initReports: async () => {
        try {
            const data = await fetchReports();
            state.reports = data.data;
            state.LineIdsWithReports = data.data.map((report: Report) => report.lineId);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    },
    setLineId( lineId: number ) {
        state.LineIdsWithReports = [...state.LineIdsWithReports, lineId];
    },
    addReport(report: Report) {
        state.reports = [...state.reports, report];
    }
});

const getters = remx.getters({
    isLineIdInStore(lineId: number) :boolean {
        return state.LineIdsWithReports.includes(lineId);
    },
    getAllReports() {
        return state.reports;
    },
    getAllReportsByLineId(lineId: number) {
        return state.reports.filter((report) => report.lineId === lineId);
    }
});

export const reportsStore = {
    ...setters,
    ...getters,
};