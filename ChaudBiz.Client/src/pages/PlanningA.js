import React, { useState, useEffect } from 'react';
import ChantierBox from '../components/ChantierBox';
import '../styles/AccueilO.css';
import Navordi from '../components/Navordi';
import "../styles/Navordi.css";


const PlanningA = () => {
    const today = new Date();
    const initialDate = today.toISOString().slice(0, 10); // Date sélectionnée par défaut est la date actuelle au format "YYYY-MM-DD"
    const [selectedDate, setSelectedDate] = useState(initialDate); 
    const [chantiers, setChantiers] = useState([]);
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };
  
    useEffect(() => {
      fetch(`http://localhost:5257/api/chantier/by-date/${selectedDate}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch chantiers');
          }
          return response.json();
        })
        .then(data => {
          setChantiers(data);
        })
        .catch(error => console.error('Error fetching chantiers:', error));
    }, [selectedDate]);
  
    return (
      <div className='scroll'>
        <Navordi></Navordi>
        <div className="date-selector-planning">
          <label htmlFor="date">Sélectionnez une date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="ouvr">
          <h3>Chantiers prévus pour le {selectedDate}</h3>
          {chantiers.length > 0 ? (
            <div className="chantiers">
              {chantiers.map(chantier => (
                <ChantierBox key={chantier.chantierId} chantierId={chantier.chantierId} />
              ))}
            </div>
          ) : (
            <p>Aucun chantier prévu pour cette date.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default PlanningA;
