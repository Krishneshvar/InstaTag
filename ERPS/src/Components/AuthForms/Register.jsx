import './Register.css'
import { Link } from 'react-router-dom';

function Register() {
    return(
        <>
        <div className="register-container">
            <div className="register-form">
                <form>
                    <div className="mb-3">
                        {/* 9 - 10 chars */}
                        <label htmlFor="vehicleNumber" className="form-label">Vehicle Number</label>
                        <input type="text" className="form-control" id="vehicleNumber" placeholder="Enter Vehicle Number" required />
                    </div>
                    <div className="mb-3">
                        {/* 11 chars */}
                        <label htmlFor="aadharNumber" className="form-label">Engine Number</label>
                        <input type="text" className="form-control" id="aadharNumber" placeholder="Enter Engine Number" required />
                    </div>
                    <div className="mb-3">
                        {/* 17 chars */}
                        <label htmlFor="phoneNumber" className="form-label">Chasis Number</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Chasis Number" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="mail" placeholder="Enter Email" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <div className='login-route'>
                    <a> Already have an account? </a>
                    <Link to={`/login`}>
                        <button className='btn btn-primary'> Login </button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register
