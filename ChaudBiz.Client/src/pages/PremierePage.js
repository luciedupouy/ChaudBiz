import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg'; 
import '../styles/OpeningPage.css'; 

const OpeningPage = () => {
  return (
    <div className="opening-page">
      <img className="logo" src={logo} alt="ChaudBiz Logo" />
      <h1>ChaudBiz</h1>
      <Link to="/connexion" className="enter-app-link">
        Entrer dans l'application
      </Link>
    </div>
  );
};

export default OpeningPage;
