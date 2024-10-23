import { sendOTP } from "../models/otpSenderModel.js";
import rtoDB from "../db/rtoDB.js";

let otpMemory = {};

// OTP Request (Generate and Send)
const requestOTP = async (req, res) => {
    const { email } = req.body;

    try {
        // Ensure the email is provided
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required to request OTP.' });
        }

        // Check if the email exists in the database
        const userExists = await rtoDB.query('SELECT * FROM vehicle_verification WHERE email = $1', [email]);
        if (userExists.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Email not registered.' });
        }

        // Generate OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP in memory with an expiry time
        otpMemory[email] = {
            otp: generatedOtp,
            expiry: Date.now() + 2 * 60 * 1000 // OTP is valid for 2 minutes
        };

        // Send OTP via email
        await sendOTP(email, generatedOtp);

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully to your email.',
            expiresIn: 2 * 60 * 1000 // Optional expiry info
        });
    } catch (error) {
        console.error('Error during OTP request:', error);
        return res.status(500).json({ success: false, message: 'Failed to process OTP request. Please try again later.' });
    }
};

// OTP Validation
const validateOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if email and OTP are provided
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
        }

        // Check if OTP exists and is still valid
        if (otpMemory[email] && otpMemory[email].otp === otp) {
            const currentTime = Date.now();
            const otpExpiryTime = otpMemory[email].expiry;

            if (currentTime <= otpExpiryTime) {
                // OTP is valid
                delete otpMemory[email]; // Clear OTP after successful verification
                return res.status(200).json({ success: true, message: 'OTP verified successfully.' });
            } else {
                // OTP has expired
                delete otpMemory[email]; // Clear expired OTP
                return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
            }
        } else {
            // OTP is invalid
            return res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }
    } catch (error) {
        console.error('Error during OTP validation:', error);
        return res.status(500).json({ success: false, message: 'Failed to validate OTP. Please try again later.' });
    }
};

export { requestOTP, validateOTP };
