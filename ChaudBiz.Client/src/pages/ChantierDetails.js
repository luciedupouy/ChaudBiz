import React, { useState, useEffect } from 'react'; 
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';
import '../styles/AccueilO.css';
import { useParams, useHistory } from 'react-router-dom'; 
import LeafletMap from '../components/Map';
import "../styles/detailchantier.css"

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
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5257/api/chantier/${chantierId}`)
      .then(response => response.json())
      .then(data => setChantier(data))
      .catch(error => console.error('Error fetching chantier details:', error));
  }, [chantierId]);

  const handleDeleteChantier = () => {
    fetch(`http://localhost:5257/api/chantier/${chantierId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete chantier');
      }
      // Rediriger l'utilisateur vers la page d'accueil après la suppression
      history.push('/accueila');
    })
    .catch(error => console.error('Error deleting chantier:', error));
  };

  if (!chantier) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <Header titre="Détails Chantier" />
      <div className="detailchantier">
        <h2>{getTypeLabel(chantier.type)}</h2>
        <p>Client : {chantier.client}</p>
        <p>Description : {chantier.description}</p>
        <p>Date de début : {chantier.dateDebut}</p>
        <p>Adresse : {chantier.adresse}</p>
        <LeafletMap address={chantier.adresse} />
        <button onClick={handleDeleteChantier}>Supprimer</button>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default ChantierDetails;
