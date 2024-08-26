import React, { useState } from 'react';
import { loginUser } from '../services/api';
import './login.css';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="login-form">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="toggle-register" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
      </p>
    </div>
  );
}

export default LoginForm;
