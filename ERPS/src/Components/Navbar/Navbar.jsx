// Navbar.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

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
                                <Link className="nav-link items" to="/">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link items" to="/AboutUs">ABOUT US</Link>
                            </li>
                        </ul>
                        <a href="#" onClick={() => navigate('/login')}>
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* User Dashboard */}
            {isLoggedIn && (
                <div className="dashboard-container">
                    {/* Add your UserDashboard component here */}
                    <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </>
    );
}

export default Navbar;
