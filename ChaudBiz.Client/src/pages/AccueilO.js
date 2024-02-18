import React, { useState, useEffect } from 'react';
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';
import ChantierBox from '../components/ChantierBox';
import '../styles/AccueilO.css';

const AccueilO = () => {
  const [chantierIds, setChantierIds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5257/api/chantier')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch chantiers');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        const ids = data.map(chantier => chantier.chantierId);
        console.log('Chantier IDs:', ids);
        setChantierIds(ids);
      })
      .catch(error => console.error('Error fetching chantiers:', error));
  }, []);

  return (
    <div>
      <Header titre="Accueil" />
      <div className="ouvr">
        <h3>Mon programme du jour</h3>
        {chantierIds.length > 0 ? (
          <div className="chantiers">
            {chantierIds.map(id => (
              <ChantierBox key={id} chantierId={id} />
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
