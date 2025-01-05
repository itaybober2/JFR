import React, {useEffect, useState} from 'react';
import './ListItemIcon.css';
import {Icons} from "@/public/constants/constants";
import {fetchReports} from "@/backend/utils/api";

type IconProps = {
    type: 'roadBlock' | 'crowded';
    crowdedLevel?: number;
    lineNumber?: number;
}

export type Report = {
    lineNumber: number;
    crowdedness: 1 | 2 | 3;
    created_at: string | null;
};

const ListItemIcon = (props: IconProps) => {
    const {type, crowdedLevel, lineNumber} = props;
    const imageUrl = type === 'roadBlock' ? Icons.RoadBlockIcon : Icons.CrowdedIcon;
    const [reports, setReports] = useState<Report[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReports();
                setReports(data.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchData();
    }, []);

    if (reports.length === 0) return null;

    if (type === 'crowded' && reports.find(report => report.lineNumber === lineNumber)) {
        return (
            <div className="bus-crowdedness">
                <img src={imageUrl} alt="Bus Icon"/>
            </div>
        );
    }
    if (type === 'roadBlock') {
        return (
            <div className="bus-crowdedness">
                <img src={imageUrl} alt="Bus Icon"/>
            </div>
        );
    }
}

    export default ListItemIcon;