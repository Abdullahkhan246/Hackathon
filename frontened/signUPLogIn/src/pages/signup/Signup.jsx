
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './signup.css';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // dispatch and unwrap to catch errors easily
      await dispatch(signupUser(formData)).unwrap();
      setLoading(false);
      // signup success -> redirect to login
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label htmlFor="fullname">Full Name</label>
        <input name="fullname" id="fullname" value={formData.fullname} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
        <p>If you have account go to the <Link to={"/login"}>log in</Link> page</p>

        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      </form>
    </div>
  );
}
