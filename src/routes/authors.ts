import express from 'express';
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} from '../controllers/authorController';

const router = express.Router();

// ایجاد نویسنده (POST)
// body: { name, family, gender, age, db? }
router.post('/', createAuthor);

// دریافت همه نویسنده‌ها (GET)
// query: ?db=mongo یا ?db=mysql
router.get('/', getAuthors);

// دریافت نویسنده با ID (GET)
// query: ?db=mongo یا ?db=mysql
router.get('/:id', getAuthorById);

// بروزرسانی کامل نویسنده (PUT)
// body: { name, family, gender, age, db? }
router.put('/:id', updateAuthor);

// حذف نویسنده (DELETE)
// query: ?db=mongo یا ?db=mysql
router.delete('/:id', deleteAuthor);

export default router;
