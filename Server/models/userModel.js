import appDB from '../db/appDB.js';

// Function to fetch user by vehicle number
export async function getUserByVehicleNo(vehicle_no) {
  try {
    const result = await appDB.query("SELECT vehicle_no, name, email FROM users WHERE vehicle_no = $1;", [vehicle_no]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
  catch (err) {
    console.error("Error fetching user by vehicle number:", err);
    throw err;
  }
}

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

// Function to verify login credentials for employees
export async function empLogin(username, inputPassword) {
  try {
    const result = await appDB.query("SELECT password FROM employees WHERE empid = $1;", [username]);

    if (result.rows.length === 0) {
      return { success: false, message: "User not found." };
    }

    const dbPassword = result.rows[0].password;

    if (inputPassword === dbPassword) {
      return { success: true, message: "Login successful." };
    } else {
      return { success: false, message: "Incorrect password." };
    }
  }
  catch (err) {
    console.error("Error during login check:", err);
    throw err;
  }
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

// Function to get employee details after login (for redirection)
export async function getEmployeeByEmpId(empid) {
  try {
    const result = await appDB.query("SELECT empid, name FROM employees WHERE empid = $1;", [empid]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
  catch (err) {
    console.error("Error fetching employee details:", err);
    throw err;
  }
}
