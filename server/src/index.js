import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
    initMongoDB
} from './db/initMongoDB.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Podorozhnyky API is running 🚀'
    });
});

const startServer = async () => {
    try {
        await initMongoDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();