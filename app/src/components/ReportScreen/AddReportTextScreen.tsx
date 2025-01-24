import { LineSelectionProps } from "@/app/src/components/ReportScreen/LineSelectionScreen";
import ReportIconButton from "@/app/src/components/reportModal/ReportIconButton";
import * as React from "react";
import "./AddReportTextScreen.css";

interface AddReportTextScreenProps extends LineSelectionProps {
    reportType: string;
}

const AddReportTextScreen = (props: AddReportTextScreenProps) => {
    const { reportType } = props;

    return (
        <div className={"add-report-screen-container"}>
            <ReportIconButton key={reportType} type={reportType} />
                <div className="input-container">
                    <input className="text-input" type="text" placeholder="הוסף תגובה" />
                    <div className="send-icon">
                        <img src="/icons/sendForm.svg" alt="send" />
                    </div>
                </div>
        </div>
    );
};

export default AddReportTextScreen;
