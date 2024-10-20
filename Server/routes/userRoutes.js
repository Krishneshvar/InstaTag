import express from 'express';
import { handleLogin, validateEmp } from '../controllers/userController.js';
import appDB from '../db/appDB.js';

const router = express.Router();

// POST route for login
router.post("/check-login", handleLogin);
router.post("/emp-login", validateEmp);
router.post("/emp-details", validateEmp);

// Fetch user details by vehicle number (for customers)
router.get('/api/user-details/:vehicleNumber', async (req, res) => {
  const { vehicleNumber } = req.params;

  try {
    // Fetch user details from the 'users' table
    const userResult = await appDB.query('SELECT * FROM users WHERE vehicle_number = $1', [vehicleNumber]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];

    // Fetch the recent transactions for the user
    const transactionsResult = await appDB.query(`
      SELECT id, date, toll_name as "tollName", amount 
      FROM transactions 
      WHERE vehicle_number = $1
      ORDER BY date DESC LIMIT 10`, [vehicleNumber]);

    const transactions = transactionsResult.rows;

    // Send both user data and transactions in the response
    res.json({ user, transactions });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
  // Fetch employee details by empid (for employees)
router.get("/api/emp-details/:empid", async (req, res) => {
  try {
    const employee = await getEmployeeByEmpId(req.params.empid);
    if (employee) {
      res.status(200).json(employee);
    }
    else {
      res.status(404).json({ message: "Employee not found" });
    }
  }
  catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
