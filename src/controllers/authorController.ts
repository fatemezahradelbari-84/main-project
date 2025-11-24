import { Request, Response } from 'express';
import Author from '../models/Author';

// ایجاد نویسنده
export const createAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, family, gender, age } = req.body;
        const author = new Author({ name, family, gender, age });
        const savedAuthor = await author.save();

        res.status(201).json({
            success: true,
            message: 'نویسنده با موفقیت ایجاد شد',
            data: savedAuthor,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد نویسنده',
            error: error.message,
        });
    }
};

// دریافت همه نویسنده‌ها
export const getAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const authors = await Author.find();
        res.json({ 
            success: true,
            data: authors,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت نویسندگان',
            error: error.message,
        });
    }
};

// دریافت نویسنده با ID
export const getAuthorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const author = await Author.findById(id);

        if (!author) {
            res.status(404).json({
                success: false,
                message: 'نویسنده پیدا نشد',
            });
            return;
        }

        res.json({ success: true, data: author });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت نویسنده',
            error: error.message,
        });
    }
};

// آپدیت کامل نویسنده (PUT)
export const updateAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedAuthor) {
            res.status(404).json({
                success: false,
                message: 'نویسنده پیدا نشد',
            });
            return;
        }

        res.json({
            success: true,
            message: 'نویسنده با موفقیت بروزرسانی شد',
            data: updatedAuthor,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در بروزرسانی نویسنده',
            error: error.message,
        });
    }
};

// آپدیت جزئی نویسنده (PATCH)
export const patchAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const patchedAuthor = await Author.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patchedAuthor) {
            res.status(404).json({
                success: false,
                message: 'نویسنده پیدا نشد',
            });
            return;
        }

        res.json({
            success: true,
            message: 'نویسنده با موفقیت جزئی بروزرسانی شد',
            data: patchedAuthor,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در بروزرسانی جزئی نویسنده',
            error: error.message,
        });
    }
};

// حذف نویسنده
export const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedAuthor = await Author.findByIdAndDelete(id);

        if (!deletedAuthor) {
            res.status(404).json({
                success: false,
                message: 'نویسنده پیدا نشد',
            });
            return;
        }

        res.json({
            success: true,
            message: 'نویسنده با موفقیت حذف شد',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'خطا در حذف نویسنده',
            error: error.message,
        });
    }
};
