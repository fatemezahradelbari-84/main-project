import express from 'express';
import dotenv from 'dotenv';
import authorRoutes from './routes/authors';
import connectDB from './config/database';
import bookRoutes from './routes/books';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: "Library API is running!",
        status: "OK"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});