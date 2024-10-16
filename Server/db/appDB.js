import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const appDB = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.APP_DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

appDB.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to database.');
  }
});

export default appDB;
