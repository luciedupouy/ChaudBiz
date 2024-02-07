import React, { useState } from 'react';
import '../styles/Login.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [mdp, setMdp] = useState('');
  const [role, setRole] = useState('');

  const roles = ['ADMINISTRATEUR', 'OUVRIER'];
  const [inscriptionReussie, setInscriptionReussie] = useState(false);


  const handleInscription = async () => {
    try {
      const response = await axios.post('http://localhost:5257/api/utilisateur/inscription', {
        NomUtilisateur: nom,
        PrenomUtilisateur: prenom,
        MailUtilisateur: mail,
        Mdp: mdp,
        Role: role,
      });
  
      if (response && response.data) {
        console.log('Réponse du serveur:', response.data);
        // Gérer la réponse du serveur ici (redirection, affichage d'un message, etc.)
        setInscriptionReussie(true);
      } else {
        console.error('Réponse du serveur non valide:', response);
        // Gérer les erreurs ici (affichage d'un message d'erreur, etc.)
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error.response ? error.response.data : error.message);
      // Gérer les erreurs ici (affichage d'un message d'erreur, etc.)
    }
  };
  if (inscriptionReussie) {
    return <Redirect to="/connexion" />;
  }

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
