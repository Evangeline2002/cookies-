import { Router } from 'express';
import auth from '../middleware/auth.js';
import { login, getProfile, updateProfile } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
