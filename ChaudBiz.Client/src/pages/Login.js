// src/pages/Login.js
import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/utilisateur/login', {
        MailUtilisateur: email,
        Mdp: password,
      });

      // Si la connexion réussit, vous pouvez gérer la suite ici
      console.log('Connexion réussie:', response.data);
    } catch (error) {
      // Gérer les erreurs de connexion ici
      console.error('Erreur de connexion:', error.response.data);
    }
  };

  return (
    <div className="login">
      <img className="logo" src={logo} alt='logo'></img>
      <h1>Connexion</h1>
      <form>
        <input
          type="email"  // Utilisez 'email' pour le type d'e-mail
          placeholder='Adresse e-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Connexion
        </button>
      </form>
      <Link className="Link" to="/inscription">S'inscrire</Link>
    </div>
  );
};

export default Login;
