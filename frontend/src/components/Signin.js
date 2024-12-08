import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css'; // Import the SignIn specific CSS

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); // To track invalid credentials
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Dummy check for valid credentials (you can replace with an actual API call)
    if (email !== 'test@example.com' || password !== 'password123') {
      setError(true);
    } else {
      // If valid, redirect to dashboard or another page
      navigate('/dashboard');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to Sign Up page if invalid credentials
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
      {error && (
        <div className="error-message">
          <p>Invalid credentials. Do you need to sign up?</p>
          <button onClick={handleSignUpClick}>Go to Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
