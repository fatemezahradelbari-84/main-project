import express from 'express';
import {
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    patchAuthor,
    deleteAuthor
} from '../controllers/authorController';

const router = express.Router();

// CRUD routes برای نویسنده
router.post('/', createAuthor);
router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);     // آپدیت کامل
router.patch('/:id', patchAuthor);    // آپدیت جزئی
router.delete('/:id', deleteAuthor);  // حذف

export default router;
