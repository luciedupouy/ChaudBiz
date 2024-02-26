import Navordi from '../components/Navordi';
import '../styles/AccueilA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faCalendarAlt, faTools } from '@fortawesome/free-solid-svg-icons';


const AccueilA = () => {
    const chantiersEnAttente = 5;
    const materielEnAttente = 3;
    const rendezVousDuJour = 2;

    return(
        <div>
            <Navordi></Navordi>
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
            <h1>Mes rendez-vous</h1>
        </div>
    );
}

export default AccueilA;