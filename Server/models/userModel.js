import appDB from '../db/appDB.js';
import rtoDB from '../db/rtoDB.js';

// Function to verify login credentials for users
export async function checkLogin(username, inputPassword) {
  try {
    const result = await appDB.query("SELECT password FROM users WHERE vehicle_no = $1;", [username]);

    if (result.rows.length === 0) {
      return { success: false, message: "Employee not found." };
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
    throw err;
  }
}

export async function getCurrentTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to set login status (for employees)
export async function setLoginStatus(empid, status) {
  try {
    await appDB.query("UPDATE employees SET login = $1 WHERE empid = $2;", [status, empid]);
  }
  catch (err) {
    console.error("Error updating login status:", err);
    throw err;
  }
}
