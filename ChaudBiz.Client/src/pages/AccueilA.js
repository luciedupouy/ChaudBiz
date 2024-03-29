import React, { useState, useEffect } from 'react'; 
import Navordi from '../components/Navordi';
import '../styles/AccueilA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faCalendarAlt, faTools, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AccueilA = () => {
    const [materielEnAttente, setMaterielEnAttente] = useState(0);
    const [rendezVousDuJour, setRdvDuJour] = useState(0);
    const [chantiersEnAttente, setChantiersEnAttente] = useState(0);
    const [rdvs, setRdv] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5257/api/chantier/upcoming')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch chantiers en attente');
                }
                return response.json();
            })
            .then(data => {
                setChantiersEnAttente(data.length); 
            })
            .catch(error => {
                console.error('Error fetching chantiers en attente:', error);
            });
    }, []); 

    useEffect(() => {
        fetch('http://localhost:5257/api/materiel/by-etat/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch matériels en attente');
                }
                return response.json();
            })
            .then(data => {
                setMaterielEnAttente(data.length); 
            })
            .catch(error => {
                console.error('Error fetching matériels en attente:', error);
            });
    }, []); 

    useEffect(() => {
        fetch('http://localhost:5257/api/rdv/by-date')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch rdv du jour');
                }
                return response.json();
            })
            .then(data => {
                setRdvDuJour(data.length); 
                setRdv(data);
            })
            .catch(error => {
                console.error('Error fetching rdv du jour:', error);
            });
    }, []); 

    const handleDeleteRdv = (id) => {
        fetch(`http://localhost:5257/api/rdv/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete rendez-vous');
            }
            setRdv(rdvs.filter(rdv => rdv.id !== id));
            window.location.reload();
        })
        .catch(error => console.error('Error deleting rendez-vous:', error));
    };

    return (
        <div className="accueila">
            <Navordi />
            <div className="indicateurs">
                {/* Indicateur pour les chantiers en attente */}
                <div className="indicateur">
                    <span className="label">Chantiers en attente</span>
                    <FontAwesomeIcon icon={faToolbox} className="icone" size='6x'/>
                    <span className="nombre">{chantiersEnAttente}</span>
                </div>
                {/* Indicateur pour le matériel en attente */}
                <div className="indicateur">
                    <span className="label">Matériel en attente</span>
                    <FontAwesomeIcon icon={faTools} className="icone" size='6x' />
                    <span className="nombre">{materielEnAttente}</span>
                </div>
                {/* Indicateur pour le nombre de rendez-vous du jour */}
                <div className="indicateur">
                    <span className="label">Rendez-vous du jour</span>
                    <FontAwesomeIcon icon={faCalendarAlt} className="icone" size='6x'/>                   
                    <span className="nombre">{rendezVousDuJour}</span>
                </div>
            </div>
            <div className='rendez_vous'>
                <h1>Mes rendez-vous</h1>
                <Link to="/rdv" className="bouton">Ajouter un rendez-vous </Link>
                {rendezVousDuJour > 0 ? (
                    <div>
                        {rdvs.map((rdv, index) => (
                            <div key={index} className="rdv">
                                <div>Date : {rdv.dateRdv}</div>
                                <div>Description : {rdv.description}</div>
                                <div>Lieu : {rdv.lieu}</div>
                                {rdv.client ? <div>Client : {rdv.client.nomClient}</div> : <div>Client : N/A</div>}
                                <button onClick={() => handleDeleteRdv(rdv.rdvId)}><FontAwesomeIcon icon={faTrash} /> Supprimer</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucun rendez-vous aujourd'hui</p>
                )}
            </div>
        </div>
    );
}

export default AccueilA;
