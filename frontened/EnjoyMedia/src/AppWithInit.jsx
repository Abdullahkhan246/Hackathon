import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';
import api from './api/axios';
import Routing from './routes/Routing';

export default function AppWithInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    console.log('AppWithInit user:', user);
    console.log('AppWithInit token:', token);

    if (user && token) {
      dispatch(setCredentials({ user, token }));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [dispatch]);

  return <Routing />;
}
