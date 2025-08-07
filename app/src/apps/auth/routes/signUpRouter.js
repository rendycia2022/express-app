const express = require('express');
const router = express.Router();
const thisController = require('../controllers/signUpController');

// GET semua user
router.get('/', thisController.get);

// GET user berdasarkan ID
router.get('/:id', thisController.getById);

// POST buat user baru
router.post('/', thisController.create);

// PUT update user
router.put('/:id', thisController.update);

// DELETE user
router.delete('/:id', thisController.delete);

module.exports = router;