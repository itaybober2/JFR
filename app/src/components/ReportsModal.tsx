import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './ReportsModal.css';
import {useEffect, useState} from "react";
import {fetchReports, Report} from "@/backend/utils/api";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    height: 280,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
};
type ModalProps = {
    open: boolean;
    onClose: () => void;
};
export default function ReportsModal(props: ModalProps) {
    const { open, onClose } = props;
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        const fetchData = async () =>  {
            const data = await fetchReports();
            setReports(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={"modal-content"}>
                        <h1>כאן מכניסים דיווחים</h1>

                        <ul>
                            {reports.map((report) => (
                                <li key={report.id}>{report.content}</li>
                            ))}
                        </ul>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}