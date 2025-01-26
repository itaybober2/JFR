"use client";
import { ReportFlowScreenProps } from "@/app/src/components/ReportScreen/LineSelectionScreen";
import ReportIconButton from "@/app/src/components/reportModal/ReportIconButton";
import * as React from "react";
import "./AddReportTextScreen.css";
import {useState} from "react";

interface AddReportTextScreenProps extends ReportFlowScreenProps {
    reportType: string;
    setCommentText: (text: string) => void;
    handleSubmit: () => void;
}

const AddReportTextScreen = (props: AddReportTextScreenProps) => {
    const { setScreenToRender,reportType, setCommentText, handleSubmit } = props;
    const [messageText, setMessageText] = useState('')

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(event.target.value);
        setCommentText(event.target.value);
    }

    const handleSubmitClick = () => {
        if (messageText) {
            setScreenToRender('thankYou');
            setCommentText(messageText);
            setTimeout(() => {
                handleSubmit();
            }, 1000);
        }
    }

    return (
        <div className={"add-report-screen-container"}>
            <ReportIconButton key={reportType} type={reportType}/>
            <div className="input-container">
                <input className="text-input" type="text" placeholder="הוסף תגובה" onChange={handleTextChange}/>
                <div className="send-icon">
                    <img src="/icons/sendForm.svg" alt="send" onClick={handleSubmitClick}/>
                </div>
            </div>
        </div>
    );

};

export default AddReportTextScreen;