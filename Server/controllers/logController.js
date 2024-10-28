import appDB from '../db/appDB.js';
import { getCurrentTimestamp } from '../models/userModel.js';

const pool = appDB;

export async function logData(user_id, vehicle_no, action_type, empid = null, action_desc = null) {
    try {
        // Check if empid exists in employees table
        if (empid) {
            const employeeCheckResult = await pool.query('SELECT * FROM employees WHERE empid = $1', [empid]);
            if (employeeCheckResult.rows.length === 0) {
                throw new Error(`Employee with ID ${empid} does not exist.`);
            }
        }

        // Get the next available log_id
        const getMaxLogIdResult = await pool.query('SELECT MAX(log_id::int) as max_log_id FROM logs');
        const maxLogId = getMaxLogIdResult.rows[0].max_log_id || 0;
        const newLogId = maxLogId + 1;

        // Get the current timestamp
        const currTimestamp = getCurrentTimestamp();  

        // Insert the log data into the logs table
        await pool.query(
            'INSERT INTO logs (log_id, user_id, vehicle_no, empid, action_type, action_desc, log_time) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [newLogId, user_id, vehicle_no, empid, action_type, action_desc, currTimestamp]
        );

        return { success: true, message: 'Log entry created successfully', log_id: newLogId };

    } catch (err) {
        console.error('Error logging details:', err);
        throw new Error(`Logging failed: ${err.message}`);
    }
}
