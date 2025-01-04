import React from 'react';
import './ListItemIcon.css';
import {Icons} from "@/public/constants/constants";

type IconProps = {
    type: 'roadBlock' | 'crowded';
    crowdedLevel?: number;
}

const ListItemIcon = (props: IconProps) => {
    const { type, crowdedLevel } = props;
    const imageUrl = type === 'roadBlock' ? Icons.RoadBlockIcon : Icons.CrowdedIcon;
    return (
        <div className="bus-crowdedness">
            <img src={imageUrl} alt="Bus Icon"/>
        </div>
    );
}

export default ListItemIcon;