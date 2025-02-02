import * as remx from 'remx';
import {BusLocation} from "@/app/src/hooks/useRealTimeBusLocation";

const state = remx.state({
    target: 'להר הצופים',
    destination: 'להר הצופים',
    direction: 1,
    line517Direction1: {} as BusLocation,
    line517Direction2: {} as BusLocation,
    line17Direction1: {} as BusLocation,
    line17Direction2: {} as BusLocation,
    line19Direction1: {} as BusLocation,
    line19Direction2: {} as BusLocation,
    line19aDirection1: {} as BusLocation,
    line19aDirection2: {} as BusLocation,
});

const setters = remx.setters({
    setBusLocation(busLocation: BusLocation, lineNumber: string) {
        let lineNum = lineNumber;
        if (lineNumber === '19א') lineNum = '19a';
        // @ts-ignore
        state[`line${lineNum}Direction${state.direction}`] = busLocation;
    },
    setLineDirection(direction: number) {
        state.direction = direction;
    },
    setTargetAndDestination(target: string, destination: string) {
        state.target = target;
        state.destination = destination;
        localStorage.setItem("target", target);
        localStorage.setItem("destination", destination);
    }
});

const getters = remx.getters({
    getBusLocation(lineNumber: string): BusLocation {
        let lineNum = lineNumber;
        if (lineNumber === '19א') lineNum = '19a';
        // @ts-ignore
        return state[`line${lineNum}Direction${state.direction}`];
    },
    getLineDirection(): number {
        return state.direction;
    },
    getTarget(): string {
        return state.target;
    },
    getDestination(): string {
        return state.destination;
    }
});

export const busLocationStore = {
    ...setters,
    ...getters,
};