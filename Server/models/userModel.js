import appDB from '../db/appDB.js';

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

export function getCurrentTimestamp() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function concatenateLastFourDigits(vehicleNumber, chasisNumber, engineNumber) {
  // Extract the last 4 digits of each number
  const lastFourVehicle = vehicleNumber.slice(-4);
  const lastFourChasis = chasisNumber.slice(-4);
  const lastFourEngine = engineNumber.slice(-4);

  // Concatenate the extracted parts
  const result = lastFourVehicle + lastFourChasis + lastFourEngine;

  return result;
}

export const getVehicleExpenses = async (req, res) => {
  const { vehicle_no } = req.params;

  try {
    // Query the database for vehicle expenses
    const result = await appDB.query(
      "SELECT transac_time, toll_amt FROM transactions WHERE vehicle_no = $1;",
      [vehicle_no]
    );

    // Return an empty array if no expenses are found
    if (result.rows.length === 0) {
      return res.status(200).json([]); // Empty array instead of 404
    }

    // Map the query results to the desired format
    const expenses = result.rows.map(row => ({
      timestamp: row.transac_time,
      amount: parseFloat(row.toll_amt)
    }));

    // Return the formatted expenses array
    return res.status(200).json(expenses);

  } catch (error) {
    console.error('Error fetching vehicle expenses:', error);
    return res.status(500).json({ message: 'Error fetching vehicle expenses.' });
  }
};
