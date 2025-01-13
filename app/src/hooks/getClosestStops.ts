import stops from "../../../backend/data/all_data_stops_with_dir.json";

// Haversine formula to calculate the distance between two coordinates
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const radius = 6371; // Earth's radius in kilometers
    return radius * c;
}

// Find the closest stops to the user's location
function findClosestStops(userLocation: [number, number], stops: any[], n: number = 6): any[] {
    const [userLat, userLon] = userLocation;
    for (const stop of stops) {
        stop.distance = haversineDistance(userLat, userLon, stop.lat, stop.lon);
    }
    return stops.sort((a, b) => a.distance - b.distance).slice(0, n);
}


export function getNearstsStops(userLocation: [number, number]){ 
    return findClosestStops(userLocation, stops);
}