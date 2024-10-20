import { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';  // To make API requests

function Register() {
    const formFields = [
        { id: "vehicleNumber", label: "Vehicle Number", type: "text", required: true },
        { id: "aadharNumber", label: "Engine Number", type: "text", required: true },
        { id: "chasisNumber", label: "Chasis Number", type: "text", required: true },
        { id: "mail", label: "Email", type: "email", required: true },
        { id: "phno", label: "Phone Number", type: "text", required: true }
    ];

    const [formData, setFormData] = useState({
        vehicleNumber: '',
        aadharNumber: '',
        chasisNumber: '',
        mail: '',
        phno: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes and update form data
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Generate QR code after form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setFormData({ vehicleNumber: '', aadharNumber: '', chasisNumber: '', mail: '', phno: '' }); // Reset form
        } catch (error) {
            console.error('Error generating QR code:', error);
            setError('Failed to generate QR code. Please try again.');
        } finally {
            setLoading(false);
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
                                    value={formData[field.id]}  // Bind input to state
                                    onChange={handleChange}
                                />
                            </div>
                        ))
                    }
    
                    {otpSent ? (
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Generating QR...' : 'Register & Generate QR'}
                        </button>
                    ) : (
                        <div className='otp-options'>
                            <p>Send OTP via:</p>
                            <button className="btn btn-primary" onClick={() => setOtpSent(true)}>Email</button>
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
            
            <div className="qr-code-wrapper">
                {qrCodeUrl && (
                    <div className="qr-code-container">
                        <h4>Your Registration QR Code:</h4>
                        <img src={qrCodeUrl} alt="Generated QR Code" />
                    </div>
                )}
            </div>
        </div>
    );
}    

export default Register;
