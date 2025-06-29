import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbConnect from './DB/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import courseRoute from './routes/course.route.js';
// import isAunthenticated from './middlewares/isAuthenticated.js';

dotenv.config({});

// call db connection
dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware apis
app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);

 "http://localhost:8000/api/v1/user/register"
"http://localhost:8000/api/v1/user/login"

app.get('/home', (_, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});