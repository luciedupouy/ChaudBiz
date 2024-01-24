import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [mdp, setMdp] = useState('');
  const [role, setRole] = useState('');

  const roles = ['ADMINISTRATEUR', 'OUVRIER'];

  const handleInscription = () => {
    // Construction de l'objet utilisateur à envoyer
    const utilisateur = {
      NomUtilisateur: nom,
      PrenomUtilisateur: prenom,
      MailUtilisateur: mail,
      Mdp: mdp,
      Role: role,
    };
  
    // Envoi de la requête au back-end
    fetch('http://localhost:3000/api/utilisateur/inscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(utilisateur),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse du serveur:', data);
        // Gérer la réponse du serveur ici
      })
      .catch(error => {
        console.error('Erreur lors de la requête:', error);
        // Gérer les erreurs ici
      });
  };
  

  return (
    <div className="login">
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Sélectionnez un rôle</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleInscription}>
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Inscription;
