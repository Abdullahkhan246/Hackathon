import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';
import api from './api/axios';
import Routing from './routes/Routing';

function AppWithInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(setCredentials({ user, token }));
    }
  }, [dispatch]);

  return (
    <Routing />  
  );
}

export default AppWithInit;
