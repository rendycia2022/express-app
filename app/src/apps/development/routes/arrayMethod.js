import { Router } from 'express';
const router = Router();
import { mapMethod, filterMethod, findMethod, someMethod, everyMethod, reduceMethod } from '../controllers/arrayMethodController.js';

router.get('/map', mapMethod);
router.get('/filter', filterMethod);
router.get('/find', findMethod);
router.get('/some', someMethod);
router.get('/every', everyMethod);
router.get('/reduce', reduceMethod);

export default router;