import React, { useState } from 'react';
import './signup.css'; // Import the SignUp specific CSS

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    // Dummy Sign Up logic (you can replace with an actual API call)
    console.log('User Signed Up with:', { name, email, password });
    // Redirect to Sign In page after successful sign up
    alert('Sign up successful!');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
