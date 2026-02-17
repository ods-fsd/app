import mongoose from 'mongoose';

export const initMongoDB = async () => {
    try {
        const {
            MONGODB_USER,
            MONGODB_PASSWORD,
            MONGODB_URL,
            MONGODB_DB
        } = process.env;
        const connectionString = `${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

        await mongoose.connect(connectionString);
        console.log('MongoDB connection established successfully! 🌵');
    } catch (error) {
        console.error('MongoDB connection error 🌵:', error.message);
        throw error;
    }
};