import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/userRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: [`http://localhost:${process.env.CLIENT_PORT}`, `http://localhost:${process.env.EMPLOYEE_PORT}`,
    `http://192.0.0.4:${process.env.CLIENT_PORT}`, `http://192.168.43.245:${process.env.CLIENT_PORT}`,
    `http://192.168.43.148:${process.env.CLIENT_PORT}`
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use("/api", router);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.NODE_PORT}`);
});
