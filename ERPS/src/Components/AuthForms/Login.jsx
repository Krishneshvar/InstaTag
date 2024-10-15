import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [vehicle_no, setVehicle_no] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3000/api/check-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: vehicle_no, password })  // Changed vehicle_no to username
      });
  
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        navigate('/user-dashboard');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error while sending data to server:", error);
      setError(true);
    }
  };    

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="VehicleNumber" className="form-label">Vehicle Number</label>
            <input
              type="text"
              className="form-control"
              id="VehicleNumber"
              placeholder="Enter Vehicle number"
              value={vehicle_no}
              onChange={(e) => setVehicle_no(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="pass"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {
            error ?
            <span class="badge d-flex align-items-center p-1 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill">
              Please check your vehicle number and password.
            </span> : null
          }
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
        </form>
        <div className="register-route">
          <a>Don't have an account?</a>
          <Link to="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
