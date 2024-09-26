import './Register.css'

function Register() {
    return(
        <>
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
        </>
    );
}

export default Register
