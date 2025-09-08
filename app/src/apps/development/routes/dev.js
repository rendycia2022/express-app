import { Router } from 'express';
const router = Router();
import { get, getBy, create, update, remove } from '../controllers/devController.js';

// GET semua user
router.get('/', get);

// GET user berdasarkan ID
router.get('/:id', getBy);

// POST buat user baru
router.post('/', create);

// PUT update user
router.put('/:id', update);

// DELETE user
router.delete('/:id', remove);

export default router;