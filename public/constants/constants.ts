import {BusStopProps} from "@/app/src/components/Busline/components/BuslineRoute/BuslineRoute";
export const URLS = {
    lineRefsUrl : "https://open-bus-stride-api.hasadna.org.il/gtfs_routes/list",
    busLocationUrl: "https://open-bus-stride-api.hasadna.org.il/siri_vehicle_locations/list",
}
export const Icons ={
    CrowdedIcon: '/icons/crowded.svg',
    RoadBlockIcon: '/icons/roadBlock.svg',
    InspectionIcon: '/icons/inspector.svg',
    PathChangeIcon: '/icons/pathChange.svg',
    stinkIcon: '/icons/stink.svg',
    wildDrivingIcon: '/icons/wildDriving.svg',
    backButton: '/icons/back_button.svg',
    infoIcon: '/icons/infoIcon.svg',
}

export const circelLines ={
    line517: '/icons/line517.png',
    line19: '/icons/line19.png',
    line19A: '/icons/line19A.png',
    line17: '/icons/line17.png',
    line517White: '/icons/line517_white.svg',
    line19White: '/icons/line19_white.svg',
    line19AWhite: '/icons/line19A_white.svg',
    line17White: '/icons/line17_white.svg',
    line19ASelected: '/icons/line19ASelected.svg',
    line517Selected: '/icons/line517Selected.svg',
    line19Selected: '/icons/line19Selected.svg',
    line17Selected: '/icons/line17Selected.svg',
}

export const FooterIcons = {
    Home: '/icons/grayHome.svg',
    Report: '/icons/grayReport.svg',
    Profil: '/icons/grayProfile.svg',
    ReportSelected: '/icons/blueReport.svg',
    HomeSelected: '/icons/blueHome.svg',
    ProfileSelected: '/icons/blueProfile.svg'
}

export const BusArrivalMock = [
    {
        id: 1,
        route: 'mount_scouts',
        time: 8
    },
    {
        id: 2,
        route: 'mount_scouts',
        time: 15
    }
]

export const SIRI_RESPONSE_MOCK =
        {
            id: 5224319869,
            siri_snapshot_id: 1547051,
            siri_ride_stop_id: 2357127066,
            recorded_at_time: "2025-01-17T13:26:11+00:00",
            lon: 35.248535,
            lat: 31.794825,
            bearing: 96,
            velocity: 40,
            distance_from_journey_start: 16177,
            distance_from_siri_ride_stop_meters: null,
            siri_snapshot__snapshot_id: "2025/01/17/13/26",
            siri_route__id: 1821,
            siri_route__line_ref: 10802,
            siri_route__operator_ref: 3,
            siri_ride__id: 93139879,
            siri_ride__journey_ref: "2025-01-17-8413928",
            siri_ride__scheduled_start_time: "2025-01-17T12:30:00+00:00",
            siri_ride__vehicle_ref: "7784169",
            siri_ride__first_vehicle_location_id: null,
            siri_ride__last_vehicle_location_id: null,
            siri_ride__duration_minutes: null,
            siri_ride__gtfs_ride_id: null
        }

export const hardcodedStops: BusStopProps[] = [
    { name: "דרך עזה / מטודלה", status: "people" },
    { name: "דרך עזה / רד״ק", status: "people-group" },
    { name: "המלך ג׳ורג׳ / קק״ל", status: "stop" },
    { name: "המלך ג׳ורג׳ / בן יהודה", status: "stop" },
    { name: "דרך עזה / ז׳בוטינסקי", status: "stop" },
    { name: "יפו מרכז", status: "stop" },
    { name: "הנביאים / שטרואס", status: "" }
];


// To har hazofim:

export type BusLinesType = {
    [key: string]: BusStopProps[];
}

