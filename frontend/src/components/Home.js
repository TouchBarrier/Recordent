import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin'); 
  };

  const handleSignUpClick = () => {
    navigate('/signup'); 
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1>Recordant</h1>
        </div>
        <div className="header-buttons">
          <button className="btn" onClick={handleSignInClick}>
            Sign In
          </button>
          <button className="btn" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </header>

      <div className="home-container">
        <h1>Welcome to Recordant</h1>
        <p>Please sign in or sign up to continue.</p>
        <button className="btn" onClick={handleSignUpClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
