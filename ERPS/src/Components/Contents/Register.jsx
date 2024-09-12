import { useState } from 'react';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        aadharNumber: '',
        phoneNumber: '',
        otp: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="register-form">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="vehicleNumber">Vehicle Number:</label>
                    <input
                        type="text"
                        id="vehicleNumber"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your vehicle number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="aadharNumber">Aadhar Number:</label>
                    <input
                        type="text"
                        id="aadharNumber"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Aadhar number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Register;
