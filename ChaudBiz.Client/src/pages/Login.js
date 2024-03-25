import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../logo.jpg';
import axios from 'axios';
import  '../styles/Global.css'; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5257/api/utilisateur/login', {
        MailUtilisateur: email,
        Mdp: password,
      });
      console.log(response);
      const userRole = response.data?.role;

      if (userRole === 'ADMINISTRATEUR') {
        setRole('ADMINISTRATEUR');
      } else if (userRole === 'OUVRIER') {
        setRole('OUVRIER');
      }

      setLoggedIn(true);
    } catch (error) {
      console.error('Erreur de connexion:', error.response ? error.response.data : error.message);
      setError('Identifiant ou mot de passe incorrect.');
    }
  };

  if (loggedIn) {
    if (role === 'ADMINISTRATEUR') {
      return <Redirect to="/accueila" />;
    } else if (role === 'OUVRIER') {
      return <Redirect to="/accueilo" />;
    }
  }

  return (
    <div className="login">
      <img className="logo" src={logo} alt="logo" />
      <h1>Connexion</h1>
      <form>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={handleLogin}>
          Connexion
        </button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
      <Link className="Link" to="/inscription">
        S'inscrire
      </Link>
    </div>
  );
};

export default Login;
