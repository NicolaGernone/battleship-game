import React, { useState } from 'react';
import { createUser } from '../services/api';
import '../styles/login.css';

function SignupForm({ onSubmit, onClose, onToggle }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await createUser( username, password );
      onSubmit(userData);
    } catch (error) {
      alert('Signup failed. Please check your credentials.');
    }
  };

  return (
    <div className="signup-form animate__animated animate__fadeIn">
      <button type="button" className="close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
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
          Signup
        </button>
      </form>
      <p onClick={onToggle}>Or Login</p>
    </div>
  );
}

export default SignupForm;