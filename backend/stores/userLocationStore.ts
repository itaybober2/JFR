import * as remx from 'remx';

const state = remx.state({
    lat: 0,
    lon: 0,

});

const setters = remx.setters({
    setUserLocation(coords: { lat: number, lon: number }) {
        state.lat = coords.lat;
        state.lon = coords.lon;
    },
});

const getters = remx.getters({
    getUserLocation(): { lat: number, lon: number } {
        return { lat: state.lat, lon: state.lon };
    },
});

export const userLocationStore = {
    ...setters,
    ...getters,
};