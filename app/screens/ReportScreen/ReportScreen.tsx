"use client";
import {useState} from "react";
import * as React from "react";
import {createReport} from "@/backend/utils/api";
import {busLocationStore} from "@/backend/stores/busLocationStore";
import {closestStopStore} from "@/backend/stores/closestStopStore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ReportIconButton from "@/app/src/components/reportModal/ReportIconButton";
import './ReportScreen.css';
import MenuItem from "@mui/material/MenuItem";
import LineSelectionScreen from "@/app/src/components/ReportScreen/LineSelectionScreen";
import ReportTypeSelection from "@/app/src/components/ReportScreen/ReportTypeSelection";
import AddReportTextScreen from "@/app/src/components/ReportScreen/AddReportTextScreen";

const lineNumbers = ['19', '19א', '517', '17'];

const ReportScreen = () => {
    const [lineNumber, setLineNumber] = useState<string | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [pathChangeText, setPathChangeText] = useState<string>('');
    const [screenToRender, setScreenToRender] = useState<'lineSelection' | 'reportSelection' | 'comment'>('lineSelection')

    const handleIconClick = (type: string) => {
        setSelectedTypes((prevSelectedTypes) =>
            prevSelectedTypes.includes(type)
                ? prevSelectedTypes.filter((t) => t !== type)
                : [...prevSelectedTypes, type]
        );
    };

    const handlePathChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPathChangeText(e.target.value);
    }

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
            return <LineSelectionScreen/>
        case 'reportSelection':
            return <ReportTypeSelection/>
        case 'comment':
            return <AddReportTextScreen/>
    }

    return (
        <div className="report-screen">
                <div className="report-screen-modal-content">
                    <div className="report-screen-modal-header">
                        <tspan>
                            על איזה קו תרצו לדווח?
                        </tspan>
                    </div>
                    <Box className={"report-screen-icons"}>
                        <ReportIconButton
                            type="crowded"
                            isSelected={selectedTypes.includes('crowded')}
                            onClick={() => handleIconClick('crowded')}
                        />
                        <ReportIconButton
                            type="roadBlock"
                            isSelected={selectedTypes.includes('roadBlock')}
                            onClick={() => handleIconClick('roadBlock')}
                        />
                        <ReportIconButton
                            type="inspector"
                            isSelected={selectedTypes.includes('inspector')}
                            onClick={() => handleIconClick('inspector')}
                        />
                        <ReportIconButton
                            type="pathChange"
                            isSelected={selectedTypes.includes('pathChange')}
                            onClick={() => handleIconClick('pathChange')}
                        />
                    </Box>

                    {
                        selectedTypes.includes('pathChange') &&
                        <TextField
                            className={'report-screen-path-change-text-field'}
                            margin={'normal'}
                            onChange={handlePathChangeText}
                        />
                    }
                    <button
                        className={"report-screen-submit-button"}
                        onClick={handleSubmit}
                    >
                        דווח
                    </button>
                </div>
        </div>
    );
}

export default ReportScreen;