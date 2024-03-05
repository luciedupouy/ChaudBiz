import React, { useState, useEffect } from 'react';
import '../styles/TodoMateriel.css'
import Navordi from '../components/Navordi';

const MaterielAttente = () => {
    const [materiels, setMateriels] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // État pour afficher ou masquer le pop-up

    useEffect(() => {
        fetch('http://localhost:5257/api/materiel/by-etat/1')
            .then(response => response.json())
            .then(data => setMateriels(data))
            .catch(error => console.error('Error fetching matériel details', error));
    }, []);

    const commanderMateriel = async (id) => {
        try {
            const response = await fetch(`http://localhost:5257/api/materiel/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ etat: 0 }) // Envoyer l'état mis à jour
            });
            if (response.ok) {
                setShowPopup(true); // Afficher le pop-up après avoir envoyé la requête avec succès
                // Mettre à jour l'état du matériel localement
                const updatedMateriels = materiels.map(materiel => {
                    if (materiel.materielId === id) {
                        return { ...materiel, etat: 0 }; // Mettre à jour l'état du matériel
                    }
                    return materiel;
                });
                setMateriels(updatedMateriels);
            } else {
                console.error('Failed to update matériel status');
            }
        } catch (error) {
            console.error('Error updating matériel status', error);
        }
    };
    

    return (
        <div >
            <Navordi></Navordi>
            <div className='materiel'>
                {materiels.map((materiel, index) => (
                    <div key={index} className="outil">
                        <span>{materiel.label}</span>
                        <button onClick={() => commanderMateriel(materiel.materielId)}>Commander</button>
                    </div>
                ))}
            </div>

            {/* Pop-up */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                    <p>Votre demande a été envoyée ! </p>
                    <button onClick={() => setShowPopup(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterielAttente;
