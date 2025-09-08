import { Router } from 'express';
const router = Router();
import { get } from '../controllers/xApiController.js';

// GET semua user
router.get('/', get);

export default router;