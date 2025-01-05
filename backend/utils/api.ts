const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchReports() {
    const response = await fetch(`${backendUrl}/reports`);
    if (!response.ok) {
        throw new Error("Failed to fetch reports");
    }
    return response.json();
}

export async function createReport(crowdedness: number, lineNumber: number) {
    const response = await fetch(`${backendUrl}/reports`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ crowdedness, lineNumber }),
    });
    if (!response.ok) {
        throw new Error("Failed to create report");
    }
    return response.json();
}
