import pg from 'pg';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.NODE_PORT;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect();
app.use(express.json());

app.use(cors({
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.post("/check-login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required."
    });
  }

  try {
    const loginResult = await checkLogin(username, password);
    return res.status(loginResult.success ? 200 : 401).json(loginResult);
  }
  catch (err) {
    console.error("Error handling /check-login request:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
});

async function checkLogin(username, inputPassword) {
  try {
    const result = await db.query(
      "SELECT password FROM users WHERE vehicle_no = $1;", 
      [username]
    );

    if (result.rows.length === 0) {
      return { success: false, message: "User not found." };
    }

    const dbPassword = result.rows[0].password;

    if (inputPassword === dbPassword) {
      return { success: true, message: "Login successful." };
    }
    else {
      return { success: false, message: "Incorrect password." };
    }
  }
  catch (err) {
    console.error("Error during login check:", err);
    return { success: false, message: "Database error." };
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
