"use client";
import BuslineRoute from "@/app/src/components/Busline/components/BuslineRoute/BuslineRoute";
import "@/app/src/components/Busline/Busline.css";
import {useEffect, useState} from "react";
import { busLines } from "@/public/constants/constants";
import Navbar from "@/lib/components/Navbar";
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
import { useConnect } from "remx";


export default function BuslineScreen() {
    const [lineNumber, setLineNumber] = useState<string>("NULL")
    const [station, setStation] = useState<Stop | null>(null);
    const [toMountScoupe, setToMountScoupe] = useState(true); 
    const [arrivalTimeA, setArrivalTimeA] = useState<number>(-1);
    const [arrivalTimeB, setArrivalTimeB] = useState<number>(-1);

    const direction = busLocationStore.getLineDirection();
    const busLineRefs = useBusLineRef(lineNumber, direction);
    const locations = useRealTimeBusLocation(busLineRefs, lineNumber, true);
    const lineIdA = locations && 'A' in locations ? locations.A?.siriRideId.toString() : locations?.siriRideId.toString();
    const lineIdB = locations && 'B' in locations ? locations.B?.siriRideId.toString() : undefined;
   
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
      const calculatedTimeA = calculateArrival(locations && 'A' in locations ? locations.A : null, station);
      setArrivalTimeA(calculatedTimeA);
      const calculatedTimeB = calculateArrival(locations && 'B' in locations ? locations.B : null, station);
      setArrivalTimeB(calculatedTimeB)
  }, [locations, station]);

  const busArrivalA = {
    id: Number(lineIdA),
    route: lineNumber,
    time: arrivalTimeA,
  }

  const busArrivalB = {
    id: Number(lineIdB),
    route: lineNumber,
    time: arrivalTimeB,
  }


  return (
    <main>
        <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
        <div className="schedule-container">
            <div className='time-and-icons-container'>
          <LineNumberCircle lineNumber={lineNumber}/>
                <ListItemIconContainer lineNumber={lineNumber} lineId={lineIdA}/>
                <BusArrivals arrivals={[busArrivalA, busArrivalB]}/>
            </div>
          <BuslineRoute currentStop={Math.floor(Math.random() * 6) + 3} stops={busLines[lineNumber]} lineNumber={lineNumber}/>
        </div>
    </main>
  );
}

