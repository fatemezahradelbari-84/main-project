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

router.post('/', createBook);              
router.get('/', getBooks);                  
router.get('/:id', getBookById);          
router.put('/:id', updateBook);             
router.patch('/:id', patchBook);            
router.delete('/:id', deleteBook);         

export default router;
