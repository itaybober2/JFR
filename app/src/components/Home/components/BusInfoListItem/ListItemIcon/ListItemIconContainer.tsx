import {useEffect, useRef, useState} from "react";
import ListItemIcon from "./ListItemIcon";
import { reportsStore } from "@/backend/stores/reportsStore";
import ReportFloatingBox from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ReportFloatingBox";

export type Report = {
    id?: number;
    created_at?: string;
    lineNumber: string;
    lineId: number;
    crowded: boolean;
    inspector: boolean;
    roadBlock: boolean;
    pathChange: boolean;
    wildDriving: boolean;
    stink: boolean;
    pathChangeDescription: string;
    closestStop: string;
};

type ListItemIconContainerProps = {
    lineNumber: string;
    lineId?: number;
}

const ListItemIconContainer = (props: ListItemIconContainerProps) => {
    const { lineNumber, lineId } = props;
    const [reports, setReports] = useState<Report[]>();
    const [showBox, setShowBox] = useState(false);
    const color = useRef('');
    const title = useRef('');
    const description = useRef<string | undefined>('');

    useEffect(() => {
        if (lineId) setReports(reportsStore.getAllReportsByLineId(lineId));
    }, [lineId]);

    const handleIconClick = (type: string) => {
        if (reports !== undefined) {
        switch (type) {
            case 'crowded':
                color.current = ('#EF2626');
                description.current = reports.find((report: Report) => report.crowded)?.pathChangeDescription;
                title.current = ('צפיפות');
                break;
            case 'inspector':
                color.current = ('#0000FF');
                description.current = reports.find((report: Report) => report.inspector)?.pathChangeDescription;
                title.current = ('פקח');
                break;
            case 'roadBlock':
                color.current = ('#FFF200');
                description.current = reports.find((report: Report) => report.roadBlock)?.pathChangeDescription;
                title.current = ('חסימה');
                break;
            case 'pathChange':
                color.current = ('#FF4E00');
                description.current = reports.find((report: Report) => report.pathChange)?.pathChangeDescription;
                title.current = ('שינוי מסלול');
                break;
            case 'wildDriving':
                color.current = ('#7500C1');
                description.current = reports.find((report: Report) => report.wildDriving)?.pathChangeDescription;
                title.current = ('נהיגה פרועה');
                break;
            case 'stink':
                color.current = ('#CD00FF');
                description.current = reports.find((report: Report) => report.stink)?.pathChangeDescription;
                title.current = ('סירחון');
                break;
            default:
                color.current = ('');
                description.current = '';
                title.current = ('');
        }
        setShowBox(!showBox);
    }
    }

    const handleCloseBox = () => {
        setShowBox(false);
        color.current = '';
        title.current = '';
        description.current = '';
    }

    if (!reports) return null;

    return (
        <div className={"list-item-icons-container"}>
            {reports.find((report) => report.crowded) && <ListItemIcon type={'crowded'} handleIconClick={() => handleIconClick('crowded')} />}
            {reports.find((report) => report.inspector) && <ListItemIcon type={'inspector'} handleIconClick={() => handleIconClick('inspector')} />}
            {reports.find((report) => report.roadBlock) && <ListItemIcon type={'roadBlock'} handleIconClick={() => handleIconClick('roadBlock')} />}
            {reports.find((report) => report.pathChange) && <ListItemIcon type={'pathChange'} handleIconClick={() => handleIconClick('pathChange')} />}
            {reports.find((report) => report.wildDriving) && <ListItemIcon type={'wildDriving'} handleIconClick={() => handleIconClick('wildDriving')} />}
            {reports.find((report) => report.stink) && <ListItemIcon type={'stink'} handleIconClick={() => handleIconClick('stink')} />}
            {showBox && description.current !== undefined && (
                <>
                    <div className="overlay" onClick={handleCloseBox}></div>
                    <div className="icon-container">
                        <ReportFloatingBox description={description.current} position={{top: 5, left: 20}} title={title.current} color={color.current}/>
                    </div>
                </>
            )}
        </div>
    )
}

export default ListItemIconContainer;