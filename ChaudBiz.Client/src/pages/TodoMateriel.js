import React, { useState, useEffect } from 'react';
import BottomNavbar from '../components/Navbar';
import Header from '../components/Header';
import '../styles/TodoMateriel.css'

const TodoMateriel = () => {
    const [materiels, setMateriels] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // État pour afficher ou masquer le pop-up

    useEffect(() => {
        // Vérifie s'il y a des données stockées dans localStorage
        const storedMateriels = localStorage.getItem('materiels');
        if (storedMateriels) {
            setMateriels(JSON.parse(storedMateriels));
        } else {
            fetch('http://localhost:5257/api/materiel/post')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch materiels');
                    }
                    return response.json();
                })
                .then(data => {
                    // Une fois les données récupérées, vous pouvez les définir dans l'état
                    setMateriels(data);
                })
                .catch(error => {
                    console.error('Error fetching materiels:', error);
                });
        }
    }, []); // Assurez-vous de passer un tableau vide en tant que dépendances pour n'exécuter cet effet qu'une seule fois après le montage initial

    const handleAddClick = (materielId) => {
        // Logique pour ajouter le matériel avec l'identifiant materielId
        console.log('Materiel ajouté avec l\'identifiant:', materielId);
        const updatedMateriels = materiels.map(materiel => {
            if (materiel.materielId === materielId) {
                return {
                    ...materiel,
                    etat: 1 // Mettre à jour l'état à 1 pour le matériau ajouté
                };
            }
            return materiel;
        });
        setMateriels(updatedMateriels);
        setShowPopup(true); // Afficher le pop-up
        // Stocke les données mises à jour dans localStorage
        localStorage.setItem('materiels', JSON.stringify(updatedMateriels));
    };

    return (
        <div >
            <Header titre="Liste Matériels" />
            <div className='materiel'>
                {materiels.map((materiel, index) => (
                    <div key={index} className="outil">
                        <span>{materiel.label}</span>
                        <button onClick={() => handleAddClick(materiel.materielId)}>Ajouter</button>
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
