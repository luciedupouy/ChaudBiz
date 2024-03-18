import React, { useState, useEffect } from 'react';
import Navordi from '../components/Navordi';
import axios from 'axios';
import '../styles/Login.css';
import '../styles/Global.css';
import { Link } from 'react-router-dom';

const Chantier = () => {
    const [type, setType] = useState(0);
    const [description, setDescription] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [adresse, setAdresse] = useState('');
    const [client, setClient] = useState('');
    const [clientsList, setClientsList] = useState([]);
    const [ajoutOk, setAjout] = useState(false);

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

    const types = ['CLIMATISATION', 'POMPE', 'CHAUDIERE'];

    const getTypeValue = (type) => {
        switch (type) {
            case 'CLIMATISATION':
                return 0;
            case 'POMPE':
                return 1;
            case 'CHAUDIERE':
                return 2;
            default:
                return -1; // Valeur par défaut ou valeur incorrecte
        }
    };

    const handleDateDebutChange = (event) => {
        setDateDebut(event.target.value);
    };

    const handleDateFinChange = (event) => {
        setDateFin(event.target.value);
    };

    const ajoutChantier = async () => {
        try {
            const response = await axios.post('http://localhost:5257/api/chantier/', {
                Type: getTypeValue(type),
                Description: description,
                DateDebut: dateDebut,
                DateFin: dateFin,
                Adresse: adresse,
                Client: client,
            });

            if (response && response.data) {
                console.log('Réponse du serveur:', response.data);
                setAjout(true);
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
            <h1 className='titre_chantier'>Ajout d'un chantier</h1>
            <form>
            <p>
                    <Link to="/client" className="bouton">Créer un client</Link>
                
            </p>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Sélectionnez le type de chantier</option>
                    {types.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                <select value={client} onChange={(e) => setClient(e.target.value)}>
                    <option value="">Sélectionnez le client</option>
                    {clientsList.map((client) => (
                        <option key={client.clientId} value={client.clientId}>
                            {client.nomClient}
                        </option>
                    ))}
                </select>
               
                <input
                    type="text"
                    placeholder="Entrez l'adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
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
                <div className="date-selector">
                    <label htmlFor="dateFin">Date et heure de fin :</label>
                    <input
                        type="datetime-local"
                        id="dateFin"
                        name="dateFin"
                        value={dateFin}
                        onChange={handleDateFinChange}
                    />
                </div>
                <Link to="/planninga">
                <button type="button" onClick={ajoutChantier}>
                    Ajouter
                </button>
                </Link>
            </form>
        </div>
    );
}

export default Chantier;
