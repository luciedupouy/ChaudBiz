// BottomNavbar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/NavBar.css'; // Importez le fichier CSS ici

const BottomNavbar = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? 'active' : '';
  };

  return (
    <div className="navbar">
      <Link to="/accueil" className={`navbar-link ${isActive('/accueil')}`}>
        <FontAwesomeIcon icon={faHome} size="2x" />
        <div>Accueil</div>
      </Link>
      <Link to="/planning" className={`navbar-link ${isActive('/planning')}`}>
        <FontAwesomeIcon icon={faCalendar} size="2x" />
        <div>Planning</div>
      </Link>
      <Link to="/message" className={`navbar-link ${isActive('/message')}`}>
        <FontAwesomeIcon icon={faEnvelope} size="2x" />
        <div>Message</div>
      </Link>
    </div>
  );
};

export default BottomNavbar;
