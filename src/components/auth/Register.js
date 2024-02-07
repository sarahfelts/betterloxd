import React, { useState } from 'react';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Validate email and username
    if (!email || !username) {
      setError('Email and username are required');
      return;
    }

    // Create a new user object
    const newUser = {
      email: email,
      username: username,
    };

    // Send a POST request to add the new user to the database
    fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then((registeredUser) => {
        // Registration successful, trigger the onRegister callback
        onRegister(registeredUser);
      })
      .catch((error) => {
        setError(error.message || 'Error during registration');
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
