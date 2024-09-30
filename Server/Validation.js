import express from "express";
import db from "./DBConnection";

const app = express();
db.connect();

async function checkLogin(username, inputPassword) {
  try {
    const result = await db.query(
      "SELECT password FROM users WHERE username = $1;", 
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

app.get("/check-login", async (req, res) => {
  const { username, password } = req.query;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
