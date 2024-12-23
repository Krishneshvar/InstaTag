import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [user_id, setUser_id] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.43.148:3000/api/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, password }),
      });

      const result = await response.json();

      if (response.status === 200 && result.token) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', result.token);

        // Redirect to user dashboard with user ID appended in the URL
        navigate(`/user-dashboard/${user_id}`);
      } else {
        alert(result.error || 'Invalid credentials');
      }
    } catch (error) {
      setError(true);
      alert('There was an error logging in.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userID" className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userID"
              placeholder="Enter User ID"
              value={user_id}
              onChange={(e) => setUser_id(e.target.value)}
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
          {error && (
            <span className="badge d-flex align-items-center p-1 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill">
              Please check your User ID and password.
            </span>
          )}
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
