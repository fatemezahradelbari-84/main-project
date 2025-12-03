import express, { Request, Response } from "express";
import mongoose from "mongoose";
import mysql from "mysql2/promise";

// ================= Config =================
type DBVersion = 1 | 2;
type Engine = "mongo" | "mysql";

const versionConfig = {
  currentVersion: 1 as DBVersion, // 1 = Mongo (پیش‌فرض)، 2 = MySQL
  dbByVersion: {
    1: "mongo",
    2: "mysql",
  } as Record<DBVersion, Engine>,
  getDbEngine(): Engine {
    return this.dbByVersion[this.currentVersion];
  },
};

// ================= MongoDB Models =================
interface IAuthor {
  name: string;
  family: string;
  age: number;
  gender: "male" | "female";
}

interface IBook {
  title: string;
  authorId: string;
  year: number;
}

const authorSchema = new mongoose.Schema<IAuthor>({
  name: { type: String, required: true },
  family: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
});

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  authorId: { type: String, required: true },
  year: { type: Number, required: true },
});

const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);

// ================= Database Connections =================
const connectMongo = async () => {
  await mongoose.connect("mongodb://localhost:27017/library-project");
  console.log("MongoDB Connected");
};

const connectMySql = async () => {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "library",
  });
  console.log("MySQL Connected");
  return conn;
};

// ================= CRUD Functions =================

// -------- Author --------
const createAuthor = async (data: IAuthor, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();
  if (engine === "mongo") return await new Author(data).save();

  const conn = await connectMySql();
  const [result] = await conn.execute(
    "INSERT INTO authors (name, family, gender, age) VALUES (?, ?, ?, ?)",
    [data.name, data.family, data.gender, data.age]
  );
  return result;
};

const getAuthors = async (db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();
  if (engine === "mongo") return await Author.find();

  const conn = await connectMySql();
  const [rows] = await conn.execute("SELECT * FROM authors");
  return rows;
};

// -------- Book --------
const createBook = async (data: IBook, db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();
  if (engine === "mongo") return await new Book(data).save();

  const conn = await connectMySql();
  const [result] = await conn.execute(
    "INSERT INTO books (title, authorId, year) VALUES (?, ?, ?)",
    [data.title, data.authorId, data.year]
  );
  return result;
};

const getBooks = async (db?: Engine) => {
  const engine = db || versionConfig.getDbEngine();
  if (engine === "mongo") return await Book.find();

  const conn = await connectMySql();
  const [rows] = await conn.execute("SELECT * FROM books");
  return rows;
};

// ================= Express API =================
const app = express();
app.use(express.json());
const PORT = 3000;

// ------ Author Routes ------
app.post("/authors", async (req: Request, res: Response) => {
  const { db, ...data } = req.body;
  try {
    const author = await createAuthor(data, db);
    res.status(201).json({ success: true, data: author });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/authors", async (req: Request, res: Response) => {
  try {
    const authors = await getAuthors();
    res.json({ success: true, data: authors });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------ Book Routes ------
app.post("/books", async (req: Request, res: Response) => {
  const { db, ...data } = req.body;
  try {
    const book = await createBook(data, db);
    res.status(201).json({ success: true, data: book });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/books", async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.json({ success: true, data: books });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= Start Server =================
(async () => {
  if (versionConfig.getDbEngine() === "mongo") await connectMongo();
  else await connectMySql();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
