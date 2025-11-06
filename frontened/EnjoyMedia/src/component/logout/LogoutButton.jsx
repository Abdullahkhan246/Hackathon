import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import api from '../../api/axios';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear redux + storage
    dispatch(logout());
    // clear axios header if set
    try { delete api.defaults.headers.common['Authorization']; } catch (_) {}
    // go to signup page
    navigate('/', { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: 'fixed',
        left: '16px',
        bottom: '16px',
        zIndex: 1000,
        padding: '10px 14px',
        borderRadius: '8px',
        border: 'none',
        background: '#e53935',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}
    >
      Logout
    </button>
  );
}


