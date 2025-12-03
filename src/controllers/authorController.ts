import { Request, Response } from "express";
import Author from "../models/Author";
import { z } from "zod";

const authorSchema = z.object({
  name: z.string().min(3),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  age: z.number().min(18).max(80).int().optional()
});

// GET ALL AUTHORS
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    return res.json({ success: true, data: authors });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در دریافت نویسندگان",
      error: err.message,
    });
  }
};

// GET AUTHOR BY ID
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "نویسنده پیدا نشد",
      });
    }

    return res.json({ success: true, data: author });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در دریافت نویسنده",
      error: err.message,
    });
  }
};

// CREATE AUTHOR
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const parsedData = authorSchema.parse(req.body);
    const newAuthor = await Author.create(parsedData);

    return res.status(201).json({
      success: true,
      message: "نویسنده با موفقیت ایجاد شد",
      data: newAuthor,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در ایجاد نویسنده",
      error: err.message,
    });
  }
};

// UPDATE AUTHOR (PUT)
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = authorSchema.parse(req.body);

    const updatedAuthor = await Author.findByIdAndUpdate(id, parsedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAuthor) {
      return res.status(404).json({
        success: false,
        message: "نویسنده پیدا نشد",
      });
    }

    return res.json({
      success: true,
      message: "نویسنده با موفقیت بروزرسانی شد",
      data: updatedAuthor,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در بروزرسانی نویسنده",
      error: err.message,
    });
  }
};

// PATCH AUTHOR (جزئی)
export const patchAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = authorSchema.partial().parse(req.body);

    const patchedAuthor = await Author.findByIdAndUpdate(id, parsedData, {
      new: true,
      runValidators: true,
    });

    if (!patchedAuthor) {
      return res.status(404).json({
        success: false,
        message: "نویسنده پیدا نشد",
      });
    }

    return res.json({
      success: true,
      message: "نویسنده با موفقیت جزئی بروزرسانی شد",
      data: patchedAuthor,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در بروزرسانی جزئی نویسنده",
      error: err.message,
    });
  }
};

// DELETE AUTHOR
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({
        success: false,
        message: "نویسنده پیدا نشد",
      });
    }

    return res.json({
      success: true,
      message: "نویسنده با موفقیت حذف شد",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "خطا در حذف نویسنده",
      error: err.message,
    });
  }
};
