import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/ChantierBox.css';

const ChantierBox = ({ chantier }) => {
  if (!chantier) {
    return <div>No data available</div>;
  }

  const { NomChantier, Description, DateDebut, Adresse, ChantierId } = chantier;

  return (
    <div className='boxchantier'>
      <h3>{NomChantier}</h3>
      <p>Description: {Description}</p>
      <p>Date de début: {DateDebut}</p>
      <p>Adresse: {Adresse}</p>
      <Link to={`/chantier/${ChantierId}`}>
        <button>Voir les détails</button>
      </Link>
    </div>
  );
};

export default ChantierBox;
