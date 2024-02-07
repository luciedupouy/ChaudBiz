// ChantierBox.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link depuis React Router
import '../styles/ChantierBox.css';

const ChantierBox = ({ chantier }) => {
  return (
    <div className='boxchantier'>
      <h3>{chantier.NomChantier}</h3>
      <p>Description: {chantier.Description}</p>
      <p>Date de début: {chantier.DateDebut}</p>
      <p>Adresse: {chantier.Adresse}</p>
      {/* Ajouter un bouton "Voir les détails" qui redirige vers la page de détails du chantier */}
      <Link to={`/chantier/${chantier.ChantierId}`}>
        <button>Voir les détails</button>
      </Link>
    </div>
  );
};

export default ChantierBox;
