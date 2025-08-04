import React from 'react';
import Navbar from './Navbar';

const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: '2em',
  maxWidth: '1000px',
  margin: '0 auto',
};

const footerStyle: React.CSSProperties = {
  padding: '1em',
  borderTop: '1px solid #ccc',
  textAlign: 'center',
  background: '#f7f7f7',
  color: '#555',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={layoutStyle}>
    <Navbar />
    <main style={mainStyle}>{children}</main>
    <footer style={footerStyle}>
      &copy; {new Date().getFullYear()} AI Career Path Advisor. All rights reserved.
    </footer>
  </div>
);

export default Layout;
