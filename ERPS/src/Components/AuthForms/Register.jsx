import { useState } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';

function Register() {
    const formData = [
        { id: "vehicleNumber", label: "Vehicle Number", type: "text", placeholder: "Enter Vehicle Number", required: true },
        { id: "aadharNumber", label: "Engine Number", type: "text", placeholder: "Enter Engine Number", required: true },
        { id: "chasisNumber", label: "Chasis Number", type: "text", placeholder: "Enter Chasis Number", required: true },
        { id: "mail", label: "Email", type: "email", placeholder: "Enter Email", required: true },
        { id: "phno", label: "Phone Number", type: "text", placeholder: "Enter Phone Number", required: true }
    ];

    const [otpSent, setOtpSent] = useState(false)

    return(
        <>
        <div className="register-container">
            <div className="register-form">
                <form>
                    {formData.map((field) => (
                        <div className="mb-3" key={field.id}>
                        <label htmlFor={field.id} className="form-label">{field.label}</label>
                        <input 
                            type={field.type} 
                            className="form-control" 
                            id={field.id} 
                            placeholder={field.placeholder} 
                            required={field.required} 
                        />
                        </div>
                    ))}

                    {
                        otpSent ?
                        <button type="submit" className="btn btn-primary">Register</button>
                        :
                        <div className='otp-options'>
                            <p>Send OTP via:</p>
                            <button className="btn btn-primary">Email</button>
                            <button className="btn btn-primary">Phone Number</button>
                        </div>
                    }
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
