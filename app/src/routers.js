import { Router } from 'express';
const router = Router();

import dev from './apps/development/routes/dev.js';
router.use('/dev', dev);

import externalApi from './apps/development/routes/externalApi.js';
router.use('/external', externalApi);

import arrayMethod from './apps/development/routes/arrayMethod.js';
router.use('/method/array', arrayMethod);


import xApi from './apps/development/routes/xApi.js';
router.use('/x', xApi);

// auth service
import signUpRouter from './apps/auth/routes/signUpRouter.js';
router.use('/signup', signUpRouter);

import signInRouter from './apps/auth/routes/signInRouter.js';
router.use('/signin', signInRouter);

export default router;