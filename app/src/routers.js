const express = require('express');
const router = express.Router();

router.use('/dev', require('./apps/development/routes'));
router.use('/auth', require('./apps/auth/routes'));

module.exports = router;