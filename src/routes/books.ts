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
router.put('/:id', updateBook);     //Put
router.patch('/:id', patchBook);    //Patch
router.delete('/:id', deleteBook);  // Delete
export default router;
