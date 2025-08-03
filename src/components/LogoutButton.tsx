import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');      // Remove JWT/token
    dispatch(logout());                     // Clear auth state
    navigate('/login');                     // Redirect to login page
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
