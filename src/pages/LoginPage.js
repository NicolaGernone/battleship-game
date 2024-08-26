import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/api';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(username, password);
      // Save user data (e.g., token) to local storage or context if needed
      localStorage.setItem('user', JSON.stringify(userData));
      history.push('/profile');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
    </div>
  );
}

export default LoginPage;
