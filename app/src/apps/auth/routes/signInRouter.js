const express = require('express');
const router = express.Router();
const thisController = require('../controllers/signInController');

// GET user berdasarkan ID
router.get('/:token', thisController.getBy);

// POST buat user baru
router.post('/', thisController.create);

// DELETE user
router.delete('/:token', thisController.delete);

module.exports = router;