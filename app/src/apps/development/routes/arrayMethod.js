const express = require('express');
const router = express.Router();
const arrayController = require('../controllers/arrayMethodController');

router.get('/map', arrayController.mapMethod);
router.get('/filter', arrayController.filterMethod);
router.get('/find', arrayController.findMethod);
router.get('/some', arrayController.someMethod);
router.get('/every', arrayController.everyMethod);
router.get('/reduce', arrayController.reduceMethod);

module.exports = router;