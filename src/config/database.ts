import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/library-project';
        
        const conn = await mongoose.connect(mongoURI);
        
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
        
    } catch (error) {
        console.error('Database connection failed:');
        
        if (error instanceof Error) {
            console.error(`Error Message: ${error.message}`);
        } else {
            console.error('Unknown error:', error);
        }
        
        // Exit process with failure
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

export default connectDB;