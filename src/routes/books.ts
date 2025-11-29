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

router.post('/', createBook);               // db در body
router.get('/', getBooks);                  // db در query
router.get('/:id', getBookById);            // db در query
router.put('/:id', updateBook);             // db در body
router.patch('/:id', patchBook);            // db در body
router.delete('/:id', deleteBook);          // db در query

export default router;
