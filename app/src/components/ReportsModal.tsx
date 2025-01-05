import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import './ReportsModal.css';
import {useEffect, useState} from "react";
import {fetchReports, createReport} from "@/backend/utils/api";

type ModalProps = {
    open: boolean;
    onClose: () => void;
};


const lineNumbers = [19, 517, 22, 17]; // Example line numbers

export default function ReportsModal(props: ModalProps) {
    const { open, onClose } = props;
    const [lineNumber, setLineNumber] = useState<number | null>(null);
    const [crowdedness, setCrowdedness] = useState<number>(0);


    const handleSubmit = async () => {
        if (lineNumber !== null) {
            try {
                await createReport(crowdedness, lineNumber);
                setLineNumber(null);
                setCrowdedness(1);
                onClose();
            } catch (error) {
                console.error( error);
            }
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={'modal-box'}>
                    <div className={"modal-content"}>
                        <h1>Report Crowdedness</h1>
                        <TextField
                            select
                            label="מספר קו"
                            value={lineNumber}
                            onChange={(e) => setLineNumber(Number(e.target.value))}
                            fullWidth
                            margin="normal"
                        >
                            {lineNumbers.map((number) => (
                                <MenuItem key={number} value={number}>
                                    {number}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Slider
                            value={crowdedness}
                            onChange={(e, newValue) => setCrowdedness(newValue as number)}
                            aria-labelledby="crowdedness-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={3}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit Report
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}