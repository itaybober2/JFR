import {useEffect, useState} from "react";
import {fetchReports} from "@/backend/utils/api";
import ListItemIcon from "./ListItemIcon";

export type Report = {
    id: number;
    created_at: string;
    lineNumber: string;
    lineId: string;
    crowded: boolean;
    inspector: boolean;
    roadBlock: boolean;
    pathChange: boolean;
    pathChangeDescription: string;
};

type ListItemIconContainerProps = {
    lineNumber: string;
}

const ListItemIconContainer = (props: ListItemIconContainerProps) => {
    const {lineNumber} = props;
    const [report, setReport] = useState<Report>();
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReports();
                setReports(data.data);
                data.data.forEach((report: Report) => {
                    if (report.lineNumber === lineNumber) {
                        setReport(report);
                        return;
                    }
                });
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchData();
    }, []);

    if (!report) return null;

    return (
        <div className={"list-item-icons-container"}>
            {/*todo: not very efficient... but it works.*/}
            {reports.find((report) => report.lineNumber === lineNumber && report.crowded) && <ListItemIcon type={'crowded'}/>}
            {reports.find((report) => report.lineNumber === lineNumber && report.inspector) && <ListItemIcon type={'inspector'}/>}
            {reports.find((report) => report.lineNumber === lineNumber && report.roadBlock) && <ListItemIcon type={'roadBlock'}/>}
            {reports.find((report) => report.lineNumber === lineNumber && report.pathChange) && <ListItemIcon type={'pathChange'}/>}
        </div>
    )
}

export default ListItemIconContainer;