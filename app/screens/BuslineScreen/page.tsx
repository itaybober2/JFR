"use client";
import BuslineRoute from "@/app/src/components/Busline/components/BuslineRoute/BuslineRoute";
import "@/app/src/components/Busline/Busline.css";
import {useEffect, useState} from "react";
import { busLines, busLinesToB, BusLinesType } from "@/public/constants/constants";
import Footer from "@/lib/components/FooterNavbar";
import Navbar from "@/lib/components/Navbar";
import { Stop } from "../HomeScreen/HomeScreen";
import { calculateArrival } from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import { useRealTimeBusLocation } from "@/app/src/hooks/useRealTimeBusLocation";
import { useBusLineRef } from "@/app/src/hooks/useBusLineRef";
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import '@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem.css';


export default function BuslineScreen() {

    const [lineNumber, setLineNumber] = useState<string>("NULL")
    const [station, setStation] = useState<Stop | null>(null);
    const [toMountScoupe, setToMountScoupe] = useState(true);
    const [closestStops, setClosestStops] = useState<Stop[]>([]);
    const [stationIndex, setStationIndex] = useState<number>(-1);
    const [arrivalTimeA, setArrivalTimeA] = useState<number>(-1);
    const [arrivalTimeB, setArrivalTimeB] = useState<number>(-1);


    const direction = busLocationStore.getLineDirection();
    const busLineRefs = useBusLineRef(lineNumber, direction);
    const locations = useRealTimeBusLocation(busLineRefs, lineNumber, true);
    const lineIdA = locations && 'A' in locations ? locations.A?.siriRideId : locations?.siriRideId;
    const lineIdB = locations && 'B' in locations ? locations.B?.siriRideId : undefined;
   
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const lineNumberParam = query.get('lineNumber');
        const stationParam = query.get('station');
        const closestStopsParam = query.get('stops');

        
        if (lineNumberParam) {
            setLineNumber(lineNumberParam);
        }

        if (closestStopsParam) {
            const decodedStops = JSON.parse(decodeURIComponent(closestStopsParam));
            setClosestStops(decodedStops);
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

  useEffect(() => {
    if (lineNumber !== "NULL" && station) {
        const index = busLines[lineNumber].findIndex(
            (stop) => stop.name === station.stop_name
        );
        setStationIndex(index);
    }
  }, [lineNumber, station]);

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


  function getStationIndex(busLines: BusLinesType, busLinesToB: BusLinesType, lineNumber: string, stationName: string, direction: number) {

    let lines = busLines;
    // // Check the direction based on toMountScoupe value
    // Check if the line number exists in the data
    if (lines.hasOwnProperty(lineNumber)) {
        // Loop through the array of stations for the given line number
        for (let i = 0; i < lines[lineNumber].length; i++) {
            if (lines[lineNumber][i].name === stationName) {
                return i;  // Return the index if the station name matches
            }
        }
        return -1;  // Return -1 if the station name is not found
    } else {
        return -1;  // Return -1 if the line number does not exist
    }
}


  return (
    <main>
        <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
        <div className="schedule-container">
            <div className='time-and-icons-container'>
          <LineNumberCircle lineNumber={lineNumber}/>
                <BusArrivals arrivals={[busArrivalA, busArrivalB]} isHomeScreen={false}/>
            </div>
        </div>
          <BuslineRoute currentStop={getStationIndex(busLines,
                                                     busLinesToB,
                                                      lineNumber, 
                                                      station ? station.stop_name: "",
                                                    station ? station.direction : 1)}
           lineNumber={lineNumber} 
           toMountScoupe={toMountScoupe}
           stopCode={ station ? station.stop_code: 0}/>
           <Footer selected={'home'}/>
    </main>
  );
}

