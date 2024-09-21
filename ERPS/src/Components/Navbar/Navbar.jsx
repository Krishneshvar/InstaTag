// Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import UserDashboard from '../UserDashboard/UserDashboard';
import Contents from '../Contents/Contents';
import AboutUs from '../AboutUs/AboutUs';
import { Link } from 'react-router-dom';

function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();  // Add useNavigate hook

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
        setIsLogin(!isLogin);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate a successful login
        setIsLoggedIn(true);
        setShowModal(false);
        // Navigate to UserDashboard
        navigate('/dashboard');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        setShowModal(false);
        navigate('/dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    const registerQuestion = () => {
        return(
            <div className='reg-bound'>
            <p>Don't have an account?</p> <button className='reg'>Register</button>
            </div>
        )
    }

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
                            <Link className="nav-link items" to="/Contents">HOME</Link>
                            </li>
                            <li className="nav-item">
                             <Link className="nav-link items" to="/AboutUs">ABOUT US</Link>
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
