const express = require('express');
const router = express.Router();

router.use('/dev', require('./apps/development/routes/dev'));
router.use('/weather', require('./apps/development/routes/weather'));

// auth service
router.use('/signup', require('./apps/auth/routes/signUpRouter'));
router.use('/signin', require('./apps/auth/routes/signInRouter'));

module.exports = router;