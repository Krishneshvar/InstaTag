import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import UserDashboard from '../UserDashboard/UserDashboard';

function Navbar() {
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register forms
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
    const modalRef = useRef(null); // Ref to the modal

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between login and register
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Directly set user as logged in without validation
        setIsLoggedIn(true);
        setShowModal(false); // Close modal on login
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle registration logic here
        setIsLoggedIn(true); // Simulate successful registration
        setShowModal(false); // Close modal on successful registration
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    // Close modal when clicking outside
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false); // Close the modal
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid navtag">
                    <a className="navbar-brand items" href="#">
                        <img className="logo" src="/Logo.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link items" aria-current="page" href="#">HOME</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link items" href="#">ABOUT US</a>
                            </li>
                        </ul>
                        <a href="#" onClick={toggleModal}>
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Login/Register Modal */}
            {showModal && !isLoggedIn && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" ref={modalRef}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isLogin ? 'Login' : 'Register'}</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                {/* Login Form */}
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
                                    /* Register Form */
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
                                    {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* User Dashboard */}
            {isLoggedIn && (
                <div className="dashboard-container">
                    <UserDashboard />
                    <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </>
    );
}

export default Navbar;
