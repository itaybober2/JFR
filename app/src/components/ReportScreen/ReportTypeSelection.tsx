import { LineSelectionProps } from "@/app/src/components/ReportScreen/LineSelectionScreen";
import ReportIconButton from "@/app/src/components/reportModal/ReportIconButton";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";

interface ReportTypeSelectionProps extends LineSelectionProps {
    setSelectedReportType: (title: string) => void;
}

export const getReportText = (type: string) => {
    switch (type) {
        case 'crowded':
            return 'צפיפות';
        case 'inspector':
            return 'פקח';
        case 'roadBlock':
            return 'חסימה';
        case 'pathChange':
            return 'שינוי מסלול';
        case 'wildDriving':
            return 'נהיגה פרועה';
        case 'stink':
            return 'סירחון';
        default:
            return '';
    }
}

const ReportTypeSelection = (props: ReportTypeSelectionProps) => {
    const { setScreenToRender, setSelectedReportType } = props;
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleIconClick = (type: string) => {
        setSelectedType(type);
        setSelectedReportType(type);
        setTimeout(() => {
            setScreenToRender('comment');
        }, 1000);
    };

    return (
        <Box className="report-screen-icons">
            {['crowded', 'inspector', 'roadBlock', 'pathChange', 'wildDriving', 'stink'].map((type) => (
                <ReportIconButton
                    key={type}
                    type={type}
                    isSelected={selectedType === type}
                    onClick={() => handleIconClick(type)}
                    text={getReportText(type)}
                />
            ))}
        </Box>
    );
};

export default ReportTypeSelection;