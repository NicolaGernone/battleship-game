import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile'); 
  };

  const handleSignupSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile'); 
  };

  return (
    <div className="login-page container d-flex flex-column align-items-center justify-content-center">
      <h2>Signup</h2>
      <SignupForm onSubmit={handleSignupSuccess} />
      <h2> or Login</h2>
      <LoginForm onSubmit={handleLoginSuccess} />
      
    </div>
  );
}

export default LoginPage;