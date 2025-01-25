"use client";
import {useState} from "react";
import * as React from "react";
import {createReport} from "@/backend/utils/api";
import {busLocationStore} from "@/backend/stores/busLocationStore";
import {closestStopStore} from "@/backend/stores/closestStopStore";
import './ReportScreen.css';
import LineSelectionScreen from "@/app/src/components/ReportScreen/LineSelectionScreen";
import ReportTypeSelection, {getReportText} from "@/app/src/components/ReportScreen/ReportTypeSelection";
import AddReportTextScreen from "@/app/src/components/ReportScreen/AddReportTextScreen";
import ReportScreenWraper from "@/app/src/components/ReportScreen/ReportScreenWraper";
import ThankYouScreen from "@/app/src/components/ReportScreen/ThankYouScreen";

export type screensToRender = 'lineSelection' | 'reportSelection' | 'comment' | 'thankYou';

const ReportScreen = () => {
    const [lineNumber, setLineNumber] = useState<string | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [pathChangeText, setPathChangeText] = useState<string>('');
    const [screenToRender, setScreenToRender] = useState<screensToRender>('lineSelection');
    const [selectedReportType, setSelectedReportType] = useState('')

    const getPreviousScreen = (currentScreen: screensToRender): screensToRender => {
        switch (currentScreen) {
            case 'comment':
                return 'reportSelection';
            case 'reportSelection':
                return 'lineSelection';
            default:
                return 'lineSelection';
        }
    };

    const handleSubmit = async () => {
        if (lineNumber !== null) {
            try {
                await createReport({
                    lineNumber: lineNumber,
                    lineId: busLocationStore.getBusLocation(lineNumber)?.siriRideId,
                    crowded: selectedTypes.includes('crowded'),
                    roadBlock: selectedTypes.includes('roadBlock'),
                    inspector: selectedTypes.includes('inspector'),
                    pathChange: selectedTypes.includes('pathChange'),
                    wildDriving: selectedTypes.includes('wildDriving'),
                    stink: selectedTypes.includes('stink'),
                    pathChangeDescription: pathChangeText,
                    closestStop: closestStopStore.getClosestStopToUser().stopName,
                });
                setLineNumber(null);
                setSelectedTypes([]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    switch (screenToRender) {
        case 'lineSelection':
            return (
                <ReportScreenWraper
                    screenHeaderText={'על איזה קו תרצו לדווח?'}
                    getPreviousScreen={getPreviousScreen}
                    setScreenToRender={setScreenToRender}
                    currentScreen={screenToRender}
                >
                    <LineSelectionScreen setScreenToRender={setScreenToRender} setLineToReport={setLineNumber}/>
                </ReportScreenWraper>
            )
        case 'reportSelection':
            return (
                <ReportScreenWraper
                    screenHeaderText={'על מה תרצו לדווח?'}
                    getPreviousScreen={getPreviousScreen}
                    setScreenToRender={setScreenToRender}
                    currentScreen={screenToRender}
                >
                    <ReportTypeSelection
                        setScreenToRender={setScreenToRender}
                        setSelectedReportType={setSelectedReportType}
                        setSelectedTypes={setSelectedTypes}
                    />
                </ReportScreenWraper>
            )
        case 'comment':
            return (
                <ReportScreenWraper
                    screenHeaderText={getReportText(selectedReportType)}
                    getPreviousScreen={getPreviousScreen}
                    setScreenToRender={setScreenToRender}
                    currentScreen={screenToRender}
                >
                    <AddReportTextScreen
                        setScreenToRender={setScreenToRender}
                        reportType={selectedReportType}
                        setCommentText={setPathChangeText}
                        handleSubmit={handleSubmit}
                    />
                </ReportScreenWraper>
                )
        case 'thankYou':
            return <ReportScreenWraper
                screenHeaderText={''}
                setScreenToRender={setScreenToRender}
                getPreviousScreen={getPreviousScreen}
                currentScreen={screenToRender}
                disableBackButton={true}
            >
                <ThankYouScreen setScreenToRender={setScreenToRender}/>
            </ReportScreenWraper>
        default:
            return null;
    }
}

export default ReportScreen;