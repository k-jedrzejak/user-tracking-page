export async function fetchReportData() {
  try {
    const response = await fetch(`/api/report`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
}
