import React, { useState, useEffect } from 'react'; 
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';
import '../styles/AccueilO.css';
import { useParams } from 'react-router-dom'; 

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

const ChantierDetails = () => {
  const [chantier, setChantier] = useState(null); 
  const { chantierId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5257/api/chantier/${chantierId}`)
      .then(response => response.json())
      .then(data => setChantier(data))
      .catch(error => console.error('Error fetching chantier details:', error));
  }, [chantierId]);

  if (!chantier) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <Header titre="Détails Chantier" />
      <div>
        <h2>{getTypeLabel(chantier.type)}</h2>
        <p>Client : {chantier.client}</p>
        <p>Description : {chantier.description}</p>
        <p>Date de début : {chantier.dateDebut}</p>
        <p>Adresse : {chantier.adresse}</p>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default ChantierDetails;
