import appDB from '../db/appDB.js';
import { logData } from './logController.js';
const pool = appDB;

const handleTransaction = async (req, res) => {
    const { vehicleNo, instaTagId } = req.body; 

    try {
        // Fetch the user ID and vehicle type from vehicle_details table
        const vehicleDetails = await pool.query('SELECT user_id, vehicle_type FROM vehicle_details WHERE vehicle_no = $1', [vehicleNo]);

        if (vehicleDetails.rowCount === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const userId = vehicleDetails.rows[0].user_id;
        const vehicleType = vehicleDetails.rows[0].vehicle_type;

        // Fetch the toll amount, toll_id, and booth_no based on the vehicle type from toll_rates table
        const tollRate = await pool.query('SELECT toll_amount, toll_id, booth_no FROM toll_rates WHERE vehicle_type = $1', [vehicleType]);

        if (tollRate.rowCount === 0) {
            return res.status(404).json({ message: 'Toll rate not found for this vehicle type' });
        }

        const tollAmount = tollRate.rows[0].toll_amount;
        const tollId = tollRate.rows[0].toll_id;
        const boothNo = tollRate.rows[0].booth_no;

        // Fetch the user and their balance from users table
        const user = await pool.query('SELECT balance FROM users WHERE user_id = $1', [userId]);

        if (user.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        let balance = user.rows[0].balance;

        if (balance < tollAmount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Reduce balance by the toll amount
        balance -= tollAmount;

        // Update the user's balance
        await pool.query('UPDATE users SET balance = $1 WHERE user_id = $2', [balance, userId]);

        // Insert a new transaction record and get the transaction ID
        const status = 'completed';
        const result = await pool.query(
            'INSERT INTO transactions (user_id, vehicle_no, toll_id, booth_no, toll_amt, status, instatag_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING transac_id',
            [userId, vehicleNo, tollId, boothNo, tollAmount, status, instaTagId]
        );

        const transactionId = result.rows[0].transac_id;

        // logData(userId, vehicleNo, "Transaction", 'null', `Paid ${tollAmount} at ${tollId}`);

        return res.json({ newBalance: balance, transactionId });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Transaction error' });
    }
};

export default handleTransaction;
