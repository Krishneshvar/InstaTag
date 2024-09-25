// Login.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate a successful login
        navigate('/dashboard');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate a successful registration
        navigate('/dashboard');
    };

    const registerQuestion = () => {
        return (
            <div className='reg-bound'>
                <p>Don't have an account?</p> <button className='reg'>Register</button>
            </div>
        );
    };

    return (
        <div className="modal show d-block login-container">
            <div className="modal-dialog" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isLogin ? 'Login' : 'Register'}</h5>
                    </div>
                    <div className="modal-body">
                        {isLogin ? (
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="otp" className="form-label">OTP</label>
                                    <input type="text" className="form-control" id="otp" placeholder="Enter OTP" />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="vehicleNumber" className="form-label">Vehicle Number</label>
                                    <input type="text" className="form-control" id="vehicleNumber" placeholder="Enter Vehicle Number" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="aadharNumber" className="form-label">Aadhaar Number</label>
                                    <input type="text" className="form-control" id="aadharNumber" placeholder="Enter Aadhaar Number" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="otp" className="form-label">OTP</label>
                                    <input type="text" className="form-control" id="otp" placeholder="Enter OTP" />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-link" onClick={toggleForm}>
                            {isLogin ? registerQuestion() : 'Already have an account? Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
