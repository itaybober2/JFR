
import "./BuslineDetails.css";
import { BusArrivalMock } from "@/public/constants/constants";
import BusArrivals from "@/app/src/components/Home/components/BusInfoListItem/BusArrivals/BusArrivals";
import BuslineDetailsReports from "../BuslineDetailsReports/BuslineDetailsReport";


type BuslineDetailsProps = {
    lineNumber: number;
}

export default function BuslineDetails(props: BuslineDetailsProps) {
    const { lineNumber } = props;

    
    return (
        <div>

            <div className="line-number-and-time-container">    
                <div className="line-number-background">
                    <span className="line-number-font">{lineNumber}</span> 
                </div>
                <div className='time-and-icons-container'>
                    <BusArrivals arrivals={BusArrivalMock}/>
                </div>
            </div>

            <div className="info">
                <BuslineDetailsReports time="18:15" report="רחוב עזה נחסם בגלל הפגנה"/>
                <BuslineDetailsReports time="18:15" report="רחוב עזה נחסם בגלל הפגנה ענקית"/>
            </div>
        </div>
    )
}