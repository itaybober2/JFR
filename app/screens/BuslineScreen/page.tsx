"use client";
import BuslineRoute from "@/app/src/components/Busline/components/BuslineRoute/BuslineRoute";
import "@/app/src/components/Busline/Busline.css";
import {useEffect, useState} from "react";
import { busLines } from "@/public/constants/constants";
import { useRouter } from "next/navigation";
import BusInfoListItem from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import { Stop } from "../HomeScreen/HomeScreen";
import { calculateArrival } from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import { useRealTimeBusLocation } from "@/app/src/hooks/useRealTimeBusLocation";
import { useBusLineRef } from "@/app/src/hooks/useBusLineRef";
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import ListItemIconContainer from "@/app/src/components/Home/components/BusInfoListItem/ListItemIcon/ListItemIconContainer";
import '@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem.css';


export default function BuslineScreen() {
    const [lineNumber, setLineNumber] = useState<string>("NULL")
    const [station, setStation] = useState<Stop | null>(null);
    const [arrivalTime, setArrivalTime] = useState<number>(-1);

    const direction = busLocationStore.getLineDirection();
    const busLineRefs = useBusLineRef(lineNumber, direction);
    const busLocation = useRealTimeBusLocation(busLineRefs, lineNumber);
    const lineId = busLocation?.siriRideId.toString();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const lineNumberParam = query.get('lineNumber');
        const stationParam = query.get('station');
        
        if (lineNumberParam) {
            setLineNumber(lineNumberParam);
        }
        
        if (stationParam) {
            try {
                const decodedStation = JSON.parse(decodeURIComponent(stationParam));
                setStation(decodedStation);
            } catch (error) {
                console.error('Error parsing station data:', error);
            }
        }
    }, []);


    useEffect(() => {
      const calculatedTime = calculateArrival(busLocation, station);
      setArrivalTime(calculatedTime);
  }, [busLocation, station]);

  const busArrival = {
    id: Number(lineId),
    route: lineNumber,
    time: arrivalTime,
  }

  return (
    <main>
        <div className="schedule-container">
            <div className='time-and-icons-container'>
          <LineNumberCircle lineNumber={lineNumber}/>
                <ListItemIconContainer lineNumber={lineNumber} lineId={lineId}/>
                <BusArrivals arrivals={busArrival}/>
            </div>
          <BuslineRoute currentStop={Math.floor(Math.random() * 6) + 3} stops={busLines[lineNumber]} lineNumber={lineNumber}/>
        </div>
    </main>
  );
}

