const express = require('express');
const router = express.Router();

router.use('/dev', require('./apps/development/routes'));

// auth service
router.use('/signup', require('./apps/auth/routes/signUpRouter'));

module.exports = router;