"use client"
import React, {useEffect, useState} from 'react';
import './FloatingPlusButton.css';
import ReportsModal from "@/app/src/components/ReportsModal";

const FloatingPlusButton = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 3000);
    }, []);
    if (!isVisible) return null;

    return (
        <>
            <button className="floating-plus-button" onClick={handleOpen}>
                +
            </button>
                <div className="popup">
                    <div className="popup-inner">
                        <ReportsModal open={open} onClose={handleClose}/>
                    </div>
                </div>
        </>
    );
}
export default FloatingPlusButton;