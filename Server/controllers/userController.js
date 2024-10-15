import { checkLogin, getUserByVehicleNo } from '../models/userModel.js';

// Handles user login request
export async function handleLogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Vehicle number and password are required.' });
  }

  try {
    const loginResult = await checkLogin(username, password);
    if (loginResult.success) {
      return res.status(200).json({ success: true, message: 'Login successful'});
    }
    else {
      return res.status(401).json(loginResult);
    }
  }
  catch (err) {
    console.error("Error handling /check-login request:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}
