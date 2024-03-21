import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChantierBox.css';

const getTypeLabel = (typeNum) => {
  switch (typeNum) {
    case 0:
      return "Climatisation";
    case 1:
      return "Pompe à chaleur";
    case 2:
      return "Chaudière";
    default:
      return "Unknown Type";
  }
};

const ChantierBox = ({ chantierId }) => {
  const [chantier, setChantier] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5257/api/chantier/${chantierId}`)
      .then(response => response.json())
      .then(data => {
        setChantier(data);
        // Récupérer les détails du client en utilisant son ID
        fetch(`http://localhost:5257/api/client/${data.client}`)
          .then(response => response.json())
          .then(clientData => setClient(clientData))
          .catch(error => console.error('Error fetching client details:', error));
      })
      .catch(error => console.error('Error fetching chantier details:', error));
  }, [chantierId]);

  if (!chantier || !client) {
    return <div>No data available</div>;
  }

  return (
    <div className='boxchantier'>
      <h3>{getTypeLabel(chantier.type)}</h3>
      <p>Client: {client.nomClient}</p>
      <p>Date de début: {chantier.dateDebut}</p>
      <p>Adresse: {chantier.adresse}</p>
      <Link to={`/chantier/${chantier.chantierId}`}>
        <button>Voir les détails</button>
      </Link>
    </div>
  );
};

export default ChantierBox;
