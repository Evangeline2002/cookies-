import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAll, getById } from '../controllers/customerController.js';

const router = Router();

router.get('/', auth, getAll);
router.get('/:id', auth, getById);

export default router;
