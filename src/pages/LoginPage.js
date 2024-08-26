import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  const handleLoginSuccess = (user) => {
    history.push('/profile');
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}

export default LoginPage;
