"use client";
import BuslineRoute from "@/app/src/components/Busline/components/BuslineRoute/BuslineRoute";
import "@/app/src/components/Busline/Busline.css";
import {useEffect, useState} from "react";
import { busLines } from "@/public/constants/constants";
import { useRouter } from "next/navigation";
import BusInfoListItem from "@/app/src/components/Home/components/BusInfoListItem/BusInfoListItem";

export default function BuslineScreen() {
    const [lineNumber, setLineNumber] = useState<string>("517")

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const lineNumberParam = query.get('lineNumber');
        if (lineNumberParam) {
            setLineNumber(lineNumberParam);
        }
    }, []);

  return (
    <main>
        <div className="schedule-container">
          <BusInfoListItem lineNumber={lineNumber}/>
          <BuslineRoute currentStop={Math.floor(Math.random() * 6) + 3} stops={busLines[lineNumber]} lineNumber={lineNumber}/>
        </div>
    </main>
  );
}

