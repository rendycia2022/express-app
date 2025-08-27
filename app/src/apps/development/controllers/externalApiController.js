export async function weather(req, res) {
    try {
        // Get IP Public
        const ipPublic = await fetchApi(`https://api.ipify.org?format=json`);

        // Get Coordinate
        const location = await fetchApi(`http://ip-api.com/json/${ipPublic.ip}`);

        // Get Weather
        const weather = await fetchApi(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`
        );

        // Send to frontend
        res.status(200).json({
            success: true,
            data: { location, weather },
        });
    } catch (error) {
        // Centralized error handling
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function fetchApi(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}