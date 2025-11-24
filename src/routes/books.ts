import express from 'express';
import {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    patchBook,
    deleteBook
} from '../controllers/bookController';

const router = express.Router();

// CRUD routes
router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);     // آپدیت کامل
router.patch('/:id', patchBook);    // آپدیت جزئی
router.delete('/:id', deleteBook);  // حذف

export default router;
