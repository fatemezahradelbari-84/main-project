import Book from '../models/Book';
import { versionConfig } from '../config/version';
import { connectMySql } from '../config/mySql';

type Engine = 'mongo' | 'mysql';

export interface BookData {
  title: string;
  image?: string;
  publisher: string;
  author: string;  // ObjectId for Mongo, numeric or foreign key for MySQL
}

// Create book
export const createBook = async (data: BookData, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') {
    const book = await Book.create(data);
    return book;
  }

  const conn = await connectMySql();
  const [result] = await conn.execute(
    'INSERT INTO books (title, image, publisher, author) VALUES (?, ?, ?, ?)',
    [data.title, data.image ?? '', data.publisher, data.author]
  );

  return { id: (result as any).insertId, ...data };
};

// Get all books
export const getBooks = async (db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') {
    return await Book.find().populate('author');
  }

  const conn = await connectMySql();
  const [rows] = await conn.execute('SELECT * FROM books');
  return rows;
};

// Get book by ID
export const getBookById = async (id: string | number, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') {
    return await Book.findById(id).populate('author');
  }

  const conn = await connectMySql();
  const [rows] = await conn.execute(
    'SELECT * FROM books WHERE id = ?',
    [id]
  );

  return (rows as any[])[0] || null;
};

// Update (PUT)
export const updateBook = async (
  id: string | number,
  data: Partial<BookData>,
  db?: Engine
) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') {
    return await Book.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  const conn = await connectMySql();
  const [result] = await conn.execute(
    'UPDATE books SET title=?, image=?, publisher=?, author=? WHERE id=?',
    [
      data.title ?? null,
      data.image ?? null,
      data.publisher ?? null,
      data.author ?? null,
      id
    ]
  );

  if ((result as any).affectedRows === 0) return null;

  const [rows] = await conn.execute('SELECT * FROM books WHERE id=?', [id]);
  return (rows as any[])[0] || null;
};

// Patch
export const patchBook = async (
  id: string | number,
  data: Partial<BookData>,
  db?: Engine
) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') {
    return await Book.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  // MySQL dynamic PATCH
  const conn = await connectMySql();

  const fields = Object.keys(data);
  const values = Object.values(data);

  const sql = `UPDATE books SET ${fields.map(f => f + '=?').join(', ')} WHERE id=?`;

  const [result] = await conn.execute(sql, [...values, id]);

  if ((result as any).affectedRows === 0) return null;

  const [rows] = await conn.execute('SELECT * FROM books WHERE id=?', [id]);
  return (rows as any[])[0] || null;
};

// Delete
export const deleteBook = async (id: string | number, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') {
    return await Book.findByIdAndDelete(id);
  }

  const conn = await connectMySql();
  const [result] = await conn.execute(
    'DELETE FROM books WHERE id=?',
    [id]
  );

  return (result as any).affectedRows > 0;
};
