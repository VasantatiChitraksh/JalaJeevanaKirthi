import React from 'react';
import './style.css';
import logo from '../assets/logo.JPG';

function Layout() {
  return (
    <div>
      <div className="topbar">
        <img className="logo-icon" src={logo} alt="Logo" />
        <h2 className="logo">Jala Jeevana Keertha</h2>
        <button className="topbar-button">Game</button>
        <button className="topbar-button">About Us</button>
        <button className="topbar-button">Blogs</button>
        <button className="topbar-button">RolePlay</button>
        <button className="topbar-button">Login</button>
      </div>
    </div>
  );
}

export default Layout;
