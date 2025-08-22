// models
const path = require('path');
const devModel = path.join(__dirname, '../models/dev.json');
const modelService = require('../services/modelsService');

// services
const devService = new modelService(devModel);

exports.get = async (req, res) => {
    const ip = await getPublicIp();

    // get Coordinates
    let location = {};
    try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        const geolocation = await geoRes.json();

        location = geolocation;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    // get weather 
    try {
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`);
        const weather = await weatherRes.json();

        res.json({
            success: true,
            data: {
                location: location,
                weather: weather
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

async function getPublicIp(){
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();

        return data.ip;
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}