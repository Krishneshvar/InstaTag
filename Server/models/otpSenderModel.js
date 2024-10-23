import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { mailHTML } from './mailModel.js';

dotenv.config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASS,
    },
});

// Function to send OTP via email
export const sendOTP = async (email, otp) => {
    
    otp = mailHTML(otp);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully:', otp);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Could not send OTP');
    }
};
