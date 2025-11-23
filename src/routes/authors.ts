import express from 'express';
import { createAuthor, getAuthors } from '../controllers/authorController';

const router = express.Router();

router.post('/', createAuthor);
router.get('/', getAuthors);

export default router;