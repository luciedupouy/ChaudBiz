// src/pages/Login.js
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../logo.jpg';
import axios from 'axios';

// ... importations et autres parties de votre code

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5257/api/utilisateur/login', {
        MailUtilisateur: email,
        Mdp: password,
      });

      // Vérifiez le rôle dans la réponse
      const userRole = response.data?.Role;
      console.log('Role récupéré:', userRole);

      if (userRole === 'ADMINISTRATEUR') {
        setRole('ADMINISTRATEUR');
      } else if (userRole === 'OUVRIER') {
        setRole('OUVRIER');
      }

      // Marquez l'utilisateur comme connecté
      setLoggedIn(true);
    } catch (error) {
      console.error('Erreur de connexion:', error.response ? error.response.data : error.message);
    }
  };

  console.log('loggedIn:', loggedIn);
  console.log('role:', role);

  // Redirigez l'utilisateur en fonction de son rôle
  if (loggedIn) {
    console.log('Rediriger vers la page correspondante');
    if (role === 'ADMINISTRATEUR') {
      return <Redirect to="/accueila" />;
    } else if (role === 'OUVRIER') {
      return <Redirect to="/accueil" />;
    }
  }  


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
