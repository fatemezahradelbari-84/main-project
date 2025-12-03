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

router.post('/', createAuthor);
router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);     
router.patch('/:id', patchAuthor);    
router.delete('/:id', deleteAuthor);
export default router;
