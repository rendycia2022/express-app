// models
const path = require('path');

exports.weather = async (req, res) => {
    // get IP Public
    const ipPublic = await fetchApi(`https://api.ipify.org?format=json`);

    // get Coordinate
    const location = await fetchApi(`http://ip-api.com/json/${ipPublic.ip}`);

    // get weather
    const weather = await fetchApi(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`);

    // send to front
    res.status(200).json({
        success: true,
        data: {
            location: location,
            weather: weather
        }
    });
};

async function fetchApi(url){
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}