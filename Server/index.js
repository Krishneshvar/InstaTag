import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';  // Import user routes
import './db/appDB.js';  // Initialize the DB connection

dotenv.config();

const app = express();
const port = process.env.NODE_PORT;

// Middleware
app.use(express.json());
app.use(cors({
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Routes
app.use("/api", userRoutes);  // Use the user routes

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
