
import './BuslineDetailsReport.css';

type BuslineDetailsReportsProps = {
    time: string;
    report: string;
}

export default function BuslineDetailsReports(props: BuslineDetailsReportsProps) {
    const { time, report } = props;
    return (
        <div className="report-container">
            <div className="time">{time}</div>
            <div className="report">{report}</div>
        </div>
    )
}