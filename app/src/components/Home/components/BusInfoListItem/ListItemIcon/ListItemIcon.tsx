import React, {useEffect, useState} from 'react';
import './ListItemIcon.css';
import {Icons} from "@/public/constants/constants";

type IconProps = {
    type: 'roadBlock' | 'crowded' | 'inspector' | 'pathChange';
    lineNumber?: string;
}

const ListItemIcon = (props: IconProps) => {
    const {type, lineNumber} = props;
    let imageUrl;

    switch (type) {
        case "crowded":
            imageUrl = Icons.CrowdedIcon;
            break;
        case "roadBlock":
            imageUrl = Icons.RoadBlockIcon;
            break;
        case "inspector":
            imageUrl = Icons.InspectionIcon;
            break;
        case "pathChange":
            imageUrl = Icons.PathChangeIcon;
            break;

    }

        return (
            <div className="list-item-icon">
                <img src={imageUrl} alt="Bus Icon"/>
            </div>
        );
}

    export default ListItemIcon;