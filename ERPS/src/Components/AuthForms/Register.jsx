import { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // For API requests

function Register() {
    const formFields = [
        { id: "username", label: "Username", type: "text", required: true },
        { id: "ownerName", label: "Vehicle Owner Name", type: "text", required: true },
        { id: "vehicleNumber", label: "Vehicle Number", type: "text", required: true },
        { id: "aadharNumber", label: "Engine Number", type: "text", required: true },
        { id: "chasisNumber", label: "Chasis Number", type: "text", required: true },
        { id: "mail", label: "Email", type: "email", required: true },
        { id: "phno", label: "Phone Number", type: "text", required: true },
        { id: "password", label: "Password", type: "password", required: true },
        { id: "confirmPassword", label: "Confirm Password", type: "password", required: true },
        { id: "bankAccount", label: "Bank Account Number", type: "text", required: true }
    ];

    const [formData, setFormData] = useState({
        username: '',
        ownerName: '',
        vehicleNumber: '',
        aadharNumber: '',
        chasisNumber: '',
        mail: '',
        phno: '',
        password: '',
        confirmPassword: '',
        bankAccount: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const navigate = useNavigate(); // For navigation

    // Handle input changes and update form data
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Validation for form fields
    const validateForm = () => {
        const { mail, phno, password, confirmPassword } = formData;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        if (!emailPattern.test(mail)) {
            setError('Invalid email address');
            return false;
        }

        if (!phonePattern.test(phno)) {
            setError('Phone number must be 10 digits');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    // Generate QR code after form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Validate OTP
        if (otp !== generatedOtp) {
            setError('Invalid OTP');
            return;
        }

        // Check vehicle owner name and vehicle number match (case-insensitive)
        if (formData.ownerName.toLowerCase() !== formData.vehicleNumber.toLowerCase()) {
            setError('Vehicle owner name and vehicle number do not match');
            return;
        }

        setLoading(true);
        setError(''); // Reset any previous error

        try {
            const response = await axios.get('https://api.qrserver.com/v1/create-qr-code/', {
                params: {
                    size: '150x150',
                    data: JSON.stringify(formData)  // Converting form data to a string to include in the QR code
                }
            });

            setQrCodeUrl(response.request.responseURL); // Get the QR code image URL from the API
            setFormData({ 
                username: '', ownerName: '', vehicleNumber: '', aadharNumber: '', chasisNumber: '',
                mail: '', phno: '', password: '', confirmPassword: '', bankAccount: '' 
            }); // Reset form

            // Redirect to the dashboard after successful submission
            navigate('/user-dashboard', { state: { qrCodeUrl: response.request.responseURL } });
        } catch (error) {
            console.error('Error generating QR code:', error);
            setError('Failed to generate QR code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP Request
    const handleOtpRequest = () => {
        setOtpLoading(true);
        // Generate a 4-digit OTP
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(generatedOtp);

        // Simulate sending the OTP to the email (mock)
        setTimeout(() => {
            console.log(`OTP sent to email: ${formData.mail}, OTP: ${generatedOtp}`);
            setOtpSent(true);
            setOtpLoading(false);
        }, 2000); // Simulate an API request
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    {
                        formFields.map((field) => (
                            <div className="mb-3" key={field.id}>
                                <label htmlFor={field.id} className="form-label">{field.label}</label>
                                <input
                                    type={field.type}
                                    className="form-control"
                                    id={field.id}
                                    placeholder={`Enter ${field.label}`}
                                    required={field.required}
                                    value={formData[field.id]}  // Bind input to state
                                    onChange={handleChange}
                                />
                            </div>
                        ))
                    }

                    {otpSent ? (
                        <>
                            <div className="mb-3">
                                <label htmlFor="otp" className="form-label">Enter OTP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="otp"
                                    placeholder="Enter the OTP sent to your email"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Generating QR...' : 'Register & Generate QR'}
                            </button>
                        </>
                    ) : (
                        <div className='otp-options'>
                            <p>Send OTP via:</p>
                            <button
                                className="btn btn-primary"
                                onClick={handleOtpRequest}
                                disabled={otpLoading}
                            >
                                {otpLoading ? 'Sending OTP...' : 'Email'}
                            </button>
                        </div>
                    )}
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className='login-route'>
                    <span>Already have an account? </span>
                    <Link to="/login">
                        <button className='btn btn-primary'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
