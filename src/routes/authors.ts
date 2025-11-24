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
router.put('/:id', updateAuthor);     // Put
router.patch('/:id', patchAuthor);    //Patch
router.delete('/:id', deleteAuthor);  // Delete

export default router;
