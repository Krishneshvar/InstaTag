import express from 'express';
import pg from 'pg';

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

async function checkLogin(usrname, inputPassword) {
  try {
    const result = await db.query(
      "SELECT password FROM users WHERE username = $1;", [usrname]
    );

    if (result.rows.length === 0) { return false; }

    const ogPassword = result.rows[0].password;
    return inputPassword === ogPassword;
  }
  catch (err) {
    console.error('Error during login check:', err);
    return false;
  }
}

app.get("/check-login", async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required.' });
  }

  try {
    const loginSuccess = await checkLogin(username, password);
    return res.json({ success: loginSuccess });
  }
  catch (err) {
    console.error('Error handling /check-login request:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
