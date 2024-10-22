import { sendOTP } from "../models/otpSenderModel.js";

const requestOTP = async (req, res) => {
    const { email } = req.body;

    try {
        // Here you might want to check if the email already exists in your database
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length === 0) {
            return res.status(400).json({ message: 'Email not registered.' });
        }

        // Generate and send OTP
        const otp = await sendOTP(email);

        // Optionally, save the OTP in your database with an expiration time
        await pool.query('INSERT INTO otps (email, otp, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'5 minutes\')', [email, otp]);

        return res.status(200).json({ message: 'OTP sent successfully to your email.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { requestOTP };
