import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import './ReportsModal.css';
import {useState} from "react";
import {createReport} from "@/backend/utils/api";
import {requestLocationPermission} from "@/backend/utils/locationService";

type ModalProps = {
    open: boolean;
    onClose: () => void;
};

const lineNumbers = ['19', '517' ,'19א', '17'];

export default function ReportsModal(props: ModalProps) {
    const { open, onClose } = props;
    const [lineNumber, setLineNumber] = useState<string | null>(null);
    const [crowdedness, setCrowdedness] = useState<number>(0);
    const [locationGranted, setLocationGranted] = useState<boolean>(false);

    const handleLocationGrant = async () => {
        try {
            await requestLocationPermission();
            setLocationGranted(true);
        } catch (error) {
            console.error( error);
        }
    }


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
                    {!locationGranted ? <div className={"modal-location-content"}>
                        <button className={"modal-location-button"} onClick={handleLocationGrant}>Grant Location Permission</button>
                    </div> :
                    <div className={"modal-content"}>
                    <h1>Report Crowdedness</h1>
                        <TextField
                            select
                            label="מספר קו"
                            value={lineNumber}
                            onChange={(e) => setLineNumber(e.target.value)}
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
                    </div> }
                </Box>
            </Modal>
        </div>
    );
}