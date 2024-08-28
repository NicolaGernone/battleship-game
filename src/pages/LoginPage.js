import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile'); 
  };

  return (
    <div className="login-page container d-flex flex-column align-items-center justify-content-center">
      <LoginForm onSubmit={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;