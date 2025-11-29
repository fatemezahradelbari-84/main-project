import { Request, Response } from 'express';
import {
  createBook as serviceCreate,
  getBooks as serviceGetAll,
  getBookById as serviceGetById,
  updateBook as serviceUpdate,
  patchBook as servicePatch,
  deleteBook as serviceDelete
} from '../service/bookService';

// Create
export const createBook = async (req: Request, res: Response) => {
  try {
    const db = req.body.db;
    const result = await serviceCreate(req.body, db);

    res.status(201).json({
      success: true,
      message: 'کتاب ایجاد شد',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all
export const getBooks = async (req: Request, res: Response) => {
  try {
    const db = req.query.db as any;
    const result = await serviceGetAll(db);

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const db = req.query.db as any;
    const result = await serviceGetById(req.params.id, db);

    if (!result) {
      res.status(404).json({ success: false, message: 'کتاب پیدا نشد' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update (PUT)
export const updateBook = async (req: Request, res: Response) => {
  try {
    const db = req.body.db;
    const result = await serviceUpdate(req.params.id, req.body, db);

    if (!result) {
      res.status(404).json({ success: false, message: 'کتاب پیدا نشد' });
      return;
    }

    res.json({ success: true, message: 'کتاب بروزرسانی شد', data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Patch
export const patchBook = async (req: Request, res: Response) => {
  try {
    const db = req.body.db;
    const result = await servicePatch(req.params.id, req.body, db);

    if (!result) {
      res.status(404).json({ success: false, message: 'کتاب پیدا نشد' });
      return;
    }

    res.json({
      success: true,
      message: 'کتاب بروزرسانی جزئی شد',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const db = req.query.db as any;
    const result = await serviceDelete(req.params.id, db);

    if (!result) {
      res.status(404).json({ success: false, message: 'کتاب پیدا نشد' });
      return;
    }

    res.json({ success: true, message: 'کتاب حذف شد' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
