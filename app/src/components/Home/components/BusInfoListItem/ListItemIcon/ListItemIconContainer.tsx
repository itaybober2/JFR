import {useEffect, useRef, useState} from "react";
import ListItemIcon from "./ListItemIcon";
import { reportsStore } from "@/backend/stores/reportsStore";
import ReportFloatingBox from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ReportFloatingBox";
import {useConnect} from "remx";
import { report } from "process";

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
    lineId: number;
}

const ListItemIconContainer = (props: ListItemIconContainerProps) => {
    const { lineNumber, lineId } = props;
    const [showBox, setShowBox] = useState(false);
    const color = useRef('');
    const title = useRef('');
    const time = useRef('');
    const description = useRef<string | undefined>('');

    const reports =useConnect(reportsStore.getAllReportsByLineId, [lineId]);

    const handleIconClick = (type: string) => {
        if (reports !== undefined) {
        switch (type) {
            case 'crowded':
                color.current = ('#EF2626');
                description.current = reports.find((report: Report) => report.crowded)?.pathChangeDescription;
                title.current = ('צפיפות');
                time.current = reports.find((report: Report) => report.crowded)?.created_at || "";
                break;
            case 'inspector':
                color.current = ('#0000FF');
                description.current = reports.find((report: Report) => report.inspector)?.pathChangeDescription;
                title.current = ('פקח');
                time.current = reports.find((report: Report) => report.inspector)?.created_at || "";
                break;
            case 'roadBlock':
                color.current = ('#FFF200');
                description.current = reports.find((report: Report) => report.roadBlock)?.pathChangeDescription;
                title.current = ('חסימה');
                time.current = reports.find((report: Report) => report.roadBlock)?.created_at || "";
                break;
            case 'pathChange':
                color.current = ('#FF4E00');
                description.current = reports.find((report: Report) => report.pathChange)?.pathChangeDescription;
                title.current = ('שינוי מסלול');
                time.current = reports.find((report: Report) => report.pathChange)?.created_at || "";
                break;
            case 'wildDriving':
                color.current = ('#7500C1');
                description.current = reports.find((report: Report) => report.wildDriving)?.pathChangeDescription;
                title.current = ('נהיגה פרועה');
                time.current = reports.find((report: Report) => report.wildDriving)?.created_at || "";
                break;
            case 'stink':
                color.current = ('#CD00FF');
                description.current = reports.find((report: Report) => report.stink)?.pathChangeDescription;
                title.current = ('סירחון');
                time.current = reports.find((report: Report) => report.stink)?.created_at || "";
                break;
            default:
                color.current = ('');
                description.current = '';
                title.current = ('');
                time.current = ('');
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
            {showBox && description.current !== undefined && description.current.length > 0 && (
                <>
                    <div className="overlay" onClick={handleCloseBox}></div>
                    <div className="icon-container">
                        <ReportFloatingBox description={description.current} position={{top: 5, left: -200}} title={title.current} color={color.current} time={time.current}/>
                    </div>
                </>
            )}
        </div>
    )
}

export default ListItemIconContainer;