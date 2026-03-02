import express from 'express';
import dotenv from 'dotenv'; 
import cors from 'cors';
import connectDB from './config/db.js'; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Connect to MongoDB
await connectDB();
// Test route
app.get('/', (req, res) => {
  res.send('Job Tracker API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});