export const busLines: BusLinesType = {
    "517": [
        { name: "דולצ'ין / קוליץ", status: "" },
        { name: "פנמה / דהומיי", status: "" },
        { name: "ניקרגואה / החרצית", status: "" },
        { name: "מכון סולד / קולומביה", status: "" },
        { name: "דהומיי / הרפובליקה הדומיניקנית", status: "" },
        { name: "דהומיי / הסייפן", status: "" },
        { name: "דרך חיים ע. קוליץ", status: "" },
        { name: "קוליץ / האביבית", status: "" },
        { name: "קוליץ / שולוב", status: "" },
        { name: "קוליץ / גולומב", status: "" },
        { name: "גולומב / קוליץ", status: "" },
        { name: "גולומב / הצלם רחמים", status: "" },
        { name: "גולומב / סן מרטין", status: "" },
        { name: "הרב הרצוג / יציאה ממנהרת פת", status: "" },
        { name: "הרב הרצוג / שח\"ל", status: "" },
        { name: "הרצוג / ניות", status: "" },
        { name: "הרצוג / טשרניחובסקי", status: "" },
        { name: "עזה / הרב ברלין", status: "" },
        { name: "עזה / רד\"ק", status: "" },
        { name: "עזה / בלפור", status: "" },
        { name: "כיכר צרפת / אגרון", status: "" },
        { name: "ממילא / אגרון", status: "" },
        { name: "חיל ההנדסה / נעמי קיס", status: "" },
        { name: "בר לב / שבטי ישראל", status: "" },
        { name: "שדרות בר לב / זקס", status: "" },
        { name: "תחנת רקל\"ה שמעון הצדיק / שדרות בר לב", status: "" },
        { name: "המטה הארצי / שדרות חיים בר לב", status: "" },
        { name: "שדרות האוניברסיטה העברית / בר לב", status: "" },
        { name: "האוניברסיטה העברית הר הצופים / מרטין בובר", status: "" },
        { name: "מחנה עופרית / מרטין בובר", status: "" },
        { name: "אקדמיה בצלאל / מרטין בובר", status: "" },
        { name: "מסוף הר הצופים / מרטין בובר", status: "" }
    ],
    "17": [
        { name: "אריה דולצ'ין / יעקב צור", status: "" },
        { name: "דולצ'ין / נחמיה", status: "" },
        { name: "דולצ'ין / יורם רונן", status: "" },
        { name: "בי\"ס היובל / דולצ'ין", status: "" },
        { name: "מרכז מסחרי / דולצ'ין", status: "" },
        { name: "דולצ'ין", status: "" },
        { name: "דולצ'ין / קוליץ", status: "" },
        { name: "קוליץ / האביבית", status: "" },
        { name: "קוליץ / שולוב", status: "" },
        { name: "הדישון / השועל", status: "" },
        { name: "הדישון / מעלות אייל", status: "" },
        { name: "הדישון / האייל", status: "" },
        { name: "האייל א'", status: "" },
        { name: "האייל ב'", status: "" },
        { name: "האייל ג'", status: "" },
        { name: "האייל / היען", status: "" },
        { name: "קניון מלחה / א\"ס הפועל האייל", status: "" },
        { name: "גולומב / סן מרטין", status: "" },
        { name: "הרב הרצוג / יציאה ממנהרת פת", status: "" },
        { name: "הרב הרצוג / שח\"ל", status: "" },
        { name: "הרצוג / ניות", status: "" },
        { name: "הרצוג / טשרניחובסקי", status: "" },
        { name: "עזה / הרב ברלין", status: "" },
        { name: "עזה / רד\"ק", status: "" },
        { name: "עזה / בלפור", status: "" },
        { name: "רמב\"ן / אבן עזרא", status: "" },
        { name: "קק\"ל / אוסישקין", status: "" },
        { name: "אוסישקין / נרקיס", status: "" },
        { name: "אוסישקין / בצלאל", status: "" },
        { name: "בצלאל / טרומפלדור", status: "" },
        { name: "המלך ג'ורג' / בן יהודה", status: "" },
        { name: "תחנת רקל\"ה יפו מרכז / המלך ג'ורג'", status: "" },
        { name: "הנביאים / הרב קוק", status: "" },
        { name: "הנביאים / הע\"ח", status: "" },
        { name: "משרד המשפטים / צלאח א דין", status: "" },
        { name: "דרך שכם / לואי ונסן", status: "" },
        { name: "דרך שכם / טובלר", status: "" },
        { name: "דרך הר הזיתים / נשאשיבי", status: "" },
        { name: "קציר / קלרמון גנו", status: "" },
        { name: "אהרון קציר / שדרות צ'רצ'יל", status: "" },
        { name: "שד' צ'רצ'יל / קציר", status: "" },
        { name: "הדסה הר הצופים / שד' צ'רצ'יל", status: "" },
        { name: "האוניברסיטה העברית / שד' צ'רצ'יל", status: "" },
        { name: "האוניברסיטה העברית הר הצופים / מרטין בובר", status: "" },
        { name: "מחנה עופרית / מרטין בובר", status: "" },
        { name: "אקדמיה בצלאל / מרטין בובר", status: "" },
        { name: "מסוף הר הצופים / מרטין בובר", status: "" }
    ],
    "19": [
        { name: "כניסה ראשית / הדסה עין כרם", status: "" },
        { name: "מרכז הסטודנט / הדסה עין כרם", status: "" },
        { name: "צומת אורה", status: "" },
        { name: "הכפר השוודי / סולד", status: "" },
        { name: "מרכז פיליפ ליאון / סולד", status: "" },
        { name: "המפלצת / טהון", status: "" },
        { name: "טהון / גולומב", status: "" },
        { name: "פארק פישמן / גולומב", status: "" },
        { name: "גולומב / בוליביה", status: "" },
        { name: "גולומב / קוליץ", status: "" },
        { name: "גולומב / הצלם רחמים", status: "" },
        { name: "גולומב / סן מרטין", status: "" },
        { name: "הרב הרצוג / יציאה ממנהרת פת", status: "" },
        { name: "הרב הרצוג / שח''ל", status: "" },
        { name: "הרצוג / ניות", status: "" },
        { name: "הרצוג / טשרניחובסקי", status: "" },
        { name: "עזה / הרב ברלין", status: "" },
        { name: "עזה / רד''ק", status: "" },
        { name: "עזה / בלפור", status: "" },
        { name: "רמב''ן / אבן עזרא", status: "" },
        { name: "קק''ל / אוסישקין", status: "" },
        { name: "אוסישקין / נרקיס", status: "" },
        { name: "אוסישקין / בצלאל", status: "" },
        { name: "בצלאל / טרומפלדור", status: "" },
        { name: "המלך ג'ורג' / בן יהודה", status: "" },
        { name: "תחנת רקל''ה יפו מרכז / המלך ג'ורג'", status: "" },
        { name: "הנביאים / הרב קוק", status: "" },
        { name: "הנביאים / הע''ח", status: "" },
        { name: "חיל ההנדסה / נעמי קיס", status: "" },
        { name: "בר לב / שבטי ישראל", status: "" },
        { name: "שדרות בר לב / זקס", status: "" },
        { name: "תחנת רקל''ה שמעון הצדיק / שדרות בר לב", status: "" },
        { name: "המטה הארצי / קלרמון גנו", status: "" },
        { name: "קציר / קלרמון גנו", status: "" },
        { name: "אהרון קציר / שדרות צ'רצ'יל", status: "" },
        { name: "שד' צ'רצ'יל / קציר", status: "" },
        { name: "הדסה הר הצופים / שד' צ'רצ'יל", status: "" },
        { name: "האוניברסיטה העברית / שד' צ'רצ'יל", status: "" },
        { name: "האוניברסיטה העברית הר הצופים / מרטין בובר", status: "" },
        { name: "מחנה עופרית / מרטין בובר", status: "" },
        { name: "אקדמיה בצלאל / מרטין בובר", status: "" },
        { name: "מסוף הר הצופים / מרטין בובר", status: "" }
    ]
};
