import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAll, getById, create, update, remove } from '../controllers/categoryController.js';

const router = Router();

router.get('/', auth, getAll);
router.get('/:id', auth, getById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

export default router;
