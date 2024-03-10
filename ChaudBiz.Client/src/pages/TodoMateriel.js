import React, { useState, useEffect } from 'react';
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';
import '../styles/TodoMateriel.css'

const TodoMateriel = () => {
    const [materiels, setMateriels] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // État pour afficher ou masquer le pop-up

    useEffect(() => {
        const storedMateriels = localStorage.getItem('materiels');
        if (storedMateriels) {
            setMateriels(JSON.parse(storedMateriels));
        } else {
            fetch('http://localhost:5257/api/materiel/')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch materiels');
                    }
                    return response.json();
                })
                .then(data => {
                    setMateriels(data);
                })
                .catch(error => {
                    console.error('Error fetching materiels:', error);
                });
        }
    }, []); // Assurez-vous de passer un tableau vide en tant que dépendances pour n'exécuter cet effet qu'une seule fois après le montage initial

    const commanderMateriel = async (id) => {
        try {
            const response = await fetch(`http://localhost:5257/api/materiel/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ materielId: id, etat: 1 }) // Envoyer l'état mis à jour
            });
            if (response.ok) {
                setShowPopup(true); // Afficher le pop-up après avoir envoyé la requête avec succès
                // Mettre à jour l'état du matériel localement
                setMateriels(prevMateriels => 
                    prevMateriels.map(materiel => {
                        if (materiel.materielId === id) {
                            return { ...materiel, etat: 1 }; // Mettre à jour l'état du matériel
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
        <div >
            <Header titre="Liste Matériels" />
            <div className='materiel'>
                {materiels.map((materiel, index) => (
                    <div key={index} className="outil">
                        <span>{materiel.label}</span>
                        <button onClick={() => commanderMateriel(materiel.materielId)}>Ajouter</button>
                    </div>
                ))}
            </div>
            <BottomNavbar />

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

export default TodoMateriel;
