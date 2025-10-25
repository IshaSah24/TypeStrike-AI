import dotenv from 'dotenv';
import  express  from  'express';
import connectDb from './src/config/mongo.config.js';
import authRoutes from './src/routes/auth.route.js';
import cookieParser from "cookie-parser";
import { globalErrorHandler } from './src/middleware/globalError.middleware.js';
import cors from 'cors'
dotenv.config(); 
const  app = express();


app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true    
}));

const  PORT =  process.env.PORT;

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