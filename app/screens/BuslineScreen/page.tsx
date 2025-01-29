"use client";
import BuslineRoute from "@/app/src/components/Busline/components/BuslineRoute/BuslineRoute";
import "@/app/src/components/Busline/Busline.css";
import React, {useEffect, useState} from "react";
import { busLines, busLinesToB, BusLinesType } from "@/public/constants/constants";
import { Stop } from "../HomeScreen/HomeScreen";
import { calculateArrival } from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";
import { busLocationStore } from "@/backend/stores/busLocationStore";
import {BusLocation, useRealTimeBusLocation} from "@/app/src/hooks/useRealTimeBusLocation";
import { useBusLineRef } from "@/app/src/hooks/useBusLineRef";
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import LineNumberCircle from "@/app/src/components/Home/components/BusInfoListItem/LineNumberCircle/LineNumberCircle";
import '@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem.css';
import {useConnect} from "remx";


export default function BuslineScreen() {

    const [lineNumber, setLineNumber] = useState<string>("NULL")
    const [station, setStation] = useState<Stop | null>(null);
    const [closestStops, setClosestStops] = useState<Stop[]>([]);
    const [stationIndex, setStationIndex] = useState<number>(-1);
    const [arrivalTimeA, setArrivalTimeA] = useState<number>(-1);
    const [arrivalTimeB, setArrivalTimeB] = useState<number>(-1);
    const directionSubscription = useConnect(busLocationStore.getLineDirection);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);


    const busLineRefs = useBusLineRef(lineNumber, directionSubscription);
    const locations = useRealTimeBusLocation(busLineRefs, lineNumber, true);

    let lineA: BusLocation | undefined;
    let lineB: BusLocation | undefined;
    if (locations) {
        lineA = locations[0]
        lineB = locations[1]
    }

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
        const calculatedTimeA = calculateArrival(lineA, station);
        console.log("tima a:",calculatedTimeA);
        if (calculatedTimeA < 0){
            console.log("smaller")
            setArrivalTimeA(2); 
        }
        else{
            setArrivalTimeA(calculatedTimeA);
        } 
        let calculatedTimeB = calculateArrival(lineB, station);
        if (calculatedTimeA === calculatedTimeB) calculatedTimeB += 2;
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
    id: lineA?.siriRideId || 0,
    route: lineNumber,
    time: arrivalTimeA,
  }

  const busArrivalB = {
    id: lineB?.siriRideId || 0,
    route: lineNumber,
    time: arrivalTimeB,
  }


  function getStationIndex(busLines: BusLinesType, busLinesToB: BusLinesType, lineNumber: string, stationName: string, direction: number) {

    let lines = direction === 1 ? busLines : busLinesToB;
    // // Check the direction based on toMountScoupe value
    // Check if the line number exists in the data
    if (lines.hasOwnProperty(lineNumber)) {
        // Loop through the array of stations for the given line number
        for (let i = 0; i < lines[lineNumber].length; i++) {
            if (lines[lineNumber][i].name === stationName) {
                return i;  // Return the index if the station name matches
            }
        }
        return -1;
        
    } else {
        return -1;  // Return -1 if the line number does not exist
    }
}


  return (
    <main>
        <div className="schedule-container">
            <div className='time-and-icons-container'>
          <LineNumberCircle lineNumber={lineNumber}/>
                <BusArrivals arrivals={[busArrivalA, busArrivalB]} isHomeScreen={false} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            </div>
        </div>
          <BuslineRoute currentStop={getStationIndex(busLines,
                                                     busLinesToB,
                                                      lineNumber,
                                                      station ? station.stop_name: "",
                                                    station ? station.direction : 1)}
           lineNumber={lineNumber}
           toMountScoupe={directionSubscription === 1}
           stopCode={ station ? station.stop_code: 0}
           busArrivalA={selectedIndex === 0 ? busArrivalA : busArrivalB} />
    </main>
  );
}

