import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Validate the entered email
    if (!email) {
      setError('Email is required');
      return;
    }

    // Fetch user data from your API
    fetch(`http://localhost:8088/users?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Email not found');
        }
        return response.json();
      })
      .then((users) => {
        const user = users[0];
        if (!user) {
            throw new Error('User not found')
        }
        localStorage.setItem('user', JSON.stringify(user))
        onSignIn(user)
        navigate('/account')
        ;
      })
      .catch((error) => {
        setError(error.message || 'Error during sign-in');
      });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignIn;