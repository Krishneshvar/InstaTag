import appDB from '../db/appDB.js';
import rtoDB from '../db/rtoDB.js';
import { getCurrentTimestamp, concatenateLastFourDigits } from '../models/userModel.js';

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
      'SELECT mobile_no, engine_no, chasis_no, email FROM vehicle_verification WHERE vehicle_no = $1',
      [vehicleNumber]
    );

    if (getVehicleDet.rows.length === 0) {
      return res.status(404).json({ error: 'Vehicle not found in the system' });
    }

    const vehicleDet = getVehicleDet.rows[0];

    // Validate that the provided details match the vehicle details
    if (
      vehicleDet.mobile_no !== phno ||
      vehicleDet.engine_no !== engineNumber ||
      vehicleDet.chasis_no !== chasisNumber ||
      vehicleDet.email !== mail
    ) {
      return res.status(400).json({ error: 'The details do not match the records for the specified vehicle' });
    }

    // Generate the next available user_id by getting the max user_id and incrementing it
    const getMaxUserIdResult = await pool.query('SELECT MAX(user_id::int) as max_user_id FROM users');
    const maxUserId = getMaxUserIdResult.rows[0].max_user_id || 0;
    const newUserId = maxUserId + 1;

    const currTimestamp = getCurrentTimestamp();

    const result = await pool.query(
      'INSERT INTO users (user_id, password, created_at, bank_acc_no, email, ph_no, balance) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [newUserId, password, currTimestamp, bankAccount, mail, phno, 0]
    );

    const newUser = result.rows[0];
    const iid = concatenateLastFourDigits(vehicleNumber, chasisNumber, engineNumber);

    const registerVehicle = await pool.query(
      'INSERT INTO vehicle_details (vehicle_no, vehicle_type, user_id, engine_no, chasis_no, instatag_id, tag_created) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [vehicleNumber, password, newUser.user_id, engineNumber, chasisNumber, iid, currTimestamp]
    );

    // Respond with the token and new user ID
    return res.status(201).json({ user_id: newUser.user_id });
  }
  catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ error: err.message });
  }
};

export { registerUser };
