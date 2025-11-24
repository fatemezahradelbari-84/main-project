import { Request, Response } from 'express';
import Book from '../models/Book';

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
