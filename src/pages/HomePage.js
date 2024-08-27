import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import '../styles/login.css';

function HomePage() {
    const navigate = useNavigate();
    const [showLoginForm, setShowLoginForm] = useState(false);
  
    const handleLoginSuccess = (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/profile');
    };
  
    const handleSignupSuccess = (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/login');
    };
  
    const toggleForm = () => {
      setShowLoginForm(!showLoginForm);
    };
  
    return (
      <div className="login-page container d-flex flex-column align-items-center justify-content-center">
        {showLoginForm ? (
          <LoginForm onSubmit={handleLoginSuccess} onToggle={toggleForm} />
        ) : (
          <SignupForm onSubmit={handleSignupSuccess} onToggle={toggleForm} />
        )}
      </div>
    );
  }
  
  export default HomePage;