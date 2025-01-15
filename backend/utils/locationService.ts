export function requestLocationPermission() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Location access granted:", position);
            },
            (error) => {
                console.error("Location access denied:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}