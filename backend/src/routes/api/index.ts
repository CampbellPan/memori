import express from 'express';
const router = express.Router();

import auth from './auth';
import user from './user';

router.use('/auth', auth);
router.use('/user', user);

export default router;