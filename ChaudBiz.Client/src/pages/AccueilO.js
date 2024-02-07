import React from 'react';
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';

import ChantierBox from '../components/ChantierBox';
import '../styles/AccueilO.css';


const AccueilO = () => {
  // Supposons que vous ayez une liste de chantiers
  const chantiers = [
    { ChantierId: 1, NomChantier: 'Chantier A', Description: 'Description du chantier A', DateDebut: '2024-02-01', Adresse: '109 avenue Roul, 33400 TALENCE' },
    { ChantierId: 2, NomChantier: 'Chantier B', Description: 'Description du chantier B', DateDebut: '2024-03-01', Adresse: '109 avenue Roul, 33400 TALENCE' },
    { ChantierId: 3, NomChantier: 'Chantier C', Description: 'Description du chantier C', DateDebut: '2024-02-01', Adresse: '109 avenue Roul, 33400 TALENCE'},
    { ChantierId: 3, NomChantier: 'Chantier C', Description: 'Description du chantier C', DateDebut: '2024-02-01', Adresse: '109 avenue Roul, 33400 TALENCE'},

    // Ajoutez d'autres chantiers à votre liste
  ];

  return (
    <div>
      <Header titre="Accueil" />
      <div className='AccueilO'>

      <h3>Mon programme du jour</h3>

      {/* Condition pour afficher les chantiers */}
      {chantiers.length > 0 ? (
        <div className="chantiers">
          {chantiers.map(chantier => (
            <ChantierBox key={chantier.ChantierId} chantier={chantier} />
          ))}
        </div>
      ) : (
        <p>Aucun chantier programmé pour aujourd'hui.</p>
      )}

      {/* Ajoutez la barre de navigation en bas de la page */}
      </div>
      <BottomNavbar />
    </div>
  );
};

export default AccueilO;
