import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import appDB from '../db/appDB.js';

const pool = appDB;

const registerUser = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    // Check if the user already exists
    const existingUserResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (user_id, password) VALUES ($1, $2) RETURNING *',
      [user_id, hashedPassword]
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
