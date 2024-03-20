import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChantierBox.css';

const RdvBox = ({ rdvId }) => {
  const [rdv, setRdv] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5257/api/rdv/${rdvId}`)
      .then(response => response.json())
      .then(data => setRdv(data))
      .catch(error => console.error('Error fetching rendez-vous details:', error));
  }, [rdvId]);

  if (!rdv) {
    return <div>No data available</div>;
  }

  return (
    <div className='boxrdv'>
      <h3>Rendez-vous</h3>
      <p>Date: {rdv.dateRdv}</p>
      <p>Description: {rdv.description}</p>
      <p>Lieu: {rdv.lieu}</p>
      <p>Client: {rdv.client}</p>
      <Link to={`/rdv/${rdv.id}`}>
        <button>Voir les détails</button>
      </Link>
    </div>
  );
};

export default RdvBox;
