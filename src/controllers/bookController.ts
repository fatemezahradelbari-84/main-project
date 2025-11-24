import { Request, Response } from 'express';
import Book from '../models/Book';

// ایجاد کتاب جدید
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, image, publisher, author } = req.body;

        const newBook = await Book.create({
            title,
            image,
            publisher,
            author,
        });

        res.status(201).json({
            success: true,
            message: 'کتاب با موفقیت ثبت شد',
            data: newBook,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد کتاب',
            error: error.message,
        });
    }
};

// دریافت همه کتاب‌ها
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await Book.find().populate('author');
        res.json({
            success: true,
            data: books,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کتاب‌ها',
            error: error.message,
        });
    }
};

// دریافت کتاب با ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).populate('author');

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'کتاب پیدا نشد',
            });
            return;
        }

        res.json({
            success: true,
            data: book,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کتاب',
            error: error.message,
        });
    }
};

// آپدیت کامل کتاب (PUT)
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'کتاب پیدا نشد',
            });
            return;
        }

        res.json({
            success: true,
            message: 'کتاب با موفقیت بروزرسانی شد',
            data: updatedBook,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در بروزرسانی کتاب',
            error: error.message,
        });
    }
};

// آپدیت جزئی کتاب (PATCH)
export const patchBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const patchedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patchedBook) {
            res.status(404).json({
                success: false,
                message: 'کتاب پیدا نشد',
            });
            return;
        }

        res.json({
            success: true,
            message: 'کتاب با موفقیت جزئی بروزرسانی شد',
            data: patchedBook,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در بروزرسانی جزئی کتاب',
            error: error.message,
        });
    }
};

// حذف کتاب
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'کتاب پیدا نشد',
            });
            return;
        }

        res.json({
            success: true,
            message: 'کتاب با موفقیت حذف شد',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در حذف کتاب',
            error: error.message,
        });
    }
};
