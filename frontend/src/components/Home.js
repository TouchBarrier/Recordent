import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Import CSS for home page styling

function Home() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin'); // Redirect to SignIn page
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to SignUp page
  };

  return (
    <div className="home-container">
      <h1>Welcome to Recordant</h1>
      <p>Please sign in or sign up to continue.</p>
      <div className="button-container">
        <button className="btn" onClick={handleSignInClick}>
          Sign In
        </button>
        <button className="btn" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;
