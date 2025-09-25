import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setCredentials } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      // result should be { user, token }
      const { token, user } = result;
      // store token locally (for learning)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // set default header for future axios requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // update redux store credentials
      dispatch(setCredentials({ user, token }));
      setLoading(false);
      navigate('/home');
    } catch (err) {
      setLoading(false);
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>

        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      </form>
    </div>
  );
}
