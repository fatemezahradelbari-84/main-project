import { Request, Response } from 'express';
import Author from '../models/Author';

export const createAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, family, gender, age } = req.body;
        const author = new Author({ name, family, gender, age });
        const savedAuthor = await author.save();
        
        res.status(201).json({
            success: true,
            message: 'نویسنده با موفقیت ایجاد شد',
            data: savedAuthor
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد نویسنده',
            error: error.message
        });
    }
};

export const getAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const authors = await Author.find();
        res.json({ 
            success: true, 
            data: authors 
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت نویسندگان',
            error: error.message
        });
    }
};