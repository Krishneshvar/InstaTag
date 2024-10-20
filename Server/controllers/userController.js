import { checkLogin, getUserByVehicleNo, empLogin, getEmployeeByEmpId, setLoginStatus } from '../models/userModel.js';

// Handles user login request for clients
export async function handleLogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Vehicle number and password are required.' });
  }

  try {
    const loginResult = await checkLogin(username, password);
    if (loginResult.success) {
      // Redirect to the dashboard URL
      const user = await getUserByVehicleNo(username);
      return res.status(200).json({ 
        success: true, 
        message: 'Login successful', 
        redirectUrl: `/user-dashboard/${user.vehicle_no}` 
      });
    } else {
      return res.status(401).json(loginResult);
    }
  } catch (err) {
    console.error("Error handling /check-login request:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}

// Handles employee login request for employees
export async function validateEmp(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Employee ID and password are required.' });
  }

  try {
    const loginResult = await empLogin(username, password);
    if (loginResult.success) {
      await setLoginStatus(username, true);
      const employee = await getEmployeeByEmpId(username);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        redirectUrl: `/emp-dashboard/${employee.empid}` // Redirect after successful login
      });
    } else {
      return res.status(401).json(loginResult);
    }
  } catch (err) {
    console.error("Error handling /emp-login request:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}

