import './Login.css'

function Login() {
    return(
        <>
        <div className="form-container">
            <div className="login-form">
                <form>
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
                <div className='register-route'>
                    <a>
                        Don't have an account?
                    </a>
                    <button className='btn-primary'> Register </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login
