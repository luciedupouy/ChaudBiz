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
      const response = await axios.post('http://localhost:5257/api/utilisateur/login', {
        MailUtilisateur: email,
        Mdp: password,
      });
  
      console.log('Connexion réussie:', response.data);
    } catch (error) {
      if (error.response) {
        // La requête a été effectuée et le serveur a répondu avec un statut d'erreur
        console.error('Erreur de connexion:', error.response.data);
      } else if (error.request) {
        // La requête a été effectuée, mais aucune réponse n'a été reçue
        console.error('Pas de réponse reçue:', error.request);
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.error('Erreur lors de la configuration de la requête:', error.message);
      }
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
