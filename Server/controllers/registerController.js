import appDB from '../db/appDB.js';
import rtoDB from '../db/rtoDB.js';
import { getCurrentTimestamp, concatenateLastFourDigits } from '../models/userModel.js';
import { logData } from './logController.js';

const pool = appDB;
const rtopool = rtoDB;

const registerUser = async (req, res) => {
  const { vehicleNumber, engineNumber, chasisNumber, mail, phno, bankAccount, password } = req.body;

  try {
    // Check if the user already exists in the `users` table
    const existingUserResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [vehicleNumber]);
    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Fetch vehicle details for validation
    const getVehicleDet = await rtopool.query(
      'SELECT mobile_no, owner_name, engine_no, chasis_no, email, vehicle_type FROM vehicle_verification WHERE vehicle_no = $1',
      [vehicleNumber]
    );

    if (getVehicleDet.rows.length === 0) {
      return res.status(404).json({ error: 'Vehicle not found in the system' });
    }

    const vehicleDet = getVehicleDet.rows[0];
    vehicleDet.owner_name

    // Validate that the provided details match the vehicle details
    if (
      vehicleDet.mobile_no !== phno ||
      vehicleDet.engine_no !== engineNumber ||
      vehicleDet.chasis_no !== chasisNumber ||
      vehicleDet.email !== mail
    ) {
      return res.status(400).json({ error: 'The details do not match the records for the specified vehicle' });
    }

    const newUserId = Math.floor(100000 + Math.random() * 900000).toString();
   
    const currTimestamp = getCurrentTimestamp();

    const result = await pool.query(
      'INSERT INTO users (user_id, password, created_at, bank_acc_no, email, ph_no, balance, login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [newUserId, password, currTimestamp, bankAccount, mail, phno, 0, currTimestamp]
    );

    const newUser = result.rows[0];
    const iid = concatenateLastFourDigits(vehicleNumber, chasisNumber, engineNumber);

    const registerVehicle = await pool.query(
      'INSERT INTO vehicle_details (vehicle_no, vehicle_type, user_id, engine_no, chasis_no, instatag_id, tag_created, owner_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [vehicleNumber, vehicleDet.vehicle_type, newUser.user_id, engineNumber, chasisNumber, iid, currTimestamp, vehicleDet.owner_name]
    );

    const logResult = logData(newUser.user_id, vehicleNumber, "Registration", null, "A new user has registered.")
    if (!(await logResult).success) return console.log("Error logging data.");

    // Respond with the token and new user ID
    return res.status(201).json({ user_id: newUser.user_id });
  }
  catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ error: err.message });
  }
};

export { registerUser };
