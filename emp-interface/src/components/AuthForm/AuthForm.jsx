import './AuthForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ empid: username, password }),
      });
      
      const result = await response.json();

      if (result.token) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', result.token);

        // Redirect to employee dashboard with empid appended in the URL
        navigate(`/employee-dashboard?empid=${username}`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('There was an error logging in.');
    }
  };

  return (
    <div className="emp-login">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Employee ID</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Employee ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <a href=""> Forgot password? </a>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default AuthForm;
