import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import './db/appDB.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: [`http://localhost:${process.env.CLIENT_PORT}`, `http://localhost:${process.env.EMPLOYEE_PORT}`],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use("/api", userRoutes);

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) return res.sendStatus(403);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.NODE_PORT}`);
});
