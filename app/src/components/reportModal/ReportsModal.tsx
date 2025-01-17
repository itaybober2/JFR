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
import ReportIconButton from "@/app/src/components/reportModal/ReportIconButton";

type ModalProps = {
    open: boolean;
    onClose: () => void;
};

const lineNumbers = ['19', '517' ,'19א', '17'];

export default function ReportsModal(props: ModalProps) {
    const { open, onClose } = props;
    const [lineNumber, setLineNumber] = useState<string | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);


    const handleIconClick = (type: string) => {
        setSelectedTypes((prevSelectedTypes) =>
            prevSelectedTypes.includes(type)
                ? prevSelectedTypes.filter((t) => t !== type)
                : [...prevSelectedTypes, type]
        );
    };


    // const handleSubmit = async () => {
    //     if (lineNumber !== null) {
    //         try {
    //             await createReport(crowdedness, lineNumber);
    //             setLineNumber(null);
    //             setCrowdedness(1);
    //             onClose();
    //         } catch (error) {
    //             console.error( error);
    //         }
    //     }
    // };

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
                        <TextField
                            select
                            size={"medium"}
                            label="line number"
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
                        <Box className={"report-icons"}>
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
                            <TextField className={'path-change-text-field'} margin={'normal'}/>
                        }
                        <button className={"submit-button"}>דווח</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}