import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getStats } from '../controllers/dashboardController.js';

const router = Router();

router.get('/', auth, getStats);

export default router;
