import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // این خط رو اضافه کن
import connectDB from './config/database';
import authorRoutes from './routes/authorRouters';


// Load env variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize database connection
// connectDB();

app.get('/', (req, res) => {
    res.json({ 
        message: "Library API is running!",
        database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});