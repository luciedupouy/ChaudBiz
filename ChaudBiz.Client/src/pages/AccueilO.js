import React, { useState, useEffect } from 'react';
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';
import ChantierBox from '../components/ChantierBox';
import '../styles/AccueilO.css';

const AccueilO = () => {
  const [chantiers, setChantiers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5257/api/chantier')
      .then(response => response.json())
      .then(data => setChantiers(data))
      .catch(error => console.error('Error fetching chantiers:', error));
  }, []);

  return (
    <div>
      <Header titre="Accueil" />
      <div className="ouvr">
        <h3>Mon programme du jour</h3>
        {chantiers.length > 0 ? (
          <div className="chantiers">
            {chantiers.map(chantier => (
             <div key={chantier.ChantierId}>{chantier.ChantierId}</div>
))}
          </div>
        ) : (
          <p>Aucun chantier programmé pour aujourd'hui.</p>
        )}
      </div>
      <BottomNavbar />
    </div>
  );
};

export default AccueilO;
