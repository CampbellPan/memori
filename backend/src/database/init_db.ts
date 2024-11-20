import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try{
        const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/memori_dev';
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
