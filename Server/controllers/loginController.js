import jwt from 'jsonwebtoken';
import appDB from '../db/appDB.js';
import { logData } from './logController.js';

const pool = appDB;

const loginUser = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = (password == user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    logData(user_id, "", "Login", "", `User has logged in`);

    return res.json({ token, user_id: user.user_id });
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUserVehicles = async (req, res) => {
  const { user_id } = req.params;

  try {
      const result = await pool.query('SELECT * FROM vehicle_details WHERE user_id = $1', [user_id]);
      const vehicles = result.rows;

      if (vehicles.length === 0) {
          return res.status(404).json({ message: 'No vehicles found for this user.' });
      }

      return res.json(vehicles);
  }
  catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
  }
};

const getVehicleDetails = async (req, res) => {
  const { vehicle_no } = req.params;

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

const getVehicleDetailsByInstaTag = async (req, res) => {
  const { instatag_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT v.vehicle_no, v.vehicle_type, v.owner_name, 'active' AS insurance_status
       FROM vehicle_details v 
       WHERE v.instatag_id = $1`,
      [instatag_id]
    );

    const vehicleDetails = result.rows[0];

    if (!vehicleDetails) {
      return res.status(404).json({ message: 'Vehicle or owner not found for the given InstaTag ID.' });
    }

    return res.json(vehicleDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export { loginUser, getUserVehicles, getVehicleDetails , getVehicleDetailsByInstaTag, verifyToken };
