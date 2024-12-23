import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const rtoDB = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.RTO_DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

rtoDB.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  }
  else {
    console.log('Connected to RTO DB.');
  }
});

export default rtoDB;
