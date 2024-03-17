import React, { useState } from 'react';
import Navordi from '../components/Navordi';
import axios from 'axios';
import '../styles/Login.css';
import '../styles/Global.css';
import { Link } from 'react-router-dom';

const Client = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mail, setMail] = useState('');
    const [tel, setTel] = useState('');

    const ajoutClient = async () => {
        try {
            const response = await axios.post('http://localhost:5257/api/client/', {
                NomClient: nom,
                PrenomClient: prenom,
                MailClient: mail,
                Tel: tel
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
        <div className='login' >
            <Navordi />
            <h1>Ajout d'un client</h1>
            <form>
                <input
                    type="text"
                    placeholder="Entrez le nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Entrez le prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Entrez le mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Entrez le numéro de téléphone"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />
                <Link to="/ajoutchantier">
                    <button type="button" onClick={ajoutClient}>
                        Ajouter
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default Client;
