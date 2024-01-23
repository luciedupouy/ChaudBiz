// src/pages/Inscription.js
import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg'


const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [mdp, setMdp] = useState('');

  const handleInscription = () => {
    // Logique d'inscription ici
    console.log('Nom:', nom);
    console.log('Prénom:', prenom);
    console.log('Mail:', mail);
    console.log('Mot de passe:', mdp);
  };

  return (
    <div class="login">
      <h1>Inscription</h1>
      <form>
        <input
          type="text"
          placeholder='Entrez votre nom'
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />


        <input
          type="text"
          placeholder='Entrez votre prénom'
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />


        <input
          type="email"
          placeholder='Entrez votre adresse e-mail'
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <input
          type="password"
          placeholder='Entrez votre mot de passe'
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />

        <button type="button" onClick={handleInscription}>
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Inscription;
