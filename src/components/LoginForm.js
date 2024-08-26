import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/auth/register' : '/auth/login';
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + endpoint, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error("Error during login/register", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-3">
              <p
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
