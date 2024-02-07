// Header.js
import React from 'react';
import '../styles/Header.css';

const Header = ({ titre }) => {
  return (
    <div className="header">
      <h1>{titre}</h1>
    </div>
  );
};

export default Header;
