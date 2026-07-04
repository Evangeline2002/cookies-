import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import auth from '../middleware/auth.js';
import { getAll, getById, create, update, remove } from '../controllers/productController.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

const upload = multer({ storage });

const router = Router();

router.get('/', auth, getAll);
router.get('/:id', auth, getById);
router.post('/', auth, upload.single('image'), create);
router.put('/:id', auth, upload.single('image'), update);
router.delete('/:id', auth, remove);

export default router;
