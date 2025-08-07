const express = require('express');
const router = express.Router();

router.use('/dev', require('./apps/development/routes'));

module.exports = router;