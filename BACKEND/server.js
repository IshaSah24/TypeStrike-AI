import  express  from  'express';
import dotenv from 'dotenv';
import connectDb from './src/config/mongo.config.js';
import authRoutes from './src/routes/auth.route.js';
import cookieParser from "cookie-parser";
import { globalErrorHandler } from './src/middleware/globalError.middleware.js';

dotenv.config(); 
const  app = express();
const  PORT =  5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to log requests

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the API');
})

app.use(globalErrorHandler);
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on http://localhost:${PORT}`);
})