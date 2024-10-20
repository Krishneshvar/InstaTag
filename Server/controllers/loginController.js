import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import appDB from '../db/appDB.js';

const pool = appDB;

const loginUser = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = (password == user.password); //await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user_id: user.user_id });
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const loginEmployee = async (req, res) => {
  const { empid, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM employees WHERE empid = $1', [empid]);
    const employee = result.rows[0];

    if (!employee) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ empid: employee.empid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, empid: employee.empid });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUserVehicles = async (req, res) => {
  const { user_id } = req.params; // Get user_id from request parameters

  try {
      const result = await pool.query('SELECT * FROM vehicle_details WHERE user_id = $1', [user_id]);
      const vehicles = result.rows;

      if (vehicles.length === 0) {
          return res.status(404).json({ message: 'No vehicles found for this user.' });
      }

      return res.json(vehicles);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
  }
};

const getVehicleDetails = async (req, res) => {
  const { vehicle_no } = req.params; // Get vehicle_no from request parameters

  try {
      const result = await pool.query('SELECT * FROM vehicle_details WHERE vehicle_no = $1', [vehicle_no]);
      const vehicle = result.rows[0];

      if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found.' });
      }

      return res.json(vehicle);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
  }
};

export { loginUser, loginEmployee, getUserVehicles, getVehicleDetails };
