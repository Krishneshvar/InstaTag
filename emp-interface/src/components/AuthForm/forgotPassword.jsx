import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Create a CSS file for styling

function ForgotPassword() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // Track the step in the process
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (step === 1) {
      try {
        const response = await fetch('http://localhost:3000/api/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccess(result.message); // Display success message
          setStep(2); // Move to the next step
        } else {
          setError(result.message); // Display error message
        }
      } catch (error) {
        setError('There was an error processing your request. Please try again later.');
      }
    } else if (step === 2) {
      try {
        const response = await fetch('http://localhost:3000/api/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, newPassword }),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccess(result.message); // Display success message
          navigate('/login'); // Optionally redirect to login
        } else {
          setError(result.message); // Display error message
        }
      } catch (error) {
        setError('There was an error processing your request. Please try again later.');
      }
    }
  };

  return (
    <div className="forgot-password">
      <h2>{step === 1 ? 'Forgot Password' : 'Change Password'}</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
          </>
        ) : (
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        )}
        <button type="submit" className="submit-btn">
          {step === 1 ? 'Submit' : 'Change Password'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </div>
  );
}

export default ForgotPassword;
