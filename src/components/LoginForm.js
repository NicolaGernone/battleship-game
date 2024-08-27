import React, { useState } from 'react';
import { loginUser } from '../services/api';
import '../styles/login.css';

function LoginForm({ onSubmit, onToggle }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser( username, password );
      onSubmit(userData);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };



  return (
    <div className="signup-form animate__animated animate__fadeIn">
      <form onSubmit={handleSubmit}>
      <h3>Login</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p onClick={onToggle}>Or Signup</p>
    </div>
    
  );
}

export default LoginForm;