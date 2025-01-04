"use client";
import StationHeader from "@/app/src/components/Home/components/StationHeader/StationHeader";
import BuslineDetails from "@/app/src/components/Busline/components/BuslineDetails/BuslineDetails";
import BuslineRoute from "@/app/src/components/Busline/components/BuslineRoute/BuslineRoute";
import BuslineAlt from "@/app/src/components/Busline/components/BuslineAlt/BuslineAlt";
import "@/app/src/components/Busline/Busline.css";
import {useEffect, useState} from "react";
import { busLines } from "@/public/constants/constants";
import { useRouter } from "next/navigation";

export default function BuslineScreen() {
    const [lineNumber, setLineNumber] = useState<number>(517)
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const lineNumberParam = query.get('lineNumber');
        if (lineNumberParam) {
            setLineNumber(Number(lineNumberParam));
        }
    }, []);

    const router = useRouter();
    const handleClick = (lineNumber: number) => {
        router.push(`/screens/BuslineScreen?lineNumber=${lineNumber}`);
        setLineNumber(lineNumber);
    };
  return (
    <main>
        <StationHeader stationName="יפו מרכז" stationNumber={753675} />
        <div className="schedule-container">
          <BuslineDetails lineNumber={lineNumber}/>
          <BuslineRoute currentStop={Math.floor(Math.random() * 6) + 3} stops={busLines[lineNumber]}/>
          <BuslineAlt curLineNumber={lineNumber} onClick={handleClick}/>
        </div>
    </main>
  );
}

