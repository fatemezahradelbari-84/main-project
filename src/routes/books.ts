import express from 'express';
import { createBook, getBooks } from '../controllers/bookController';

const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);

export default router;
