import { useState } from 'react';
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
        { id: "confirmPassword", label: "Confirm Password", type: "password", required: true },
        { id: "otp", label: "OTP", type: "text" }
    ];

    const [formData, setFormData] = useState({
        vehicleNumber: '',
        engineNumber: '',
        chasisNumber: '',
        mail: '',
        phno: '',
        bankAccount: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
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

    const handleSendOTP = async () => {
        setOtpSent(true);
        const response = await fetch('http://localhost:3000/api/request-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
    
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        }
        else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/register/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            navigate(`/user-dashboard/${result.user_id}`);
        }
        catch (error) {
            console.error('Error during registration:', error);
            setError('Failed to register. Please try again later.');
        }
        finally {
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
