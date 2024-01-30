// AccueilO.js
import React from 'react';
import BottomNavbar from '../components/Navbar';
import ChantierBox from '../components/ChantierBox';

const AccueilO = () => {
  // Supposons que vous ayez une liste de chantiers
  const chantiers = [
    { ChantierId: 1, NomChantier: 'Chantier A', Description: 'Description du chantier A', DateDebut: '2024-02-01', DateFin: '2024-02-15' },
    { ChantierId: 2, NomChantier: 'Chantier B', Description: 'Description du chantier B', DateDebut: '2024-03-01', DateFin: '2024-03-15' },
    // Ajoutez d'autres chantiers à votre liste
  ];

  return (
    <div>
      <h1>Accueil</h1>
      <h3>Mon programme du jour</h3>

      {/* Affichez chaque boîte bleue pour chaque chantier */}
      {chantiers.map(chantier => (
        <ChantierBox key={chantier.ChantierId} chantier={chantier} />
      ))}

      {/* Ajoutez la barre de navigation en bas de la page */}
      <BottomNavbar />
    </div>
  );
};

export default AccueilO;
