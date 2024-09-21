import express from 'express'
import pg from "pg";

const app = express();
const port = NODE_PORT;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
