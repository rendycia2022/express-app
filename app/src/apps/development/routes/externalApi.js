const express = require('express');
const router = express.Router();
const thisController = require('../controllers/externalApiController');

// GET semua user
router.get('/weather', thisController.weather);

module.exports = router;