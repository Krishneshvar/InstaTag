import './AuthForm.css'
import { useState } from 'react';

export default function AuthForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/emp-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        onLogin();
        navigate('/scanner');
      }
      else {
        setError('Invalid credentials');
      }
    }
    catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='emp-login'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Employee ID</label>
          <input
            type="text"
            id="username"
            placeholder='Enter Employee ID'
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
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <a href=""> Forgot password? </a>
        <button type="submit" className='login-btn'>
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

function Scanner() {
  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
      <h2>Scanner Page</h2>
      <p>Welcome to the scanner page!</p>
    </div>
  );
}
