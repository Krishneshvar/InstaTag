import './Login.css'

function Login() {
    return(
        <>
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
        </>
    );
}

export default Login
