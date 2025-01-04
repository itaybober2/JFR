import "./BuslineAlt.css";


type BuslineAltProps = {
    curLineNumber: number;
    onClick: (lineNumber: number) => void;
}

export default function BuslineAlt(props: BuslineAltProps) {
    const {curLineNumber, onClick} = props;
    return(
        <div className="alt-lines">
          <div className="bus-circle" id="current-bus-line">{curLineNumber}</div>
          <div className="bus-circle" onClick={() => onClick(9)}>9</div>
          <div className="bus-circle" onClick={() => onClick(78)}>78</div>
          <div className="bus-circle" onClick={() => onClick(14)}>14</div>
        </div>
    )
}