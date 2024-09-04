import { useEffect } from 'react';
import './Navbar.css';

function Navbar() {
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

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid navtag">
                <a class="navbar-brand items" href="#">
                    <img class="logo" src="/Logo.png" alt="Logo" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link items" aria-current="page" href="#">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link items" href="#">ABOUT US</a>
                    </li>
                    </ul>
                    <a href="">
                    <span class="material-symbols-outlined">
                    account_circle
                    </span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
