import React from 'react';
import './ListItemIcon.css';
import {Icons} from "@/public/constants/constants";

type IconProps = {
    type: 'roadBlock' | 'crowded' | 'inspector' | 'pathChange' | 'wildDriving' | 'stink';
    handleIconClick?: (event: React.MouseEvent) => void;
}

const ListItemIcon = (props: IconProps) => {
    const {type, handleIconClick} = props;
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
        case "wildDriving":
            imageUrl = Icons.wildDrivingIcon;
            break;
        case "stink":
            imageUrl = Icons.stinkIcon;

    }

        return (
            <div className="list-item-icon">
                <img src={imageUrl} alt={type} onClick={handleIconClick}/>
            </div>
        );
}

    export default ListItemIcon;