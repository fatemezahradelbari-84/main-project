import { Request, Response } from 'express';
import * as authorService from '../service/authorService';

export const createAuthor = async (req: Request, res: Response) => {
  const { db, ...data } = req.body;
  try {
    const author = await authorService.createAuthor(data, db as any);
    res.status(201).json({ success: true, data: author });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAuthors = async (req: Request, res: Response) => {
  const db = req.query.db as 'mongo' | 'mysql' | undefined;
  try {
    const authors = await authorService.getAuthors(db);
    res.json({ success: true, data: authors });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = req.query.db as 'mongo' | 'mysql' | undefined;
  try {
    const author = await authorService.getAuthorById(id, db);
    if (!author) return res.status(404).json({ success: false, message: 'نویسنده پیدا نشد' });
    res.json({ success: true, data: author });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = req.body.db as 'mongo' | 'mysql' | undefined;
  try {
    const updated = await authorService.updateAuthor(id, req.body, db);
    if (!updated) return res.status(404).json({ success: false, message: 'نویسنده پیدا نشد' });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = req.query.db as 'mongo' | 'mysql' | undefined;
  try {
    const deleted = await authorService.deleteAuthor(id, db);
    if (!deleted) return res.status(404).json({ success: false, message: 'نویسنده پیدا نشد' });
    res.json({ success: true, message: 'نویسنده حذف شد' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
