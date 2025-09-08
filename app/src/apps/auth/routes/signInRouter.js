import { Router } from 'express';
const router = Router();
import { getBy, create, remove } from '../controllers/signInController.js';

// GET user berdasarkan ID
router.get('/:token', getBy);

// POST buat user baru
router.post('/', create);

// DELETE user
router.delete('/:token', remove);

export default router;