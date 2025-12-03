import { Request, Response } from "express";
import Book from "../models/Book";
import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1),
  image: z.string().optional(),
  publisher: z.string().optional(),
  author: z.string().min(1), 
});

// GET ALL BOOKS
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate("author");
    return res.json({
      success: true,
      data: books,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در دریافت کتاب‌ها",
      error: err.message,
    });
  }
};

// GET BOOK BY ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("author");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "کتاب پیدا نشد",
      });
    }

    return res.json({
      success: true,
      data: book,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در دریافت کتاب",
      error: err.message,
    });
  }
};

// CREATE BOOK
export const createBook = async (req: Request, res: Response) => {
  try {
    const parsedData = bookSchema.parse(req.body);

    const newBook = await Book.create(parsedData);

    return res.status(201).json({
      success: true,
      message: "کتاب با موفقیت ثبت شد",
      data: newBook,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در ایجاد کتاب",
      error: err.message,
    });
  }
};

// UPDATE BOOK (PUT)
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = bookSchema.parse(req.body);

    const updatedBook = await Book.findByIdAndUpdate(id, parsedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "کتاب پیدا نشد",
      });
    }

    return res.json({
      success: true,
      message: "کتاب با موفقیت بروزرسانی شد",
      data: updatedBook,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در بروزرسانی کتاب",
      error: err.message,
    });
  }
};

// PATCH BOOK (جزئی)
export const patchBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // استفاده از partial schema
    const parsedData = bookSchema.partial().parse(req.body);

    const patchedBook = await Book.findByIdAndUpdate(id, parsedData, {
      new: true,
      runValidators: true,
    });

    if (!patchedBook) {
      return res.status(404).json({
        success: false,
        message: "کتاب پیدا نشد",
      });
    }

    return res.json({
      success: true,
      message: "کتاب با موفقیت جزئی بروزرسانی شد",
      data: patchedBook,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در بروزرسانی جزئی کتاب",
      error: err.message,
    });
  }
};

// DELETE BOOK
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "کتاب پیدا نشد",
      });
    }

    return res.json({
      success: true,
      message: "کتاب با موفقیت حذف شد",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در حذف کتاب",
      error: err.message,
    });
  }
};
