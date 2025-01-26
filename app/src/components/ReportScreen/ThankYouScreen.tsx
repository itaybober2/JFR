import * as React from "react";
import {ReportFlowScreenProps} from "@/app/src/components/ReportScreen/LineSelectionScreen";
import {screensToRender} from "@/app/screens/ReportScreen/ReportScreen";
import './ThankYouScreen.css';

interface ThankYouScreenProps extends ReportFlowScreenProps {
    setScreenToRender: (screen: screensToRender) => void;
}

const ThankYouScreen = (props: ThankYouScreenProps) => {
    const {setScreenToRender} = props;

    return (
        <div className={'thank-you-container'}>
            <div className="thank-you-text">
                <tspan>
                תודה!
                </tspan>
                <br/>
                <tspan>
                תגובתך נרשמה
                </tspan>
            </div>
            <div className={'thank-you-buttons-container'}>
                <button className="thank-you-button" onClick={() => setScreenToRender('lineSelection')}>רוצה להוסיף עוד דיווח</button>
                {/*<button className="thank-you-button-secondary" onClick={() => setScreenToRender('lineSelection')}>לא, תודה:)</button>*/}
            </div>
        </div>
    )
}

export default ThankYouScreen;