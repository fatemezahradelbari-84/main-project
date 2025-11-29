import Author from '../models/Author';
import { versionConfig } from '../config/version';
import { connectMySql } from '../config/mySql';

type Engine = 'mongo' | 'mysql';

export interface AuthorData {
  name: string;
  family: string;
  gender: 'male' | 'female';
  age: number;
}

export const createAuthor = async (data: AuthorData, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') {
    const author = new Author(data);
    return await author.save();
  }

  const conn = await connectMySql();
  const [result] = await conn.execute(
    'INSERT INTO authors (name, family, gender, age) VALUES (?, ?, ?, ?)',
    [data.name, data.family, data.gender, data.age]
  );

  return { id: (result as any).insertId, ...data };
};

export const getAuthors = async (db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') return await Author.find();

  const conn = await connectMySql();
  const [rows] = await conn.execute('SELECT * FROM authors');
  return rows;
};

export const getAuthorById = async (id: string | number, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') return await Author.findById(id);

  const conn = await connectMySql();
  const [rows] = await conn.execute('SELECT * FROM authors WHERE id = ?', [id]);
  return (rows as any[])[0] || null;
};

export const updateAuthor = async (id: string | number, data: Partial<AuthorData>, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') return await Author.findByIdAndUpdate(id, data, { new: true, runValidators: true });

  const conn = await connectMySql();
  const [result] = await conn.execute(
    'UPDATE authors SET name=?, family=?, gender=?, age=? WHERE id=?',
    [data.name, data.family, data.gender, data.age, id]
  );

  if ((result as any).affectedRows === 0) return null;

  const [rows] = await conn.execute('SELECT * FROM authors WHERE id=?', [id]);
  return (rows as any[])[0] || null;
};

export const deleteAuthor = async (id: string | number, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();

  if (engine === 'mongo') return await Author.findByIdAndDelete(id);

  const conn = await connectMySql();
  const [result] = await conn.execute('DELETE FROM authors WHERE id=?', [id]);
  return (result as any).affectedRows > 0;
};
