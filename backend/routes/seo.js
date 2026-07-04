import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAll, update } from '../controllers/seoController.js';

const router = Router();

router.get('/', auth, getAll);
router.put('/:id', auth, update);

export default router;
