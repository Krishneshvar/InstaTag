import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import appDB from '../db/appDB.js';
import rtoDB from '../db/rtoDB.js';

const pool = appDB;
const rtopool = rtoDB;

const registerUser = async (req, res) => {
  const { user_id, password, bank_acc_no, email, ph_no } = req.body;  // Added bank_acc_no, email, and ph_no

  try {
    // Check if the user already exists in the `users` table
    const existingUserResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Fetch vehicle details for validation (optional, depending on your logic)
    const getVehicleDet = await rtopool.query(
      'SELECT engine_no, chasis_no, email FROM vehicle_verification WHERE vehicle_no = $1',
      [user_id]
    );
    
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the `users` table with all fields
    const result = await pool.query(
      'INSERT INTO users (user_id, password, bank_acc_no, email, ph_no) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, hashedPassword, bank_acc_no, email, ph_no]
    );

    const newUser = result.rows[0];

    // Generate a JWT token for the new user
    const token = jwt.sign({ user_id: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user ID
    return res.status(201).json({ token, user_id: newUser.user_id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { registerUser };
