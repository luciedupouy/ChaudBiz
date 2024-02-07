import React from 'react';
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';

import ChantierBox from '../components/ChantierBox';
import '../styles/AccueilO.css';


const ChantierDetails = () => {
  // Supposons que vous ayez une liste de chantiers
  const chantiers = [
    { ChantierId: 1, NomChantier: 'Chantier A', Description: 'Description du chantier A', DateDebut: '2024-02-01', Adresse: '109 avenue Roul, 33400 TALENCE' },

    // Ajoutez d'autres chantiers à votre liste
  ];

  return (
    <div>
      <Header titre="Détails Chantier" />
      <BottomNavbar />
    </div>
  );
};

export default ChantierDetails;
