// Header.js
import React from 'react';
import '../styles/Header.css';
import logo from '../logo.jpg';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navordi.css'


const Navordi = () => {
    const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? 'active' : '';
  };
  return (
    <div className='headerordi'>
            <img className="logo" src={logo} alt="logo"/>
            <Link to="/accueila" className={`link ${isActive('/accueila')}`}>
            <div>Accueil</div>
            </Link>
            <Link to="/chantier" className={`link ${isActive('/chantier')}`}>
            <div>Chantier</div>
            </Link>
            <Link to="/materiel" className={`link ${isActive('/materiel')}`}>
            <div>Matériel</div>
            </Link>
            <Link to="/edt" className={`link ${isActive('/edt')}`}>
            <div>Emploi du temps</div>
            </Link>
            <Link to="/doc" className={`link ${isActive('/doc')}`}>
            <div>Document</div>
            </Link>
        </div>
    
  );
};

export default Navordi;
