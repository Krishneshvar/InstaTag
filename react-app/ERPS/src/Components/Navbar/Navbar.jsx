import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar-overlay">
            <div className="container-fluid navtag">
                <a className="navbar-brand" href="#">
                    <img className="logo" src="/Logo.png" alt="Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">ABOUT US</a>
                        </li>
                    </ul>
                    <a href="">
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
