import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [vehicle_no, setVehicle_no] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/check-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vehicle_no, password })
      });

      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        navigate('/user-dashboard');
      }
      else {
        alert(result.message);
      }
    }
    catch (error) {
      console.error("Error while sending data to server:", error);
      alert("There was an error connecting to the server.");
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
          <button type="submit" className="btn btn-primary">Login</button>
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
