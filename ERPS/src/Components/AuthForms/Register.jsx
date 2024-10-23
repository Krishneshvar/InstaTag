import { useState, useEffect } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const formFields = [
        { id: "vehicleNumber", label: "Vehicle Number", type: "text", required: true },
        { id: "engineNumber", label: "Engine Number", type: "text", required: true },
        { id: "chasisNumber", label: "Chasis Number", type: "text", required: true },
        { id: "mail", label: "Email", type: "email", required: true },
        { id: "phno", label: "Phone Number", type: "text", required: true },
        { id: "bankAccount", label: "Bank Account Number", type: "text", required: true },
        { id: "password", label: "Password", type: "password", required: true },
        { id: "confirmPassword", label: "Confirm Password", type: "password", required: true }
    ];

    const [formData, setFormData] = useState({
        vehicleNumber: '',
        engineNumber: '',
        chasisNumber: '',
        mail: '',
        phno: '',
        bankAccount: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpExpiryTime, setOtpExpiryTime] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

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

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            // Ensure email is present before making the request
            if (!formData.mail) {
                setError('Please enter your email.');
                return;
            }
    
            const response = await fetch('http://localhost:3000/api/request-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.mail }), // Ensure this matches the server-side expectations
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Notify the user
                setOtp(data.otp); // Store OTP in state
                setOtpExpiryTime(Date.now() + data.expiresIn); // Set expiration time
                setOtpSent(true);
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Notify about the error
            }
        } catch (error) {
            console.error('Failed to send OTP:', error);
            setError('Failed to send OTP. Please try again.');
        }
    };    

    useEffect(() => {
        if (otpSent && otpExpiryTime) {
            const timer = setTimeout(() => {
                setOtpSent(false); // Invalidate OTP after 2 minutes
                setFormData({ ...formData, otp: '' }); // Clear the user's OTP input
                alert('OTP has expired. Please request a new one.');
            }, otpExpiryTime - Date.now());

            return () => clearTimeout(timer);
        }
    }, [otpSent, otpExpiryTime]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        // Validate form data
        if (!validateForm()) {
            setIsLoading(false);
            return;
        }
    
        try {
            // Verify OTP by sending it along with the email
            const res = await fetch('http://localhost:3000/api/request-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.mail, otp: formData.otp }), // Send both email and OTP
            });
    
            const result = await res.json();
    
            if (result.success) {
                // Proceed with registration after OTP verification
                const registrationRes = await fetch('http://localhost:3000/api/register/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                const registrationResult = await registrationRes.json();
    
                // Redirect to user dashboard
                navigate(`/user-dashboard/${registrationResult.user_id}`);
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Failed to verify OTP. Please try again later.');
        } finally {
            setIsLoading(false);
        }
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
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))
                    }
                    {
                        otpSent && (
                            <div className="mb-3">
                                <label htmlFor="otp" className="form-label">Enter OTP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="otp"
                                    placeholder="Enter OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )
                    }
                    {
                        otpSent ? (
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleSendOTP}>
                                Send OTP via Mail
                            </button>
                        )
                    }
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
