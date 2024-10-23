import { sendOTP } from "../models/otpSenderModel.js";
import rtoDB from "../db/rtoDB.js";

// In-memory OTP storage (consider using a database or Redis in production)
let otpMemory = {};

// Function to generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const requestOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // 1. Check if an OTP is being verified (when `otp` is present in the request body)
        if (otp) {
            // Check if OTP exists and is not expired
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
        }

        // 2. If no OTP in request, generate and send a new OTP
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required to request OTP.' });
        }

        // Check if the email exists in the database
        const userExists = await rtoDB.query('SELECT * FROM vehicle_verification WHERE email = $1', [email]);
        if (userExists.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Email not registered.' });
        }

        // Generate a new OTP
        const generatedOtp = generateOTP();

        // Store OTP and expiry time in memory (or better, in a session or database)
        otpMemory[email] = {
            otp: generatedOtp,
            expiry: Date.now() + 2 * 60 * 1000 // OTP valid for 2 minutes
        };

        // Send OTP to the user's email
        await sendOTP(email, generatedOtp); // Assuming sendOTP is a valid email-sending function

        // Respond with a success message and expiry information (optional)
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully to your email.',
            expiresIn: 2 * 60 * 1000 // Optional: sending expiry time (2 minutes in milliseconds)
        });
    } catch (error) {
        console.error('Error during OTP request:', error);
        return res.status(500).json({ success: false, message: 'Failed to process OTP request. Please try again later.' });
    }
};

export { requestOTP };
