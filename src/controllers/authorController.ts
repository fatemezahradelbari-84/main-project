import { Request, Response } from "express";
import Author from "../models/Author";
import pool from "../config/sql";
import { z } from "zod";
import { isMongo, isMySql } from "../config/version";

const authorSchema = z.object({
  name: z.string().min(3),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  age: z.number().min(18).max(80).int().optional()
});

// GET ALL AUTHORS
export const getAuthors = async (req: Request, res: Response) => {
  try {
    if (isMongo()) {
      const authors = await Author.find();
      return res.json(authors);
    }

    const [rows] = await pool.query("SELECT * FROM authors");
    return res.json(rows);

  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// GET BY ID
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isMongo()) {
      const author = await Author.findById(id);
      if (!author) return res.status(404).json({ message: "یافت نشد" });
      return res.json(author);
    }

    const [rows] = await pool.query("SELECT * FROM authors WHERE id = ?", [id]);
    if ((rows as any[]).length === 0)
      return res.status(404).json({ message: "یافت نشد" });

    return res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// CREATE
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const parsedData = authorSchema.parse(req.body);

    if (isMongo()) {
      const author = await Author.create(parsedData);
      return res.status(201).json(author);
    }

    const { name, gender, age } = parsedData;

    const [result] = await pool.query(
      "INSERT INTO authors (name, gender, age) VALUES (?, ?, ?)",
      [name, gender, age]
    );

    const [rows] = await pool.query("SELECT * FROM authors WHERE id = ?", [
      (result as any).insertId
    ]);

    return res.status(201).json(rows[0]);

  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// UPDATE
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const parsedData = authorSchema.partial().parse(req.body);
    const { id } = req.params;

    if (isMongo()) {
      const author = await Author.findByIdAndUpdate(id, parsedData, {
        new: true
      });
      if (!author) return res.status(404).json({ message: "یافت نشد" });
      return res.json(author);
    }

    const { name, gender, age } = parsedData;

    const [result] = await pool.query(
      "UPDATE authors SET name=?, gender=?, age=? WHERE id=?",
      [name, gender, age, id]
    );

    if ((result as any).affectedRows === 0)
      return res.status(404).json({ message: "یافت نشد" });

    const [rows] = await pool.query("SELECT * FROM authors WHERE id = ?", [id]);

    return res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// DELETE
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isMongo()) {
      const author = await Author.findByIdAndDelete(id);
      if (!author) return res.status(404).json({ message: "یافت نشد" });
      return res.json({ message: "حذف شد" });
    }

    const [result] = await pool.query("DELETE FROM authors WHERE id=?", [id]);

    if ((result as any).affectedRows === 0)
      return res.status(404).json({ message: "یافت نشد" });

    return res.json({ message: "حذف شد" });

  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
};
