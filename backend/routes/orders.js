import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAll, getById, updateStatus, remove } from '../controllers/orderController.js';

const router = Router();

router.get('/', auth, getAll);
router.get('/:id', auth, getById);
router.put('/:id/status', auth, updateStatus);
router.delete('/:id', auth, remove);

export default router;
