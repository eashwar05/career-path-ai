import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';  // Import LogoutButton here and use it

const navStyle: React.CSSProperties = {
  padding: '1em',
  borderBottom: '1px solid #ccc',
  background: '#f7f7f7',
};

const linkStyle: React.CSSProperties = {
  marginRight: '1em',
  textDecoration: 'none',
  color: '#1976d2',
};

const Navbar: React.FC = () => (
  <nav style={navStyle}>
    <Link to="/" style={linkStyle}>Landing</Link>
    <Link to="/login" style={linkStyle}>Login</Link>
    <Link to="/signup" style={linkStyle}>Sign Up</Link>
    <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
    <Link to="/resume-analyzer" style={linkStyle}>Resume Analyzer</Link>
    <Link to="/career-recommendations" style={linkStyle}>Career Recommendations</Link>
    <Link to="/skill-tracker" style={linkStyle}>Skill Tracker</Link>
    <Link to="/resource-hub" style={linkStyle}>Resource Hub</Link>
    <Link to="/mentorship" style={linkStyle}>Mentorship</Link>
    <LogoutButton /> {/* Include logout button in navbar */}
  </nav>
);

export default Navbar;

