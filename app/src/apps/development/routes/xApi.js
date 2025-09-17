import { Router } from 'express';
const router = Router();
import { tweets } from '../controllers/xApiController.js';

// GET semua user
router.get('/tweets', tweets);

export default router;