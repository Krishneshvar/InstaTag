import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/userRoutes.js'
import './db/appDB.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: [`http://localhost:${process.env.CLIENT_PORT}`, `http://localhost:${process.env.EMPLOYEE_PORT}`],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use("/api", router);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token expired or invalid' });
    req.user = user;
    next();
  });
};

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.NODE_PORT}`);
});

export { authenticateToken };
