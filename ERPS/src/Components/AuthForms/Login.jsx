import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/check-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
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
            <label htmlFor="VehicleNumber" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="VehicleNumber"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
