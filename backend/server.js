import express from 'express';
import dotenv from 'dotenv'; 
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Add this

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Job Tracker API is running...');
});

// Error Middleware 
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});