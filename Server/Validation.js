import express from "express"
import db from "./DBConnection";

const app = express();

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

export { checkLogin }
