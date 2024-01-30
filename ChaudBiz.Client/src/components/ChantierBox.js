// ChantierBox.js
import React from 'react';

const ChantierBox = ({ chantier }) => {
  // Vous pouvez personnaliser l'affichage des informations du chantier ici
  return (
    <div style={{ backgroundColor: 'blue', padding: '10px', margin: '10px', color: 'white' }}>
      <h3>{chantier.NomChantier}</h3>
      <p>Description: {chantier.Description}</p>
      <p>Date de début: {chantier.DateDebut}</p>
      <p>Date de fin: {chantier.DateFin}</p>
      {/* Ajoutez d'autres informations du chantier selon vos besoins */}
    </div>
  );
};

export default ChantierBox;