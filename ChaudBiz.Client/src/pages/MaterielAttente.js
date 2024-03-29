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
                body: JSON.stringify({ materielId: id, etat: 0 }) 
            });
            if (response.ok) {
                setShowPopup(true); // Afficher le pop-up après avoir envoyé la requête avec succès
                setMateriels(prevMateriels => 
                    prevMateriels.map(materiel => {
                        if (materiel.materielId === id) {
                            return { ...materiel, etat: 0 }; // Mettre à jour l'état du matériel
                        }
                        return materiel;
                    })
                );
            } else {
                console.error('Failed to update matériel status');
            }
        } catch (error) {
            console.error('Error updating matériel status', error);
        }
    };
    
    

    return (
        <div className='materielcommande'>
            <Navordi></Navordi>
            <h1>Matériels à commander</h1>
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
                    <p>Votre commande est passée ! </p>
                    <button onClick={() => setShowPopup(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterielAttente;
