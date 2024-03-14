import React, { useState, useEffect } from 'react';
import Navordi from '../components/Navordi';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Rdv = () => {
    const [lieu, setLieu] = useState('');
    const [description, setDescription] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [clientId, setClientId] = useState('');
    const [utilisateurId, setUtilisateurId] = useState('');
    const [clientsList, setClientsList] = useState([]);
    const [utilisateursList, setUtilisateursList] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:5257/api/client');
                if (response && response.data) {
                    setClientsList(response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des clients:', error);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            try {
                const response = await axios.get('http://localhost:5257/api/utilisateur');
                if (response && response.data) {
                    setUtilisateursList(response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };

        fetchUtilisateurs();
    }, []);

    const handleDateDebutChange = (event) => {
        setDateDebut(event.target.value);
    };

    const ajoutRdv = async () => {
        try {
            const response = await axios.post('http://localhost:5257/api/rdv/', {
                Lieu: lieu,
                Description: description,
                DateRdv: dateDebut,
                UtilisateurId: utilisateurId,
                ClientId: clientId
            });

            if (response && response.data) {
                console.log('Réponse du serveur:', response.data);
            } else {
                console.error('Réponse du serveur non valide:', response);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='login'>
            <Navordi />
            <h1>Ajout d'un rendez-vous</h1>
            <form>
                <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                    <option value="">Sélectionnez le client</option>
                    {clientsList.map((client) => (
                        <option key={client.clientId} value={client.clientId}>
                            {client.nomClient}
                        </option>
                    ))}
                </select>
                <p>
                    <Link to="/client">Ajouter un client</Link>
                </p>
                <select value={utilisateurId} onChange={(e) => setUtilisateurId(e.target.value)}>
                    <option value="">Sélectionnez l'utilisateur</option>
                    {utilisateursList.map((utilisateur) => (
                        <option key={utilisateur.utilisateurId} value={utilisateur.utilisateurId}>
                            {utilisateur.nomUtilisateur}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Entrez l'adresse"
                    value={lieu}
                    onChange={(e) => setLieu(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="date-selector">
                    <label htmlFor="dateDebut">Date et heure de début :</label>
                    <input
                        type="datetime-local"
                        id="dateDebut"
                        name="dateDebut"
                        value={dateDebut}
                        onChange={handleDateDebutChange}
                    />
                </div>
                <Link to="/planninga">
                    <button type="button" onClick={ajoutRdv}>
                        Ajouter
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default Rdv;
