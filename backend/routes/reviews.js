import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAll, updateStatus, remove } from '../controllers/reviewController.js';

const router = Router();

router.get('/', auth, getAll);
router.put('/:id/status', auth, updateStatus);
router.delete('/:id', auth, remove);

export default router;
