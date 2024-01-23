// src/pages/Login.js
import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg'

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('id:', id);
    console.log('Password:', password);
  };

  return (
    <div class="login">
      <img class="logo" src={logo} alt='logo'></img>
      <h1>Connexion</h1>
      <form>
        <input
          type="id"
          placeholder='Identifiant'
          value={id}
          onChange={(e) => setId(e.target.value)}
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
      <Link class="Link" to="/inscription">S'inscrire</Link>
    </div>
  );
};

export default Login;
