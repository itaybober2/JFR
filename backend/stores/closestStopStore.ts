import * as remx from 'remx';

const state = remx.state({
    stopName: "",
    lon: 0,
    lat: 0,
    stopCode: 0,
});

const setters = remx.setters({
    setClosestStopToUser(stopName: string, stopCode: number, coords: { lat: number, lon: number }) {
        state.stopName = stopName;
        state.lat = coords.lat;
        state.lon = coords.lon;
        state.stopCode = stopCode;
    },
});

const getters = remx.getters({
    getClosestStopToUser(): { stopName: string, lat: number, lon: number, stopCode: number } {
        return {
            stopName: state.stopName,
            lat: state.lat,
            lon: state.lon,
            stopCode: state.stopCode,
        }
    },
});

export const closestStopStore = {
    ...setters,
    ...getters,
};